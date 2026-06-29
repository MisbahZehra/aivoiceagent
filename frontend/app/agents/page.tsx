'use client';

import DashboardLayout from '@/components/dashboard-layout';
import AgentFormModal from '@/components/agents/agent-form-modal';
import AgentManagementPanel from '@/components/agents/agent-management-panel';
import AgentPerformancePanel from '@/components/agents/agent-performance-panel';

export default function AgentsPage() {
  return (
    <DashboardLayout
      title="Agent Management"
      subtitle="Configure, monitor, and deploy your AI voice assistants."
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <AgentManagementPanel />
        <AgentPerformancePanel />
      </div>
      <AgentFormModal />
    </DashboardLayout>
  );
}
