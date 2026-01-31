import React from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactPanel({ brand }) {
  return (
    <section className="py-10">
      <div className="rounded-3xl border border-neutral-200 p-6 md:p-8 bg-gradient-to-r from-white to-neutral-50 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-extrabold">نحن هنا للمساعدة</h3>
          <p className="text-neutral-700 mt-1">
            للاستفسارات أو ملاحظات ما بعد الشراء، يسعدنا تواصلك. نحرص على الرد خلال أوقات العمل.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="https://wa.me/201000000000" className="px-4 py-2 rounded-2xl border font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> واتساب
          </a>
          <a href="tel:+201000000000" className="px-4 py-2 rounded-2xl border font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4" /> الاتصال الهاتفي
          </a>
          <a href="mailto:support@example.com" className="px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: brand.primary }}>
            <Mail className="w-4 h-4 inline me-1" /> مراسلة عبر البريد
          </a>
        </div>
      </div>
    </section>
  );
}
