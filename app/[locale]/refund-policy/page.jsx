'use client';

import React, { useMemo, useState } from "react";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useDir } from "@/hooks/useDir";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";

// ---- Return & Refund Policy Page ----
// Default language is AR. No borders between blocks. Clean, consistent styling.

export default function RefundPolicy({ lastUpdated }) {
  // Default Arabic
  const [lang, setLang] = useState("ar");
  const t = useMemo(() => COPY[lang] || {}, [lang]);
  const isRTL = lang === "ar";
  useDir();

  const updated = useMemo(() => {
    const d = lastUpdated ? new Date(lastUpdated) : new Date();
    return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [lastUpdated, lang]);

  // Contact details — EDIT THESE
  const CONTACT = {
    email: "support@example.com",
    phone: "+20 10 0000 0000",
    hoursEN: "Sunday–Thursday, 10:00–18:00",
    hoursAR: "الأحد–الخميس، 10 صباحًا – 6 مساءً",
  };

  const copy = {
    en: {
      title: "Return & Refund Policy",
      introTitle: "Thank you for shopping with us.",
      introBody:
        "We want you to have complete confidence in every order. Please read our Return & Refund Policy carefully to understand your rights and our process.",
      lastUpdated: "Last updated:",
      sections: [
        {
          id: "eligibility",
          h: "1. Eligibility for Returns",
          p: [
            "To protect product safety and hygiene, returns are accepted only under the following conditions:",
          ],
          bullets: [
            "The item is unused, unopened, and in its original sealed packaging.",
            "The return request is made within 14 days of receiving your order.",
            "You received a wrong, damaged, or defective product.",
            "Products that have been opened, used, or tampered with cannot be returned for hygiene reasons.",
          ],
        },
        {
          id: "nonreturnable",
          h: "2. Non-Returnable Items",
          p: ["We do not accept returns or exchanges on:"],
          bullets: [
            "Products that have been opened or tested (e.g., skincare, makeup, or fragrance).",
            "Items sold under ‘final sale’ or promotional discounts.",
            "Gift cards or free promotional items.",
          ],
        },
        {
          id: "process",
          h: "3. Return Process",
          p: [
            "Contact our Customer Service team within 14 days of delivery with your order number, product photo, and reason for return.",
            "Our team will review and confirm whether your item qualifies for return.",
            "If approved, we’ll provide pickup or drop-off instructions based on your location.",
            "Once we receive and inspect the returned item, we’ll issue your refund or replacement.",
          ],
        },
        {
          id: "refunds",
          h: "4. Refunds",
          p: [
            "Refunds are processed to your original payment method within 5–10 business days after we confirm the item’s condition.",
            "If you paid Cash on Delivery, you’ll receive a bank transfer, wallet credit, or voucher (your choice).",
            "Delivery fees are non-refundable, unless the product was incorrect, defective, or damaged upon arrival.",
          ],
        },
        {
          id: "damaged",
          h: "5. Damaged or Incorrect Items",
          p: [
            "If your order arrives damaged, expired, or incorrect, contact us within 48 hours with photos. We’ll arrange a replacement or full refund at no cost to you.",
          ],
        },
        {
          id: "cancellations",
          h: "6. Cancellations",
          p: [
            "Orders can be cancelled before dispatch. Once shipped, the order follows the standard return process above.",
          ],
        },
        {
          id: "commitment",
          h: "7. Our Commitment",
          p: [
            "We value honesty, safety, and customer trust. Every product we sell is sourced directly from authorized suppliers and checked for authenticity and expiration before shipping. Your satisfaction and confidence in what you receive are our top priorities.",
          ],
        },
        {
          id: "contact",
          h: "8. Contact Us",
          p: [
            "If you have any questions or return requests, please reach out to:",
            `Email: ${CONTACT.email}`,
            `Phone/WhatsApp: ${CONTACT.phone}`,
            `Working hours: ${CONTACT.hoursEN}`,
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الاسترجاع والاسترداد",
      introTitle: "نشكر ثقتكِ في التسوق معنا.",
      introBody:
        "نحرص على رضاكِ التام في كل طلب. يُرجى قراءة سياسة الاسترجاع والاسترداد بعناية لمعرفة حقوقكِ وخطواتنا.",
      lastUpdated: "آخر تحديث:",
      sections: [
        {
          id: "eligibility",
          h: "1. شروط الاسترجاع",
          p: [
            "حفاظًا على سلامة المنتجات ومعايير النظافة، نقبل الاسترجاع فقط في الحالات التالية:",
          ],
          bullets: [
            "أن يكون المنتج غير مستخدم، غير مفتوح، وفي عبوته الأصلية المختومة.",
            "يتم طلب الاسترجاع خلال 14 يومًا من استلام الطلب.",
            "استلام منتج خاطئ أو تالف أو به عيب مصنعي.",
            "لا تُقبل المنتجات المفتوحة أو المُجرّبة أو التي جرى العبث بها لأسباب تتعلق بالنظافة.",
          ],
        },
        {
          id: "nonreturnable",
          h: "2. منتجات غير قابلة للاسترجاع",
          p: ["لا نقبل الاسترجاع أو الاستبدال للآتي:"],
          bullets: [
            "المنتجات التي فُتحت أو تم اختبارها (مثل: العناية بالبشرة أو المكياج أو العطور).",
            "المنتجات ضمن \"تخفيضات نهائية\" أو العروض الترويجية.",
            "بطاقات الهدايا أو الهدايا الترويجية المجانية.",
          ],
        },
        {
          id: "process",
          h: "3. خطوات الاسترجاع",
          p: [
            "التواصل مع خدمة العملاء خلال 14 يومًا من الاستلام مع رقم الطلب وصورة المنتج وسبب الاسترجاع.",
            "يقوم فريقنا بمراجعة الطلب وتأكيد أهليته للاسترجاع.",
            "في حال الموافقة، سنرسل تعليمات الاستلام أو التسليم وفقًا لموقعكِ.",
            "بعد استلام المنتج وفحصه، نُصدر المبلغ المسترد أو نستبدل المنتج.",
          ],
        },
        {
          id: "refunds",
          h: "4. الاسترداد",
          p: [
            "يُعاد المبلغ إلى وسيلة الدفع الأصلية خلال 5–10 أيام عمل بعد تأكيد حالة المنتج.",
            "في حال الدفع عند الاستلام، يمكنكِ استلام المبلغ عبر تحويل بنكي أو رصيد محفظة أو قسيمة شراء (حسب اختيارك).",
            "رسوم الشحن غير قابلة للاسترداد إلا إذا كان المنتج خاطئًا أو تالفًا أو معيبًا عند الوصول.",
          ],
        },
        {
          id: "damaged",
          h: "5. المنتجات التالفة أو الخاطئة",
          p: [
            "إذا وصل طلبكِ تالفًا أو منتهي الصلاحية أو غير صحيح، تواصلي معنا خلال 48 ساعة مع الصور. سنرتّب استبدالًا أو استردادًا كاملًا دون أي تكلفة عليكِ.",
          ],
        },
        {
          id: "cancellations",
          h: "6. الإلغاء",
          p: [
            "يمكن إلغاء الطلب قبل الشحن. بعد الشحن يُطبّق إجراء الاسترجاع المعتاد أعلاه.",
          ],
        },
        {
          id: "commitment",
          h: "7. التزامنا",
          p: [
            "نُقدّر الصدق والسلامة وثقة العملاء. جميع منتجاتنا من موردين معتمدين، وتُفحص للتأكد من الأصالة وتاريخ الصلاحية قبل الشحن. رضاكِ وثقتكِ في ما تستلمينه هما أولوينا.",
          ],
        },
        {
          id: "contact",
          h: "8. تواصلي معنا",
          p: [
            "للاستفسارات أو طلبات الاسترجاع، تواصلي معنا:",
            `البريد الإلكتروني: ${CONTACT.email}`,
            `الهاتف/واتساب: ${CONTACT.phone}`,
            `ساعات العمل: ${CONTACT.hoursAR}`,
          ],
        },
      ],
    },
  };

  const c = copy[lang];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar
        text={t.promo}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === "en" ? "ar" : "en"))}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{c.title}</h1>
          <div className="text-sm text-neutral-600 mt-1">
            {c.lastUpdated} <span className="font-medium text-neutral-900">{updated}</span>
          </div>
        </header>

        {/* Intro card (no border, soft background) */}
        <section className="rounded-3xl p-5 md:p-6 bg-neutral-50 mb-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-extrabold">{c.introTitle}</h2>
          <p className="text-neutral-700 mt-2 leading-relaxed">{c.introBody}</p>
        </section>

        {/* Sections (no borders, clean spacing) */}
        <div className="space-y-5">
          {c.sections.map((s) => (
            <article key={s.id} id={s.id} className="rounded-3xl p-5 md:p-6 bg-white shadow-sm">
              <h3 className="text-base md:text-lg font-extrabold mb-2">{s.h}</h3>
              {s.p?.map((para, idx) => (
                <p key={idx} className="text-neutral-700 leading-relaxed mt-2">
                  {para}
                </p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="list-disc ms-5 text-neutral-700 leading-relaxed mt-3 space-y-1">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </main>

      <Footer brand={BRAND} lang={lang} copy={t} />
      <BottomTabs
        labels={{
          home: isRTL ? "الرئيسية" : "Home",
          cats: isRTL ? "الفئات" : "Categories",
          cart: isRTL ? "السلة" : "Bag",
          wish: isRTL ? "المفضلة" : "Wishlist",
          account: isRTL ? "حسابي" : "Account",
        }}
      />
    </div>
  );
}
