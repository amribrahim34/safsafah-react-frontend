import React from "react";
import { ShieldCheck, Truck, Leaf } from "lucide-react";

export default function TrustBadges({ brand, lang }){
  const Item = ({icon:Icon, title, sub}) => (
    <div className="rounded-2xl border border-neutral-200 p-3 text-sm bg-white">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" style={{color:brand.primary}} />
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-neutral-600 mt-1">{sub}</div>
    </div>
  );
  return (
    <div className="grid grid-cols-3 gap-3">
      <Item icon={ShieldCheck} title={lang==="ar"?"أصلي 100%":"100% authentic"} sub={lang==="ar"?"شراء آمن وعبوة مختومة":"Secure checkout & sealed"} />
      <Item icon={Truck} title={lang==="ar"?"توصيل سريع":"Fast delivery"} sub={lang==="ar"?"القاهرة والجيزة خلال 24‑48 ساعة":"Cairo & Giza in 24‑48h"} />
      <Item icon={Leaf} title={lang==="ar"?"لطيف على البشرة":"Skin‑kind"} sub={lang==="ar"?"مختبر وخالٍ من القسوة":"Derm‑tested & cruelty‑free"} />
    </div>
  );
}
