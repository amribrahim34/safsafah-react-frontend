import React from "react";
import { useTranslation } from "react-i18next";
import ProductGrid from "../../products/ProductGrid";

export default function NewArrivals({ brand, lang = "ar", products = [] }) {
  const { t } = useTranslation('home');

  return (
    <section className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-extrabold">
            {t('newArrivals.title')}
          </h2>
          <a href="/catalog" className="font-semibold" style={{ color: brand.primary }}>
            {t('newArrivals.viewAll')}
          </a>
        </div>
        <ProductGrid products={products} lang={lang} brand={brand} />
      </div>
    </section>
  );
}
