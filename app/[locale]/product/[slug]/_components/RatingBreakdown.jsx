'use client';

import React from "react";
import { Star } from "lucide-react";

/**
 * RatingBar – a single labelled progress bar in the breakdown.
 */
function RatingBar({ label, count, total, brand }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-4 shrink-0">{label}</span>
      <Star className="w-3 h-3 text-amber-400 fill-current shrink-0" />
      <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: brand.primary }}
        />
      </div>
      <span className="w-6 text-end text-neutral-500">{count}</span>
    </div>
  );
}

/**
 * RatingBreakdown
 * Shows the average score + star distribution bars.
 *
 * @param {Object} brand
 * @param {string} lang       - "ar" | "en"
 * @param {number} rating     - Average rating (0–5)
 * @param {number} count      - Total number of reviews
 * @param {Object} ratingDistribution - e.g. { 5: 10, 4: 3, … }
 */
export default function RatingBreakdown({ brand, lang, rating, count, ratingDistribution = {} }) {
  return (
    <div>
      {/* Big number + stars */}
      <div className="flex items-end gap-2 mb-3">
        <span className="text-5xl font-black">{rating.toFixed(1)}</span>
        <div className="pb-1">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`}
              />
            ))}
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {count} {lang === "ar" ? "تقييم" : "ratings"}
          </div>
        </div>
      </div>

      {/* Bar breakdown */}
      <div className="flex flex-col gap-1.5">
        {[5, 4, 3, 2, 1].map((star) => (
          <RatingBar
            key={star}
            label={star}
            count={ratingDistribution[star] ?? 0}
            total={count}
            brand={brand}
          />
        ))}
      </div>
    </div>
  );
}
