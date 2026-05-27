'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { buildUrlWithParams, getCtaFilters } from "../../../lib/navigation";
import "../../../lib/i18n";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider({ brand }) {
  const { t, i18n } = useTranslation('home');

  // Determine if the current language is RTL
  const isRTL = i18n.language === 'ar';

  // Prepare slider data with translations and images
  const slides = [
    { ...t('slider.0', { returnObjects: true }), img: "/hero/hero1.jpeg" },
    { ...t('slider.1', { returnObjects: true }), img: "/hero/hero2.jpeg" },
    { ...t('slider.2', { returnObjects: true }), img: "/hero/hero3.jpeg" },
  ];

  return (
    <div className="relative  ">
      <Swiper
        key={i18n.language} // Force re-render when language changes
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        dir={isRTL ? 'rtl' : 'ltr'} // Set direction based on language
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          reverseDirection: isRTL, // Reverse autoplay direction for RTL
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img src={s.img} alt={`${s.title}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="px-4 md:px-8 lg:px-12 pb-10 md:pb-0 w-full max-w-7xl mx-auto">
                  <div className="max-w-xl text-white">
                    <h1 className="lg:text-3xl md:text-5xl font-black leading-tight">{s.title}</h1>
                    <p className="mt-2 text-white/90 text-sm md:text-xl">{s.sub}</p>
                    <div className="mt-5 flex gap-3">
                      <Link
                        href={buildUrlWithParams('/catalog', getCtaFilters(s.cta1))}
                        className="rounded-lg text-xs lg:text-lg px-2 py-2 self-center  lg:px-5 lg:py-3 lg:font-semibold text-white"
                        style={{ background: brand.primary }}
                      >
                        {s.cta1}
                      </Link>
                      <Link
                        href={buildUrlWithParams('/catalog', getCtaFilters(s.cta2))}
                        className="rounded-lg text-xs lg:text-lg px-2 py-2  border lg:px-5 lg:py-3 lg:font-semibold text-white/90 border-white/70"
                      >
                        {s.cta2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
