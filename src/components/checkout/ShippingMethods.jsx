import React from "react";

export default function ShippingMethods({ lang, brand, value, onChange, subtotal }) {
  const free = subtotal >= 500;
  const methods = [
    { id: "standard", labelAr: "عادي (2-3 أيام)", labelEn: "Standard (2-3 days)", cost: free ? 0 : 49, noteAr: free ? "مجاني فوق 500 جنيه" : "49 جنيه", noteEn: free ? "Free over 500 EGP" : "49 EGP" },
    { id: "express",  labelAr: "إكسبريس (1-2 يوم)", labelEn: "Express (1-2 days)", cost: 79,  noteAr: "79 جنيه", noteEn: "79 EGP" },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">{lang === "ar" ? "الشحن" : "Shipping"}</div>
      <div className="grid gap-2">
        {methods.map((m) => (
          <label key={m.id} className="rounded-2xl border border-neutral-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="ship"
                checked={value.id === m.id}
                onChange={() => onChange(m)}
              />
              <div className="font-semibold">{lang === "ar" ? m.labelAr : m.labelEn}</div>
            </div>
            <div className="text-sm text-neutral-600">
              {lang === "ar" ? m.noteAr : m.noteEn}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
