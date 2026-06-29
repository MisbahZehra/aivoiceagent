import type {
  ActivityItem,
  Agent,
  AnalyticsMetric,
  ChartDataPoint,
  DashboardStat,
  LeaderboardEntry,
} from './types';

export const initialAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sales Outreach',
    description: 'Handles outbound sales calls and lead qualification.',
    model: 'GPT-4.1',
    instructions: 'You are a friendly sales assistant focused on qualifying leads.',
    status: 'Running',
    calls: 1240,
    isActive: true,
    voice: 'Nova',
    language: 'English (US)',
    createdAt: '2026-05-12T10:00:00.000Z',
  },
  {
    id: 'agent-2',
    name: 'Support Desk',
    description: 'Resolves customer support issues and escalates when needed.',
    model: 'GPT-4o',
    instructions: 'You are a patient support agent who resolves billing and account issues.',
    status: 'Optimizing',
    calls: 892,
    isActive: true,
    voice: 'Alloy',
    language: 'English (US)',
    createdAt: '2026-05-18T14:30:00.000Z',
  },
  {
    id: 'agent-3',
    name: 'Appointment Bot',
    description: 'Books and reschedules appointments for the clinic team.',
    model: 'GPT-4o-mini',
    instructions: 'You schedule appointments and confirm patient details accurately.',
    status: 'Live',
    calls: 503,
    isActive: true,
    voice: 'Shimmer',
    language: 'English (US)',
    createdAt: '2026-06-01T09:15:00.000Z',
  },
];

export const dashboardStats: DashboardStat[] = [
  { label: 'Calls Today', value: '184', change: '+12.4%', trend: 'up' },
  { label: 'Success Rate', value: '98.7%', change: '+1.2%', trend: 'up' },
  { label: 'Avg. Response', value: '1.24s', change: '-0.3s', trend: 'down' },
  { label: 'Active Agents', value: '24', change: '+3', trend: 'up' },
];

export const recentActivity: ActivityItem[] = [
  { id: 'act-1', name: 'Sales Assistant', time: 'Now', status: 'Live', type: 'call' },
  { id: 'act-2', name: 'Support Agent', time: '3m ago', status: 'Reviewing', type: 'agent' },
  { id: 'act-3', name: 'Product Bot', time: '9m ago', status: 'Idle', type: 'agent' },
  { id: 'act-4', name: 'Latency spike detected', time: '14m ago', status: 'Resolved', type: 'alert' },
];

export const weeklyCallVolume: ChartDataPoint[] = [
  { label: 'Mon', value: 48 },
  { label: 'Tue', value: 72 },
  { label: 'Wed', value: 65 },
  { label: 'Thu', value: 88 },
  { label: 'Fri', value: 94 },
  { label: 'Sat', value: 118 },
  { label: 'Sun', value: 136 },
];

export const analyticsMetrics: AnalyticsMetric[] = [
  { label: 'Conversion', value: '24.8%', delta: '+5.1%', trend: 'up' },
  { label: 'Satisfaction', value: '4.8/5', delta: '+0.3', trend: 'up' },
  { label: 'Abandonment', value: '3.2%', delta: '-0.9%', trend: 'down' },
  { label: 'Avg. Hold', value: '18s', delta: '-4s', trend: 'down' },
];

export const monthlyCallsByRange: Record<'7d' | '30d' | '90d', ChartDataPoint[]> = {
  '7d': [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 66 },
    { label: 'Wed', value: 58 },
    { label: 'Thu', value: 83 },
    { label: 'Fri', value: 74 },
    { label: 'Sat', value: 92 },
    { label: 'Sun', value: 110 },
  ],
  '30d': [
    { label: 'W1', value: 320 },
    { label: 'W2', value: 410 },
    { label: 'W3', value: 385 },
    { label: 'W4', value: 468 },
  ],
  '90d': [
    { label: 'Jan', value: 980 },
    { label: 'Feb', value: 1120 },
    { label: 'Mar', value: 1340 },
  ],
};

export const satisfactionTrend: ChartDataPoint[] = [
  { label: 'Mon', value: 4.2 },
  { label: 'Tue', value: 4.5 },
  { label: 'Wed', value: 4.4 },
  { label: 'Thu', value: 4.7 },
  { label: 'Fri', value: 4.8 },
  { label: 'Sat', value: 4.9 },
  { label: 'Sun', value: 4.8 },
];

export const agentLeaderboard: LeaderboardEntry[] = [
  { id: 'lb-1', name: 'Sales Outreach', score: 96.2, calls: 1240 },
  { id: 'lb-2', name: 'Appointment Bot', score: 94.1, calls: 503 },
  { id: 'lb-3', name: 'Support Desk', score: 92.8, calls: 892 },
];
