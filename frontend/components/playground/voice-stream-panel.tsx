'use client';

import React, { useRef, useEffect } from 'react';
import useAgentStore from '@/lib/agent-store';
import usePlaygroundStore from '@/lib/playground-store';
import { WS_BASE_URL } from '@/lib/constants';

const TARGET_SAMPLE_RATE = 16000;

function downsampleToPcm(input: Float32Array, inputSampleRate: number): Int16Array {
  if (inputSampleRate === TARGET_SAMPLE_RATE) {
    const pcm = new Int16Array(input.length);
    for (let i = 0; i < input.length; i += 1) {
      const sample = Math.max(-1, Math.min(1, input[i]));
      pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
    return pcm;
  }

  const ratio = inputSampleRate / TARGET_SAMPLE_RATE;
  const outputLength = Math.floor(input.length / ratio);
  const pcm = new Int16Array(outputLength);

  for (let i = 0; i < outputLength; i += 1) {
    const sample = Math.max(-1, Math.min(1, input[Math.floor(i * ratio)]));
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }

  return pcm;
}

export default function VoiceStreamPanel() {
  const { agents } = useAgentStore();
  const {
    selectedAgentId,
    setSelectedAgentId,
    connectionStatus,
    setConnectionStatus,
    addTranscript,
    setErrorMessage,
    updateTelemetry,
    setAudioLevel,
  } = usePlaygroundStore();

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const responseAudioRef = useRef<HTMLAudioElement | null>(null);

  const activeAgents = agents ? agents.filter((agent: any) => agent.isActive) : [];
  const isLive = connectionStatus === 'connected';

  useEffect(() => {
    return () => {
      stopAudioStream();
    };
  }, []);

  const playAgentAudio = (base64: string) => {
    if (responseAudioRef.current) {
      responseAudioRef.current.pause();
    }
    const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
    responseAudioRef.current = audio;
    void audio.play().catch(() => {
      setErrorMessage('Unable to play agent audio response.');
    });
  };

  const startAudioStream = async () => {
    try {
      setErrorMessage(null);
      setConnectionStatus('connecting');
      addTranscript({ speaker: 'System', text: 'Connecting to voice stream...' });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      const ws = new WebSocket(WS_BASE_URL);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        addTranscript({ speaker: 'System', text: 'Connected. Start speaking.' });
        updateTelemetry('Audio quality', 'Streaming', 'good');

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        source.connect(processor);
        processor.connect(audioContext.destination);

        processor.onaudioprocess = (event) => {
          if (ws.readyState !== WebSocket.OPEN) {
            return;
          }

          const input = event.inputBuffer.getChannelData(0);
          const pcm = downsampleToPcm(input, audioContext.sampleRate);

          let sum = 0;
          for (let i = 0; i < input.length; i += 1) {
            sum += Math.abs(input[i]);
          }
          const level = Math.min(100, Math.round((sum / input.length) * 400));
          setAudioLevel(level);

          ws.send(pcm.buffer);
        };
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data as string) as {
            type?: string;
            text?: string;
            audio?: string;
            final?: boolean;
          };

          if (payload.type === 'transcript' && payload.text?.trim()) {
            if (payload.final) {
              addTranscript({ speaker: 'Customer', text: payload.text });
            }
            return;
          }

          if (payload.type === 'audio' && payload.audio) {
            if (payload.text) {
              addTranscript({ speaker: 'Agent', text: payload.text });
            }
            updateTelemetry('Response delay', 'Ready', 'good');
            playAgentAudio(payload.audio);
            return;
          }

          if (payload.type === 'error' && payload.text) {
            setErrorMessage(payload.text);
            addTranscript({ speaker: 'System', text: payload.text });
          }
        } catch {
          // Ignore non-JSON frames.
        }
      };

      ws.onclose = () => {
        const wasLive = usePlaygroundStore.getState().connectionStatus === 'connected';
        stopAudioStream(false);
        if (wasLive) {
          setConnectionStatus('idle');
        }
      };

      ws.onerror = () => {
        setErrorMessage('Voice stream connection failed.');
        stopAudioStream(false);
        setConnectionStatus('idle');
      };
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Microphone access was denied. Enable microphone permissions to start a call.'
          : 'Failed to start the voice stream.';
      setErrorMessage(message);
      addTranscript({ speaker: 'System', text: message });
      stopAudioStream(false);
      setConnectionStatus('idle');
    }
  };

  const stopAudioStream = (updateStatus = true) => {
    if (updateStatus) {
      setConnectionStatus('idle');
      addTranscript({ speaker: 'System', text: 'Call ended.' });
      updateTelemetry('Audio quality', '—');
      setAudioLevel(0);
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (responseAudioRef.current) {
      responseAudioRef.current.pause();
      responseAudioRef.current = null;
    }

    if (wsRef.current) {
      const ws = wsRef.current;
      wsRef.current = null;
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('close');
        ws.close();
      }
    }
  };

  const handleCallToggle = () => {
    if (isLive) {
      stopAudioStream();
    } else {
      startAudioStream();
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Voice Stream</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select AI Agent</label>
        <select
          value={selectedAgentId || ''}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          className="w-full rounded-lg border bg-background p-2.5 text-sm"
          disabled={isLive}
        >
          {activeAgents.map((agent: any) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
          {activeAgents.length === 0 && <option value="">Sales Outreach (Default)</option>}
        </select>
      </div>

      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-muted/40">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            isLive ? 'bg-green-500/10 animate-bounce' : 'bg-primary/10 animate-pulse'
          }`}
        >
          <span className="text-2xl">{isLive ? '🟢' : '🎙️'}</span>
        </div>
        <p className="text-sm font-medium mb-1 uppercase">Status: {connectionStatus || 'idle'}</p>
        <p className="text-xs text-muted-foreground mb-6">
          {isLive
            ? 'Streaming live audio — speak into your microphone'
            : 'Ready to start the voice agent experiment'}
        </p>

        <button
          onClick={handleCallToggle}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm text-white ${
            isLive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLive ? 'End Voice Agent Call' : 'Start Voice Agent Call'}
        </button>
      </div>
    </div>
  );
}
