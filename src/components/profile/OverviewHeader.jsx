import React, { useMemo, useRef } from "react";
import { Camera, ShoppingBag, Heart, Gift } from "lucide-react";

export default function OverviewHeader({ brand, lang="ar", user }) {
  const isRTL = lang === "ar";
  const inputRef = useRef(null);

  const pct = Math.min(100, Math.round((user.points / user.nextTierAt) * 100));
  const copy = useMemo(() => ({
    hi: isRTL ? `أهلاً، ${first(user.name)} 🌸 جاهزة للتوهّج؟` : `Hey, ${first(user.name)} 🌸 ready to glow?`,
    orders: isRTL ? "طلباتي" : "My Orders",
    wishlist: isRTL ? "المفضلة" : "Wishlist",
    rewards: isRTL ? "النقاط والمكافآت" : "Rewards & Points",
    status: isRTL ? `عضوية ${user.tier}` : `${user.tier} member`,
    toNext: isRTL
      ? `متبقي ${user.nextTierAt - user.points} نقطة للوصول إلى المستوى التالي`
      : `${user.nextTierAt - user.points} points to next tier`,
    upload: isRTL ? "تغيير الصورة" : "Change photo",
  }), [isRTL, user]);

  const openFile = () => inputRef.current?.click();

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-neutral-300 bg-white flex items-center justify-center text-lg font-bold">
          {user.avatar
            ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            : initials(user.name)}
          <button
            onClick={openFile}
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white border shadow"
            title={copy.upload}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={()=>{}} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-lg md:text-xl font-extrabold">{copy.hi}</div>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span className="px-2 py-1 rounded-full border bg-white" style={{borderColor:brand.primary, color:brand.primary}}>
              {copy.status}
            </span>
            <span className="text-neutral-600">{user.email}</span>
          </div>
          {/* progress to next tier */}
          <div className="mt-3">
            <div className="h-2 rounded bg-white border border-neutral-200 overflow-hidden">
              <div className="h-full" style={{ width: `${pct}%`, background: brand.primary }} />
            </div>
            <div className="text-xs text-neutral-600 mt-1">{copy.toNext}</div>
          </div>
        </div>

        {/* quick actions */}
        <div className="hidden md:grid grid-cols-3 gap-2">
          <QuickAction icon={ShoppingBag} label={copy.orders} href="/orders" brand={brand} />
          <QuickAction icon={Heart}        label={copy.wishlist} href="/wishlist" brand={brand} />
          <QuickAction icon={Gift}         label={copy.rewards} href="#rewards" brand={brand} />
        </div>
      </div>
    </section>
  );
}

function QuickAction({ icon:Icon, label, href, brand }) {
  return (
    <a href={href} className="rounded-2xl border border-neutral-200 bg-white px-3 py-2 flex items-center gap-2 hover:shadow-sm">
      <Icon className="w-4 h-4" style={{ color: brand.primary }} />
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}
const first = (n)=> (n||"").split(" ")[0];
const initials = (n)=> (n||"").split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
