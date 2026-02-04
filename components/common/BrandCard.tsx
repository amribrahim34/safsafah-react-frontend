import React from "react";
import Link from "next/link";
import type { HomeBrand } from "@/types";

/**
 * BrandCard Component
 * A reusable card component for displaying brand logos and information
 * 
 * @param brand - HomeBrand object containing id, nameAr, nameEn, and logo
 * @param size - Size variant: 'sm', 'md', or 'lg' (default: 'md')
 * @param lang - Current language ('ar' or 'en')
 * @param clickable - Whether the card should be clickable/linkable (default: true)
 */

interface BrandCardProps {
  brand: HomeBrand;
  size?: 'sm' | 'md' | 'lg';
  lang?: 'ar' | 'en';
  clickable?: boolean;
}

export default function BrandCard({ 
  brand, 
  size = 'md', 
  lang = 'ar',
  clickable = true 
}: BrandCardProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'p-2',
      logo: 'w-8 h-8',
      text: 'text-xs',
    },
    md: {
      container: 'p-3',
      logo: 'w-10 h-10',
      text: 'text-sm',
    },
    lg: {
      container: 'p-4',
      logo: 'w-12 h-12',
      text: 'text-base',
    },
  };

  const config = sizeConfig[size];
  const brandName = lang === 'ar' ? brand.nameAr : brand.nameEn;

  const cardContent = (
    <>
      <div className={`${config.logo} rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0 bg-white`}>
        {brand.logo ? (
          <img 
            src={brand.logo} 
            alt={brandName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=f5f5f5&color=666`;
            }}
          />
        ) : (
          // Placeholder if no logo
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
            <span className="text-xs font-bold">{brandName.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-semibold truncate ${config.text}`}>
          {brandName}
        </div>
      </div>
    </>
  );

  const baseClasses = `
    snap-center min-w-[48%] md:min-w-0 
    rounded-2xl border border-neutral-200 bg-white 
    ${config.container} 
    flex items-center gap-3
    ${clickable ? 'hover:shadow-md hover:border-neutral-300 transition-all duration-200 cursor-pointer' : ''}
  `.trim();

  if (clickable) {
    return (
      <Link 
        href={`/brands/${brand.id}`}
        className={baseClasses}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {cardContent}
    </div>
  );
}
