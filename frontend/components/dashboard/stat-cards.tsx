'use client';

import { cn } from '@/lib/utils';
import type { DashboardStat } from '@/lib/types';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface StatCardsProps {
  stats: DashboardStat[];
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-3xl font-semibold text-slate-900">{item.value}</h3>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-sm font-medium',
                item.trend === 'up' && 'text-emerald-600',
                item.trend === 'down' && 'text-sky-600',
                item.trend === 'neutral' && 'text-slate-500',
              )}
            >
              {item.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
              {item.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
              {item.trend === 'neutral' && <Minus className="h-4 w-4" />}
              {item.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
