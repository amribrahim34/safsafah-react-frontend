'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import ProductGrid from "./ProductGrid";
import SectionHeader from "./SectionHeader";
import { productsService } from "@/lib/api/services";
import type { ProductFilters } from "@/types";
import type { Product } from "@/types";
import { getLocalizedPath } from '@/lib/locale-navigation';

interface HomeProductSectionProps {
  titleKey: string;
  viewAllKey: string;
  filters: ProductFilters;
  viewAllPath: string;
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

export default function HomeProductSection({ titleKey, viewAllKey, filters, viewAllPath, brand }: HomeProductSectionProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  const { t } = useTranslation('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const result = await productsService.getProducts({ ...filters, limit: 4, page: 1 });
        setProducts(result.products);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-neutral-50">
        <div className="px-4 py-8">
          <SectionHeader title={t(titleKey)} titleSize="base" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-neutral-200 h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-neutral-50">
      <div className="px-4 py-8">
        <SectionHeader
          title={t(titleKey)}
          titleSize="base"
          viewAllHref={getLocalizedPath(viewAllPath, lang)}
          viewAllText={t(viewAllKey)}
          viewAllColor={brand.primary}
        />
        <ProductGrid products={products} brand={brand} />
      </div>
    </section>
  );
}
