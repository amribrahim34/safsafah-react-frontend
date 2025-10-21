import React from "react";
import DeliveryETA from "../product_details/DeliveryETA";

export default function OrderSummary({ lang, brand, fmt, subtotal, discount, shipping, total }) {
  return (
    <div className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="font-bold text-lg mb-3">
        {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
      </div>

      <div className="space-y-2 text-sm">
        <Row label={lang === "ar" ? "المجموع الفرعي" : "Subtotal"} value={fmt(subtotal)} />
        {discount > 0 && (
          <Row label={lang === "ar" ? "خصم" : "Discount"} value={`– ${fmt(discount)}`} />
        )}
        <Row label={lang === "ar" ? "الشحن" : "Shipping"} value={shipping === 0 ? (lang === "ar" ? "مجاني" : "Free") : fmt(shipping)} />
        <div className="h-px bg-neutral-200 my-2" />
        <Row bold label={lang === "ar" ? "الإجمالي" : "Total"} value={fmt(total)} />
      </div>

      <div className="mt-4">
        <button className="w-full px-5 py-3 rounded-2xl text-white font-semibold" style={{ background: brand.primary }}>
          {lang === "ar" ? "إتمام الشراء" : "Checkout"}
        </button>
        <div className="text-xs text-neutral-500 mt-2">
          {lang === "ar" ? "الدفع عند الاستلام متاح • إرجاع مجاني خلال 14 يوم" : "Cash on delivery available • Free returns within 14 days"}
        </div>
      </div>

      <div className="mt-4">
        <DeliveryETA brand={brand} lang={lang} />
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-extrabold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
