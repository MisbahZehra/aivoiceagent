'use client';

import DashboardLayout from '@/components/dashboard-layout';
import AgentLeaderboard from '@/components/analytics/agent-leaderboard';
import CallsTrendChart from '@/components/analytics/calls-trend-chart';
import MetricCards from '@/components/analytics/metric-cards';
import SatisfactionChart from '@/components/analytics/satisfaction-chart';
import TimeRangeSelector from '@/components/analytics/time-range-selector';
import useAnalyticsStore from '@/lib/analytics-store';

export default function AnalyticsPage() {
  const metrics = useAnalyticsStore((state) => state.metrics);
  const callTrend = useAnalyticsStore((state) => state.callTrend);
  const satisfactionData = useAnalyticsStore((state) => state.satisfactionData);
  const leaderboard = useAnalyticsStore((state) => state.leaderboard);

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Track call trends, agent performance, and customer outcomes."
    >
      <div className="mb-4 flex justify-end">
        <TimeRangeSelector />
      </div>

      <MetricCards metrics={metrics} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <CallsTrendChart data={callTrend} />
        <AgentLeaderboard entries={leaderboard} />
      </div>

      <div className="mt-6">
        <SatisfactionChart data={satisfactionData} />
      </div>
    </DashboardLayout>
  );
}
