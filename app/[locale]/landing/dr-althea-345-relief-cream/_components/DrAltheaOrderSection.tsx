'use client';

import React from 'react';
import { LandingGuestOrderForm } from '@/components/landing/LandingGuestOrderForm';
import type { LandingProductMeta } from '@/components/landing/types';
import type { DrAlthea345ProductData } from '../_types';

interface DrAltheaOrderSectionProps {
  product: DrAlthea345ProductData;
  lang: string;
}

const DrAltheaOrderSection: React.FC<DrAltheaOrderSectionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';

  const productMeta: LandingProductMeta = {
    id: product.id,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    price: product.price,
    originalPrice: product.originalPrice,
    unitLabelAr: 'دكتور ألثيا كريم 345 ريليف 50 مل',
    unitLabelEn: 'Dr. Althea 345 Relief Cream 50ml unit',
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

export { DrAltheaOrderSection };
export default DrAltheaOrderSection;
