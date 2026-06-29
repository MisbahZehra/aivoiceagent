'use client';

import type { LeaderboardEntry } from '@/lib/types';

interface AgentLeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function AgentLeaderboard({ entries }: AgentLeaderboardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Agent leaderboard</p>
      <div className="mt-4 space-y-3">
        {entries.map((item, index) => (
          <div key={item.id} className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-400">#{index + 1}</span>
                <span className="font-medium text-slate-900">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">{item.score.toFixed(1)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{ width: `${item.score}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">{item.calls.toLocaleString()} calls handled</p>
          </div>
        ))}
      </div>
    </section>
  );
}
