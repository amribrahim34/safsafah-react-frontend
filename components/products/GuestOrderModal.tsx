"use client";

import { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { setAuthData } from "@/store/slices/authSlice";
import { ordersService } from "@/lib/api";
import { showProductToast } from "@/lib/swal";
import type { User } from "@/types";

interface GuestOrderModalProps {
  productId: number;
  lang: "ar" | "en";
  brand: { primary: string; dark: string; light: string };
  onClose: () => void;
}

const LABELS = {
  ar: {
    title: "اشتري الأن",
    name: "الاسم",
    namePlaceholder: "أدخل اسمك الكامل",
    mobile: "رقم الجوال",
    mobilePlaceholder: "أدخل رقم جوالك",
    address: "العنوان",
    addressPlaceholder: "أدخل عنوان التوصيل",
    submit: "تأكيد الطلب",
    submitting: "جاري الإرسال...",
    success: "تم إرسال طلبك بنجاح!",
    required: "يرجى ملء جميع الحقول المطلوبة",
  },
  en: {
    title: "Order Now",
    name: "Full Name",
    namePlaceholder: "Enter your full name",
    mobile: "Mobile Number",
    mobilePlaceholder: "Enter your mobile number",
    address: "Delivery Address",
    addressPlaceholder: "Enter your delivery address",
    submit: "Confirm Order",
    submitting: "Submitting...",
    success: "Your order was placed successfully!",
    required: "Please fill in all required fields",
  },
};

export default function GuestOrderModal({
  productId,
  lang,
  brand,
  onClose,
}: GuestOrderModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isRtl = lang === "ar";
  const t = LABELS[lang];

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!customerName.trim() || !customerMobile.trim() || !customerAddress.trim()) {
      setError(t.required);
      return;
    }

    setIsLoading(true);
    try {
      const result = await ordersService.guestOrder({
        customerName: customerName.trim(),
        customerMobile: customerMobile.trim(),
        customerAddress: customerAddress.trim(),
        paymentType: "CASH_ON_DELIVERY",
        items: [{ product_id: productId, quantity: 1 }],
      });

      const mappedUser: User = {
        id: result.user.id.toString(),
        name: result.user.name,
        email: result.user.email,
        phone: result.user.mobile,
        tier: "Bronze",
        points: result.user.points,
        addresses: result.user.addresses,
      };

      dispatch(setAuthData({ user: mappedUser, token: result.token }));
      showProductToast(t.success, isRtl);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.required);
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet on mobile, centered modal on desktop */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden sm:mx-4">
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 bg-brand" >
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <ShoppingBag className="w-5 h-5" />
            <span>{t.title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:opacity-75 transition-opacity"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 text-start">
              {t.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.namePlaceholder}
              className={inputClass}
              disabled={isLoading}
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 text-start">
              {t.mobile} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              placeholder={t.mobilePlaceholder}
              className={inputClass}
              disabled={isLoading}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 text-start">
              {t.address} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder={t.addressPlaceholder}
              className={`${inputClass} resize-none`}
              rows={2}
              disabled={isLoading}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs text-start">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl text-white py-2.5 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 bg-brand"
            
          >
            {isLoading ? t.submitting : t.submit}
          </button>

          {/* Spacer to clear the fixed BottomTabs nav on mobile */}
          <div className="h-16 sm:hidden" />
        </form>
      </div>
    </div>
  );
}
