import { WebSocketServer, WebSocket, RawData } from 'ws';
import { createLiveTranscription } from './deepgramService';
import { getChatCompletion } from './openaiService';
import { getVoicePipelineErrorMessage, synthesizeSpeechBase64 } from './speechService';

const toBuffer = (raw: RawData): Buffer => {
  if (Buffer.isBuffer(raw)) {
    return raw;
  }
  if (raw instanceof ArrayBuffer) {
    return Buffer.from(raw);
  }
  if (Array.isArray(raw)) {
    return Buffer.concat(raw);
  }
  return Buffer.from(raw);
};

export const setupStreamingServer = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws: WebSocket) => {
    let deepgramSocket: Awaited<ReturnType<typeof createLiveTranscription>> | null = null;
    let isProcessing = false;
    let lastTranscript = '';

    try {
      deepgramSocket = await createLiveTranscription();
      deepgramSocket.connect();
      await deepgramSocket.waitForOpen();
      console.log('Voice client connected — Deepgram stream ready');

      deepgramSocket.on('message', async (data: unknown) => {
        const message = typeof data === 'string' ? JSON.parse(data) : data;

        if (message.type === 'Metadata') {
          return;
        }

        if (message.type !== 'Results') {
          return;
        }

        const transcript = (message.channel?.alternatives?.[0]?.transcript as string | undefined) ?? '';
        const isFinal = Boolean(message.is_final || message.speech_final);

        if (transcript.trim()) {
          ws.send(JSON.stringify({ type: 'transcript', text: transcript, final: isFinal }));
        }

        if (!isFinal || !transcript.trim() || isProcessing || transcript === lastTranscript) {
          return;
        }

        lastTranscript = transcript;
        isProcessing = true;

        try {
          let completion = '';
          let warning: string | null = null;

          try {
            completion = await getChatCompletion([
              {
                role: 'system',
                content: 'You are a helpful voice assistant. Keep replies concise and conversational.',
              },
              { role: 'user', content: transcript },
            ]);
          } catch (openAiError) {
            warning = getVoicePipelineErrorMessage(openAiError);
            completion = `Hi! I heard you say "${transcript}".`;
          }

          if (!completion.trim()) {
            return;
          }

          const speech = await synthesizeSpeechBase64(completion);
          ws.send(JSON.stringify({ type: 'audio', audio: speech, text: completion }));

          if (warning) {
            ws.send(JSON.stringify({ type: 'error', text: warning }));
          }
        } catch (error) {
          const message = getVoicePipelineErrorMessage(error);
          console.error('Voice pipeline error:', error);
          ws.send(JSON.stringify({ type: 'error', text: message }));
        } finally {
          isProcessing = false;
        }
      });

      deepgramSocket.on('error', (error: Error) => {
        console.error('Deepgram stream error:', error);
        ws.send(JSON.stringify({ type: 'error', text: 'Speech recognition error.' }));
      });

      ws.on('message', (raw: RawData) => {
        const buffer = toBuffer(raw);

        if (buffer.length <= 512) {
          const text = buffer.toString('utf8');
          if (text === 'close') {
            deepgramSocket?.socket.close();
            ws.close();
            return;
          }
          if (text.startsWith('audio:')) {
            deepgramSocket?.socket.send(Buffer.from(text.slice('audio:'.length), 'base64'));
            return;
          }
        }

        if (buffer.length > 0) {
          deepgramSocket?.socket.send(buffer);
        }
      });

      ws.on('close', () => {
        deepgramSocket?.socket.close();
        console.log('Voice client disconnected');
      });
    } catch (error) {
      console.error('WebSocket stream setup error:', error);
      ws.send(JSON.stringify({ type: 'error', text: 'Failed to start voice stream.' }));
      ws.close();
    }
  });
};
