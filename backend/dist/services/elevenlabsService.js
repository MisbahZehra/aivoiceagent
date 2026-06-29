"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synthesizeSpeech = exports.elevenlabs = void 0;
const elevenlabs_js_1 = require("@elevenlabs/elevenlabs-js");
const voice_1 = require("../config/voice");
exports.elevenlabs = new elevenlabs_js_1.ElevenLabsClient({
    apiKey: voice_1.voiceConfig.elevenLabsApiKey,
});
const synthesizeSpeech = async (text) => {
    if (!voice_1.voiceConfig.elevenLabsApiKey) {
        throw new Error('ElevenLabs API key is not configured');
    }
    const audio = await exports.elevenlabs.textToSpeech.convert(voice_1.voiceConfig.elevenLabsVoiceId, {
        text,
        modelId: 'eleven_multilingual_v2',
        outputFormat: 'mp3_44100_128',
    });
    return audio;
};
exports.synthesizeSpeech = synthesizeSpeech;
