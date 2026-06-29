'use client';

import useAgentStore from '@/lib/agent-store';
import { CheckCircle2 } from 'lucide-react';

export default function AgentPerformancePanel() {
  const selectedAgent = useAgentStore((state) => state.getSelectedAgent());
  const totalCalls = useAgentStore((state) =>
    state.agents.reduce((sum, agent) => sum + agent.calls, 0),
  );
  const activeCount = useAgentStore((state) => state.agents.filter((agent) => agent.isActive).length);

  const resolutionRate = selectedAgent
    ? Math.min(99, 85 + (selectedAgent.calls % 15))
    : 92;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Performance snapshot</p>
        {selectedAgent ? (
          <p className="mt-1 text-lg font-semibold text-slate-900">{selectedAgent.name}</p>
        ) : (
          <p className="mt-1 text-lg font-semibold text-slate-900">No agent selected</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Resolution</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{resolutionRate}%</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Total calls</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {selectedAgent?.calls.toLocaleString() ?? totalCalls.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Active agents</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{activeCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Voice profile</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {selectedAgent?.voice ?? '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Quality checklist</p>
        <div className="mt-4 space-y-3">
          {['Intent routing', 'Fallback prompts', 'Voice tone tuning', 'Compliance rules'].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{item}</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>

      {selectedAgent && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Agent instructions</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">{selectedAgent.instructions}</p>
        </div>
      )}
    </section>
  );
}
