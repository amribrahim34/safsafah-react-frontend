'use client';

import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { useLocale } from '@/lib/locale-navigation';
import { BRAND } from '../content/brand';

import PromoBar from './header/PromoBar';
import Header from './header/Header';
import HeroSlider from './home/hero/HeroSlider';
import FloatingCart from './appchrome/FloatingCart';

interface ClientWrapperProps {
  lang?: 'en' | 'ar';
  className?: string;
  children: React.ReactNode;
}

export default function ClientWrapper({ children, className }: ClientWrapperProps) {
  const { t, i18n } = useTranslation('home');
  const lang = useLocale(); // Get locale from URL
  // Sync language synchronously (before render) so SSR and client agree on
  // the first render — avoids hydration mismatches.
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <div id="home" className={`min-h-screen bg-white text-neutral-900${className ? ` ${className}` : ''}`}>
      <PromoBar  />
      <Header brand={BRAND} searchPlaceholder={t('search')} />
      <HeroSlider brand={BRAND} />
      
      {/* Server-rendered content passed as children */}
      {children}
      
      <FloatingCart brand={BRAND} />
    </div>
  );
}
