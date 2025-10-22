import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

export default function CartDropdown({ lang, brand, items = [], onClose }) {
  const ref = useRef(null);

  // close on outside / Esc
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose?.(); };
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const subtotal = useMemo(() => items.reduce((a, b) => a + (b.price || 0) * (b.qty || 1), 0), [items]);
  const fmt = (n) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0
    }).format(n);

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-[320px] rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden"
    >
      <div className="max-h-80 overflow-auto">
        {items.length === 0 ? (
          <div className="p-4 text-sm text-neutral-700">
            {lang === "ar" ? "سلتك فارغة" : "Your bag is empty"}
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((it) => (
              <li key={it.id} className="p-3 flex gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0">
                  <img src={it.img} alt={lang === "ar" ? it.name?.ar : it.name?.en} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">
                    {lang === "ar" ? it.name?.ar : it.name?.en}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {it.brand} {it.variant ? `· ${it.variant}` : ""}
                  </div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    ×{it.qty || 1}
                  </div>
                </div>
                <div className="text-sm font-semibold whitespace-nowrap">
                  {fmt((it.price || 0) * (it.qty || 1))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-neutral-200">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-neutral-600">{lang === "ar" ? "المجموع الفرعي" : "Subtotal"}</span>
          <span className="font-extrabold">{fmt(subtotal)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="px-3 py-2 rounded-xl text-center text-sm font-semibold border"
            style={{ borderColor: brand.primary, color: brand.primary }}
          >
            {lang === "ar" ? "عرض السلة" : "View cart"}
          </Link>
          <Link
            to="/checkout-quick"
            onClick={onClose}
            className="px-3 py-2 rounded-xl text-center text-sm font-semibold text-white"
            style={{ background: brand.primary }}
          >
            {lang === "ar" ? "إتمام الشراء" : "Checkout"}
          </Link>
        </div>
        <div className="text-[11px] text-neutral-500 mt-2">
          {lang === "ar" ? "شحن مجاني فوق 500 جنيه • دفع عند الاستلام" : "Free shipping over 500 EGP • COD available"}
        </div>
      </div>
    </div>
  );
}
