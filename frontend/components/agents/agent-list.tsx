'use client';

import useAgentStore from '@/lib/agent-store';
import AgentCard from './agent-card';

export default function AgentList() {
  const agents = useAgentStore((state) => state.getFilteredAgents());
  const selectedAgentId = useAgentStore((state) => state.selectedAgentId);
  const selectAgent = useAgentStore((state) => state.selectAgent);
  const openEditForm = useAgentStore((state) => state.openEditForm);
  const deleteAgent = useAgentStore((state) => state.deleteAgent);
  const toggleAgentActive = useAgentStore((state) => state.toggleAgentActive);

  if (agents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="font-medium text-slate-900">No agents found</p>
        <p className="mt-1 text-sm text-slate-500">Try a different search or create a new agent.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isSelected={selectedAgentId === agent.id}
          onSelect={() => selectAgent(agent.id)}
          onEdit={() => openEditForm(agent.id)}
          onDelete={() => deleteAgent(agent.id)}
          onToggleActive={() => toggleAgentActive(agent.id)}
        />
      ))}
    </div>
  );
}
