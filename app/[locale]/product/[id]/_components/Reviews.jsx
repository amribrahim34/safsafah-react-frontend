'use client';

import React, { useState } from "react";
import { Star, User } from "lucide-react";

/**
 * StarRow – a row of ★ icons for a given rating.
 */
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`}
        />
      ))}
    </div>
  );
}

/**
 * ReviewCard – a single review item.
 */
function ReviewCard({ review, lang }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(review.createdAt).toLocaleDateString(
    lang === "ar" ? "ar-EG" : "en-EG",
    { day: "2-digit", month: "short", year: "numeric" }
  );
  const isLong = review.comment?.length > 120;

  return (
    <article className="snap-center flex-shrink-0 w-[85%] max-w-sm md:max-w-none md:min-w-[260px] rounded-2xl border border-neutral-200 p-3 bg-white">
      <header className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
          <User className="w-5 h-5 text-neutral-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-sm truncate">{review.userName}</div>
          <div className="text-[11px] text-neutral-500">{date}</div>
        </div>
        <div className="ms-auto">
          <StarRow rating={review.rating} />
        </div>
      </header>

      <p className={`text-sm mt-2 ${expanded ? "" : "line-clamp-3"}`}>
        {review.comment}
      </p>

      {isLong && (
        <button
          className="mt-1 text-xs underline text-neutral-700"
          onClick={() => setExpanded((v) => !v)}
          type="button"
        >
          {expanded
            ? lang === "ar" ? "عرض أقل" : "Show less"
            : lang === "ar" ? "اقرأ المزيد" : "Read more"}
        </button>
      )}
    </article>
  );
}

/**
 * Reviews
 * Horizontally-scrollable list of customer reviews.
 *
 * @param {Object} brand
 * @param {string} lang     - "ar" | "en"
 * @param {Array}  reviews
 */
export default function Reviews({ brand, lang, reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="text-center py-8 text-neutral-500">
        {lang === "ar" ? "لا توجد مراجعات بعد" : "No reviews yet"}
      </div>
    );
  }

  return (
    <div className="relative -mx-4 md:mx-0">
      <div
        className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0"
        style={{ maxWidth: "100vw" }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} lang={lang} />
        ))}
      </div>
    </div>
  );
}
