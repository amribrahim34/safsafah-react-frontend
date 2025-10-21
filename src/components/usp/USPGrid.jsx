import { Truck, ShieldCheck, Leaf, Globe } from "lucide-react";

export default function USPGrid({ brand, lang, copy }) {
  const items = copy.usps || [
    { icon: Truck, title: lang==="ar"?"توصيل في نفس/اليوم التالي":"Same/Next-day delivery", desc: lang==="ar"?"القاهرة والجيزة وجميع المحافظات.":"Cairo, Giza & nationwide." },
    { icon: ShieldCheck, title: lang==="ar"?"أصلي 100%":"100% authentic", desc: lang==="ar"?"مختوم ومضمون التتبّع.":"Sealed & traceable." },
    { icon: Leaf, title: lang==="ar"?"لطيف على البشرة":"Skin-kind", desc: lang==="ar"?"مختبر وخالٍ من القسوة.":"Derm-tested, cruelty-free." },
    { icon: Globe, title: lang==="ar"?"دعم ثنائي اللغة":"Bilingual support", desc: lang==="ar"?"العربية والإنجليزية.":"Arabic & English." },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((u, i) => (
        <div key={i} className="rounded-2xl bg-white border border-neutral-200 p-3 shadow-sm flex items-start gap-3">
          <u.icon className="w-5 h-5" style={{ color: brand.primary }} />
          <div>
            <div className="font-semibold text-sm">{u.title}</div>
            <div className="text-xs text-neutral-600 leading-snug">{u.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
