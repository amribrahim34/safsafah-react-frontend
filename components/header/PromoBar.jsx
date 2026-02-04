'use client';

import { useLocale, useLocaleRouter, getOppositeLocale } from '@/lib/locale-navigation';

export default function PromoBar({ text, brand }) {
  const lang = useLocale();
  const { switchLocale } = useLocaleRouter();
  
  const handleToggleLang = () => {
    const newLocale = getOppositeLocale(lang);
    switchLocale(newLocale);
  };

  return (
    <div className="w-full text-white text-sm" style={{ background: brand.dark }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <span className="opacity-95">{text}</span>
        <button onClick={handleToggleLang} className="hover:opacity-90 font-medium">
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </div>
  );
}
