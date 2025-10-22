import React from "react";

export default function ReviewItems({ lang, items }) {
  const priceFmt = (n) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">{lang === "ar" ? "مراجعة المنتجات" : "Review items"}</div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-neutral-200">
              <img src={it.img} alt={lang === "ar" ? it.name.ar : it.name.en} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{lang === "ar" ? it.name.ar : it.name.en}</div>
              <div className="text-xs text-neutral-600">{it.brand} · {it.variant}</div>
            </div>
            <div className="text-sm whitespace-nowrap">
              ×{it.qty} · <span className="font-semibold">{priceFmt(it.price * it.qty)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
