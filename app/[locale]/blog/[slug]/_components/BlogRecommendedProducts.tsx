import type { Product } from '@/types/models/product';
import { BRAND } from '@/content/brand';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  products: Product[];
  locale: string;
  t: (key: string) => string;
}

export default function BlogRecommendedProducts({ products, locale, t }: Props) {
  if (products.length === 0) return null;

  return (
    <aside
      className="my-10 rounded-3xl bg-[#FAF7F2] border border-neutral-100 px-5 py-8 sm:px-8"
      aria-label={t('recommendedProducts')}
    >
      {/* Heading */}
      <div className="mb-6 text-center">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3"
          style={{ backgroundColor: BRAND.primary }}
        >
          {locale === 'ar' ? 'مختارة لكِ' : 'Curated for you'}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">
          {t('recommendedProducts')}
        </h2>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => (
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
            isInWishlist={product.isInWishlist}
            brand={BRAND}
          />
        ))}
      </div>
    </aside>
  );
}
