import React from "react";

export default function PromoCode({ lang, brand, value, onChange, hint }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-white">
      <div className="text-sm font-semibold mb-2">
        {lang === "ar" ? "كود الخصم" : "Promo code"}
      </div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-2xl border border-neutral-300 px-3 py-2"
          placeholder={hint}
        />
        <button
          className="px-4 py-2 rounded-2xl text-white font-semibold"
          style={{ background: brand.primary }}
          type="button"
        >
          {lang === "ar" ? "تطبيق" : "Apply"}
        </button>
      </div>
      <div className="text-xs text-neutral-500 mt-1">
        {lang === "ar" ? "يمكن استخدام قسيمة واحدة لكل طلب." : "One coupon per order."}
      </div>
    </div>
  );
}
