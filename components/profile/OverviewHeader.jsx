import React, { useMemo, useRef } from "react";
import { Camera, ShoppingBag, Heart, Gift } from "lucide-react";

export default function OverviewHeader({ brand, lang="ar", user }) {
  const isRTL = lang === "ar";
  const inputRef = useRef(null);

  const copy = useMemo(() => ({
    hi: isRTL ? `أهلاً، ${first(user?.name || '')} 🌸 جاهزة للتوهّج؟` : `Hey, ${first(user?.name || '')} 🌸 ready to glow?`,
    orders: isRTL ? "طلباتي" : "My Orders",
    wishlist: isRTL ? "المفضلة" : "Wishlist",
    rewards: isRTL ? "النقاط والمكافآت" : "Rewards & Points",
    upload: isRTL ? "تغيير الصورة" : "Change photo",
  }), [isRTL, user?.name]);

  const openFile = () => inputRef.current?.click();

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-neutral-300 bg-white flex items-center justify-center text-lg font-bold">
          {user?.avatar
            ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            : initials(user?.name || '')}
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
          {user?.email && (
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="text-neutral-600">{user.email}</span>
            </div>
          )}
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
