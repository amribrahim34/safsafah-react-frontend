import ImageGallery from "./ImageGallery";
import AddToCartControls from "./AddToCartControls";
import AuthGatedReview from "./AuthGatedReview";
import ProductMeta from "./ProductMeta";
import type { Product } from '@/types/models/product';
import type { BrandColors, LocalReview } from '../types';

interface ProductHeroProps {
  product: Product;
  brand: BrandColors;
  lang: string;
  reviews: LocalReview[];
}

export default function ProductHero({ product, brand, lang, reviews }: ProductHeroProps) {
  const title = lang === "ar" ? product.nameAr : product.nameEn;
  const images = product.image
    ? [{ src: product.image, alt: title ?? "" }]
    : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      <ImageGallery images={images} brand={brand} />

      <div>
        <ProductMeta product={product} brand={brand} lang={lang} />

        <AddToCartControls product={product} brand={brand} lang={lang} />

        <AuthGatedReview product={product} brand={brand} lang={lang} reviews={reviews} />
      </div>
    </section>
  );
}
