import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import type { ReviewItem } from '../_types';

interface VichyNormadermTestimonialsProps {
  reviews: ReviewItem[];
  lang: string;
}

const NOON_RATING_DISTRIBUTION = [
  { stars: 5, percent: 81 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 5 },
];

export const VichyNormadermTestimonials: React.FC<VichyNormadermTestimonialsProps> = ({
  reviews,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-14 bg-white border-t border-neutral-100" id="customer-reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'آراء حقيقية لمشتريات موثقة · نون مصر' : 'Verified Buyer Reviews · Noon Egypt'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'تجارب المستخدمين مع فيشي نورماديرم فيتوسوليوشن'
              : 'What Verified Buyers Say About Vichy Normaderm'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        {/* Rating Summary Card (from Noon Egypt verified ratings) */}
        <div className="max-w-3xl mx-auto mb-10 rounded-3xl bg-stone-50/80 border border-neutral-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 text-center sm:border-e border-neutral-200 sm:pe-5">
              <div className="text-4xl font-black text-neutral-900 tabular-nums" dir="ltr">
                4.6 <span className="text-lg font-bold text-neutral-400">/ 5</span>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-amber-300/70 text-amber-300'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-neutral-600">
                {isAr
                  ? 'بناءً على 6,259 تقييم من مشترين موثقين (نون)'
                  : 'Based on 6,259 ratings from verified buyers (Noon)'}
              </p>
            </div>

            <div className="sm:col-span-7 space-y-1.5">
              {NOON_RATING_DISTRIBUTION.map((row) => (
                <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                  <span className="w-8 text-end font-bold text-neutral-700 tabular-nums shrink-0" dir="ltr">
                    {row.stars} ★
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-700"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-end font-semibold text-neutral-500 tabular-nums shrink-0" dir="ltr">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Cards: horizontal snap strip on mobile, 2/3-col grid on md+ */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[82vw] sm:min-w-[330px] md:min-w-0 snap-center bg-neutral-50/70 p-5 sm:p-6 rounded-3xl border border-neutral-100 hover:border-teal-200 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-teal-200/60 absolute top-5 end-5 -scale-x-100" />
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                </div>

                {rev.highlightAr && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100/70 text-teal-800 mb-2">
                    {isAr ? rev.highlightAr : rev.highlightEn}
                  </span>
                )}

                <h3 className="text-sm font-bold text-neutral-900 mb-2 leading-snug">
                  {isAr ? rev.titleAr : rev.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  &ldquo;{isAr ? rev.commentAr : rev.commentEn}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-neutral-900 flex items-center gap-1 truncate">
                    <span dir="ltr">{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">
                    {isAr ? rev.cityAr : rev.cityEn} · {isAr ? rev.date : rev.dateEn || rev.date}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                  {rev.sourceAr
                    ? isAr
                      ? `شراء مؤكد · ${rev.sourceAr}`
                      : `Verified · ${rev.sourceEn}`
                    : isAr
                    ? 'شراء مؤكد'
                    : 'Verified Buyer'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VichyNormadermTestimonials;
