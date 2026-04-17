import React from "react";
import { Eye, BadgeCheck, Handshake, Gauge, Landmark, ListChecks } from "lucide-react";

export default function ValuesGrid({ brand }) {
  const values = [
    { icon: Eye,       title: "الشفافية",       desc: "عرض معلومات دقيقة عن المصدر، والسعر، وتفاصيل المنتج دون مبالغة." },
    { icon: BadgeCheck,title: "الاعتمادية",     desc: "الشراء من موردين موثوقين مع فحص أولي للعبوة وتواريخ الصلاحية." },
    { icon: Handshake, title: "احترام العميل",  desc: "خدمة واضحة ومهذّبة، ومتابعة لما بعد الشراء عند الحاجة." },
    { icon: Gauge,     title: "سهولة التجربة",   desc: "واجهة بسيطة، وخيارات دفع مناسبة، وخطوات شراء مختصرة." },
    { icon: Landmark,  title: "التزام بالقانون", desc: "الالتزام بسياسات البيع والمرتجعات المعمول بها داخل مصر." },
    { icon: ListChecks,title: "تحسين مستمر",     desc: "الاستماع لآراء العملاء وتحسين الاختيارات والخدمة باستمرار." },
  ];
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">قيمنا</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {values.map((v, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
            <v.icon className="w-6 h-6" style={{ color: brand.primary }} />
            <div className="mt-2 text-base font-bold">{v.title}</div>
            <p className="text-sm text-neutral-700 mt-1">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
