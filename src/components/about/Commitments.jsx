import React from "react";
import { ShieldCheck, Lock, Recycle, Users } from "lucide-react";

export default function Commitments({ brand, lang="ar" }) {
  const isRTL = lang === "ar";
  const items = [
    {
      icon: ShieldCheck,
      ar: { title: "الامتثال والشفافية", desc: "سياسات واضحة، شروط عادلة، وتحديث دوري للمعلومات." },
      en: { title: "Compliance & Transparency", desc: "Clear policies, fair terms, and regularly updated information." },
    },
    {
      icon: Lock,
      ar: { title: "الخصوصية وحماية البيانات", desc: "حماية معلومات العملاء وفق أفضل الممارسات الأمنية." },
      en: { title: "Privacy & Data Protection", desc: "Safeguarding customer data with best-practice security." },
    },
    {
      icon: Recycle,
      ar: { title: "أثر بيئي أقل", desc: "تحسين التغليف وتقليل الهدر في سلسلة الإمداد." },
      en: { title: "Lower Environmental Impact", desc: "Smarter packaging and reduced supply-chain waste." },
    },
    {
      icon: Users,
      ar: { title: "مسؤولية اجتماعية", desc: "شراكات محلية وفرص عادلة ضمن المنظومة." },
      en: { title: "Social Responsibility", desc: "Local partnerships and fair opportunities across our ecosystem." },
    },
  ];

  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">
        {isRTL ? "التزامات الحوكمة والمسؤولية" : "Governance & Responsibility Commitments"}
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((m, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
            <m.icon className="w-6 h-6" style={{ color: brand.primary }} />
            <div className="mt-2 text-base font-bold">{isRTL ? m.ar.title : m.en.title}</div>
            <p className="text-sm text-neutral-700 mt-1">{isRTL ? m.ar.desc : m.en.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
