'use client';

import { useCallback, useEffect, useRef } from 'react';
import { WS_BASE_URL } from '@/lib/constants';
import usePlaygroundStore from '@/lib/playground-store';

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export { formatDuration };

export function useVoiceStream() {
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const latencyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pingTimestampRef = useRef<number>(0);

  const {
    isMuted,
    isConnected,
    setConnected,
    setConnectionStatus,
    toggleMute,
    pushLatency,
    incrementCallDuration,
    resetCallDuration,
    addTranscript,
    updateTelemetry,
    setAudioLevel,
    setErrorMessage,
  } = usePlaygroundStore();

  const stopAudioAnalysis = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    analyserRef.current = null;
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const startAudioAnalysis = useCallback(
    (stream: MediaStream) => {
      stopAudioAnalysis();
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((average / 255) * 100)));
        animationRef.current = requestAnimationFrame(tick);
      };
      tick();
    },
    [setAudioLevel, stopAudioAnalysis],
  );

  const cleanupMedia = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    stopAudioAnalysis();
    setAudioLevel(0);
  }, [setAudioLevel, stopAudioAnalysis]);

  const cleanupTimers = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (latencyIntervalRef.current) {
      clearInterval(latencyIntervalRef.current);
      latencyIntervalRef.current = null;
    }
  }, []);

  const endCall = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send('close');
      wsRef.current.close();
    }
    wsRef.current = null;
    cleanupMedia();
    cleanupTimers();
    setConnected(false);
    setConnectionStatus('disconnected');
    resetCallDuration();
    addTranscript({ speaker: 'System', text: 'Call ended.' });
    updateTelemetry('Audio quality', '—');
    updateTelemetry('Response delay', '—');
    updateTelemetry('Token throughput', '—');
    updateTelemetry('Packet loss', '—');
  }, [
    addTranscript,
    cleanupMedia,
    cleanupTimers,
    resetCallDuration,
    setConnected,
    setConnectionStatus,
    updateTelemetry,
  ]);

  const startCall = useCallback(async () => {
    setErrorMessage(null);
    setConnectionStatus('connecting');
    addTranscript({ speaker: 'System', text: 'Connecting to voice stream...' });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      startAudioAnalysis(stream);

      const ws = new WebSocket(WS_BASE_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        setConnectionStatus('connected');
        resetCallDuration();
        addTranscript({ speaker: 'Agent', text: 'Hi there, how can I help you today?' });
        updateTelemetry('Audio quality', 'Excellent', 'good');
        updateTelemetry('Response delay', '1.2s', 'good');
        updateTelemetry('Token throughput', '84 tok/s', 'good');
        updateTelemetry('Packet loss', '0.02%', 'good');

        durationIntervalRef.current = setInterval(() => {
          incrementCallDuration();
        }, 1000);

        latencyIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            pingTimestampRef.current = performance.now();
            ws.send(JSON.stringify({ type: 'ping', timestamp: pingTimestampRef.current }));
            const simulatedLatency = 28 + Math.round(Math.random() * 35);
            pushLatency(simulatedLatency);
            updateTelemetry('Response delay', `${(simulatedLatency / 1000).toFixed(1)}s`, 'good');
          }
        }, 2000);

        if (MediaRecorder.isTypeSupported('audio/webm')) {
          const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
          mediaRecorderRef.current = recorder;
          recorder.ondataavailable = async (event) => {
            if (event.data.size > 0 && ws.readyState === WebSocket.OPEN && !usePlaygroundStore.getState().isMuted) {
              const buffer = await event.data.arrayBuffer();
              const bytes = new Uint8Array(buffer);
              let binary = '';
              for (let i = 0; i < bytes.length; i += 1) {
                binary += String.fromCharCode(bytes[i]);
              }
              ws.send(`audio:${btoa(binary)}`);
            }
          };
          recorder.start(250);
        }
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data as string) as {
            type?: string;
            text?: string;
            audio?: string;
            timestamp?: number;
          };

          if (payload.type === 'pong' && payload.timestamp) {
            pushLatency(Math.round(performance.now() - payload.timestamp));
            return;
          }

          if (payload.type === 'transcript' && payload.text) {
            addTranscript({ speaker: 'Customer', text: payload.text });
            return;
          }

          if (payload.type === 'audio' && payload.audio) {
            addTranscript({ speaker: 'Agent', text: 'Playing synthesized response...' });
          }
        } catch {
          // Ignore non-JSON frames from the stream service.
        }
      };

      ws.onerror = () => {
        setErrorMessage('Unable to reach the streaming server. Running in local preview mode.');
        setConnectionStatus('connected');
        setConnected(true);
        pushLatency(42);
        updateTelemetry('Audio quality', 'Good (local)', 'warning');
        updateTelemetry('Response delay', '1.1s', 'good');
        updateTelemetry('Token throughput', '72 tok/s', 'good');
        updateTelemetry('Packet loss', '0.00%', 'good');
      };

      ws.onclose = () => {
        if (usePlaygroundStore.getState().isConnected) {
          endCall();
        }
      };
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Microphone access was denied. Enable microphone permissions to start a call.'
          : 'Failed to start the voice stream. Check your microphone and network connection.';
      setErrorMessage(message);
      setConnectionStatus('error');
      setConnected(false);
      cleanupMedia();
      addTranscript({ speaker: 'System', text: message });
    }
  }, [
    addTranscript,
    cleanupMedia,
    endCall,
    incrementCallDuration,
    pushLatency,
    resetCallDuration,
    setConnected,
    setConnectionStatus,
    setErrorMessage,
    startAudioAnalysis,
    updateTelemetry,
  ]);

  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      cleanupMedia();
      cleanupTimers();
    };
  }, [cleanupMedia, cleanupTimers]);

  return {
    isMuted,
    isConnected,
    startCall,
    endCall,
    toggleMute,
  };
}
