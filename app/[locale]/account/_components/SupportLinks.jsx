import { useState, useEffect } from "react";
import { MessageCircle, Phone, HelpCircle, PackageCheck } from "lucide-react";
import { settingsService } from "@/lib/api/services";

export default function SupportLinks({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    settingsService.getSettings().then(setSettings).catch(() => {});
  }, []);

  const whatsappHref = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : null;
  const phoneHref = settings?.mobile
    ? `tel:${settings.mobile.replace(/\s/g, '')}`
    : null;

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL?"الدعم والمساعدة":"Support & help"}</div>
      <div className="grid grid-cols-2 gap-2">
        {/* <LinkCard icon={PackageCheck} label={isRTL?"تتبع طلبي":"Track my order"} href="/orders/track" brand={brand} /> */}
        {whatsappHref && <LinkCard icon={MessageCircle} label={isRTL?"واتساب":"WhatsApp"} href={whatsappHref} brand={brand} />}
        {phoneHref && <LinkCard icon={Phone} label={isRTL?"خدمة العملاء":"Customer Service"} href={phoneHref} brand={brand} />}
        {/* <LinkCard icon={HelpCircle} label={isRTL?"الأسئلة الشائعة":"FAQ"} href="/help" brand={brand} /> */}
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
