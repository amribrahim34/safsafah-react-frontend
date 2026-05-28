'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { homeService } from "@/lib/api/services";
import SectionHeader from "./SectionHeader";
import { env } from "@/config/env";
import type { HomeBrand } from "@/types";
import { useParams } from "next/navigation";
import { getLocalizedPath } from '@/lib/locale-navigation';

export default function BrandsSection() {
  const [brands, setBrands] = useState<HomeBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

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
      <section className=" mx-auto px-4 py-6">
        <div className="text-center text-red-600">
          {lang === "ar" ? "فشل تحميل العلامات التجارية" : "Failed to load brands"}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className=" mx-auto px-4 py-6">
        <SectionHeader title={lang === "ar" ? "تسوق حسب العلامة التجارية" : "Shop by brand"} titleSize="base" />
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
    <section className=" mx-auto px-4 py-6">
      <SectionHeader title={lang === "ar" ? "تسوق حسب العلامة التجارية" : "Shop by brand"} viewAllHref={getLocalizedPath('/catalog', lang)} viewAllText={lang === "ar" ? "الكل" : "View all"} titleSize="base" />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {brands.map((brand) => {
          const brandName = lang === "ar" ? brand.nameAr : brand.nameEn;
          const logoUrl = getImageUrl(brand.logo);

          return (
            <Link
              key={brand.id}
              href={getLocalizedPath(`/catalog?brandIds=${brand.id}`, lang)}
              className="bg-white rounded-lg border border-neutral-200 p-4 hover:shadow-md transition-shadow flex items-center justify-center"
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={brandName}
                  width={120}
                  height={64}
                  className="object-contain max-h-16 max-w-full"
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
