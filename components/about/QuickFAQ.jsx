import React from "react";

export default function QuickFAQ({ brand, t }) {
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">{t.heading}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {t.items.map((x, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 bg-white">
            <div className="font-bold">{x.q}</div>
            <p className="text-sm text-neutral-700 mt-1">{x.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
