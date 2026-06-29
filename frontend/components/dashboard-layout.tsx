'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  BarChart3,
  Bot,
  LayoutGrid,
  Mic,
  Radio,
  Settings,
  Sparkles,
} from 'lucide-react';
import MobileNav from '@/components/mobile-nav';
import useDashboardStore from '@/lib/store';
import type { ActiveView } from '@/lib/types';

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutGrid },
  { label: 'Agents', href: '/agents', icon: Bot },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Playground', href: '/playground', icon: Mic },
];

const viewMap: Record<string, ActiveView> = {
  '/': 'dashboard',
  '/agents': 'agents',
  '/analytics': 'analytics',
  '/playground': 'playground',
};

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const setActiveView = useDashboardStore((state) => state.setActiveView);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white p-6 lg:sticky lg:top-0 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Workspace</p>
              <h2 className="text-base font-semibold text-slate-900">VoicePilot</h2>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveView(viewMap[item.href])}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Radio className="h-4 w-4" />
              Live stream status
            </div>
            <p className="mt-2 text-2xl font-semibold">94.6%</p>
            <p className="mt-1 text-sm text-slate-300">uptime this week</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5">
            <div className="flex items-center gap-3">
              <MobileNav />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dashboard</p>
                <h1 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 p-2 text-slate-600"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:flex">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-slate-700">Online</span>
              </div>
            </div>
          </header>
          {subtitle && <p className="mt-3 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
