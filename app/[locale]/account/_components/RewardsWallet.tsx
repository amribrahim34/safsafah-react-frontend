'use client';

import { Gift } from 'lucide-react';
import type { User } from '@/types/models/user';
import type { BrandConfig, RewardsTranslations } from './_types';

interface RewardsWalletProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  user: User | null;
  t: RewardsTranslations;
}

interface CardProps {
  title: string;
  value: string;
}

function Card({ title, value }: CardProps) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-3">
      <div className="text-xs text-neutral-600">{title}</div>
      <div className="text-lg font-black">{value}</div>
    </div>
  );
}

export default function RewardsWallet({ brand, user, t }: RewardsWalletProps) {
  const rate = 1;
  const balance = Number((user?.points ?? 0) * rate);
  const toNext = 0;

  return (
    <section id="rewards" className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="flex items-center gap-2 mb-2">
        <Gift className="w-5 h-5" style={{ color: brand.primary }} />
        <div className="text-lg font-extrabold">{t.title}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card title={t.points} value={`${user?.points ?? 0} ⭐`} />
        <Card title={t.balance} value={`${balance} EGP`} />
      </div>

      <div className="mt-3 text-sm">
        {t.toNext.replace('{{count}}', String(toNext))}
      </div>

      <button
        className="mt-3 w-full px-4 py-2 rounded-2xl text-white font-semibold"
        style={{ background: brand.primary }}
      >
        {t.redeem}
      </button>

      <div className="text-xs text-neutral-600 mt-2">{t.rate}</div>
    </section>
  );
}
