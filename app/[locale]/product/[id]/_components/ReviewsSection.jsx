'use client';

import React, { useState } from "react";
import RatingBreakdown from "./RatingBreakdown";
import Reviews from "./Reviews";

/**
 * ReviewsSection
 * Collapsible "Customer reviews" panel showing rating breakdown + review cards.
 *
 * @param {Object} brand
 * @param {string} lang        - "ar" | "en"
 * @param {Object} product
 * @param {boolean} defaultOpen - whether the section is open on mount
 */
export default function ReviewsSection({ brand, lang, product, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const rating = product.averageRating?.parsedValue ?? product.averageRating ?? 0;
  const reviews = product.reviews ?? [];
  const reviewCount = reviews.length;

  if (reviewCount === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 pb-8">
      <div className="rounded-3xl border border-neutral-200 p-4">
        {/* Header toggle */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">
            {lang === "ar" ? "آراء العملاء" : "Customer reviews"}
          </div>
          <button onClick={() => setOpen((v) => !v)} className="text-sm underline">
            {open
              ? lang === "ar" ? "إخفاء" : "Hide"
              : lang === "ar" ? "عرض المراجعات" : "Show reviews"}
          </button>
        </div>

        {/* Content */}
        {open && (
          <div className="mt-4 grid md:grid-cols-3 gap-6">
            <div>
              <RatingBreakdown
                brand={brand}
                lang={lang}
                rating={rating}
                count={reviewCount}
                ratingDistribution={product.ratingDistribution}
              />
            </div>
            <div className="md:col-span-2">
              <Reviews brand={brand} lang={lang} reviews={reviews} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
