import ProductCard from "./ProductCard";

export default function ProductGrid({ products, lang, brand }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {products.map(p => {
        // Extract product brand name before spreading so it isn't
        // overridden by the site `brand` (colors) prop passed below.
        const brandNameAr = p.brand?.nameAr ?? p.brand?.name_ar;
        const brandNameEn = p.brand?.nameEn ?? p.brand?.name_en;

        return (
          <ProductCard
            key={p.id}
            {...p}
            brandNameAr={brandNameAr}
            brandNameEn={brandNameEn}
            lang={lang}
            brand={brand}
          />
        );
      })}
    </div>
  );
}

