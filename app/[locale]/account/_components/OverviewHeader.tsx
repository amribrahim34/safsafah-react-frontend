'use client';

import { useRef } from 'react';
import { Camera, ShoppingBag, Heart, Gift, LucideIcon } from 'lucide-react';
import type { User } from '@/types/models/user';
import type { BrandConfig, OverviewHeaderTranslations } from './_types';

interface OverviewHeaderProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  user: User;
  t: OverviewHeaderTranslations;
}

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  href: string;
  brand: BrandConfig;
}

const first = (n: string) => (n || '').split(' ')[0];
const initials = (n: string) =>
  (n || '')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function QuickAction({ icon: Icon, label, href, brand }: QuickActionProps) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-neutral-200 bg-white px-3 py-2 flex items-center gap-2 hover:shadow-sm"
    >
      <Icon className="w-4 h-4" style={{ color: brand.primary }} />
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}

export default function OverviewHeader({ brand, lang, user, t }: OverviewHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const greeting = t.greeting.replace('{{name}}', first(user?.name || ''));

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-neutral-300 bg-white flex items-center justify-center text-lg font-bold">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            initials(user?.name || '')
          )}
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white border shadow"
            title={t.upload}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={() => {}} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-lg md:text-xl font-extrabold">{greeting}</div>
          {user?.email && (
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="text-neutral-600">{user.email}</span>
            </div>
          )}
        </div>

        <div className="hidden md:grid grid-cols-3 gap-2">
          <QuickAction icon={ShoppingBag} label={t.orders} href="/orders" brand={brand} />
          <QuickAction icon={Heart} label={t.wishlist} href="/wishlist" brand={brand} />
          <QuickAction icon={Gift} label={t.rewards} href="#rewards" brand={brand} />
        </div>
      </div>
    </section>
  );
}
