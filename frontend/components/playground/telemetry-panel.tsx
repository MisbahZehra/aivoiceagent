'use client';

import { useState, useEffect } from 'react';
import usePlaygroundStore from '@/lib/playground-store';
import { cn } from '@/lib/utils';

const statusStyles = {
  good: 'text-emerald-700 bg-emerald-50',
  warning: 'text-amber-700 bg-amber-50',
  critical: 'text-rose-700 bg-rose-50',
};

export default function TelemetryPanel() {
  const telemetry = usePlaygroundStore((state) => state.telemetry);
  const [isMounted, setIsMounted] = useState(false);

  // Yeh check ensure karega ke dynamic real-time data sirf browser par render ho
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
        <p className="text-sm text-slate-500">Loading telemetry...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Streaming telemetry</p>
      <div className="mt-4 space-y-3">
        {telemetry.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <span className="text-sm text-slate-500">{item.label}</span>
            <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', statusStyles[item.status])}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
