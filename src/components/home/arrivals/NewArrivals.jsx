import React from "react";
import ProductGrid from "../../products/ProductGrid";

export default function NewArrivals({ brand, lang = "ar", products = [] }) {
  return (
    <section className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-extrabold">
            {lang === "ar" ? "وصل حديثًا" : "New arrivals"}
          </h2>
          <a href="/catalog" className="font-semibold" style={{ color: brand.primary }}>
            {lang === "ar" ? "المزيد" : "View all"}
          </a>
        </div>
        <ProductGrid products={products} lang={lang} brand={brand} />
      </div>
    </section>
  );
}
