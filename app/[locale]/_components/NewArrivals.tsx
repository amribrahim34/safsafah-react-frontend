'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import ProductGrid from "./ProductGrid";
import SectionHeader from "./SectionHeader";
import { homeService } from "@/lib/api/services";
import type { HomeProduct } from "@/types";
import { getLocalizedPath } from '@/lib/locale-navigation';

interface NewArrivalsProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
  lang?: string;
}

export default function NewArrivals({ brand }: NewArrivalsProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  const { t } = useTranslation('home');
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await homeService.getNewArrivals();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch new arrivals:', err);
        setError(err instanceof Error ? err.message : 'Failed to load new arrivals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (error) {
    return (
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {lang === "ar" ? "فشل تحميل المنتجات الجديدة" : "Failed to load new arrivals"}
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title={t('newArrivals.title')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-neutral-200 h-80 animate-pulse"
              />
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
        <SectionHeader title={t('newArrivals.title')} titleSize="base" viewAllHref={getLocalizedPath('/catalog', lang)} viewAllText={t('newArrivals.viewAll')} viewAllColor={brand.primary} />
        <ProductGrid products={products} brand={brand} />
      </div>
    </section>
  );
}
