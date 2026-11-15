'use client';

import React, { useState } from 'react';
import { Truck, ShieldCheck, CheckCircle2, Lock, Sparkles, Send } from 'lucide-react';
import type { TetraGlowProductData } from '../_types';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, addLocalCartItem } from '@/store/slices/cartsSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import posthog from 'posthog-js';
import { addToCart as fbAddToCart, initiateCheckout as fbInitiateCheckout } from '@/lib/fbpixel';

interface TetraGlowOrderSectionProps {
  product: TetraGlowProductData;
  lang: string;
}

export const TetraGlowOrderSection: React.FC<TetraGlowOrderSectionProps> = ({ product, lang }) => {
  const [selectedBundle, setSelectedBundle] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('cairo');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isAr = lang === 'ar';

  const priceFmt = (val: number) =>
    new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);

  // Bundle Pricing structures
  const bundles = {
    1: {
      units: 1,
      price: product.price, // 295
      originalPrice: product.originalPrice, // 420
      shipping: 35,
      badgeAr: 'الأكثر طلباً',
      badgeEn: 'Popular Choice',
    },
    2: {
      units: 2,
      price: 540, // 270 each
      originalPrice: 840,
      shipping: 20,
      badgeAr: 'وفّري 50 ج إضافية',
      badgeEn: 'Save Extra 50 EGP',
    },
    3: {
      units: 3,
      price: 750, // 250 each
      originalPrice: 1260,
      shipping: 0,
      badgeAr: 'شحن مجاني + أفضل توفير',
      badgeEn: 'FREE Shipping + Best Value',
    },
  };

  const currentBundle = bundles[selectedBundle];
  const totalPrice = currentBundle.price + (currentBundle.shipping > 0 ? currentBundle.shipping : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      Swal.fire({
        icon: 'warning',
        title: isAr ? 'يرجى استكمال البيانات' : 'Incomplete Details',
        text: isAr
          ? 'يرجى كتابة الاسم ورقم الهاتف والعنوان لتأكيد طلبك'
          : 'Please provide your name, phone number, and address to confirm the order',
        confirmButtonColor: '#288880',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sync to Redux Cart
      if (isAuthenticated) {
        await dispatch(
          addToCart({ productId: product.id, quantity: currentBundle.units })
        ).unwrap();
      } else {
        const currentItems = localStorageManager.getCartItems();
        const existing = currentItems.find((i) => i.productId === product.id);
        if (existing) {
          existing.quantity += currentBundle.units;
        } else {
          currentItems.push({ productId: product.id, quantity: currentBundle.units });
        }
        localStorageManager.setCartItems(currentItems);
        dispatch(addLocalCartItem(product.id));
      }

      // Track analytics across PostHog and Meta Pixel
      posthog.capture('product_added_to_cart', {
        product_id: product.id,
        product_name_en: product.nameEn,
        product_name_ar: product.nameAr,
        price: currentBundle.price,
        quantity: currentBundle.units,
      });

      fbAddToCart(
        {
          id: product.id,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          price: product.price,
        },
        currentBundle.units
      );

      posthog.capture('checkout_started', {
        product_id: product.id,
        cart_total: totalPrice,
        item_count: currentBundle.units,
      });

      fbInitiateCheckout(totalPrice, currentBundle.units);

      // Trigger the existing application mini-cart drawer event
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('open-mini-cart'));
      }

      // Simulate instantaneous order confirmation (Express COD)
      await new Promise((resolve) => setTimeout(resolve, 800));

      Swal.fire({
        icon: 'success',
        title: isAr ? 'تم تأكيد طلبك بنجاح! 🎉' : 'Order Confirmed Successfully! 🎉',
        html: `
          <div style="font-size: 14px; text-align: ${isAr ? 'right' : 'left'}; line-height: 1.8;">
            <p><strong>${isAr ? 'العميلة الكريمة:' : 'Customer:'}</strong> ${name}</p>
            <p><strong>${isAr ? 'رقم الهاتف:' : 'Phone:'}</strong> ${phone}</p>
            <p><strong>${isAr ? 'الكمية:' : 'Package:'}</strong> ${currentBundle.units} ${isAr ? 'عبوة تيترا جلو 50 جم' : 'units Tetra Glow 50g'}</p>
            <p><strong>${isAr ? 'الإجمالي المطلوب عند الاستلام:' : 'Total COD Amount:'}</strong> ${priceFmt(totalPrice)}</p>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #e5e5e5;" />
            <p style="color: #047857; font-weight: bold;">
              ${isAr ? 'سيصلك اتصال من فريق خدمة عملاء صفصافة لتأكيد موعد التسليم وسرعة الشحن.' : 'Our customer support team will contact you shortly to coordinate express delivery.'}
            </p>
          </div>
        `,
        confirmButtonText: isAr ? 'تم، شكراً لكم' : 'Great, Thank you',
        confirmButtonColor: '#288880',
      });

      // Clear fields
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
    } catch {
      Swal.fire({
        icon: 'error',
        title: isAr ? 'حدث خطأ غير متوقع' : 'Unexpected error',
        text: isAr ? 'يرجى المحاولة مرة أخرى' : 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 bg-white" id="express-order-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-50/60 via-white to-stone-50 p-6 sm:p-10 rounded-3xl border border-teal-200/80 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'طلب سريع بدون تسجيل دخول' : 'Express Checkout (No Login Needed)'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {isAr ? 'اطلبي الآن والدفع عند الاستلام' : 'Order Now with Cash on Delivery'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600">
              {isAr
                ? 'املئي البيانات التالية وسنقوم بتوصيل طلبك حتى باب منزلك في تغليف سري ومحكم تماماً.'
                : 'Fill in your details below; our courier will deliver in 100% discreet packaging right to your door.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Bundle */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-3">
                {isAr ? '١. اختاري العرض المناسب لكِ:' : '1. Choose Your Preferred Offer:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([1, 2, 3] as const).map((b) => {
                  const item = bundles[b];
                  const isSelected = selectedBundle === b;
                  return (
                    <div
                      key={b}
                      onClick={() => setSelectedBundle(b)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-teal-700 bg-white shadow-md ring-2 ring-teal-700/20'
                          : 'border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300'
                      }`}
                    >
                      {item.badgeAr && (
                        <span
                          className={`absolute -top-2.5 start-3 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            b === 3
                              ? 'bg-emerald-600 text-white'
                              : b === 2
                              ? 'bg-teal-700 text-white'
                              : 'bg-neutral-800 text-white'
                          }`}
                        >
                          {isAr ? item.badgeAr : item.badgeEn}
                        </span>
                      )}

                      <div className="text-center pt-2">
                        <div className="font-bold text-sm sm:text-base text-neutral-900">
                          {b === 1
                            ? isAr
                              ? 'عبوة واحدة (50 جم)'
                              : '1 Unit (50g)'
                            : b === 2
                            ? isAr
                              ? 'عبوتان (100 جم)'
                              : '2 Units (100g)'
                            : isAr
                            ? '٣ عبوات (150 جم)'
                            : '3 Units (150g)'}
                        </div>
                        <div className="mt-2 text-xl font-black text-teal-800">
                          {priceFmt(item.price)}
                        </div>
                        <div className="text-xs text-neutral-400 line-through">
                          {priceFmt(item.originalPrice)}
                        </div>
                        <div className="mt-2 text-[11px] font-medium text-neutral-600">
                          {item.shipping === 0 ? (
                            <span className="text-emerald-700 font-bold">
                              {isAr ? 'شحن مجاني' : 'Free Shipping'}
                            </span>
                          ) : (
                            <span>
                              {isAr ? `الشحن: ${priceFmt(item.shipping)}` : `Shipping: ${priceFmt(item.shipping)}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Shipping Details */}
            <div className="space-y-4 pt-2">
              <label className="block text-xs sm:text-sm font-bold text-neutral-800">
                {isAr ? '٢. بيانات الاستلام والتوصيل:' : '2. Delivery & Contact Details:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: سارة محمد' : 'e.g. Sarah Mohamed'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {isAr ? 'رقم الهاتف (واتساب متاح) *' : 'Phone Number (WhatsApp active) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isAr ? '01xxxxxxxxx' : '01xxxxxxxxx'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white text-start"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {isAr ? 'المحافظة *' : 'Governorate *'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white"
                  >
                    <option value="cairo">{isAr ? 'القاهرة' : 'Cairo'}</option>
                    <option value="giza">{isAr ? 'الجيزة' : 'Giza'}</option>
                    <option value="alexandria">{isAr ? 'الإسكندرية' : 'Alexandria'}</option>
                    <option value="sharqia">{isAr ? 'الشرقية' : 'Sharqia'}</option>
                    <option value="dakahlia">{isAr ? 'الدقهلية' : 'Dakahlia'}</option>
                    <option value="gharbia">{isAr ? 'الغربية' : 'Gharbia'}</option>
                    <option value="qalyubia">{isAr ? 'القليوبية' : 'Qalyubia'}</option>
                    <option value="monufia">{isAr ? 'المنوفية' : 'Monufia'}</option>
                    <option value="beheira">{isAr ? 'البحيرة' : 'Beheira'}</option>
                    <option value="ismailia">{isAr ? 'الإسماعيلية' : 'Ismailia'}</option>
                    <option value="port_said">{isAr ? 'بورسعيد' : 'Port Said'}</option>
                    <option value="suez">{isAr ? 'السويس' : 'Suez'}</option>
                    <option value="other">{isAr ? 'باقي محافظات مصر' : 'Other Governorates'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {isAr ? 'العنوان بالتفصيل (المنطقة / الشارع / العمارة) *' : 'Full Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAr ? 'مثال: المعادي، شارع النصر، عمارة 12' : 'e.g. Maadi, Street 9, Bldg 12'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isAr ? 'ملاحظات إضافية للتوصيل (اختياري)' : 'Delivery Notes (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: التوصيل بعد الساعة 3 عصراً' : 'e.g. Please deliver after 3 PM'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white"
                />
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl bg-white border border-teal-100 flex items-center justify-between text-sm">
              <span className="font-bold text-neutral-700">
                {isAr ? 'الإجمالي عند الاستلام (شامل الشحن):' : 'Total COD Amount (inc. shipping):'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-teal-800">
                {priceFmt(totalPrice)}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] shadow-lg shadow-teal-700/25 transition-all text-center flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>
                {isSubmitting
                  ? isAr
                    ? 'جاري تأكيد طلبك...'
                    : 'Confirming your order...'
                  : isAr
                  ? 'تأكيد الطلب الآن (الدفع عند الاستلام)'
                  : 'Confirm Order Now (Cash on Delivery)'}
              </span>
            </button>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Truck className="w-4 h-4 text-teal-600" />
                {isAr ? 'توصيل خلال 24-48 ساعة' : 'Delivery in 24-48h'}
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-4 h-4 text-teal-600" />
                {isAr ? 'تغليف سري محمي تماماً' : '100% Discreet Package'}
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                {isAr ? 'معاينة المنتج قبل الدفع' : 'Inspect Before Paying'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TetraGlowOrderSection;
