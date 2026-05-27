'use client';

import React from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';

interface FreeShippingBarProps {
  brand: { primary: string };
  subtotal: number;
  target?: number;
}

export default function FreeShippingBar({ brand, subtotal, target = 500 }: FreeShippingBarProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('cart');
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  const pct = Math.max(0, Math.min(1, subtotal / target));
  const left = Math.max(0, target - subtotal);
  const msg = subtotal >= target
    ? t('free_shipping_unlocked')
    : t('free_shipping_remaining', { left });

  return (
    <div className="rounded-2xl border border-neutral-200 p-3 mb-4 bg-white">
      <div className="text-sm mb-2">{msg}</div>
      <div className="h-2 rounded bg-neutral-100 overflow-hidden">
        <div className="h-full" style={{ width: `${pct * 100}%`, background: brand.primary }} />
      </div>
    </div>
  );
}
