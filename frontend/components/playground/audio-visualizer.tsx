'use client';

import usePlaygroundStore from '@/lib/playground-store';
import { cn } from '@/lib/utils';

export default function AudioVisualizer() {
  const audioLevel = usePlaygroundStore((state) => state.audioLevel);
  const isConnected = usePlaygroundStore((state) => state.isConnected);
  const isMuted = usePlaygroundStore((state) => state.isMuted);

  const bars = Array.from({ length: 24 }, (_, index) => {
    const wave = Math.sin((index + audioLevel) * 0.45) * 0.5 + 0.5;
    const height = isConnected && !isMuted ? 20 + wave * audioLevel : 12;
    return height;
  });

  return (
    <div className="mt-8 flex h-72 flex-col items-center justify-center rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_40%)]">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-sky-500/15 ring-8 ring-sky-400/20">
        <div
          className={cn(
            'rounded-full bg-sky-500 transition-all duration-150',
            isConnected ? 'animate-pulse' : '',
          )}
          style={{
            width: `${isConnected ? 72 + audioLevel * 0.2 : 72}px`,
            height: `${isConnected ? 72 + audioLevel * 0.2 : 72}px`,
          }}
        />
      </div>

      <div className="mt-8 flex h-16 items-end gap-1 px-8">
        {bars.map((height, index) => (
          <div
            key={index}
            className={cn(
              'w-2 rounded-full transition-all duration-150',
              isConnected && !isMuted ? 'bg-sky-400' : 'bg-slate-700',
            )}
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {isMuted ? 'Microphone muted' : isConnected ? 'Streaming audio input' : 'Waiting to connect'}
      </p>
    </div>
  );
}
