'use client';

import React, { useState, useEffect } from "react";
import { ShieldCheck, Truck, RotateCcw, HandCoins } from "lucide-react";
import BrandCard from "../../common/BrandCard";
import type { HomeBrand } from "@/types";

interface BrandTrustProps {
  brand: {
    primary: string;
    dark?: string;
    light?: string;
  };
  lang?: 'ar' | 'en';
}


export default function BrandTrust({ brand, lang = "ar" }: BrandTrustProps) {
  const [brands, setBrands] = useState<HomeBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/api/brands`);
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const Badge = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2">
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-lg md:text-xl font-extrabold mb-4">
        {lang === 'ar' ? 'العلامات التجارية الموثوقة' : 'Trusted Brands'}
      </h3>

      {/* Brands Logos */}
      <div className="relative -mx-4 md:mx-0">
        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4">
          {brands.length > 0 ? (
            // Display brands (limit to 4 for mobile/desktop grid)
            brands.slice(0, 4).map((brandItem) => (
              <BrandCard
                key={brandItem.id}
                brand={brandItem}
                size="md"
                lang={lang}
                clickable={true}
              />
            ))
          ) : (
            // Empty state - show placeholder cards
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="snap-center min-w-[48%] md:min-w-0 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-200" />
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-24" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Badge 
          icon={ShieldCheck} 
          label={lang === 'ar' ? 'منتجات أصلية' : 'Authentic Products'} 
        />
        <Badge 
          icon={Truck} 
          label={lang === 'ar' ? 'شحن سريع' : 'Fast Delivery'} 
        />
        <Badge 
          icon={HandCoins} 
          label={lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'} 
        />
        <Badge 
          icon={RotateCcw} 
          label={lang === 'ar' ? 'إرجاع سهل' : 'Easy Returns'} 
        />
      </div>
    </section>
  );
}
