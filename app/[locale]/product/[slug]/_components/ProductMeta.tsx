import Stars from "@/components/ui/Stars";
import ProductBadges from "./ProductBadges";
import ShowReviewsButton from "./ShowReviewsButton";
import type { Product } from '@/types/models/product';
import type { BrandColors } from '../types';

interface ProductMetaProps {
  product: Product;
  brand: BrandColors;
  lang: string;
}

export default function ProductMeta({ product, brand, lang }: ProductMetaProps) {
  const title     = lang === "ar" ? product.nameAr     : product.nameEn;
  const brandName = lang === "ar" ? product.brand?.nameAr : product.brand?.nameEn;
  const price     = typeof product.price === "number" ? product.price : 0;
  const rating    = Number(product.averageRating ?? 0);
  const reviewCount = product.ratingCount ?? product.reviews?.length ?? 0;

  const priceFmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format;

  return (
    <div>
      {brandName && (
        <div className="text-sm font-bold mb-1" style={{ color: brand?.primary }}>
          {brandName}
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-extrabold leading-snug md:leading-snug">{title}</h1>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <Stars rating={rating} />

        {rating > 0 ? (
          <span className="text-sm text-neutral-600">
            {rating.toFixed(1)} · {reviewCount} {lang === "ar" ? "تقييم" : "ratings"}
          </span>
        ) : (
          <span className="text-sm text-neutral-400">
            {lang === "ar" ? "لا توجد تقييمات بعد" : "No ratings yet"}
          </span>
        )}

        <ShowReviewsButton lang={lang} reviewCount={reviewCount} />
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <div className="text-2xl font-black">{priceFmt(price)}</div>
      </div>

      {product.stock != null && (
        <div className="mt-1 text-sm">
          {lang === "ar"
            ? `المتاح بالمخزون: ${product.stock}`
            : `Only ${product.stock} left in stock!`}
        </div>
      )}

      <div className="mt-2 text-xs text-neutral-500">
        {lang === "ar" ? "رمز المنتج: " : "SKU: "}{product.sku}
      </div>

      <ProductBadges product={product} lang={lang} />
    </div>
  );
}
