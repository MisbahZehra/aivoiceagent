'use client';

import { Mic, MicOff, PhoneOff, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CallControlsProps {
  isConnected: boolean;
  isMuted: boolean;
  onStart: () => void;
  onEnd: () => void;
  onToggleMute: () => void;
}

export default function CallControls({
  isConnected,
  isMuted,
  onStart,
  onEnd,
  onToggleMute,
}: CallControlsProps) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">
        {!isConnected ? (
          <Button onClick={onStart} className="gap-2 rounded-xl">
            <Play className="h-4 w-4" />
            Start call
          </Button>
        ) : (
          <>
            <Button
              onClick={onToggleMute}
              variant={isMuted ? 'default' : 'outline'}
              className={`gap-2 rounded-xl ${isMuted ? 'bg-rose-500 hover:bg-rose-600' : ''}`}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button onClick={onEnd} variant="outline" className="gap-2 rounded-xl">
              <PhoneOff className="h-4 w-4" />
              End call
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
