import type { Product } from '@/types/models/product';
import { PRODUCT_SENTINEL } from '../_lib/preprocessHtml';
import BlogRecommendedProducts from './BlogRecommendedProducts';

interface Props {
  html: string;
  locale: string;
  recommendedProducts: Product[];
  t: (key: string) => string;
}

export default function BlogPostContent({ html, locale, recommendedProducts, t }: Props) {
  const isRTL = locale === 'ar';

  // Split on product sentinel to interleave product blocks
  const sentinelPattern = new RegExp(`<div ${PRODUCT_SENTINEL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}></div>`, 'gi');
  const parts = html.split(sentinelPattern);

  return (
    <article
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-w-0"
    >
      {parts.map((part, idx) => (
        <div key={idx}>
          <div
            className={[
              'prose prose-lg max-w-none',
              'prose-headings:font-bold prose-headings:text-neutral-900',
              'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4',
              'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
              'prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-5',
              'prose-a:text-brand prose-a:no-underline hover:prose-a:underline',
              'prose-strong:text-neutral-900',
              'prose-img:rounded-2xl prose-img:shadow-md',
              'prose-blockquote:border-s-4 prose-blockquote:border-brand prose-blockquote:bg-[#FAF7F2] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-e-xl prose-blockquote:text-neutral-700 prose-blockquote:not-italic',
              'prose-ul:list-disc prose-ol:list-decimal',
              'prose-li:text-neutral-700',
              isRTL ? 'text-right' : 'text-left',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: part }}
          />
          {/* Insert product block between content sections (not after the last part) */}
          {idx < parts.length - 1 && recommendedProducts.length > 0 && (
            <BlogRecommendedProducts
              products={recommendedProducts}
              locale={locale}
              t={t}
            />
          )}
        </div>
      ))}
    </article>
  );
}
