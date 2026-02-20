'use client';

import React, { useRef, useState } from "react";

/**
 * ImageGallery
 * Renders a horizontally-scrollable snap gallery with thumbnail navigation.
 *
 * @param {Array<{src: string, alt: string}>} images
 * @param {Object} brand
 */
export default function ImageGallery({ images, brand }) {
  const scroller = useRef(null);
  const [active, setActive] = useState(0);

  const goTo = (index) => {
    setActive(index);
    scroller.current?.scrollTo({
      left: index * scroller.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Main scroller */}
      <div
        ref={scroller}
        className="w-full h-[56vh] md:h-[64vh] rounded-3xl overflow-hidden border border-neutral-200 snap-x snap-mandatory flex no-scrollbar relative"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full snap-start group relative">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ))}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
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
              className={`w-16 h-16 rounded-xl overflow-hidden border transition-colors ${
                i === active ? "border-neutral-900" : "border-neutral-200"
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
