'use client';

import { useState, useEffect } from 'react';
import usePlaygroundStore from '@/lib/playground-store';
import { ShieldCheck } from 'lucide-react';

export default function TranscriptPanel() {
  const transcript = usePlaygroundStore((state) => state.transcript);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only formats time after mounting on the browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatTime = (timestamp: string) => {
    if (!isMounted) return '--:--:--';
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <p className="text-sm font-medium text-slate-900">Conversation transcript</p>
      </div>
      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto">
        {transcript.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No transcription yet. Start speaking...</p>
        ) : (
          transcript.map((entry) => (
            <div key={entry.id} className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{entry.speaker}</p>
                <p className="text-xs text-slate-400">{formatTime(entry.timestamp)}</p>
              </div>
              <p className="mt-1 text-sm text-slate-700">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
