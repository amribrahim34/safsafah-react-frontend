'use client';

/**
 * CicaplastOrderSection
 * Thin wrapper feeding Cicaplast Baume B5+ product meta into the shared LandingGuestOrderForm.
 */

import React from 'react';
import { LandingGuestOrderForm } from '@/components/landing/LandingGuestOrderForm';
import type { LandingProductMeta } from '@/components/landing/types';
import type { CicaplastProductData } from '../_types';

interface CicaplastOrderSectionProps {
  product: CicaplastProductData;
  lang: string;
}

const CicaplastOrderSection: React.FC<CicaplastOrderSectionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';

  const productMeta: LandingProductMeta = {
    id: product.id,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    price: product.price,
    originalPrice: product.originalPrice,
    unitLabelAr: 'عبوة سيكابلاست بوم +B5 بحجم 100 مل',
    unitLabelEn: 'Cicaplast Baume B5+ 100ml unit',
  };

  return (
    <LandingGuestOrderForm
      product={productMeta}
      lang={isAr ? 'ar' : 'en'}
      titleAr="اطلبي الآن والدفع عند الاستلام"
      titleEn="Order Now with Cash on Delivery"
      subtitleAr="املئي البيانات التالية وسنقوم بتوصيل طلبك حتى باب منزلك في تغليف سري ومحكم تماماً خلال 72 ساعة."
      subtitleEn="Fill in your details; our courier delivers right to your door in secure packaging within 72 hours."
    />
  );
};

export { CicaplastOrderSection };
export default CicaplastOrderSection;
