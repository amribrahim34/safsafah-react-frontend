'use client';

import React, { useMemo, useState, useRef, useEffect } from "react";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useDir } from "@/hooks/useDir";
import { useCheckoutValidation } from "@/hooks/useCheckoutValidation";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/slices/cartsSlice";
import { createOrder } from "@/store/slices/ordersSlice";
import { fetchUserProfile } from "@/store/slices/authSlice";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";
import FloatingCart from "@/components/appchrome/FloatingCart";

import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import MobileCheckoutButton from "@/components/checkout/MobileCheckoutButton";
import SuccessToast from "@/components/notifications/SuccessToast";
import ErrorToast from "@/components/notifications/ErrorToast";

export default function CheckoutQuickPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { isLoading: isCreatingOrder } = useAppSelector((state) => state.orders);
  const user = useAppSelector((state) => state.auth.user);

  // Fetch cart and user profile on component mount
  useEffect(() => {
    // Always fetch fresh cart data for checkout
    dispatch(fetchCart());

    // Fetch user profile if authenticated
    const token = localStorage.getItem('auth_token');
    if (token) {
      dispatch(fetchUserProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const subtotal = cart?.totalPrice || 0;
  const discount = cart?.discountAmount || 0;
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);
  const fmt = (n) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

  // Form fields matching API structure
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    notes: "",
    coords: null,
    geoLabel: "",
  });
  const [payment, setPayment] = useState("cod");
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Prepopulate form with user data when available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        mobile: user.phone || "",
      }));

      // Select and populate first address by default
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
        // If no addresses, set to "new" mode
        setSelectedAddressId("new");
      }
    }
  }, [user]);

  // Handle address selection
  const handleAddressSelect = (address) => {
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

  const submitBtnRef = useRef(null);

  // Use custom validation hook
  const {
    fieldErrors,
    validateField,
    getValidationError,
    isFormValid,
    clearFieldError,
    setFieldError,
  } = useCheckoutValidation(lang);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      clearFieldError(field);
    }
  };

  const handleFieldBlur = (field, value) => {
    const error = validateField(field, value);
    setFieldError(field, error);
  };

  // Validation: if using saved address, don't require address text field
  const isUsingSavedAddress = selectedAddressId && selectedAddressId !== "new";
  const valid = isUsingSavedAddress
    ? formData.fullName.trim().length >= 2 && formData.mobile.trim().length >= 11 // Only validate name and mobile
    : isFormValid(formData.fullName, formData.mobile, formData.address);
  const isDisabled = !valid || isSubmitting;

  const placeOrder = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (isUsingSavedAddress) {
      // Only validate name and mobile for saved addresses
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
      // Validate all fields for new addresses
      const error = getValidationError(formData.fullName, formData.mobile, formData.address);
      if (error) {
        setErrorMessage(error);
        setShowError(true);
        return;
      }
    }

    // If wallet: take user to wallet payment step
    if (payment === "wallet") {
      // Pass data via query params for Next.js
      const params = new URLSearchParams({
        lang,
        total: total.toString(),
        mobile: formData.mobile,
        fullName: formData.fullName,
        orderRef: `SFS-${Date.now()}`,
        walletNumber: "0100 000 0000",
      });
      router.push(`/wallet-payment?${params.toString()}`);
      return;
    }

    setIsSubmitting(true);

    // Map payment method to API format (matching backend allowed values)
    // Backend accepts: WALLET, CREDIT_CARD, DEBIT_CARD, CASH_ON_DELIVERY, BANK_TRANSFER
    const paymentTypeMap = {
      cod: "CASH_ON_DELIVERY",
      card: "CREDIT_CARD", // Changed from CARD to CREDIT_CARD
      wallet: "WALLET",
    };

    // Prepare order data for the API
    const orderData = {
      customerName: formData.fullName,
      customerMobile: formData.mobile,
      deliveryNotes: formData.notes || undefined,
      paymentType: paymentTypeMap[payment] || "CASH_ON_DELIVERY",
    };

    // If using a saved address, send only the address ID
    if (selectedAddressId && selectedAddressId !== "new") {
      orderData.addressId = selectedAddressId;
    } else {
      // For new addresses, send full address details
      orderData.customerAddress = formData.address;
      orderData.latitude = formData.coords?.lat?.toString() || "0";
      orderData.longitude = formData.coords?.lng?.toString() || "0";
    }

    try {
      await dispatch(createOrder(orderData)).unwrap();

      // Refetch cart since it's cleared on the backend
      await dispatch(fetchCart());

      // Show success notification
      setSuccessMessage(
        lang === "ar" ? "تم إنشاء الطلب بنجاح 🎉" : "Order placed successfully 🎉"
      );
      setShowSuccess(true);

      // Navigate to home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Order creation failed:", error);
      setErrorMessage(
        lang === "ar"
          ? "فشل إنشاء الطلب. حاول مرة أخرى"
          : "Failed to create order. Please try again"
      );
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

      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

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
            lang={lang}
            brand={BRAND}
            fmt={fmt}
            subtotal={subtotal}
            discount={0}
            shipping={shipping}
            total={total}
            checkoutButton={
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full px-6 py-4 rounded-2xl text-white font-semibold text-lg ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
                style={{ background: BRAND.primary }}
              >
                {isSubmitting || isCreatingOrder
                  ? (lang === "ar" ? "جاري المعالجة..." : "Processing...")
                  : payment === "wallet"
                  ? (lang === "ar" ? "الدفع بالمحفظة" : "Wallet payment")
                  : (lang === "ar" ? "إتمام الشراء" : "Checkout")}
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

      {/* SINGLE sticky CTA on mobile (same submit handler) */}
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

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang === "ar" ? "الرئيسية" : "Home", cats: lang === "ar" ? "الفئات" : "Categories", cart: lang === "ar" ? "السلة" : "Bag", wish: lang === "ar" ? "المفضلة" : "Wishlist", account: lang === "ar" ? "حسابي" : "Account" }} />
    </div>
  );
}
