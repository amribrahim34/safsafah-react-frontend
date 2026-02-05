'use client';

import { Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLocale, getLocalizedPath } from "@/lib/locale-navigation";

interface FooterProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

interface FooterTranslations {
  about: string;
  quickLinks: string;
  helpAccount: string;
  myAccount: string;
  myOrders: string;
  shoppingCart: string;
  checkout: string;
  refundPolicy: string;
  skinQuiz: string;
  aboutUs: string;
  contactUs: string;
  ecoPackaging: string;
  secureCheckout: string;
  rights: string;
}

export default function Footer({ brand }: FooterProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Translation mapping
  const translations: Record<"ar" | "en", FooterTranslations> = {
    ar: {
      about: "نختار عناية قائمة على العلم لبيئة مصر مع توصيل سريع ونصيحة صادقة.",
      quickLinks: "روابط سريعة",
      helpAccount: "المساعدة والحساب",
      myAccount: "حسابي",
      myOrders: "طلباتي",
      shoppingCart: "سلة التسوق",
      checkout: "الدفع",
      refundPolicy: "سياسة الإرجاع",
      skinQuiz: "اختبار البشرة",
      aboutUs: "من نحن",
      contactUs: "تواصل معنا",
      ecoPackaging: "تعبئة صديقة للبيئة",
      secureCheckout: "دفع آمن وبطاقات محلية",
      rights: "جميع الحقوق محفوظة.",
    },
    en: {
      about: "We curate science-backed skincare for Egypt with fast delivery and honest advice.",
      quickLinks: "Quick links",
      helpAccount: "Help & Account",
      myAccount: "My Account",
      myOrders: "My Orders",
      shoppingCart: "Shopping Cart",
      checkout: "Checkout",
      refundPolicy: "Refund Policy",
      skinQuiz: "Skin Quiz",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      ecoPackaging: "Eco-friendly packaging",
      secureCheckout: "Secure checkout & local cards",
      rights: "All rights reserved.",
    },
  };

  const t = translations[locale];

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/safsafah-logo.png" alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
            <div className="font-extrabold text-xl tracking-tight">SAFSAFAH</div>
          </div>
          <p className="mt-4 text-neutral-600 text-sm leading-relaxed">{t.about}</p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-3 text-neutral-900">{t.quickLinks}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link 
                href={getLocalizedPath('/catalog', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {isRTL ? "المنتجات" : "Products"}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/catalog?sort=bestsellers', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {isRTL ? "الأكثر مبيعًا" : "Bestsellers"}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/catalog', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {isRTL ? "الفئات" : "Categories"}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/quize', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.skinQuiz}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/about', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.aboutUs}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/contact', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.contactUs}
              </Link>
            </li>
          </ul>
        </div>

        {/* Help & Account */}
        <div>
          <div className="font-semibold mb-3 text-neutral-900">{t.helpAccount}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link 
                href={getLocalizedPath('/account', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.myAccount}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/orders', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.myOrders}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/cart', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.shoppingCart}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/checkout', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.checkout}
              </Link>
            </li>
            <li>
              <Link 
                href={getLocalizedPath('/refund-policy', locale)} 
                className="text-neutral-600 hover:opacity-80 transition-opacity" 
                style={{ color: brand.primary }}
              >
                {t.refundPolicy}
              </Link>
            </li>
          </ul>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
            <Leaf className="w-5 h-5 flex-shrink-0" style={{ color: brand.primary }} />
            <div className="text-sm text-neutral-700">{t.ecoPackaging}</div>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" style={{ color: brand.primary }} />
            <div className="text-sm text-neutral-700">{t.secureCheckout}</div>
          </div>
        </div>
      </div>

      {/* Copyright - with extra bottom padding for mobile bottom tabs */}
      <div className="text-center text-sm text-neutral-500 pb-24 md:pb-8">
        © {new Date().getFullYear()} SAFSAFAH — {t.rights}
      </div>
    </footer>
  );
}
