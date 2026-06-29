'use client';

import usePlaygroundStore from '@/lib/playground-store';
import { cn } from '@/lib/utils';

export default function LatencyIndicator() {
  const latency = usePlaygroundStore((state) => state.latency);
  const latencyHistory = usePlaygroundStore((state) => state.latencyHistory);
  const isConnected = usePlaygroundStore((state) => state.isConnected);

  const status =
    latency <= 50 ? 'excellent' : latency <= 100 ? 'good' : latency <= 200 ? 'fair' : 'poor';

  const statusStyles = {
    excellent: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    good: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
    fair: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    poor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm',
          isConnected ? statusStyles[status] : 'border-slate-700 bg-slate-800 text-slate-300',
        )}
      >
        <span className="relative flex h-2 w-2">
          {isConnected && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
        {isConnected ? `${latency} ms latency` : 'Latency idle'}
      </div>

      {latencyHistory.length > 0 && (
        <div className="flex h-12 items-end gap-1">
          {latencyHistory.map((value, index) => {
            const height = Math.min(100, Math.max(8, (value / 200) * 100));
            return (
              <div
                key={`${value}-${index}`}
                className="flex-1 rounded-t bg-sky-400/70"
                style={{ height: `${height}%` }}
                title={`${value} ms`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
