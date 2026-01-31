'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { homeService } from "@/lib/api/services";
import { env } from "@/config/env";
import type { HomeBrand } from "@/types";

interface BrandsSectionProps {
  lang: string;
}

export default function BrandsSection({ lang }: BrandsSectionProps) {
  const [brands, setBrands] = useState<HomeBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await homeService.getBrands();
        setBrands(data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError(err instanceof Error ? err.message : 'Failed to load brands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const getImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || '';
    return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-red-600">
          {lang === "ar" ? "فشل تحميل العلامات التجارية" : "Failed to load brands"}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-extrabold">
            {lang === "ar" ? "تسوق حسب العلامة التجارية" : "Shop by brand"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-neutral-200 p-4 h-24 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-extrabold">
          {lang === "ar" ? "تسوق حسب العلامة التجارية" : "Shop by brand"}
        </h2>
        <Link href="/catalog" className="font-semibold">
          {lang === "ar" ? "الكل" : "View all"}
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {brands.map((brand) => {
          const brandName = lang === "ar" ? brand.nameAr : brand.nameEn;
          const logoUrl = getImageUrl(brand.logo);

          return (
            <Link
              key={brand.id}
              href={`/catalog?brandId=${brand.id}`}
              className="bg-white rounded-lg border border-neutral-200 p-4 hover:shadow-md transition-shadow flex items-center justify-center"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="max-w-full max-h-16 object-contain"
                />
              ) : (
                <span className="text-sm font-semibold text-neutral-700">
                  {brandName}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
