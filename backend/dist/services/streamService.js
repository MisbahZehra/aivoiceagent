"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStreamingServer = void 0;
const ws_1 = require("ws");
const deepgramService_1 = require("./deepgramService");
const openaiService_1 = require("./openaiService");
const elevenlabsService_1 = require("./elevenlabsService");
const setupStreamingServer = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', async (ws) => {
        let transcription = '';
        const deepgramSocket = await (0, deepgramService_1.createLiveTranscription)();
        deepgramSocket.connect();
        await deepgramSocket.waitForOpen();
        deepgramSocket.on('message', async (data) => {
            const message = typeof data === 'string' ? JSON.parse(data) : data;
            if (message.type === 'Results' && message.channel?.alternatives?.[0]?.transcript) {
                transcription = message.channel.alternatives[0].transcript;
                ws.send(JSON.stringify({ type: 'transcript', text: transcription }));
                if (transcription.trim()) {
                    const completion = await (0, openaiService_1.getChatCompletion)([
                        { role: 'system', content: 'You are a helpful voice assistant.' },
                        { role: 'user', content: transcription },
                    ]);
                    const speech = await (0, elevenlabsService_1.synthesizeSpeech)(completion);
                    ws.send(JSON.stringify({ type: 'audio', audio: speech }));
                }
            }
        });
        ws.on('message', (raw) => {
            const message = raw.toString();
            if (message === 'close') {
                deepgramSocket.socket.close();
                ws.close();
            }
            else if (message.startsWith('audio:')) {
                deepgramSocket.socket.send(Buffer.from(message.replace('audio:', ''), 'base64'));
            }
        });
        ws.on('close', () => {
            deepgramSocket.socket.close();
        });
    });
};
exports.setupStreamingServer = setupStreamingServer;
