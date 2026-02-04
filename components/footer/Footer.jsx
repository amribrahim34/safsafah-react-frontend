'use client';

import { useTranslation } from "react-i18next";
import { Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Footer({ brand, lang, copy }) {
  const { t } = useTranslation('home');

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/safsafah-logo.png" alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
            <div className="font-extrabold text-xl tracking-tight">SAFSAFAH</div>
          </div>
          <p className="mt-4 text-neutral-600">{t('footer.about')}</p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-3">{t('footer.quickLinks')}</div>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/catalog" className="hover:opacity-80" style={{ color: brand.primary }}>{t('sections.trending')}</Link></li>
            <li><Link href="/catalog?sort=bestsellers" className="hover:opacity-80" style={{ color: brand.primary }}>{t('sections.trending')}</Link></li>
            <li><Link href="/catalog" className="hover:opacity-80" style={{ color: brand.primary }}>{t('categories.title')}</Link></li>
            <li><Link href="/quize" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.skinQuiz')}</Link></li>
            <li><Link href="/about" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.aboutUs')}</Link></li>
            <li><Link href="/contact" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.contactUs')}</Link></li>
          </ul>
        </div>

        {/* Help & Account */}
        <div>
          <div className="font-semibold mb-3">{t('footer.helpAccount')}</div>
          <ul className="space-y-2 text-neutral-600">
            <li><Link href="/account" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.myAccount')}</Link></li>
            <li><Link href="/orders" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.myOrders')}</Link></li>
            <li><Link href="/cart" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.shoppingCart')}</Link></li>
            <li><Link href="/checkout" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.checkout')}</Link></li>
            <li><Link href="/refund-policy" className="hover:opacity-80" style={{ color: brand.primary }}>{t('footer.refundPolicy')}</Link></li>
          </ul>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3">
            <Leaf className="w-5 h-5" style={{ color: brand.primary }} />
            <div className="text-sm">{t('footer.ecoPackaging')}</div>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" style={{ color: brand.primary }} />
            <div className="text-sm">{t('footer.secureCheckout')}</div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 pb-24 md:pb-8">
        © {new Date().getFullYear()} SAFSAFAH — {t('footer.rights')}
      </div>
    </footer>
  );
}
