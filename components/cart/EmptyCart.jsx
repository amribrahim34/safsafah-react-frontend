import React from "react";

export default function EmptyCart({ lang, brand }) {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 p-8 text-center bg-white">
      <div className="text-2xl font-black mb-2">🛍️</div>
      <div className="text-lg font-semibold">
        {lang === "ar" ? "سلتك فارغة" : "Your bag is empty"}
      </div>
      <div className="text-neutral-600 mt-1">
        {lang === "ar" ? "ابدأ التسوق لإضافة منتجاتك المفضلة." : "Start shopping to add your favorites."}
      </div>
      <a
        href="/catalog"
        className="inline-block mt-4 px-5 py-3 rounded-2xl text-white font-semibold"
        style={{ background: brand.primary }}
      >
        {lang === "ar" ? "تسوق الآن" : "Shop now"}
      </a>
    </div>
  );
}
