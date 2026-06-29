import { deepgram } from './deepgramService';
import { voiceConfig } from '../config/voice';
import { synthesizeSpeech as synthesizeWithElevenLabs } from './elevenlabsService';

const streamToBuffer = async (audio: unknown): Promise<Buffer> => {
  if (Buffer.isBuffer(audio)) {
    return audio;
  }

  if (audio && typeof (audio as { arrayBuffer?: () => Promise<ArrayBuffer> }).arrayBuffer === 'function') {
    return Buffer.from(await (audio as { arrayBuffer: () => Promise<ArrayBuffer> }).arrayBuffer());
  }

  if (audio && typeof (audio as AsyncIterable<Uint8Array>)[Symbol.asyncIterator] === 'function') {
    const chunks: Buffer[] = [];
    for await (const chunk of audio as AsyncIterable<Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }

  throw new Error('Unsupported audio response format from TTS provider.');
};

export const synthesizeSpeechBase64 = async (text: string): Promise<string> => {
  try {
    const response = await deepgram.speak.v1.audio.generate({
      text,
      model: 'aura-2-thalia-en',
    });
    const buffer = await streamToBuffer(response);
    return buffer.toString('base64');
  } catch (deepgramError) {
    if (!voiceConfig.elevenLabsApiKey) {
      throw deepgramError;
    }
    console.warn('Deepgram TTS failed, trying ElevenLabs:', deepgramError);
  }

  const elevenLabsAudio = await synthesizeWithElevenLabs(text);
  const buffer = await streamToBuffer(elevenLabsAudio);
  return buffer.toString('base64');
};

export const getVoicePipelineErrorMessage = (error: unknown): string => {
  const status =
    error && typeof error === 'object' && 'status' in error
      ? Number((error as { status?: number }).status)
      : undefined;

  const message = error instanceof Error ? error.message : String(error);

  if (status === 429 || message.includes('429') || message.toLowerCase().includes('quota')) {
    return 'OpenAI API quota exceeded. Add billing/credits or update OPENAI_API_KEY in backend/.env.';
  }

  if (status === 401 || message.includes('401')) {
    return 'An API key is invalid or missing permissions. Check your API keys in backend/.env.';
  }

  return message || 'Failed to generate a voice response.';
};
