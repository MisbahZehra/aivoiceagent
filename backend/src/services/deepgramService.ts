import { DeepgramClient } from '@deepgram/sdk';
import { voiceConfig } from '../config/voice';

export const deepgram = new DeepgramClient({
  apiKey: voiceConfig.deepgramApiKey,
});

export const createLiveTranscription = async () => {
  if (!voiceConfig.deepgramApiKey) {
    throw new Error('Deepgram API key is not configured');
  }

  const connection = await deepgram.listen.v1.connect({
    model: 'nova-3',
    language: 'en-US',
    smart_format: 'true',
    interim_results: 'true',
    encoding: 'linear16',
    sample_rate: '16000',
    channels: '1',
    endpointing: '300',
  });

  connection.on('open', () => {
    console.log('Deepgram connection opened');
  });

  return connection;
};
