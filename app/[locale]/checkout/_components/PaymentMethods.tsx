import '@/lib/i18n';
import React from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/types/models/common";
import { BrandColors } from "@/types/models/brand";

type PaymentMethod = "cod" | "card" | "wallet";

interface PaymentMethodsProps {
  lang: Language;
  brand: BrandColors;
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export default function PaymentMethodsLite({ lang, brand, value, onChange }: PaymentMethodsProps) {
  const { t } = useTranslation('checkout');

  const options: { id: PaymentMethod; label: string }[] = [
    { id: "cod",    label: t('payment.cod') },
    { id: "card",   label: t('payment.card') },
    { id: "wallet", label: t('payment.wallet') },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">{t('payment.title')}</div>
      <div className="grid gap-2">
        {options.map((o) => (
          <label key={o.id} className="rounded-2xl border border-neutral-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="pay"
                checked={value === o.id}
                onChange={() => onChange(o.id)}
              />
              <div className="font-semibold">{o.label}</div>
            </div>
            {o.id === "cod" && (
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: brand.light + "22", color: brand.dark }}>
                {t('payment.fastest')}
              </span>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}
