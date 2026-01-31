import React from "react";
import { MessageCircle, Phone, HelpCircle, PackageCheck } from "lucide-react";

export default function SupportLinks({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL?"الدعم والمساعدة":"Support & help"}</div>
      <div className="grid grid-cols-2 gap-2">
        <LinkCard icon={PackageCheck} label={isRTL?"تتبع طلبي":"Track my order"} href="/orders/track" brand={brand} />
        <LinkCard icon={MessageCircle} label={isRTL?"واتساب":"WhatsApp"} href="https://wa.me/201000000000" brand={brand} />
        <LinkCard icon={Phone} label={isRTL?"الخط الساخن":"Hotline"} href="tel:+201000000000" brand={brand} />
        <LinkCard icon={HelpCircle} label={isRTL?"الأسئلة الشائعة":"FAQ"} href="/help" brand={brand} />
      </div>
    </section>
  );
}

function LinkCard({ icon:Icon, label, href, brand }) {
  return (
    <a href={href} className="rounded-2xl border border-neutral-200 p-3 flex items-center gap-2 hover:shadow-sm">
      <Icon className="w-5 h-5" style={{color:brand.primary}} />
      <div className="text-sm font-semibold">{label}</div>
    </a>
  );
}
