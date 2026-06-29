import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { voiceConfig } from '../config/voice';

export const elevenlabs = new ElevenLabsClient({
  apiKey: voiceConfig.elevenLabsApiKey,
});

export const synthesizeSpeech = async (text: string) => {
  if (!voiceConfig.elevenLabsApiKey) {
    throw new Error('ElevenLabs API key is not configured');
  }

  return elevenlabs.textToSpeech.convert(voiceConfig.elevenLabsVoiceId, {
    text,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });
};
