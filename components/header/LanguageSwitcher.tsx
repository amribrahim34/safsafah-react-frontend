'use client';

import { useEffect, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  getOppositeLocale } from '@/lib/locale-navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const oppositeLang = getOppositeLocale(lang);
  const oppositeUrl = `/${oppositeLang}`;

  useEffect(() => {
    router.prefetch(oppositeUrl);
  }, [router, oppositeUrl]);

  const handleToggleLang = () => {
    startTransition(() => {
      router.push(oppositeUrl);
    });
  };

  return (
    <button
      onClick={handleToggleLang}
      disabled={isPending}
      className={`text-sm font-semibold px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors whitespace-nowrap ${isPending ? 'opacity-50 cursor-wait' : ''} ${className}`}
    >
      {lang === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
