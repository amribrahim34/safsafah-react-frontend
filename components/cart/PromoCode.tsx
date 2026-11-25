'use client';

import React from "react";
import { useLocale } from "@/lib/locale-navigation";
import { getFixedT } from "@/lib/i18n-helpers";

interface PromoCodeProps {
  brand: { primary: string };
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  onApply?: () => void;
}

export default function PromoCode({ brand, value, onChange, hint, onApply }: PromoCodeProps) {
  const lang = useLocale();
  const t = getFixedT(lang, 'cart');

  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-white">
      <div className="text-sm font-semibold mb-2">{t('promo_code')}</div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-2xl border border-neutral-300 px-3 py-2"
          placeholder={hint}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onApply) onApply();
          }}
        />
        <button
          className="px-4 py-2 rounded-2xl text-white font-semibold disabled:opacity-50"
          style={{ background: brand.primary }}
          type="button"
          onClick={onApply}
          disabled={!value.trim()}
        >
          {t('apply')}
        </button>
      </div>
      <div className="text-xs text-neutral-500 mt-1">{t('one_coupon')}</div>
    </div>
  );
}
