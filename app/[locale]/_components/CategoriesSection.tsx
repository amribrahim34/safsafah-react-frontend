'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { homeService } from "@/lib/api/services";
import SectionHeader from "./SectionHeader";
import { env } from "@/config/env";
import type { HomeCategory } from "@/types";
import { useParams } from "next/navigation";
import { getLocalizedPath } from '@/lib/locale-navigation';

export default function CategoriesSection() {
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await homeService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
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
      <section className="mx-auto px-4 py-4">
        <div className="text-center text-red-600">
          {lang === "ar" ? "فشل تحميل الفئات" : "Failed to load categories"}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mx-auto px-4 py-4">
        <SectionHeader title={lang === "ar" ? "تسوق حسب الفئة" : "Shop by category"} titleSize="base" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden border border-neutral-200 h-44 bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto px-4 py-4">
      <SectionHeader title={lang === "ar" ? "تسوق حسب الفئة" : "Shop by category"} titleSize="base" viewAllHref={getLocalizedPath('/catalog', lang)} viewAllText={lang === "ar" ? "الكل" : "View all"} />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((category) => {
          const categoryName = lang === "ar" ? category.nameAr : category.nameEn;
          const imageUrl = getImageUrl(category.image);

          return (
            <Link
              key={category.id}
              href={getLocalizedPath(`/catalog?categoryId=${category.id}`, lang)}
              className="relative rounded-2xl overflow-hidden border border-neutral-200"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={categoryName}
                  className="w-full h-28 lg:h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-400">
                    {lang === "ar" ? "لا توجد صورة" : "No image"}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white font-semibold text-sm lg:text-lg">
                {categoryName}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
