import React from "react";

export default function CartItem({ lang, brand, item, onQty, onRemove }) {
  const priceFmt = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format;

  return (
    <div className="rounded-2xl border border-neutral-200 p-3 flex gap-3">
      <div className="w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0">
        <img src={item.img} alt={lang === "ar" ? item.name.ar : item.name.en} className="w-full h-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold truncate">
              {lang === "ar" ? item.name.ar : item.name.en}
            </div>
            <div className="text-xs text-neutral-600">{item.brand} · {item.variant}</div>
            <div className="text-xs text-neutral-500 mt-1">
              {lang === "ar" ? `متاح: ${item.stock}` : `In stock: ${item.stock}`}
            </div>
          </div>
          <div className="text-sm font-extrabold whitespace-nowrap">
            {priceFmt(item.price * item.qty)}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center border rounded-xl overflow-hidden">
            <button className="px-3 py-2" onClick={() => onQty(item.qty - 1)} aria-label="decrease">–</button>
            <div className="px-3 py-2 min-w-[36px] text-center">{item.qty}</div>
            <button className="px-3 py-2" onClick={() => onQty(item.qty + 1)} aria-label="increase">+</button>
          </div>

          <button
            onClick={onRemove}
            className="text-sm underline text-neutral-700"
            type="button"
          >
            {lang === "ar" ? "إزالة" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
