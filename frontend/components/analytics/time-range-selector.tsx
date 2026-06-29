'use client';

import useAnalyticsStore from '@/lib/analytics-store';
import type { AnalyticsRange } from '@/lib/types';
import { cn } from '@/lib/utils';

const ranges: { label: string; value: AnalyticsRange }[] = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: '90 days', value: '90d' },
];

export default function TimeRangeSelector() {
  const timeRange = useAnalyticsStore((state) => state.timeRange);
  const setTimeRange = useAnalyticsStore((state) => state.setTimeRange);

  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          type="button"
          onClick={() => setTimeRange(range.value)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition',
            timeRange === range.value
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-900',
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
