'use client';

import type { ChartDataPoint } from '@/lib/types';

interface CallVolumeChartProps {
  data: ChartDataPoint[];
  title?: string;
  subtitle?: string;
}

export default function CallVolumeChart({
  data,
  title = 'Call volume',
  subtitle = 'Weekly activity',
}: CallVolumeChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{subtitle}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          Last {data.length} periods
        </span>
      </div>

      <div className="mt-6 flex h-64 items-end gap-3">
        {data.map((point) => {
          const height = Math.round((point.value / maxValue) * 100);
          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-slate-900 to-sky-400 transition-all duration-300"
                  style={{ height: `${height}%` }}
                  title={`${point.label}: ${point.value}`}
                />
              </div>
              <span className="text-xs font-medium text-slate-500">{point.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
