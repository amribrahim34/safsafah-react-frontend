'use client';

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductGrid from "./ProductGrid";
import SectionHeader from "./SectionHeader";
import { homeService } from "@/lib/api/services";
import type { HomeProduct } from "@/types";
import { useParams } from "next/navigation";
import { getLocalizedPath } from '@/lib/locale-navigation';

interface BestSellersProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

export default function BestSellers({ brand }: BestSellersProps) {
  const { t } = useTranslation('home');
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await homeService.getBestSellers();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch best sellers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load best sellers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (error) {
    return (
      <section className="bg-neutral-50">
        <div className=" mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {lang === "ar" ? "فشل تحميل الأكثر مبيعاً" : "Failed to load best sellers"}
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-neutral-50">
        <div className=" mx-auto px-4 py-8">
          <SectionHeader title={t('sections.trending')} titleSize="base" />
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
      <div className=" mx-auto px-4 py-8">
        <SectionHeader title={t('sections.trending')} titleSize="base" viewAllHref={getLocalizedPath('/catalog', lang)} viewAllText={t('sections.viewAll')} viewAllColor={brand.primary} />
        <ProductGrid products={products} brand={brand} />
      </div>
    </section>
  );
}
