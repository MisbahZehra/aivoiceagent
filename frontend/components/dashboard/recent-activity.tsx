'use client';

import type { ActivityItem } from '@/lib/types';
import { AlertCircle, Bot, PhoneCall } from 'lucide-react';

interface RecentActivityProps {
  items: ActivityItem[];
}

const iconMap = {
  call: PhoneCall,
  agent: Bot,
  alert: AlertCircle,
};

const statusStyles: Record<string, string> = {
  Live: 'bg-emerald-50 text-emerald-700',
  Reviewing: 'bg-amber-50 text-amber-700',
  Idle: 'bg-slate-100 text-slate-700',
  Resolved: 'bg-sky-50 text-sky-700',
};

export default function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Recent activity</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusStyles[item.status] ?? 'bg-white text-slate-700'
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
