'use client';

import type { ChartDataPoint } from '@/lib/types';

interface SatisfactionChartProps {
  data: ChartDataPoint[];
}

export default function SatisfactionChart({ data }: SatisfactionChartProps) {
  const maxValue = 5;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm text-slate-500">Customer satisfaction</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-900">Weekly CSAT trend</h3>
      </div>

      <div className="mt-6 flex h-56 items-end gap-3">
        {data.map((point) => {
          const height = Math.round((point.value / maxValue) * 100);
          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-slate-500">{point.value.toFixed(1)}</span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-600 to-emerald-300"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{point.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
