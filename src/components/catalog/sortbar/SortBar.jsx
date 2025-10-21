import React from "react";

export default function SortBar({ lang, sort, onChange, brand }) {
  const t = {
    sort: lang === "ar" ? "ترتيب" : "Sort",
    relevance: lang === "ar" ? "الصلة" : "Relevance",
    priceAsc: lang === "ar" ? "السعر ↑" : "Price ↑",
    priceDesc: lang === "ar" ? "السعر ↓" : "Price ↓",
    rating: lang === "ar" ? "التقييم" : "Rating",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-600">{t.sort}</span>
      <select
        value={sort}
        onChange={e => onChange(e.target.value)}
        className="rounded-xl border border-neutral-300 px-3 py-2"
        style={{ outlineColor: brand.primary }}
      >
        <option value="relevance">{t.relevance}</option>
        <option value="priceAsc">{t.priceAsc}</option>
        <option value="priceDesc">{t.priceDesc}</option>
        <option value="rating">{t.rating}</option>
      </select>
    </div>
  );
}
