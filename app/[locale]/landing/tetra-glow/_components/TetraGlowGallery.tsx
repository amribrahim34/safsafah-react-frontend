'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import type { LandingGalleryImage } from '../_types';

interface TetraGlowGalleryProps {
  images: LandingGalleryImage[];
  lang: string;
}

export const TetraGlowGallery: React.FC<TetraGlowGalleryProps> = ({ images, lang }) => {
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
    const threshold = 40; // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (isAr) {
        // In RTL, swipe left (diff > 0) goes to previous, swipe right goes to next
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
    <div className="w-full select-none">
      {/* Main Image Container */}
      <div
        className="relative group bg-gradient-to-b from-stone-50 via-white to-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Badges on main image */}
        <div className="absolute top-3.5 start-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase bg-emerald-600 text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            {isAr ? 'تركيبة مخصصة للمناطق الحساسة' : 'Sensitive Zone Safe'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white/95 backdrop-blur-md text-neutral-800 border border-neutral-200/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            {isAr ? 'مفحوص جلدياً · 50 جم' : 'Dermatologically Tested · 50g'}
          </span>
        </div>

        {/* Zoom Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3.5 end-3.5 z-10 p-2 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-700 hover:text-teal-700 hover:bg-white shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label={isAr ? 'تكبير الصورة' : 'Zoom Image'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Responsive Main Image View */}
        <div
          className="relative w-full aspect-square max-h-[460px] sm:max-h-[520px] flex items-center justify-center p-3 sm:p-6 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 p-4 sm:p-6 transition-opacity duration-300 flex items-center justify-center ${
                idx === activeIndex ? 'opacity-100 z-1 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={img.src}
                alt={isAr ? img.altAr : img.altEn}
                fill
                priority={idx === 0}
                className="object-contain p-2 sm:p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Nav Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute start-2 sm:start-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white hover:text-teal-700 shadow-md transition-all active:scale-90"
              aria-label={isAr ? 'الصورة السابقة' : 'Previous Image'}
            >
              {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute end-2 sm:end-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white hover:text-teal-700 shadow-md transition-all active:scale-90"
              aria-label={isAr ? 'الصورة التالية' : 'Next Image'}
            >
              {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </>
        )}

        {/* Active caption bar & Dot Indicators */}
        <div className="py-2.5 px-4 bg-white/95 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
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
                  idx === activeIndex ? 'w-4 bg-teal-600' : 'w-1.5 bg-neutral-300'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails Gallery Strip */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 text-start group/thumb ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-sm scale-[1.02]'
                    : 'border-neutral-200 hover:border-neutral-300 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.src}
                  alt={isAr ? img.altAr : img.altEn}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                  sizes="(max-width: 768px) 33vw, 120px"
                />
                {img.badgeAr && (
                  <span className="absolute bottom-1 inset-x-1 text-center py-0.5 text-[8px] sm:text-[9px] font-semibold bg-neutral-900/80 text-white backdrop-blur-xs rounded-md">
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

export default TetraGlowGallery;
