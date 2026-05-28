'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../lib/i18n';
import { useLocale } from '@/lib/locale-navigation';
import { BRAND } from '../content/brand';

import HeroSlider from './home/hero/HeroSlider';
import FloatingCart from './appchrome/FloatingCart';

interface ClientWrapperProps {
  lang?: 'en' | 'ar';
  className?: string;
  children: React.ReactNode;
}

export default function ClientWrapper({ children, className }: ClientWrapperProps) {
  const { i18n } = useTranslation('home');
  const lang = useLocale();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div id="home" className={`min-h-screen bg-white text-neutral-900${className ? ` ${className}` : ''}`}>
      <HeroSlider brand={BRAND} />
      
      {/* Server-rendered content passed as children */}
      {children}
      
      <FloatingCart brand={BRAND} />
    </div>
  );
}
