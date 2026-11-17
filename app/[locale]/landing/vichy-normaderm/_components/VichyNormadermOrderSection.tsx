'use client';

/**
 * VichyNormadermOrderSection
 * Thin wrapper feeding Vichy Normaderm product meta into the shared LandingGuestOrderForm.
 */

import React from 'react';
import { LandingGuestOrderForm } from '@/components/landing/LandingGuestOrderForm';
import type { LandingProductMeta } from '@/components/landing/types';
import type { VichyNormadermProductData } from '../_types';

interface VichyNormadermOrderSectionProps {
  product: VichyNormadermProductData;
  lang: string;
}

const VichyNormadermOrderSection: React.FC<VichyNormadermOrderSectionProps> = ({
  product,
  lang,
}) => {
  const isAr = lang === 'ar';

  const productMeta: LandingProductMeta = {
    id: product.id,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    price: product.price,
    originalPrice: product.originalPrice,
    unitLabelAr: 'فيشي نورماديرم فيتوسوليوشن 200مل',
    unitLabelEn: 'Vichy Normaderm Phytosolution 200ml unit',
  };

  return (
    <LandingGuestOrderForm
      product={productMeta}
      lang={isAr ? 'ar' : 'en'}
      titleAr="اطلبي الآن والدفع عند الاستلام"
      titleEn="Order Now with Cash on Delivery"
      subtitleAr="املئي البيانات التالية وسنقوم بتوصيل طلبك حتى باب منزلك خلال 72 ساعة."
      subtitleEn="Fill in your details; our courier delivers right to your door within 72 hours."
    />
  );
};

export { VichyNormadermOrderSection };
export default VichyNormadermOrderSection;
