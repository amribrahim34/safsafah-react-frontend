'use client';

import { BRAND } from '../content/brand';

import HeroSlider from './home/hero/HeroSlider';
import FloatingCart from './appchrome/FloatingCart';

interface ClientWrapperProps {
  lang?: 'en' | 'ar';
  className?: string;
  children: React.ReactNode;
}

export default function ClientWrapper({ children, className }: ClientWrapperProps) {
  return (
    <div id="home" className={`min-h-screen bg-white text-neutral-900${className ? ` ${className}` : ''}`}>
      <HeroSlider brand={BRAND} />
      
      {/* Server-rendered content passed as children */}
      {children}
      
      <FloatingCart brand={BRAND} />
    </div>
  );
}
