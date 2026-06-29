'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Bot,
  LayoutGrid,
  Menu,
  Mic,
  X,
} from 'lucide-react';
import useDashboardStore from '@/lib/store';
import type { ActiveView } from '@/lib/types';
import { cn } from '@/lib/utils';

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

export default function MobileNav() {
  const pathname = usePathname();
  const sidebarOpen = useDashboardStore((state) => state.sidebarOpen);
  const setSidebarOpen = useDashboardStore((state) => state.setSidebarOpen);
  const setActiveView = useDashboardStore((state) => state.setActiveView);

  return (
    <>
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-slate-900">VoicePilot</p>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-xl border border-slate-200 p-2 text-slate-600"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-8 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveView(viewMap[item.href]);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
