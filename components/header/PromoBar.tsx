'use client';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';



export default function PromoBar() {
  const { t: tHome } = useTranslation('home');
  
  return (
    <div className="w-full text-white text-sm bg-brand">
      <Marquee speed={40} gradient={false} loop={0} className="py-2">
        <span className="opacity-95 mx-2">{ tHome('promo') }</span>
      </Marquee>
    </div>
  );
}
