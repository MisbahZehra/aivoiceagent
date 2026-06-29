import { create } from 'zustand';
import type { ConnectionStatus, TelemetryMetric, TranscriptEntry } from './types';

interface PlaygroundState {
  isMuted: boolean;
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  latency: number;
  latencyHistory: number[];
  callDuration: number;
  selectedAgentId: string | null;
  transcript: TranscriptEntry[];
  telemetry: TelemetryMetric[];
  audioLevel: number;
  errorMessage: string | null;
  setSelectedAgentId: (id: string | null) => void;
  setMuted: (muted: boolean) => void;
  toggleMute: () => void;
  setConnected: (connected: boolean) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setLatency: (latency: number) => void;
  pushLatency: (latency: number) => void;
  setCallDuration: (duration: number) => void;
  incrementCallDuration: () => void;
  resetCallDuration: () => void;
  addTranscript: (entry: Omit<TranscriptEntry, 'id' | 'timestamp'>) => void;
  clearTranscript: () => void;
  setTelemetry: (telemetry: TelemetryMetric[]) => void;
  updateTelemetry: (label: string, value: string, status?: TelemetryMetric['status']) => void;
  setAudioLevel: (level: number) => void;
  setErrorMessage: (message: string | null) => void;
  resetSession: () => void;
}

const defaultTelemetry: TelemetryMetric[] = [
  { label: 'Audio quality', value: '—', status: 'good' },
  { label: 'Response delay', value: '—', status: 'good' },
  { label: 'Token throughput', value: '—', status: 'good' },
  { label: 'Packet loss', value: '—', status: 'good' },
];

const initialTranscript: TranscriptEntry[] = [
  {
    id: 'tx-1',
    speaker: 'System',
    text: 'Select an agent and start a call to begin streaming.',
    timestamp: new Date().toISOString(),
  },
];

const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  isMuted: false,
  isConnected: false,
  connectionStatus: 'idle',
  latency: 0,
  latencyHistory: [],
  callDuration: 0,
  selectedAgentId: null,
  transcript: initialTranscript,
  telemetry: defaultTelemetry,
  audioLevel: 0,
  errorMessage: null,

  setSelectedAgentId: (id) => set({ selectedAgentId: id }),

  setMuted: (muted) => set({ isMuted: muted }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setConnected: (connected) =>
    set({
      isConnected: connected,
      connectionStatus: connected ? 'connected' : 'disconnected',
    }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setLatency: (latency) => set({ latency }),

  pushLatency: (latency) =>
    set((state) => ({
      latency,
      latencyHistory: [...state.latencyHistory.slice(-29), latency],
    })),

  setCallDuration: (duration) => set({ callDuration: duration }),

  incrementCallDuration: () => set((state) => ({ callDuration: state.callDuration + 1 })),

  resetCallDuration: () => set({ callDuration: 0 }),

  addTranscript: (entry) =>
    set((state) => ({
      transcript: [
        ...state.transcript,
        {
          ...entry,
          id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  clearTranscript: () => set({ transcript: initialTranscript }),

  setTelemetry: (telemetry) => set({ telemetry }),

  updateTelemetry: (label, value, status = 'good') =>
    set((state) => ({
      telemetry: state.telemetry.map((item) =>
        item.label === label ? { ...item, value, status } : item,
      ),
    })),

  setAudioLevel: (level) => set({ audioLevel: level }),

  setErrorMessage: (message) => set({ errorMessage: message }),

  resetSession: () =>
    set({
      isMuted: false,
      isConnected: false,
      connectionStatus: 'idle',
      latency: 0,
      latencyHistory: [],
      callDuration: 0,
      audioLevel: 0,
      errorMessage: null,
      telemetry: defaultTelemetry,
      transcript: initialTranscript,
    }),
}));

export default usePlaygroundStore;
