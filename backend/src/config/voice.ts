export const voiceConfig = {
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  deepgramApiKey: process.env.DEEPGRAM_API_KEY || '',
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || '',
  elevenLabsVoiceId: process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  realtimeModel: process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview',
};
