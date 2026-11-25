import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { productsService } from '@/lib/api/services/products.service';
import { BRAND } from '@/content/brand';
import type { Product } from '@/types/models/product';

interface DrAltheaSimilarProductsProps {
  lang: string;
  currentProductId?: number;
}

export default async function DrAltheaSimilarProducts({
  lang,
  currentProductId = 122,
}: DrAltheaSimilarProductsProps) {
  const isAr = lang === 'ar';

  let products: Product[] = [];
  try {
    const res = await productsService.getProducts({
      limit: 8,
    });
    products = (res.products || []).filter((p) => p.id !== currentProductId).slice(0, 4);
  } catch (error) {
    console.error('Failed to load similar products for Dr. Althea 345 landing:', error);
    return null;
  }

  if (!products || products.length === 0) return null;

  const ArrowIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <section className="py-14 bg-stone-50/70 border-t border-neutral-200/60" id="similar-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100/80 text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'أكملي روتينك الكوري' : 'Complete Your K-Beauty Routine'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {isAr ? 'منتجات عناية بالبشرة قد تعجبك أيضاً' : 'More Skincare Favorites You May Love'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600">
              {isAr
                ? 'منتجات أصلية 100٪ مختارة بعناية من صفصافة لتهدئة وترميم بشرتك'
                : '100% authentic skincare curated by Safsafah for healthy, calm skin'}
            </p>
          </div>

          <Link
            href={`/${lang}/catalog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 transition-colors flex-shrink-0"
          >
            {isAr ? 'تصفحي الكتالوج كاملاً' : 'Browse Full Catalog'}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
      </div>
    </section>
  );
}
