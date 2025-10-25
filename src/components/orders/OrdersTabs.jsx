import React from "react";

export default function OrdersTabs({ lang = "ar", brand, tab, setTab, counts }) {
  const isRTL = lang === "ar";
  const pills = [
    { id: "all",       ar: "الكل",           en: "All",             emoji: "🗂️", count: counts.all },
    { id: "progress",  ar: "قيد التنفيذ",    en: "In Progress",     emoji: "🟡", count: counts.progress },
    { id: "shipped",   ar: "تم الشحن",       en: "Shipped",         emoji: "🔵", count: counts.shipped },
    { id: "delivered", ar: "تم التسليم",    en: "Delivered",       emoji: "🟢", count: counts.delivered },
    { id: "canceled",  ar: "ملغاة/مُرجعة",  en: "Canceled/Return", emoji: "🔴", count: counts.canceled },
  ];

  return (
    <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
      <div className="inline-flex flex-nowrap gap-1 rounded-2xl border border-neutral-200 p-1 bg-neutral-50">
        {pills.map((p) => (
          <button
            key={p.id}
            onClick={() => setTab(p.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 whitespace-nowrap
                        ${tab === p.id ? "text-white" : "text-neutral-800"}
                        text-xs md:text-sm`}
            style={{ background: tab === p.id ? brand.primary : "transparent" }}
          >
            <span>{p.emoji}</span>
            <span>{isRTL ? p.ar : p.en}</span>
            <span className="text-[10px] md:text-xs opacity-80">({p.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
