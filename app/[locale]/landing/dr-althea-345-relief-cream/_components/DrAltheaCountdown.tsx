'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface DrAltheaCountdownProps {
  lang: string;
}

function getSecondsUntilEndOfDay(): number {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
  return diff > 0 ? diff : 0;
}

export const DrAltheaCountdown: React.FC<DrAltheaCountdownProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    setSecondsLeft(getSecondsUntilEndOfDay());
    const timer = setInterval(() => {
      setSecondsLeft(getSecondsUntilEndOfDay());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (secondsLeft === null) {
    return (
      <div className="mt-3 pt-3 border-t border-teal-100/80 flex items-center justify-between gap-2 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5 font-semibold text-red-600">
          <Clock className="w-3.5 h-3.5" />
          {isAr ? 'ينتهي عرض الخصم 10٪ اليوم خلال:' : '10% Flash Offer Ends Today In:'}
        </span>
        <span className="font-mono font-bold text-neutral-700">--:--:--</span>
      </div>
    );
  }

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mt-3 pt-3 border-t border-teal-100/80 flex items-center justify-between gap-2 flex-wrap">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        <span>
          {isAr ? 'ينتهي عرض الخصم 10٪ خلال:' : '10% Flash Offer Ends In:'}
        </span>
      </div>

      <div className="flex items-center gap-1.5 tabular-nums" dir="ltr">
        <div className="px-2 py-1 rounded-lg bg-neutral-900 text-white text-xs font-extrabold min-w-[32px] text-center">
          {pad(hours)}
        </div>
        <span className="text-neutral-400 font-bold text-xs">:</span>
        <div className="px-2 py-1 rounded-lg bg-neutral-900 text-white text-xs font-extrabold min-w-[32px] text-center">
          {pad(minutes)}
        </div>
        <span className="text-neutral-400 font-bold text-xs">:</span>
        <div className="px-2 py-1 rounded-lg bg-red-600 text-white text-xs font-extrabold min-w-[32px] text-center">
          {pad(seconds)}
        </div>
      </div>
    </div>
  );
};

export default DrAltheaCountdown;
