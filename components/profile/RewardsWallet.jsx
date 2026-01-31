import React from "react";
import { Gift, Coins } from "lucide-react";

export default function RewardsWallet({ brand, lang="ar", user }) {
  const isRTL = lang==="ar";
  const rate = 1; // 1 point = 1 EGP
  const balance = user?.points * rate;
  // const toNext = Math.max(0, user?.nextTierAt - user?.points);
  const toNext = 0;

  return (
    <section id="rewards" className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="flex items-center gap-2 mb-2">
        <Gift className="w-5 h-5" style={{color:brand.primary}} />
        <div className="text-lg font-extrabold">{isRTL?"المكافآت والنقاط":"Rewards & points"}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card title={isRTL?"نقاطك":"Your points"} value={`${user?.points} ⭐`} />
        <Card title={isRTL?"رصيد المحفظة (تقريبي)":"Wallet balance (approx.)"} value={`${balance} EGP`} />
      </div>

      <div className="mt-3 text-sm">
        {isRTL ? `متبقي ${toNext} نقطة للوصول إلى المستوى التالي.` : `${toNext} points to next tier.`}
      </div>
      <button className="mt-3 w-full px-4 py-2 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>
        {isRTL?"استبدال المكافآت":"Redeem rewards"}
      </button>
      <div className="text-xs text-neutral-600 mt-2">
        {isRTL?"كل نقطة = 1 جنيه. قد تنطبق الشروط.":"1 point = 1 EGP. T&Cs apply."}
      </div>
    </section>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-3">
      <div className="text-xs text-neutral-600">{title}</div>
      <div className="text-lg font-black">{value}</div>
    </div>
  );
}
