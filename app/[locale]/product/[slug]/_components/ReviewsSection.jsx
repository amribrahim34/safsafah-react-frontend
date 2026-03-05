'use client';

import React, { useState } from "react";
import RatingBreakdown from "./RatingBreakdown";
import Reviews from "./Reviews";

/**
 * ReviewsSection
 * Collapsible "Customer reviews" panel showing rating breakdown + review cards.
 *
 * @param {Object}  brand
 * @param {string}  lang            - "ar" | "en"
 * @param {Object}  product
 * @param {Array}   reviews         - fetched from /products/{id}/reviews
 * @param {boolean} isLoadingReviews
 * @param {boolean} defaultOpen     - whether the section is open on mount
 */
export default function ReviewsSection({ brand, lang, product, reviews = [], isLoadingReviews = false, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const rating = product.averageRating?.parsedValue ?? product.averageRating ?? 0;
  const reviewCount = reviews.length || product.ratingCount || 0;

  // Hide the section only if we know for certain there are no reviews
  if (!isLoadingReviews && reviewCount === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 pb-8">
      <div className="rounded-3xl border border-neutral-200 p-4">
        {/* Header toggle */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">
            {lang === "ar" ? "آراء العملاء" : "Customer reviews"}
            {reviewCount > 0 && (
              <span className="ms-2 text-sm font-normal text-neutral-500">
                ({reviewCount})
              </span>
            )}
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
              {isLoadingReviews ? (
                <div className="text-neutral-500 animate-pulse py-4">
                  {lang === "ar" ? "جاري تحميل المراجعات..." : "Loading reviews..."}
                </div>
              ) : (
                <Reviews brand={brand} lang={lang} reviews={reviews} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
