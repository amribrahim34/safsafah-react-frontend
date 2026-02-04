'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import '../lib/i18n';
import { useDir } from '../hooks/useDir';
import { BRAND } from '../content/brand';

import PromoBar from './header/PromoBar';
import Header from './header/Header';
import HeroSlider from './home/hero/HeroSlider';
import BottomTabs from './appchrome/BottomTabs';
import FloatingCart from './appchrome/FloatingCart';

interface ClientWrapperProps {
  lang: 'en' | 'ar';
  children: React.ReactNode;
}

export default function ClientWrapper({ lang, children }: ClientWrapperProps) {
  const { t, i18n } = useTranslation('home');
  const router = useRouter();
  const pathname = usePathname();
  useDir(lang);

  useEffect(() => {
    // Sync i18n with the locale from URL
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
    const newPath = `/${newLang}${pathWithoutLocale || ''}`;
    router.push(newPath);
  };

  return (
    <div id="home" className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t('promo')} lang={lang} onToggleLang={toggleLanguage} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t('search')} lang={lang} />
      <HeroSlider brand={BRAND} />
      
      {/* Server-rendered content passed as children */}
      {children}
      
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{
        home: t('bottomTabs.home'),
        cats: t('bottomTabs.categories'),
        cart: t('bottomTabs.cart'),
        wish: t('bottomTabs.wishlist'),
        account: t('bottomTabs.account')
      }} />
    </div>
  );
}
