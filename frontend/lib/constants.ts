export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL ??
  API_BASE_URL.replace(/^http/i, 'ws');

export const VOICE_MODELS = [
  'GPT-4.1',
  'GPT-4o',
  'GPT-4o-mini',
  'Claude 3.5 Sonnet',
] as const;

export const VOICE_OPTIONS = [
  'Alloy',
  'Nova',
  'Echo',
  'Shimmer',
] as const;

export const LANGUAGE_OPTIONS = [
  'English (US)',
  'English (UK)',
  'Spanish',
  'French',
  'German',
] as const;
