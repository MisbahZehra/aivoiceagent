'use client';

import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import TelemetryPanel from '@/components/playground/telemetry-panel';
import TranscriptPanel from '@/components/playground/transcript-panel';
import VoiceStreamPanel from '@/components/playground/voice-stream-panel';
import useAgentStore from '@/lib/agent-store';
import usePlaygroundStore from '@/lib/playground-store';

export default function PlaygroundPage() {
  const { agents } = useAgentStore();
  const { selectedAgentId, setSelectedAgentId } = usePlaygroundStore();
  
  const activeAgents = agents ? agents.filter((agent: any) => agent.isActive) : [];

  useEffect(() => {
    if (!selectedAgentId && activeAgents.length > 0) {
      setSelectedAgentId(activeAgents[0].id);
    }
  }, [activeAgents, selectedAgentId, setSelectedAgentId]);

  return (
    <DashboardLayout
      title="AI Testing Playground"
      subtitle="Run live voice experiments, inspect stream telemetry"
    >
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <VoiceStreamPanel />
        <div className="space-y-6">
          <TelemetryPanel />
          <TranscriptPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
