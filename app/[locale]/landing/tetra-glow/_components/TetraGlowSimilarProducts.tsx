import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { productsService } from '@/lib/api/services/products.service';
import { BRAND } from '@/content/brand';
import type { Product } from '@/types/models/product';

interface TetraGlowSimilarProductsProps {
  lang: string;
  currentProductId?: number;
}

export default async function TetraGlowSimilarProducts({
  lang,
  currentProductId = 644,
}: TetraGlowSimilarProductsProps) {
  const isAr = lang === 'ar';

  let products: Product[] = [];
  try {
    // Category 6 is Brightening ("تفتيح") from product backend data
    const res = await productsService.getProducts({
      categoryIds: [6],
      limit: 6,
    });
    products = (res.products || []).filter((p) => p.id !== currentProductId).slice(0, 4);

    // Fallback if category search yielded few results
    if (products.length < 2) {
      const fallbackRes = await productsService.getProducts({ limit: 8 });
      products = (fallbackRes.products || []).filter((p) => p.id !== currentProductId).slice(0, 4);
    }
  } catch (error) {
    console.error('Failed to load similar products for Tetra Glow landing:', error);
    return null;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-14 bg-stone-50/70 border-t border-neutral-200/60" id="similar-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100/80 text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'عناية متكاملة' : 'Complete Routine'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {isAr ? 'منتجات تفتيح وعناية مشابهة' : 'Similar Brightening & Care Products'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600">
              {isAr
                ? 'منتجات مختارة بعناية لتكملة روتين العناية وتوحيد لون البشرة'
                : 'Handpicked products to complement your daily care and radiance routine'}
            </p>
          </div>

          <Link
            href={`/${lang}/catalog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-teal-700 text-teal-800 hover:bg-teal-700 hover:text-white transition-all text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap group"
          >
            <span>{isAr ? 'عرض جميع المنتجات' : 'View All Products'}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slugAr={product.slugAr}
              slugEn={product.slugEn}
              nameAr={product.nameAr}
              nameEn={product.nameEn}
              brandId={product.brand?.id}
              brandNameAr={product.brand?.nameAr}
              brandNameEn={product.brand?.nameEn}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              discountPercentage={product.discountPercentage}
              finalPrice={product.finalPrice}
              rating={product.averageRating}
              image={product.image}
              brand={BRAND}
            />
          ))}
        </div>

        {/* Mobile bottom button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={`/${lang}/catalog`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-bold text-sm shadow-xs"
          >
            <span>{isAr ? 'عرض جميع المنتجات في المتجر' : 'Browse All Store Products'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </section>
  );
}
