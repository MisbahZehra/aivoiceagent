'use client';

import type { Agent } from '@/lib/types';
import { Bot, MoreHorizontal, PauseCircle, PlayCircle, Settings, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

const statusStyles: Record<Agent['status'], string> = {
  Running: 'bg-emerald-50 text-emerald-700',
  Live: 'bg-sky-50 text-sky-700',
  Optimizing: 'bg-amber-50 text-amber-700',
  Paused: 'bg-slate-100 text-slate-600',
  Draft: 'bg-violet-50 text-violet-700',
};

export default function AgentCard({
  agent,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleActive,
}: AgentCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4 transition',
        isSelected
          ? 'border-slate-900 bg-slate-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <button type="button" onClick={onSelect} className="flex flex-1 items-start gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
            <Bot className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{agent.name}</p>
            <p className="text-sm text-slate-500">{agent.model}</p>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{agent.description}</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[agent.status]}`}>
            {agent.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>{agent.calls.toLocaleString()} calls</span>
          <span>{agent.voice}</span>
          <span>{agent.language}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleActive}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            title={agent.isActive ? 'Pause agent' : 'Activate agent'}
          >
            {agent.isActive ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            title="Edit agent"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-slate-200 p-2 text-rose-600 hover:bg-rose-50"
            title="Delete agent"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onSelect}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            title="Select agent"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
