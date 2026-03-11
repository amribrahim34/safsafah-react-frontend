'use client';

import type { Language } from '@/types/models/common';

interface ProductDescriptionProps {
  descriptionAr?: string;
  descriptionEn?: string;
  lang: Language;
}

/**
 * ProductDescription
 * Full-width section rendered below the product hero.
 * Supports both plain text and rich HTML (e.g. from a WYSIWYG editor).
 */
export default function ProductDescription({
  descriptionAr,
  descriptionEn,
  lang,
}: ProductDescriptionProps) {
  const description = lang === 'ar' ? descriptionAr : descriptionEn;

  if (!description) return null;

  const isRichText = /<[a-z][\s\S]*>/i.test(description);

  return (
    <section className=" mx-auto px-4 py-10 border-t border-neutral-100">
      {/* Section heading */}
      <div className="text-center mb-8">
        <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-1">
          {lang === 'ar' ? 'التفاصيل الكاملة' : 'Full Details'}
        </p>
        <h2 className="text-3xl font-bold text-neutral-900">
          {lang === 'ar' ? 'وصف المنتج' : 'Product Description'}
        </h2>
        <div className="mt-3 mx-auto w-12 h-0.5 bg-teal-600 rounded-full" />
      </div>

      {/* Body */}
      {isRichText ? (
        <div
          className="prose prose-neutral max-w-6xl mx-auto text-neutral-700 leading-relaxed"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <p
          className="max-w-6xl mx-auto text-neutral-700 leading-relaxed text-base"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {description}
        </p>
      )}
    </section>
  );
}
