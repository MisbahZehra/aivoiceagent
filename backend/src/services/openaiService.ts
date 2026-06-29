import OpenAI from 'openai';
import type { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/chat/completions';
import { voiceConfig } from '../config/voice';

export const openai = new OpenAI({
  apiKey: voiceConfig.openAiApiKey,
});

export const getChatCompletion = async (messages: ChatCompletionMessageParam[]) => {
  const response = await openai.chat.completions.create({
    model: voiceConfig.openAiModel,
    messages,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || '';
};

export const getToolsAwareCompletion = async (
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[],
) => {
  const response = await openai.chat.completions.create({
    model: voiceConfig.openAiModel,
    messages,
    tools,
    tool_choice: 'auto',
  });

  return response;
};
