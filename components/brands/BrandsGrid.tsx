import React from "react";
import { getBrandsServer } from "@/lib/api/server/brands";
import BrandCard from "../common/BrandCard";

/**
 * BrandsGrid Component (Server Component)
 * 
 * Displays all brands in a responsive grid layout.
 * Data is fetched server-side and cached for 3 hours.
 * Can be used on a dedicated brands page or as a section.
 */

interface BrandsGridProps {
  limit?: number;
  size?: 'sm' | 'md' | 'lg';
  columns?: 2 | 3 | 4 | 5 | 6;
  lang?: 'ar' | 'en';
}

export default async function BrandsGrid({ 
  limit, 
  size = 'md',
  columns = 4,
  lang = 'ar'
}: BrandsGridProps) {
  // Fetch brands server-side with 3-hour cache
  const allBrands = await getBrandsServer();
  
  // Get brands to display (all or limited)
  const brands = limit ? allBrands.slice(0, limit) : allBrands;
  
  // Grid column classes
  const gridColsClass: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          {lang === 'ar' ? 'تسوق حسب العلامة التجارية' : 'Shop by Brand'}
        </h2>
        <p className="text-neutral-600">
          {lang === 'ar' 
            ? 'اكتشف المنتجات من علاماتك التجارية المفضلة' 
            : 'Discover products from your favorite brands'
          }
        </p>
      </div>

      {brands.length > 0 ? (
        // Display brands
        <div className={`grid grid-cols-2 ${gridColsClass[columns]} gap-4`}>
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              size={size}
              lang={lang}
              clickable={true}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12 text-neutral-500">
          <p className="text-lg">
            {lang === 'ar' 
              ? 'لا توجد علامات تجارية متاحة في الوقت الحالي' 
              : 'No brands available at the moment'
            }
          </p>
        </div>
      )}
    </section>
  );
}
