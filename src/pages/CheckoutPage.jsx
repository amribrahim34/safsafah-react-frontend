import React, { useMemo, useState, useRef, useEffect } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCart } from "../store/slices/cartsSlice";
import { createOrder } from "../store/slices/ordersSlice";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";

import OrderSummary from "../components/cart/OrderSummary";
import PaymentMethods from "../components/checkout/PaymentMethods";
import MapPicker from "../components/checkout/MapPicker";

export default function CheckoutQuickPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);
  const { isLoading: isCreatingOrder, error: orderError } = useAppSelector((state) => state.orders);

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Map API cart items to component format
  const items = useMemo(() => {
    if (!cart?.items) return [];
    return cart.items.map((item) => ({
      id: item.id,
      name: {
        en: item.productNameEn,
        ar: item.productNameAr,
      },
      price: item.productPrice,
      productId: item.productId,
      img: item.productImage,
      brand: item.brand,
      variant: "30ml",
      qty: item.quantity,
    }));
  }, [cart?.items]);

  const subtotal = cart?.totalPrice || 0;
  const discount = cart?.discountAmount || 0;
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);
  const fmt = (n) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

  // Form fields matching API structure
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("cod");
  const [coords, setCoords] = useState(null);
  const [geoLabel, setGeoLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });

  const submitBtnRef = useRef(null);

  // Improved Egyptian mobile validation
  const validateEgyptianMobile = (number) => {
    // Remove any spaces or special characters
    const cleaned = number.replace(/[\s\-\(\)]/g, '');

    // Egyptian mobile format: starts with 010, 011, 012, or 015, followed by 8 digits (total 11 digits)
    const egyptianMobileRegex = /^(010|011|012|015)\d{8}$/;

    return egyptianMobileRegex.test(cleaned);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        if (!value.trim()) {
          return lang === "ar"
            ? "يجب إدخال الاسم"
            : "Full name is required";
        }
        if (value.trim().split(" ").length < 2) {
          return lang === "ar"
            ? "يجب إدخال الاسم الأول واسم العائلة"
            : "Please enter first and last name";
        }
        return "";

      case "mobile":
        if (!value.trim()) {
          return lang === "ar"
            ? "يجب إدخال رقم الموبايل"
            : "Mobile number is required";
        }
        if (!validateEgyptianMobile(value)) {
          return lang === "ar"
            ? "رقم الموبايل غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم"
            : "Invalid mobile number. Must start with 010, 011, 012, or 015 and be 11 digits";
        }
        return "";

      case "address":
        if (!value.trim()) {
          return lang === "ar"
            ? "يجب إدخال العنوان"
            : "Address is required";
        }
        if (value.trim().length < 8) {
          return lang === "ar"
            ? "العنوان قصير جداً. يرجى إدخال عنوان تفصيلي (8 أحرف على الأقل)"
            : "Address too short. Please enter a detailed address (at least 8 characters)";
        }
        return "";

      default:
        return "";
    }
  };

  const getValidationError = () => {
    const fullNameError = validateField("fullName", fullName);
    if (fullNameError) return fullNameError;

    const mobileError = validateField("mobile", mobile);
    if (mobileError) return mobileError;

    const addressError = validateField("address", address);
    if (addressError) return addressError;

    return "";
  };

  const valid =
    fullName.trim().split(" ").length >= 2 &&
    validateEgyptianMobile(mobile) &&
    address.trim().length >= 8;

  const isDisabled = !valid || isSubmitting;

  const placeOrder = async (e) => {
    e.preventDefault();

    // Show specific validation error
    const error = getValidationError();
    if (error) {
      setValidationError(error);
      alert(error);
      return;
    }

    setValidationError("");

    // If wallet: take user to wallet payment step
    if (payment === "wallet") {
      // You can pass state or query params. Here we use state.
      navigate("/wallet-payment", {
        state: {
          lang, total, mobile, fullName,
          orderRef: `SFS-${Date.now()}`, // demo order ref
          walletNumber: "0100 000 0000", // your wallet number to receive transfers
        },
      });
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
      customerName: fullName,
      customerAddress: address,
      customerMobile: mobile,
      latitude: coords?.lat?.toString() || "0",
      longitude: coords?.lng?.toString() || "0",
      deliveryNotes: notes || undefined,
      paymentType: paymentTypeMap[payment] || "CASH_ON_DELIVERY",
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();

      // Success - show message and navigate to home
      alert(lang === "ar" ? "تم إنشاء الطلب بنجاح 🎉" : "Order placed successfully 🎉");

      // Navigate to home page (since /account/orders doesn't exist yet)
      navigate("/");
    } catch (error) {
      console.error("Order creation failed:", error);
      alert(lang === "ar" ? "فشل إنشاء الطلب. حاول مرة أخرى" : "Failed to create order. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <form onSubmit={placeOrder} className="max-w-7xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[minmax(0,1fr),420px]">
        {/* LEFT */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-neutral-200 p-4 bg-white">
            <div className="font-bold text-lg mb-3">{lang === "ar" ? "الدفع السريع" : "Ultra-fast checkout"}</div>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "الاسم بالكامل *" : "Full name *"}</div>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) {
                    setFieldErrors(prev => ({ ...prev, fullName: "" }));
                  }
                }}
                onBlur={(e) => {
                  const error = validateField("fullName", e.target.value);
                  setFieldErrors(prev => ({ ...prev, fullName: error }));
                }}
                className={`w-full rounded-2xl border px-3 py-2 ${fieldErrors.fullName ? "border-red-500" : "border-neutral-300"}`}
                placeholder={lang === "ar" ? "الاسم الأول واسم العائلة" : "First & last name"}
              />
              {fieldErrors.fullName && (
                <div className="text-xs text-red-600 mt-1">{fieldErrors.fullName}</div>
              )}
            </label>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "الموبايل *" : "Mobile *"}</div>
              <input
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (fieldErrors.mobile) {
                    setFieldErrors(prev => ({ ...prev, mobile: "" }));
                  }
                }}
                onBlur={(e) => {
                  const error = validateField("mobile", e.target.value);
                  setFieldErrors(prev => ({ ...prev, mobile: error }));
                }}
                inputMode="tel"
                className={`w-full rounded-2xl border px-3 py-2 ${fieldErrors.mobile ? "border-red-500" : "border-neutral-300"}`}
                placeholder={lang === "ar" ? "01xxxxxxxxx أو +201xxxxxxxxx" : "01xxxxxxxxx or +201xxxxxxxxx"}
              />
              {fieldErrors.mobile && (
                <div className="text-xs text-red-600 mt-1">{fieldErrors.mobile}</div>
              )}
            </label>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "العنوان التفصيلي *" : "Address *"}</div>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (fieldErrors.address) {
                    setFieldErrors(prev => ({ ...prev, address: "" }));
                  }
                }}
                onBlur={(e) => {
                  const error = validateField("address", e.target.value);
                  setFieldErrors(prev => ({ ...prev, address: error }));
                }}
                className={`w-full rounded-2xl border px-3 py-2 min-h-[80px] ${fieldErrors.address ? "border-red-500" : "border-neutral-300"}`}
                placeholder={lang === "ar" ? "اسم الشارع، المبنى/العمارة، الدور/الشقة" : "Street, building, floor/apt"}
              />
              {fieldErrors.address && (
                <div className="text-xs text-red-600 mt-1">{fieldErrors.address}</div>
              )}
            </label>

            {/* Map simplified: no lat/lng fields, pick a point + show resolved address/area */}
            <MapPicker
              lang={lang}
              brand={BRAND}
              onPick={({ coords, label }) => {
                setCoords(coords);
                setGeoLabel(label);
              }}
            />

            {/* Resolved area/region for verification */}
            {geoLabel && (
              <div className="mt-2 text-sm rounded-xl bg-neutral-50 border border-neutral-200 p-2">
                <div className="font-semibold">{lang === "ar" ? "الموقع المحدد" : "Selected location"}</div>
                <div className="text-neutral-700">{geoLabel}</div>
              </div>
            )}

            <label className="block mt-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "ملاحظات للمندوب" : "Notes for courier"}</div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2 min-h-[70px]" placeholder={lang === "ar" ? "مثلاً: اتصل قبل الوصول" : "e.g., please call on arrival"} />
            </label>
          </div>

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
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-neutral-600">{lang === "ar" ? "الإجمالي" : "Total"}</div>
            <div className="font-extrabold">{fmt(total)}</div>
          </div>
          <button
            onClick={() => submitBtnRef.current?.click()}
            disabled={isDisabled}
            className={`px-5 py-3 rounded-2xl text-white font-semibold ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ background: BRAND.primary }}
          >
            {isSubmitting || isCreatingOrder
              ? (lang === "ar" ? "جاري المعالجة..." : "Processing...")
              : payment === "wallet"
              ? (lang === "ar" ? "الدفع بالمحفظة" : "Wallet payment")
              : (lang === "ar" ? "إتمام الشراء" : "Checkout")}
          </button>
        </div>
      </div>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang === "ar" ? "الرئيسية" : "Home", cats: lang === "ar" ? "الفئات" : "Categories", cart: lang === "ar" ? "السلة" : "Bag", wish: lang === "ar" ? "المفضلة" : "Wishlist", account: lang === "ar" ? "حسابي" : "Account" }} />
    </div>
  );
}
