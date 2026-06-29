'use client';

import DashboardLayout from '@/components/dashboard-layout';
import CallVolumeChart from '@/components/dashboard/call-volume-chart';
import QuickActions from '@/components/dashboard/quick-actions';
import RecentActivity from '@/components/dashboard/recent-activity';
import StatCards from '@/components/dashboard/stat-cards';
import { dashboardStats, recentActivity, weeklyCallVolume } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Operations Overview"
      subtitle="Monitor your AI voice agents, call health, and team activity at a glance."
    >
      <StatCards stats={dashboardStats} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <CallVolumeChart data={weeklyCallVolume} />
        <div className="space-y-6">
          <RecentActivity items={recentActivity} />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}
