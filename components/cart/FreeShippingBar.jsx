import React from "react";

export default function FreeShippingBar({ brand, lang, subtotal, target = 500 }) {
  const pct = Math.max(0, Math.min(1, subtotal / target));
  const left = Math.max(0, target - subtotal);
  const msg =
    subtotal >= target
      ? lang === "ar" ? "أنت مؤهل للشحن المجاني 🎉" : "You’ve unlocked free shipping 🎉"
      : lang === "ar"
        ? `متبقي ${left} جنيه للشحن المجاني`
        : `${left} EGP left for free shipping`;

  return (
    <div className="rounded-2xl border border-neutral-200 p-3 mb-4 bg-white">
      <div className="text-sm mb-2">{msg}</div>
      <div className="h-2 rounded bg-neutral-100 overflow-hidden">
        <div className="h-full" style={{ width: `${pct * 100}%`, background: brand.primary }} />
      </div>
    </div>
  );
}
