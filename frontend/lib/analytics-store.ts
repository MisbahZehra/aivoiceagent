import { create } from 'zustand';
import {
  agentLeaderboard,
  analyticsMetrics,
  monthlyCallsByRange,
  satisfactionTrend,
} from './mock-data';
import type { AnalyticsMetric, AnalyticsRange, ChartDataPoint, LeaderboardEntry } from './types';

interface AnalyticsState {
  timeRange: AnalyticsRange;
  metrics: AnalyticsMetric[];
  callTrend: ChartDataPoint[];
  satisfactionData: ChartDataPoint[];
  leaderboard: LeaderboardEntry[];
  setTimeRange: (range: AnalyticsRange) => void;
}

const useAnalyticsStore = create<AnalyticsState>((set) => ({
  timeRange: '7d',
  metrics: analyticsMetrics,
  callTrend: monthlyCallsByRange['7d'],
  satisfactionData: satisfactionTrend,
  leaderboard: agentLeaderboard,

  setTimeRange: (range) =>
    set({
      timeRange: range,
      callTrend: monthlyCallsByRange[range],
    }),
}));

export default useAnalyticsStore;
