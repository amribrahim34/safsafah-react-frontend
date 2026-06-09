'use client';

import '@/lib/i18n';
import React, { useState, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { purchase as fbPurchase } from "@/lib/fbpixel";
import { BRAND } from "@/content/brand";
import { useDir } from "@/hooks/useDir";
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/slices/cartsSlice";
import { createOrder } from "@/store/slices/ordersSlice";
import { fetchUserProfile } from "@/store/slices/authSlice";
import { AddressResponse } from "@/types/models/common";
import { CreateOrderApiRequest } from "@/types/models/order";

import FloatingCart from "@/components/appchrome/FloatingCart";

import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethods from "./_components/PaymentMethods";
import CheckoutForm, { CheckoutFormData } from "./_components/CheckoutForm";
import MobileCheckoutButton from "./_components/MobileCheckoutButton";
import SuccessToast from "@/components/notifications/SuccessToast";
import ErrorToast from "@/components/notifications/ErrorToast";
import { settingsService, SiteSettings } from '@/lib/api/services/settings.service';

type PaymentMethod = "cod" | "card" | "wallet";

export default function CheckoutQuickPage() {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('checkout');
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useDir();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { isLoading: isCreatingOrder } = useAppSelector((state) => state.orders);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCart());
    const token = localStorage.getItem('auth_token');
    if (token) {
      dispatch(fetchUserProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
    useEffect(() => {
      settingsService.getSettings().then(setSiteSettings).catch(() => {});
    }, []);
  
    const walletNumber =  siteSettings?.mobile || "—";
    

  const subtotal = cart?.totalPrice || 0;
  const discount = 0;
  const shipping = subtotal >= 2000 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);
  const fmt = (n: number): string =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    mobile: "",
    address: "",
    notes: "",
    coords: null,
    geoLabel: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [selectedAddressId, setSelectedAddressId] = useState<number | "new" | null>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        mobile: user.phone || "",
      }));

      if (user.addresses && user.addresses.length > 0) {
        const firstAddress = user.addresses[0];
        setSelectedAddressId(firstAddress.id);
        setFormData((prev) => ({
          ...prev,
          address: firstAddress.details || "",
          notes: firstAddress.notes || "",
          coords: {
            lat: firstAddress.latitude,
            lng: firstAddress.longitude,
          },
        }));
      } else {
        setSelectedAddressId("new");
      }
    }
  }, [user]);

  const handleAddressSelect = (address: AddressResponse | "new") => {
    if (address === "new") {
      setSelectedAddressId("new");
      setFormData((prev) => ({
        ...prev,
        address: "",
        notes: "",
        coords: null,
        geoLabel: "",
      }));
    } else {
      setSelectedAddressId(address.id);
      setFormData((prev) => ({
        ...prev,
        address: address.details || "",
        notes: address.notes || "",
        coords: {
          lat: address.latitude,
          lng: address.longitude,
        },
      }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const {
    fieldErrors,
    validateField,
    getValidationError,
    isFormValid,
    clearFieldError,
    setFieldError,
  } = useCheckoutValidation(lang);

  const handleFieldChange = (field: string, value: string | { lat: number; lng: number } | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if ((fieldErrors as Record<string, string>)[field]) {
      clearFieldError(field);
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    setFieldError(field, error);
  };

  const isUsingSavedAddress = selectedAddressId && selectedAddressId !== "new";
  const valid = isUsingSavedAddress
    ? formData.fullName.trim().length >= 2 && formData.mobile.trim().length >= 11
    : isFormValid(formData.fullName, formData.mobile, formData.address);
  const isDisabled = !valid || isSubmitting;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUsingSavedAddress) {
      const nameError = validateField("fullName", formData.fullName);
      if (nameError) {
        setErrorMessage(nameError);
        setShowError(true);
        return;
      }
      const mobileError = validateField("mobile", formData.mobile);
      if (mobileError) {
        setErrorMessage(mobileError);
        setShowError(true);
        return;
      }
    } else {
      const error = getValidationError(formData.fullName, formData.mobile, formData.address);
      if (error) {
        setErrorMessage(error);
        setShowError(true);
        return;
      }
    }

    if (payment === "wallet") {
      const walletParams = new URLSearchParams({
        lang,
        total: total.toString(),
        mobile: formData.mobile,
        fullName: formData.fullName,
        orderRef: `SFS-${Date.now()}`,
        walletNumber: walletNumber ||"0100 000 0000",
      });
      router.push(`/wallet-payment?${walletParams.toString()}`);
      return;
    }

    setIsSubmitting(true);

    const paymentTypeMap: Record<PaymentMethod, CreateOrderApiRequest["paymentType"]> = {
      cod: "CASH_ON_DELIVERY",
      card: "CREDIT_CARD",
      wallet: "WALLET",
    };

    const orderData: CreateOrderApiRequest = {
      customerName: formData.fullName,
      customerMobile: formData.mobile,
      deliveryNotes: formData.notes || undefined,
      paymentType: paymentTypeMap[payment],
    };

    if (selectedAddressId && selectedAddressId !== "new") {
      orderData.addressId = selectedAddressId as number;
    } else {
      orderData.customerAddress = formData.address;
      orderData.latitude = formData.coords?.lat?.toString() || "0";
      orderData.longitude = formData.coords?.lng?.toString() || "0";
    }

    try {
      const orderResult = await dispatch(createOrder(orderData)).unwrap();

      posthog.capture('order_placed', {
        order_id: orderResult?.id,
        payment_method: payment,
        total,
        subtotal,
        discount,
        shipping,
        item_count: cart?.items?.length,
      });
      fbPurchase(orderResult?.id, total);

      await dispatch(fetchCart());

      setSuccessMessage(t('messages.orderSuccess'));
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      posthog.captureException(error);
      posthog.capture('order_placement_failed', {
        payment_method: payment,
        total,
        error_message: (error as Error)?.message || String(error),
      });
      console.error("Order creation failed:", error);
      setErrorMessage(t('messages.orderFailed'));
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {showSuccess && (
        <SuccessToast
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}

      <form onSubmit={placeOrder} className="max-w-7xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[minmax(0,1fr),420px]">
        {/* LEFT */}
        <section className="space-y-4">
          <CheckoutForm
            lang={lang}
            brand={BRAND}
            formData={formData}
            onFieldChange={handleFieldChange}
            fieldErrors={fieldErrors}
            onFieldBlur={handleFieldBlur}
            addresses={user?.addresses || []}
            selectedAddressId={selectedAddressId}
            onAddressSelect={handleAddressSelect}
          />

          <PaymentMethods lang={lang} brand={BRAND} value={payment} onChange={setPayment} />
        </section>

        {/* RIGHT */}
        <aside
          className="
            self-start
            md:sticky md:top-24
            md:max-h-[calc(100vh-6rem)]
            md:overflow-auto
          "
        >
          <OrderSummary
            brand={BRAND}
            fmt={fmt}
            subtotal={subtotal}
            discount={0}
            shipping={shipping}
            total={total}
            onCheckout={undefined}
            checkoutButton={
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full px-6 py-4 rounded-2xl text-white font-semibold text-lg ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
                style={{ background: BRAND.primary }}
              >
                {isSubmitting || isCreatingOrder
                  ? t('button.processing')
                  : payment === "wallet"
                  ? t('button.walletPay')
                  : t('button.checkout')}
              </button>
            }
          />
        </aside>

        {/* Hidden submit button for mobile sticky CTA */}
        <button
          ref={submitBtnRef}
          type="submit"
          disabled={isDisabled}
          className="hidden"
          aria-hidden="true"
        />
      </form>

      <MobileCheckoutButton
        lang={lang}
        brand={BRAND}
        total={total}
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
        isCreatingOrder={isCreatingOrder}
        payment={payment}
        onClick={() => submitBtnRef.current?.click()}
        fmt={fmt}
      />

      <FloatingCart brand={BRAND} />
    </div>
  );
}
