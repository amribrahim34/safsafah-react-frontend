'use client';

import React, { useState } from 'react';
import { Truck, ShieldCheck, Lock, Sparkles, Send } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/store/hooks';
import { setAuthData, fetchUserProfile } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartsSlice';
import { ordersService, ApiException } from '@/lib/api';
import type { User } from '@/types';
import posthog from 'posthog-js';
import { addToCart as fbAddToCart, initiateCheckout as fbInitiateCheckout } from '@/lib/fbpixel';
import { BundleSelector, FieldError, inputCls } from './BundleSelector';
import {
  calculateShipping,
  type LandingBundle,
  type LandingProductMeta,
  type LandingLang,
} from './types';

// ─── Egyptian mobile: 010/011/012/015 + 8 digits ─────────────────────────────
const EG_PHONE_REGEX = /^(010|011|012|015)\d{8}$/;

interface FieldErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export interface LandingGuestOrderFormProps {
  /** Product metadata used for the API call and confirmation copy */
  product: LandingProductMeta;
  /** Optional bundle definitions — if omitted, orders a single product unit directly */
  bundles?: Record<1 | 2 | 3, LandingBundle>;
  lang: LandingLang;
  /** Section heading (localised outside) */
  titleAr?: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
}

/**
 * Reusable express Cash-on-Delivery guest order form for landing pages.
 *
 * Usage:
 * ```tsx
 * <LandingGuestOrderForm product={meta} lang="ar" />
 * ```
 */
export const LandingGuestOrderForm: React.FC<LandingGuestOrderFormProps> = ({
  product,
  bundles,
  lang,
  titleAr = 'اطلبي الآن والدفع عند الاستلام',
  titleEn = 'Order Now with Cash on Delivery',
  subtitleAr = 'املئي البيانات التالية وسنقوم بتوصيل طلبك حتى باب منزلك في تغليف سري ومحكم تماماً.',
  subtitleEn = 'Fill in your details below; our courier will deliver in 100% discreet packaging right to your door.',
}) => {
  const isAr = lang === 'ar';

  const [selectedBundle, setSelectedBundle] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const priceFmt = (val: number) =>
    new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);

  const hasBundles = !!bundles;
  const currentBundle = bundles ? bundles[selectedBundle] : null;
  const units = currentBundle ? currentBundle.units : 1;
  const subtotal = currentBundle ? currentBundle.price : product.price;
  const originalPrice = currentBundle ? currentBundle.originalPrice : product.originalPrice;
  // Apply standard free shipping logic: 50 EGP standard, free if subtotal >= 2000
  const shipping = currentBundle
    ? currentBundle.shipping
    : calculateShipping(subtotal);
  const totalPrice = subtotal + (shipping > 0 ? shipping : 0);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\s/g, '');
    const cleanAddress = address.trim();

    if (!cleanName) {
      errors.name = isAr ? 'الاسم الكامل مطلوب' : 'Full name is required';
    } else if (cleanName.length < 3) {
      errors.name = isAr ? 'يرجى إدخال الاسم كاملاً (3 أحرف على الأقل)' : 'Name must be at least 3 characters';
    }

    if (!cleanPhone) {
      errors.phone = isAr ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!EG_PHONE_REGEX.test(cleanPhone)) {
      errors.phone = isAr
        ? 'رقم الهاتف غير صحيح — يجب أن يبدأ بـ 010، 011، 012، أو 015'
        : 'Invalid — must start with 010, 011, 012, or 015';
    }

    // Address: just require non-empty with minimal length
    if (!cleanAddress) {
      errors.address = isAr ? 'العنوان مطلوب' : 'Address is required';
    } else if (cleanAddress.length < 5) {
      errors.address = isAr ? 'يرجى كتابة عنوانك بشكل أوضح' : 'Please enter a more complete address';
    }

    return errors;
  };

  // ── Clear individual field error on change ─────────────────────────────────
  const clearError = (key: keyof FieldErrors) =>
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstKey = Object.keys(errors)[0] as keyof FieldErrors;
      document.getElementById(`lg-field-${firstKey}`)?.focus();
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      // ── Analytics ───────────────────────────────────────────────────────
      posthog.capture('product_added_to_cart', {
        product_id: product.id,
        product_name_en: product.nameEn,
        product_name_ar: product.nameAr,
        price: subtotal,
        quantity: units,
        source: 'landing_express_form',
      });

      fbAddToCart(
        { id: product.id, nameEn: product.nameEn, nameAr: product.nameAr, price: subtotal },
        units
      );

      posthog.capture('checkout_started', {
        product_id: product.id,
        cart_total: totalPrice,
        item_count: units,
        source: 'landing_express_form',
      });

      fbInitiateCheckout(totalPrice, units);

      // ── Guest order API ─────────────────────────────────────────────────
      const result = await ordersService.guestOrder({
        customerName: name.trim(),
        customerMobile: phone.replace(/\s/g, ''),
        customerAddress: address.trim(),
        deliveryNotes: notes.trim() || undefined,
        paymentType: 'CASH_ON_DELIVERY',
        items: [{ product_id: product.id, quantity: units }],
      });

      // ── Log the user in with the returned session ───────────────────────
      const mappedUser: User = {
        id: result.user.id.toString(),
        name: result.user.name,
        email: result.user.email,
        phone: result.user.mobile,
        tier: 'Bronze',
        points: result.user.points,
        addresses: result.user.addresses,
      };
      dispatch(setAuthData({ user: mappedUser, token: result.token }));
      // Fetch the server cart and user profile after the guest order creates a session.
      // AuthSyncInitializer will also trigger on isAuthenticated change, but calling
      // fetchCart here ensures the cart is populated immediately without waiting.
      dispatch(fetchCart());
      dispatch(fetchUserProfile());

      posthog.capture('order_placed', {
        product_id: product.id,
        order_id: result.order?.id,
        cart_total: totalPrice,
        item_count: units,
        source: 'landing_express_form',
      });

      // ── Success dialog ──────────────────────────────────────────────────
      Swal.fire({
        icon: 'success',
        title: isAr ? 'تم تأكيد طلبك بنجاح! 🎉' : 'Order Confirmed Successfully! 🎉',
        html: `
          <div style="font-size:14px;text-align:${isAr ? 'right' : 'left'};line-height:1.8;">
            <p><strong>${isAr ? 'الاسم:' : 'Name:'}</strong> ${name.trim()}</p>
            <p><strong>${isAr ? 'رقم الهاتف:' : 'Phone:'}</strong> ${phone.replace(/\s/g, '')}</p>
            <p><strong>${isAr ? 'المنتج:' : 'Product:'}</strong> ${isAr ? product.nameAr : product.nameEn}</p>
            <p><strong>${isAr ? 'الكمية:' : 'Qty:'}</strong> ${units} ${isAr ? product.unitLabelAr : product.unitLabelEn}</p>
            <p><strong>${isAr ? 'سعر المنتج:' : 'Product Price:'}</strong> ${priceFmt(subtotal)}</p>
            <p><strong>${isAr ? 'الشحن:' : 'Shipping:'}</strong> ${shipping === 0 ? (isAr ? 'مجاني 🎉' : 'Free 🎉') : priceFmt(shipping)}</p>
            <p><strong>${isAr ? 'الإجمالي عند الاستلام:' : 'COD Total:'}</strong> ${priceFmt(totalPrice)}</p>
            <hr style="margin:10px 0;border:none;border-top:1px solid #e5e5e5;" />
            <p style="color:#047857;font-weight:bold;">
              ${isAr
                ? 'سيصلك اتصال من فريق خدمة عملاء صفصافة لتأكيد موعد التسليم.'
                : 'Our team will contact you shortly to confirm delivery.'}
            </p>
          </div>
        `,
        confirmButtonText: isAr ? 'تم، شكراً' : 'Great, Thank you',
        confirmButtonColor: '#288880',
      });

      // Reset form
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
      setSelectedBundle(1);
    } catch (err) {
      let message = isAr ? 'يرجى المحاولة مرة أخرى' : 'Please try again';

      if (err instanceof ApiException) {
        if (err.errors && Object.keys(err.errors).length > 0) {
          // Flatten all validation messages from the backend into a readable list
          message = Object.values(err.errors).flat().join('\n');
        } else {
          message = err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      Swal.fire({
        icon: 'error',
        title: isAr ? 'حدث خطأ' : 'Something went wrong',
        html: `<div style="white-space: pre-line; line-height: 1.6; text-align: ${isAr ? 'right' : 'left'}; font-size: 14px;">${message}</div>`,
        confirmButtonColor: '#288880',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 bg-white" id="express-order-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-50/60 via-white to-stone-50 p-6 sm:p-10 rounded-3xl border border-teal-200/80 shadow-md">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'طلب سريع بدون تسجيل دخول' : 'Express Checkout — No Login Needed'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {isAr ? titleAr : titleEn}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600">
              {isAr ? subtitleAr : subtitleEn}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {/* Optional Step 1 — Bundle selector (only shown when bundles are configured) */}
            {hasBundles && bundles && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-3">
                  {isAr ? '١. اختاري العرض المناسب لكِ:' : '1. Choose Your Preferred Offer:'}
                </label>
                <BundleSelector
                  bundles={bundles}
                  selected={selectedBundle}
                  onChange={setSelectedBundle}
                  lang={lang}
                  priceFmt={priceFmt}
                />
              </div>
            )}

            {/* Contact & delivery fields */}
            <div className="space-y-4 pt-1">
              <label className="block text-xs sm:text-sm font-bold text-neutral-800">
                {hasBundles
                  ? isAr
                    ? '٢. بيانات التواصل والتوصيل:'
                    : '2. Contact & Delivery Details:'
                  : isAr
                  ? 'بيانات التواصل والتوصيل:'
                  : 'Contact & Delivery Details:'}
              </label>

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="lg-field-name"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input
                    id="lg-field-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError('name'); }}
                    placeholder={isAr ? 'مثال: سارة محمد' : 'e.g. Sarah Mohamed'}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'lg-err-name' : undefined}
                    autoComplete="name"
                    className={inputCls(!!fieldErrors.name)}
                  />
                  <FieldError id="lg-err-name" message={fieldErrors.name} />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="lg-field-phone"
                    className="block text-xs font-semibold text-neutral-700 mb-1"
                  >
                    {isAr ? 'رقم الهاتف (واتساب) *' : 'Phone Number (WhatsApp) *'}
                  </label>
                  <input
                    id="lg-field-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearError('phone'); }}
                    placeholder="01xxxxxxxxx"
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? 'lg-err-phone' : undefined}
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={11}
                    className={inputCls(!!fieldErrors.phone)}
                  />
                  <FieldError id="lg-err-phone" message={fieldErrors.phone} />
                </div>
              </div>

              {/* Address — full width */}
              <div>
                <label
                  htmlFor="lg-field-address"
                  className="block text-xs font-semibold text-neutral-700 mb-1"
                >
                  {isAr ? 'عنوان التوصيل (المنطقة، الشارع، رقم المبنى) *' : 'Delivery Address *'}
                </label>
                <input
                  id="lg-field-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); clearError('address'); }}
                  placeholder={
                    isAr
                      ? 'مثال: القاهرة، المعادي، شارع النصر، عمارة 12'
                      : 'e.g. Cairo, Maadi, Street 9, Bldg 12'
                  }
                  aria-invalid={!!fieldErrors.address}
                  aria-describedby={fieldErrors.address ? 'lg-err-address' : undefined}
                  autoComplete="street-address"
                  className={inputCls(!!fieldErrors.address)}
                />
                <FieldError id="lg-err-address" message={fieldErrors.address} />
              </div>

              {/* Notes — optional */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isAr ? 'ملاحظات للتوصيل (اختياري)' : 'Delivery Notes (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: التوصيل بعد الساعة 3 عصراً'
                      : 'e.g. Please deliver after 3 PM'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm outline-none bg-white"
                />
              </div>
            </div>

            {/* Order summary box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-teal-100 space-y-2.5 text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div>
                  <span className="font-bold text-neutral-800">
                    {isAr ? product.nameAr : product.nameEn}
                  </span>
                  <div className="text-xs text-neutral-500">
                    {isAr ? product.unitLabelAr : product.unitLabelEn}
                  </div>
                </div>
                <div className="text-end">
                  <div className="font-extrabold text-neutral-900">
                    {priceFmt(subtotal)}
                  </div>
                  {originalPrice > subtotal && (
                    <div className="text-xs text-neutral-400 line-through">
                      {priceFmt(originalPrice)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-teal-600" />
                  <span>{isAr ? 'الشحن والتوصيل:' : 'Shipping & Delivery:'}</span>
                </span>
                <span className="font-bold">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-extrabold">
                      {isAr ? 'شحن مجاني 🎉' : 'Free Shipping 🎉'}
                    </span>
                  ) : (
                    <span>{priceFmt(shipping)}</span>
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-teal-100 flex items-center justify-between">
                <span className="font-bold text-neutral-800 text-sm sm:text-base">
                  {isAr ? 'الإجمالي عند الاستلام:' : 'Total COD:'}
                </span>
                <span className="text-xl sm:text-2xl font-black text-teal-800">
                  {priceFmt(totalPrice)}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] shadow-lg shadow-teal-700/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>
                {isSubmitting
                  ? isAr
                    ? 'جاري تأكيد طلبك...'
                    : 'Confirming your order...'
                  : isAr
                  ? 'تأكيد الطلب (الدفع عند الاستلام)'
                  : 'Confirm Order (Cash on Delivery)'}
              </span>
            </button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Truck className="w-4 h-4 text-teal-600" />
                {isAr ? 'توصيل خلال 72 ساعة' : 'Delivery within 72 Hours'}
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-4 h-4 text-teal-600" />
                {isAr ? 'تغليف سري محكم' : '100% Discreet Package'}
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                {isAr ? 'معاينة قبل الدفع' : 'Inspect Before Paying'}
              </span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default LandingGuestOrderForm;
