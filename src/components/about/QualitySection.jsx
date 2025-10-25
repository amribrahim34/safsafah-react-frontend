import React from "react";
import { IMG } from "../../content/images";
import { ClipboardCheck, Thermometer, Boxes, Microscope } from "lucide-react";

export default function QualitySection({ brand, lang="ar" }) {
  const isRTL = lang === "ar";
  const cards = [
    {
      icon: ClipboardCheck,
      img: IMG.cleanser,
      ar: { title: "التحقق من المصدر", desc: "فحص الوثائق واعتماد الموردين وفق معايير أصالة واضحة." },
      en: { title: "Source Verification", desc: "Document checks and vetted suppliers against authenticity standards." },
    },
    {
      icon: Microscope,
      img: IMG.cream,
      ar: { title: "اختبارات السلامة والاستقرار", desc: "مراجعة التركيب واختبارات استقرار/ملاءمة الاستخدام." },
      en: { title: "Safety & Stability", desc: "Formula review with stability and suitability checks." },
    },
    {
      icon: Thermometer,
      img: IMG.bannerTall,
      ar: { title: "تخزين مضبوط", desc: "إدارة درجة الحرارة والرطوبة وفق متطلبات المنتج." },
      en: { title: "Controlled Storage", desc: "Temperature and humidity aligned with product requirements." },
    },
    {
      icon: Boxes,
      img: IMG.hero1,
      ar: { title: "تتبّع الدُفعات", desc: "تتبّع المنتجات من الاستلام حتى خدمة ما بعد البيع." },
      en: { title: "Batch Traceability", desc: "Trace products from intake to after-sales care." },
    },
  ];

  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">
        {isRTL ? "معايير الجودة" : "Quality Standards"}
      </h3>
      <div className="grid md:grid-cols-4 gap-3">
        {cards.map((c, i) => (
          <article key={i} className="rounded-2xl overflow-hidden border bg-white">
            <div className="h-40 md:h-48">
              <img src={c.img} alt={isRTL ? c.ar.title : c.en.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <c.icon className="w-5 h-5" style={{ color: brand.primary }} />
              <div className="mt-2 text-sm font-bold">{isRTL ? c.ar.title : c.en.title}</div>
              <p className="text-sm text-neutral-700 mt-1">
                {isRTL ? c.ar.desc : c.en.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
