"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLiveTranscription = exports.deepgram = void 0;
const sdk_1 = require("@deepgram/sdk");
const voice_1 = require("../config/voice");
exports.deepgram = new sdk_1.DeepgramClient({
    apiKey: voice_1.voiceConfig.deepgramApiKey,
});
const createLiveTranscription = async () => {
    if (!voice_1.voiceConfig.deepgramApiKey) {
        throw new Error('Deepgram API key is not configured');
    }
    const connection = await exports.deepgram.listen.v1.connect({
        model: 'nova-3',
        language: 'en-US',
        smart_format: 'true',
        interim_results: 'true',
        Authorization: `Token ${voice_1.voiceConfig.deepgramApiKey}`,
    });
    connection.on('open', () => {
        console.log('Deepgram connection opened');
    });
    return connection;
};
exports.createLiveTranscription = createLiveTranscription;
