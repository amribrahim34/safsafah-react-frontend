'use client';

/**
 * TetraGlowOrderSection
 *
 * Thin wrapper that feeds Tetra Glow-specific product metadata and bundle
 * pricing into the shared <LandingGuestOrderForm> component.
 *
 * To add another landing page, create a similar wrapper — no logic lives here.
 */

import React from 'react';
import { LandingGuestOrderForm } from '@/components/landing/LandingGuestOrderForm';
import type { LandingProductMeta } from '@/components/landing/types';
import type { TetraGlowProductData } from '../_types';

interface TetraGlowOrderSectionProps {
  product: TetraGlowProductData;
  lang: string;
}

const TetraGlowOrderSection: React.FC<TetraGlowOrderSectionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';

  // ── Product meta passed to the shared form ───────────────────────────────
  const productMeta: LandingProductMeta = {
    id: product.id,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    price: product.price,
    originalPrice: product.originalPrice,
    unitLabelAr: 'عبوة تيترا جلو 50 جم',
    unitLabelEn: 'Tetra Glow 50g unit',
  };

  return (
    <LandingGuestOrderForm
      product={productMeta}
      lang={isAr ? 'ar' : 'en'}
      titleAr="اطلبي الآن والدفع عند الاستلام"
      titleEn="Order Now with Cash on Delivery"
      subtitleAr="املئي البيانات التالية وسنقوم بتوصيل طلبك حتى باب منزلك في تغليف سري ومحكم تماماً."
      subtitleEn="Fill in your details; our courier delivers in 100% discreet packaging right to your door."
    />
  );
};

export { TetraGlowOrderSection };
export default TetraGlowOrderSection;
