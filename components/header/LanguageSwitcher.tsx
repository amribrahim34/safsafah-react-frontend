'use client';

import { useLocale, useLocaleRouter, getOppositeLocale } from '@/lib/locale-navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const lang = useLocale();
  const { switchLocale } = useLocaleRouter();

  const handleToggleLang = () => {
    switchLocale(getOppositeLocale(lang));
  };

  return (
    <button
      onClick={handleToggleLang}
      className={`text-sm font-semibold px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors whitespace-nowrap ${className}`}
    >
      {lang === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
