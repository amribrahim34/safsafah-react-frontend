'use client';

import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useLocale } from '@/lib/locale-navigation';
import { getFixedT } from '@/lib/i18n-helpers';

export default function PromoBar() {
  const lang = useLocale();
  const tHome = getFixedT(lang, 'home');
  const promoText = tHome('promo');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full text-white text-sm bg-brand">
      {mounted ? (
        <Marquee speed={40} gradient={false} loop={0} className="py-2">
          <span className="opacity-95 mx-2">{promoText}</span>
        </Marquee>
      ) : (
        <div className="py-2 text-center overflow-hidden whitespace-nowrap">
          <span className="opacity-95 mx-2">{promoText}</span>
        </div>
      )}
    </div>
  );
}
