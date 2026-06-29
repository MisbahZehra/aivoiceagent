"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolsAwareCompletion = exports.getChatCompletion = exports.openai = void 0;
const openai_1 = __importDefault(require("openai"));
const voice_1 = require("../config/voice");
exports.openai = new openai_1.default({
    apiKey: voice_1.voiceConfig.openAiApiKey,
});
const getChatCompletion = async (messages) => {
    const response = await exports.openai.chat.completions.create({
        model: voice_1.voiceConfig.openAiModel,
        messages,
        temperature: 0.7,
    });
    return response.choices[0]?.message?.content || '';
};
exports.getChatCompletion = getChatCompletion;
const getToolsAwareCompletion = async (messages, tools) => {
    const response = await exports.openai.chat.completions.create({
        model: voice_1.voiceConfig.openAiModel,
        messages,
        tools,
        tool_choice: 'auto',
    });
    return response;
};
exports.getToolsAwareCompletion = getToolsAwareCompletion;
