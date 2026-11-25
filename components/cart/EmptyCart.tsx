'use client';

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getFixedT } from "@/lib/i18n-helpers";

interface EmptyCartProps {
  brand: { primary: string };
}

export default function EmptyCart({ brand }: EmptyCartProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const t = getFixedT(lang, 'cart');

  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 p-8 text-center bg-white">
      <div className="text-2xl font-black mb-2">🛍️</div>
      <div className="text-lg font-semibold">{t('empty_title')}</div>
      <div className="text-neutral-600 mt-1">{t('empty_description')}</div>
      <Link
        href={`/${lang}/catalog`}
        className="inline-block mt-4 px-5 py-3 rounded-2xl text-white font-semibold"
        style={{ background: brand.primary }}
      >
        {t('shop_now')}
      </Link>
    </div>
  );
}
