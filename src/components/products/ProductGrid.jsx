import ProductCard from "./ProductCard";

export default function ProductGrid({ products, lang, brand }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} {...p} lang={lang} brand={brand} />
      ))}
    </div>
  );
}
