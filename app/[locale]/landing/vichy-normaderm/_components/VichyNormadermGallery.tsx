'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import type { LandingGalleryImage } from '../_types';

interface VichyNormadermGalleryProps {
  images: LandingGalleryImage[];
  lang: string;
}

export const VichyNormadermGallery: React.FC<VichyNormadermGalleryProps> = ({ images, lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const isAr = lang === 'ar';

  const currentImage = images[activeIndex] || images[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      if (isAr) {
        if (diff > 0) handlePrev();
        else handleNext();
      } else {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const lightboxSlides = images.map((img) => ({
    src: img.src,
    alt: isAr ? img.altAr : img.altEn,
  }));

  return (
    <div className="w-full select-none flex flex-row items-start gap-2 sm:flex-col sm:items-stretch sm:gap-0">
      {/* Main Image Container */}
      <div
        className="flex-1 min-w-0 relative group bg-gradient-to-b from-stone-50 via-white to-neutral-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Badges on main image */}
        <div className="absolute top-2.5 start-2.5 sm:top-3.5 sm:start-3.5 z-10 flex flex-col gap-1 sm:gap-1.5 max-w-[calc(100%-3.25rem)] pointer-events-none">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-teal-700 text-white shadow-xs w-fit">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">
              {isAr ? 'رغوة لطيفة بدون جفاف' : 'Gentle Foaming Cleanser'}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-semibold bg-white/95 backdrop-blur-md text-neutral-800 border border-neutral-200/60 shadow-2xs w-fit">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-700 shrink-0" />
            <span className="truncate">
              {isAr ? 'مفحوص جلدياً · 200 ملليلتر' : 'Dermatologically Tested · 200ml'}
            </span>
          </span>
        </div>

        {/* Zoom Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-2.5 end-2.5 sm:top-3.5 sm:end-3.5 z-10 p-1.5 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-700 hover:text-teal-700 hover:bg-white shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label={isAr ? 'تكبير الصورة' : 'Zoom Image'}
        >
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Responsive Main Image View */}
        <div
          className="relative w-full aspect-square max-h-[460px] sm:max-h-[520px] flex items-center justify-center p-2 sm:p-6 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 p-3 sm:p-6 transition-opacity duration-300 flex items-center justify-center ${
                idx === activeIndex ? 'opacity-100 z-1 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={img.src}
                alt={isAr ? img.altAr : img.altEn}
                fill
                preload={idx === 0}
                className="object-contain p-2 sm:p-4"
                sizes="(max-width: 639px) 75vw, (max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute start-1.5 sm:start-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white hover:text-teal-700 shadow-md transition-all active:scale-90"
              aria-label={isAr ? 'الصورة السابقة' : 'Previous Image'}
            >
              {isAr ? <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute end-1.5 sm:end-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white hover:text-teal-700 shadow-md transition-all active:scale-90"
              aria-label={isAr ? 'الصورة التالية' : 'Next Image'}
            >
              {isAr ? <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </>
        )}

        {/* Caption Bar & Dot Indicators */}
        <div className="py-2 px-3 sm:py-2.5 sm:px-4 bg-white/95 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
          <span className="font-medium truncate text-[11px] sm:text-xs">
            {isAr ? currentImage.captionAr : currentImage.captionEn}
          </span>
          <div className="flex items-center gap-1.5 ms-2 flex-shrink-0">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeIndex ? 'w-4 bg-teal-700' : 'w-1.5 bg-neutral-300'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails Strip: Vertical side rail on mobile, grid underneath on sm+ */}
      {images.length > 1 && (
        <div
          className={`flex flex-col gap-2 w-16 min-[420px]:w-[72px] shrink-0 sm:mt-3 sm:w-full sm:grid sm:gap-3 ${
            images.length === 2
              ? 'sm:grid-cols-2 sm:max-w-xs sm:mx-auto'
              : images.length >= 4
              ? 'sm:grid-cols-4'
              : 'sm:grid-cols-3'
          }`}
        >
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-200 text-start group/thumb ${
                  isSelected
                    ? 'border-teal-700 ring-2 ring-teal-700/20 shadow-sm scale-[1.02]'
                    : 'border-neutral-200 hover:border-neutral-300 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.src}
                  alt={isAr ? img.altAr : img.altEn}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                  sizes="(max-width: 639px) 72px, 120px"
                />
                {img.badgeAr && (
                  <span className="hidden sm:block absolute bottom-1 inset-x-1 text-center py-0.5 text-[9px] font-semibold bg-neutral-900/80 text-white backdrop-blur-xs rounded-md">
                    {isAr ? img.badgeAr : img.badgeEn}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox with Zoom */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={activeIndex}
        slides={lightboxSlides}
        plugins={[Zoom]}
      />
    </div>
  );
};

export default VichyNormadermGallery;
