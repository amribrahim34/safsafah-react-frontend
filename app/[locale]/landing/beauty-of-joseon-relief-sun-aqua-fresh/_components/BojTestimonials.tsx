import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { ReviewItem } from '../_types';

interface BojTestimonialsProps {
  reviews: ReviewItem[];
  lang: string;
}

export const BojTestimonials: React.FC<BojTestimonialsProps> = ({ reviews, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'تجارب عميلات صفصافة في مصر' : 'Verified Customer Reviews in Egypt'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'ماذا قالوا عن بيوتي أوف جوسون أكوا فريش؟'
              : 'What Customers Say About Relief Sun Aqua-fresh'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-stone-50/70 rounded-2xl p-6 border border-neutral-200/70 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {(rev.highlightAr || rev.highlightEn) && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-100">
                      {isAr ? rev.highlightAr : rev.highlightEn}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">
                  {isAr ? rev.titleAr : rev.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  &ldquo;{isAr ? rev.commentAr : rev.commentEn}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{rev.author}</div>
                  <div className="text-neutral-500">{isAr ? rev.cityAr : rev.cityEn}</div>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isAr ? 'شراء موثق' : 'Verified Buyer'}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BojTestimonials;
