export type ActiveView = 'dashboard' | 'agents' | 'analytics' | 'playground';

export type AgentStatus = 'Running' | 'Live' | 'Optimizing' | 'Paused' | 'Draft';

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  instructions: string;
  status: AgentStatus;
  calls: number;
  isActive: boolean;
  voice: string;
  language: string;
  createdAt: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ActivityItem {
  id: string;
  name: string;
  time: string;
  status: string;
  type: 'call' | 'agent' | 'alert';
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  calls: number;
}

export interface TranscriptEntry {
  id: string;
  speaker: 'Agent' | 'Customer' | 'System';
  text: string;
  timestamp: string;
}

export interface TelemetryMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
}

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

export type AnalyticsRange = '7d' | '30d' | '90d';
