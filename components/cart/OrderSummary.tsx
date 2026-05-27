'use client';
import React from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import DeliveryETA from "../product_details/DeliveryETA";

interface OrderSummaryProps {
  brand: { primary: string };
  fmt: (n: number) => string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onCheckout?: () => void;
  checkoutButton?: React.ReactNode;
}

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
}

export default function OrderSummary({ brand, fmt, subtotal, discount, shipping, total, onCheckout, checkoutButton }: OrderSummaryProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('cart');
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  return (
    <div className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="font-bold text-lg mb-3">{t('order_summary')}</div>

      <div className="space-y-2 text-sm">
        <Row label={t('subtotal')} value={fmt(subtotal)} />
        {discount > 0 && (
          <Row label={t('discount')} value={`– ${fmt(discount)}`} />
        )}
        <Row label={t('shipping')} value={shipping === 0 ? t('free') : fmt(shipping)} />
        <div className="h-px bg-neutral-200 my-2" />
        <Row bold label={t('total')} value={fmt(total)} />
      </div>

      {checkoutButton && (
        <div className="mt-4">
          {checkoutButton}
        </div>
      )}

      {onCheckout && !checkoutButton && (
        <div className="mt-4">
          <button onClick={onCheckout} className="w-full px-5 py-3 rounded-2xl text-white font-semibold" style={{ background: brand.primary }}>
            {t('checkout')}
          </button>
          <div className="text-xs text-neutral-500 mt-2">
            {t('payment_info')}
          </div>
        </div>
      )}

      <div className="mt-4">
        <DeliveryETA brand={brand} lang={lang} />
      </div>
    </div>
  );
}

function Row({ label, value, bold }: RowProps) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-extrabold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
