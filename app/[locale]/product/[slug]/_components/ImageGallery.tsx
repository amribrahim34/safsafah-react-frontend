'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { BrandColors } from '../types';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  brand: BrandColors;
}

export default function ImageGallery({ images, brand: _brand }: ImageGalleryProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const goTo = (index: number) => {
    setActive(index);
    scroller.current?.scrollTo({
      left: index * (scroller.current?.clientWidth ?? 0),
      behavior: "smooth",
    });
  };

  const slides = images.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <div>
      {/* Main scroller */}
      <div
        ref={scroller}
        className="w-full h-[56vh] md:h-[64vh] rounded-3xl overflow-hidden border border-neutral-200 snap-x snap-mandatory flex no-scrollbar relative"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="min-w-full snap-start h-full relative cursor-zoom-in transparent"
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                aria-label={`Image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === active ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-16 h-16 rounded-xl overflow-hidden border transition-colors relative ${
                i === active ? "border-neutral-900" : "border-neutral-200"
              }`}
            >
              <Image src={img.src} alt={img.alt} fill  className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox with zoom */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
      />
    </div>
  );
}
