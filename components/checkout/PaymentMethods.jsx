import React from "react";

export default function PaymentMethodsLite({ lang, brand, value, onChange }) {
  const opt = [
    { id: "cod",    ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
    { id: "card",   ar: "بطاقة (Visa/Mastercard)", en: "Card (Visa/Mastercard)" },
    { id: "wallet", ar: "محفظة موبايل", en: "Mobile wallet" },
  ];
  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">{lang === "ar" ? "طريقة الدفع" : "Payment method"}</div>
      <div className="grid gap-2">
        {opt.map((o) => (
          <label key={o.id} className="rounded-2xl border border-neutral-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="pay"
                checked={value === o.id}
                onChange={() => onChange(o.id)}
              />
              <div className="font-semibold">{lang === "ar" ? o.ar : o.en}</div>
            </div>
            {o.id === "cod" && (
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: brand.light + "22", color: brand.dark }}>
                {lang === "ar" ? "الأسرع" : "Fastest"}
              </span>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}
