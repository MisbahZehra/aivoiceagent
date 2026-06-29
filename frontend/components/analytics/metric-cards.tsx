'use client';

import type { AnalyticsMetric } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface MetricCardsProps {
  metrics: AnalyticsMetric[];
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{metric.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-3xl font-semibold text-slate-900">{metric.value}</h3>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-sm font-medium',
                metric.trend === 'up' && 'text-emerald-600',
                metric.trend === 'down' && 'text-sky-600',
                metric.trend === 'neutral' && 'text-slate-500',
              )}
            >
              {metric.trend === 'up' && <ArrowUpRight className="h-4 w-4" />}
              {metric.trend === 'down' && <ArrowDownRight className="h-4 w-4" />}
              {metric.trend === 'neutral' && <Minus className="h-4 w-4" />}
              {metric.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
