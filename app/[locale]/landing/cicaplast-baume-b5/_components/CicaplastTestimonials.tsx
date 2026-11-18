'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import type { ReviewItem } from '../_types';

interface CicaplastTestimonialsProps {
  reviews: ReviewItem[];
  lang: string;
}

export const CicaplastTestimonials: React.FC<CicaplastTestimonialsProps> = ({ reviews, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-14 bg-white" id="customer-reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'تجارب حقيقية موثقة' : 'Verified Clinical Experiences'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'ماذا يقول عملاء صفصافة عن سيكابلاست بوم +B5؟'
              : 'What Safsafah Customers Say About Cicaplast B5+'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-50/70 p-6 rounded-3xl border border-neutral-100 hover:border-teal-200 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-teal-200/60 absolute top-5 end-5 -scale-x-100" />
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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

              <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1">
                    {rev.author}
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 inline" />
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {isAr ? rev.cityAr : rev.cityEn} · {rev.date}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {isAr ? 'شراء مؤكد' : 'Verified Buyer'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CicaplastTestimonials;
