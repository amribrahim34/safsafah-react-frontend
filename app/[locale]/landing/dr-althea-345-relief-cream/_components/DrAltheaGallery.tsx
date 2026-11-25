'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import type { LandingGalleryImage } from '../_types';

interface DrAltheaGalleryProps {
  images: LandingGalleryImage[];
  lang: string;
}

export const DrAltheaGallery: React.FC<DrAltheaGalleryProps> = ({ images, lang }) => {
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
    <div className="w-full select-none">
      {/* Main Image Container */}
      <div
        className="relative group bg-gradient-to-b from-stone-50 via-white to-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Badges on main image */}
        <div className="absolute top-3.5 start-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase bg-teal-700 text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            {isAr ? 'تركيبة 3-4-5 المهدئة' : '3-4-5 Relief Formula'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white/95 backdrop-blur-md text-neutral-800 border border-neutral-200/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            {isAr ? 'نباتي وخالٍ من العطور · 50 مل' : 'Vegan & Fragrance-Free · 50ml'}
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

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute start-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/85 backdrop-blur-sm text-neutral-700 hover:text-teal-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="absolute end-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/85 backdrop-blur-sm text-neutral-700 hover:text-teal-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isAr ? 'الصورة التالية' : 'Next Image'}
            >
              {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </>
        )}

        {/* Caption bar */}
        {(currentImage?.captionAr || currentImage?.captionEn) && (
          <div className="px-4 py-2.5 bg-white/90 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span>{isAr ? currentImage.captionAr : currentImage.captionEn}</span>
            {currentImage.badgeAr && (
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold text-[11px]">
                {isAr ? currentImage.badgeAr : currentImage.badgeEn}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                idx === activeIndex
                  ? 'border-teal-700 ring-2 ring-teal-700/20'
                  : 'border-neutral-200 hover:border-teal-300 opacity-75 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={isAr ? img.altAr : img.altEn}
                fill
                className="object-contain p-1.5"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
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

export default DrAltheaGallery;
