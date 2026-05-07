import '@/lib/i18n';
import React from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/types/models/common";
import { BrandColors } from "@/types/models/brand";

interface MobileCheckoutButtonProps {
  lang: Language;
  brand: BrandColors;
  total: number;
  isDisabled: boolean;
  isSubmitting: boolean;
  isCreatingOrder: boolean;
  payment: "cod" | "card" | "wallet";
  onClick: () => void;
  fmt: (n: number) => string;
}

export default function MobileCheckoutButton({
  lang,
  brand,
  total,
  isDisabled,
  isSubmitting,
  isCreatingOrder,
  payment,
  onClick,
  fmt,
}: MobileCheckoutButtonProps) {
  const { t } = useTranslation('checkout');

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xs text-neutral-600">
            {t('summary.total')}
          </div>
          <div className="font-extrabold">{fmt(total)}</div>
        </div>
        <button
          onClick={onClick}
          disabled={isDisabled}
          className={`px-5 py-3 rounded-2xl text-white font-semibold ${
            isDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          style={{ background: brand.primary }}
        >
          {isSubmitting || isCreatingOrder
            ? t('button.processing')
            : payment === "wallet"
            ? t('button.walletPay')
            : t('button.checkout')}
        </button>
      </div>
    </div>
  );
}
