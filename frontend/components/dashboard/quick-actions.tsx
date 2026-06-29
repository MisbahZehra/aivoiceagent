'use client';

import Link from 'next/link';
import { BarChart3, Bot, Mic, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Quick actions</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">Launch workflows</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link href="/agents">
          <Button variant="outline" className="h-auto w-full justify-start gap-3 rounded-xl px-4 py-3">
            <Plus className="h-4 w-4" />
            Create new agent
          </Button>
        </Link>
        <Link href="/playground">
          <Button variant="outline" className="h-auto w-full justify-start gap-3 rounded-xl px-4 py-3">
            <Mic className="h-4 w-4" />
            Test voice stream
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="outline" className="h-auto w-full justify-start gap-3 rounded-xl px-4 py-3">
            <BarChart3 className="h-4 w-4" />
            View analytics
          </Button>
        </Link>
        <Link href="/agents">
          <Button variant="outline" className="h-auto w-full justify-start gap-3 rounded-xl px-4 py-3">
            <Bot className="h-4 w-4" />
            Manage agents
          </Button>
        </Link>
      </div>
    </section>
  );
}
