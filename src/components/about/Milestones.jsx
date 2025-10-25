import React from "react";

export default function Milestones({ brand, lang="ar" }) {
  const isRTL = lang === "ar";
  const items = [
    { year: "2023", ar:"انطلاق SAFSAFAH بفريق صغير ورؤية كبيرة.", en:"SAFSAFAH launches—small team, big vision." },
    { year: "2024", ar:"اعتماد معايير الأصالة ومراقبة الجودة.", en:"Authenticity & QC standards formalized." },
    { year: "2025", ar:"توسّع الشحن وخيارات الدفع والمحفظة.", en:"Expanded shipping, payment, and wallet options." },
  ];
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">
        {isRTL ? "محطات الطريق" : "Milestones"}
      </h3>
      <div className="relative rounded-3xl border border-neutral-200 p-5 bg-white">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-neutral-200" />
        <ul className="space-y-5">
          {items.map((m, i) => (
            <li key={i} className="relative ps-12">
              <span className="absolute left-4 md:left-6 top-1.5 block w-3 h-3 rounded-full" style={{ background: brand.primary }} />
              <div className="text-xs uppercase tracking-wide text-neutral-500">{m.year}</div>
              <div className="text-sm md:text-base font-semibold mt-0.5">
                {isRTL ? m.ar : m.en}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
