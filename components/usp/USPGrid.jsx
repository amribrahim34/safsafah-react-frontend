'use client';

import { Truck, ShieldCheck, Leaf, Globe } from "lucide-react";
import { useLocale } from "@/lib/locale-navigation";
import { getFixedT } from "@/lib/i18n-helpers";

export default function USPGrid({ brand, lang: propLang }) {
  const routeLang = useLocale();
  const t = getFixedT(propLang || routeLang, 'home');

  const items = [
    { icon: Truck, title: t('uspGrid.items.0.title'), desc: t('uspGrid.items.0.desc') },
    { icon: ShieldCheck, title: t('uspGrid.items.1.title'), desc: t('uspGrid.items.1.desc') },
    { icon: Leaf, title: t('uspGrid.items.2.title'), desc: t('uspGrid.items.2.desc') },
    { icon: Globe, title: t('uspGrid.items.3.title'), desc: t('uspGrid.items.3.desc') },
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
