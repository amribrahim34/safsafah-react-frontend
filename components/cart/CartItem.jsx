'use client';

import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CartItem({ lang, brand, item, onQty, onRemove }) {
  const [busy, setBusy] = useState(false);

  const primary = brand?.primary ?? "#288880";
  const isAr = lang === "ar";
  const isAtMin = item.qty <= 1;

  const fmt = new Intl.NumberFormat(isAr ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format;

  const withBusy = (fn) => async () => {
    if (busy) return;
    setBusy(true);
    try { await fn(); }
    finally { setBusy(false); }
  };

  const handleDecrease = withBusy(() =>
    isAtMin ? onRemove?.() : onQty?.(item.qty - 1)
  );

  const handleIncrease = withBusy(() => onQty?.(item.qty + 1));

  return (
    <div
      className="rounded-2xl border border-neutral-200 p-3 flex gap-3 bg-white transition-opacity duration-200"
      style={{ opacity: busy ? 0.55 : 1 }}
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden border border-neutral-100 flex-shrink-0 bg-neutral-50">
        <img
          src={item.img}
          alt={isAr ? item.name.ar : item.name.en}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-sm leading-snug truncate">
              {isAr ? item.name.ar : item.name.en}
            </div>
            {item.brand && (
              <div className="text-xs text-neutral-500 mt-0.5">
                {item.brand}{item.variant ? ` · ${item.variant}` : ""}
              </div>
            )}
          </div>
          <div className="text-sm font-extrabold whitespace-nowrap text-neutral-900">
            {fmt(item.price * item.qty)}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={busy}
              onClick={handleDecrease}
              aria-label={isAtMin ? (isAr ? "إزالة" : "Remove") : (isAr ? "تقليل الكمية" : "Decrease quantity")}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
              onMouseEnter={(e) => { if (!busy) e.currentTarget.style.backgroundColor = "#fecaca"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; }}
            >
              {isAtMin
                ? <Trash2 size={14} strokeWidth={2.5} />
                : <span className="text-base font-bold leading-none select-none">−</span>
              }
            </button>

            <div className="w-8 h-8 flex items-center justify-center text-sm font-bold select-none tabular-nums">
              {item.qty}
            </div>

            <button
              type="button"
              disabled={busy}
              onClick={handleIncrease}
              aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed"
              style={{ backgroundColor: primary }}
              onMouseEnter={(e) => { if (!busy) e.currentTarget.style.filter = "brightness(0.88)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = ""; }}
            >
              <span className="text-base font-bold leading-none select-none">+</span>
            </button>
          </div>

          <span className="text-xs text-neutral-400">
            {fmt(item.price)} {isAr ? "/ قطعة" : "/ each"}
          </span>
        </div>
      </div>
    </div>
  );
}
