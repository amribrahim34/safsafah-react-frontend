import ProductCard from "@/components/products/ProductCard";

interface BrandColors {
  primary: string;
  dark: string;
  light: string;
}

interface ProductGridItem {
  id: number;
  nameAr: string;
  nameEn: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountPercentage?: number;
  finalPrice?: number;
  brand?: {
    id?: number;
    nameAr?: string;
    nameEn?: string;
    name_ar?: string;
    name_en?: string;
  };
  slugAr?: string;
  slugEn?: string;
  rating?: number;
  averageRating?: number;
  isRecommended?: boolean;
  isInWishlist?: boolean;
}

interface ProductGridProps {
  products: ProductGridItem[];
  brand: BrandColors;
}

export default function ProductGrid({ products, brand }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {products.map(p => {
        // Extract product brand name before spreading so it isn't
        // overridden by the site `brand` (colors) prop passed below.
        const brandNameAr = p.brand?.nameAr ?? p.brand?.name_ar;
        const brandNameEn = p.brand?.nameEn ?? p.brand?.name_en;
        const brandId = p.brand?.id;

        return (
          <ProductCard
            key={p.id}
            {...p}
            brandId={brandId}
            brandNameAr={brandNameAr}
            brandNameEn={brandNameEn}
            brand={brand}
          />
        );
      })}
    </div>
  );
}
