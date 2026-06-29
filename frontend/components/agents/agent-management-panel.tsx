'use client';

import useAgentStore from '@/lib/agent-store';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgentList from './agent-list';

export default function AgentManagementPanel() {
  const searchQuery = useAgentStore((state) => state.searchQuery);
  const setSearchQuery = useAgentStore((state) => state.setSearchQuery);
  const openCreateForm = useAgentStore((state) => state.openCreateForm);
  const agentCount = useAgentStore((state) => state.agents.length);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">AI agents</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Active lineup ({agentCount})
          </h3>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search agents..."
              className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-slate-500 sm:w-64"
            />
          </div>
          <Button onClick={openCreateForm} className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" />
            New agent
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <AgentList />
      </div>
    </section>
  );
}
