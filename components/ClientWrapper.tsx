'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { useDir } from '../hooks/useDir';
import { useLocale } from '@/lib/locale-navigation';
import { BRAND } from '../content/brand';

import PromoBar from './header/PromoBar';
import Header from './header/Header';
import HeroSlider from './home/hero/HeroSlider';
import BottomTabs from './appchrome/BottomTabs';
import FloatingCart from './appchrome/FloatingCart';

interface ClientWrapperProps {
  lang?: 'en' | 'ar'; // Keep for backward compatibility but make optional
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { t, i18n } = useTranslation('home');
  const lang = useLocale(); // Get locale from URL
  useDir(); // Automatically syncs with URL

  useEffect(() => {
    // Sync i18n with the locale from URL
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div id="home" className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t('promo')} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t('search')} />
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
