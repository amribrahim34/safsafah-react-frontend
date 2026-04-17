import React from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactPanel({ brand, siteSettings, t }) {
  const whatsapp = siteSettings?.whatsapp?.replace(/\D/g, '') ?? "";
  const mobile = siteSettings?.mobile ?? "";
  const email = siteSettings?.email ?? "";

  return (
    <section className="py-10">
      <div className="rounded-3xl border border-neutral-200 p-6 md:p-8 bg-gradient-to-r from-white to-neutral-50 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-extrabold">{t.heading}</h3>
          <p className="text-neutral-700 mt-1">{t.body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={whatsapp ? `https://wa.me/${whatsapp}` : "#"} className="px-4 py-2 rounded-2xl border font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> {t.whatsapp}
          </a>
          <a href={mobile ? `tel:${mobile.replace(/\s/g, "")}` : "#"} className="px-4 py-2 rounded-2xl border font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4" /> {t.phone}
          </a>
          <a href={email ? `mailto:${email}` : "#"} className="px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: brand.primary }}>
            <Mail className="w-4 h-4 inline me-1" /> {t.email}
          </a>
        </div>
      </div>
    </section>
  );
}
