'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { buildUrlWithParams, getCtaFilters } from "../../../lib/navigation";
import { IMG } from "../../../content/images";
import "../../../lib/i18n";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider({ brand }) {
  const { t } = useTranslation('home');

  // Prepare slider data with translations and images
  const slides = [
    { ...t('slider.0', { returnObjects: true }), img: IMG.hero1 },
    { ...t('slider.1', { returnObjects: true }), img: IMG.hero2 },
    { ...t('slider.2', { returnObjects: true }), img: IMG.hero3 },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
        }}
        loop={true}
        className="w-full h-[68vh] md:h-[78vh]"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img src={s.img} alt="hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="px-4 md:px-8 lg:px-12 pb-10 md:pb-0 w-full max-w-7xl mx-auto">
                  <div className="max-w-xl text-white">
                    <h1 className="text-3xl md:text-5xl font-black leading-tight">{s.title}</h1>
                    <p className="mt-2 text-white/90 text-lg md:text-xl">{s.sub}</p>
                    <div className="mt-5 flex gap-3">
                      <Link
                        href={buildUrlWithParams('/catalog', getCtaFilters(s.cta1))}
                        className="rounded-2xl px-5 py-3 font-semibold text-white"
                        style={{ background: brand.primary }}
                      >
                        {s.cta1}
                      </Link>
                      <Link
                        href={buildUrlWithParams('/catalog', getCtaFilters(s.cta2))}
                        className="rounded-2xl border px-5 py-3 font-semibold text-white/90 border-white/70"
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
