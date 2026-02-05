'use client';

import React, { useMemo, useState, useEffect } from "react";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useDir } from "@/hooks/useDir";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPaginatedOrders } from "@/store/slices/ordersSlice";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";

import OrdersTabs from "@/components/orders/OrdersTabs";
import OrderCard from "@/components/orders/OrderCard";

// Helper function to map API status to UI status
const mapStatusToUI = (apiStatus) => {
  const statusMap = {
    PENDING: "In Progress",
    CONFIRMED: "In Progress",
    PROCESSING: "In Progress",
    SHIPPED: "Shipped",
    OUT_FOR_DELIVERY: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Canceled",
    RETURNED: "Returned",
  };
  return statusMap[apiStatus] || apiStatus;
};

// Helper function to map API order to UI order format
const mapApiOrderToUI = (apiOrder, lang) => {
  const status = mapStatusToUI(apiOrder.status);

  // Map stages based on status
  let stages = ["Placed"];
  if (status === "In Progress") {
    stages = ["Placed", "Confirmed"];
  } else if (status === "Shipped") {
    stages = ["Placed", "Confirmed", "Shipped"];
  } else if (status === "Delivered") {
    stages = ["Placed", "Confirmed", "Shipped", "Delivered"];
  } else if (status === "Canceled") {
    stages = ["Placed", "Canceled"];
  } else if (status === "Returned") {
    stages = ["Placed", "Confirmed", "Shipped", "Delivered"];
  }

  return {
    id: `EG-${apiOrder.id}`,
    date: new Date(apiOrder.createdAt).toISOString().split("T")[0],
    addrShort: apiOrder.address?.details || (lang === "ar" ? "العنوان غير متوفر" : "Address unavailable"),
    payment: "COD", // Default, could be enhanced with actual payment method
    stages,
    eta: null, // Could be calculated if needed
    subtotal: apiOrder.subtotal,
    shipping: apiOrder.shipping,
    discount: apiOrder.discount,
    total: apiOrder.total,
    items: apiOrder.items.map((item) => ({
      id: item.id,
      name: {
        en: item.product.nameEn,
        ar: item.product.nameAr,
      },
      variant: "", // Not provided in API
      qty: item.quantity,
      price: item.unitPrice,
      img: item.product.image,
      reviewed: false,
    })),
    status,
    returnInfo: status === "Canceled" ? { state: "Canceled" } : null,
  };
};

export default function OrdersPage() {
  const [lang, setLang] = useState("ar");
  const t = useMemo(() => COPY[lang], [lang]);
  useDir();
  const isRTL = lang === "ar";
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState("all"); // all | progress | delivered | shipped | canceled
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Get Redux state
  const { paginatedOrders, pagination, isLoading } = useAppSelector((state) => state.orders);

  // Fetch orders on mount and when tab/page changes
  useEffect(() => {
    const statusMap = {
      progress: "PENDING",
      shipped: "SHIPPED",
      delivered: "DELIVERED",
      canceled: "CANCELLED",
    };

    const status = tab === "all" ? undefined : statusMap[tab];
    dispatch(fetchPaginatedOrders({ page: currentPage, size: pageSize, status }));
  }, [dispatch, tab, currentPage]);

  // Map API orders to UI format
  const mappedOrders = useMemo(() => {
    return paginatedOrders.map((order) => mapApiOrderToUI(order, lang));
  }, [paginatedOrders, lang]);

  const filter = (o) => {
    if (tab === "progress") return o.status === "In Progress" || o.status === "Confirmed";
    if (tab === "shipped") return o.status === "Shipped" || o.status === "Out for Delivery";
    if (tab === "delivered") return o.status === "Delivered";
    if (tab === "canceled") return o.status === "Returned" || o.status === "Canceled";
    return true;
  };

  const orders = mappedOrders.filter(filter);

  // Get counts for tabs (from pagination or mapped orders)
  const allOrders = paginatedOrders.map((order) => mapApiOrderToUI(order, lang));
  const tabCounts = {
    all: pagination?.totalElements || allOrders.length,
    progress: allOrders.filter(o => o.status === "In Progress" || o.status === "Confirmed").length,
    shipped: allOrders.filter(o => o.status === "Shipped" || o.status === "Out for Delivery").length,
    delivered: allOrders.filter(o => o.status === "Delivered").length,
    canceled: allOrders.filter(o => o.status === "Returned" || o.status === "Canceled").length,
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t.promo} lang={lang} onToggleLang={() => setLang(isRTL ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

      <main className="max-w-7xl mx-auto">
        <header className="px-4 pt-6 pb-3">
          <h1 className="text-2xl md:text-3xl font-extrabold">{isRTL ? "طلباتي 🛍️" : "My Orders 🛍️"}</h1>
          <p className="text-neutral-600">
            {isRTL ? "تابعي الطلبات، أعيدي الشراء، أو اطلبِي الدعم." : "Track orders, buy again, or get support."}
          </p>
        </header>

        {/* Sticky tabs */}
        <div className="sticky top-[84px] z-30 bg-white/90 backdrop-blur border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <OrdersTabs
              lang={lang}
              brand={BRAND}
              tab={tab}
              setTab={(newTab) => {
                setTab(newTab);
                setCurrentPage(0); // Reset to first page when changing tabs
              }}
              counts={tabCounts}
            />
          </div>
        </div>

        {/* Grid: larger separation between cards */}
        <section className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {isLoading ? (
              <div className="rounded-2xl border border-neutral-200 p-12 bg-white text-center">
                <div className="text-4xl mb-3">⏳</div>
                <div className="text-lg font-semibold text-neutral-600">
                  {isRTL ? "جاري تحميل طلباتك..." : "Loading your orders..."}
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 p-6 bg-white text-center">
                <div className="text-5xl mb-2">🧴</div>
                <div className="text-lg font-extrabold">{isRTL ? "لسّه ما طلبتيش توهّجك ✨" : "You haven't ordered your glow yet ✨"}</div>
                <p className="text-neutral-600 mt-1">
                  {isRTL ? "ابدئي التسوق الآن — الأفضل مبيعًا بانتظارك." : "Start shopping — bestsellers are waiting."}
                </p>
                <a href="/catalog" className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: BRAND.primary }}>
                  {isRTL ? "ابدئي التسوق" : "Start shopping"}
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                  {orders.map((o) => (
                    <OrderCard key={o.id} lang={lang} brand={BRAND} order={o} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                      disabled={!pagination.hasPrevious}
                      className={`px-4 py-2 rounded-xl font-semibold ${pagination.hasPrevious
                          ? "bg-white border border-neutral-300 hover:bg-neutral-50"
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        }`}
                    >
                      {isRTL ? "السابق" : "Previous"}
                    </button>

                    <div className="px-4 py-2 bg-white border border-neutral-300 rounded-xl font-semibold">
                      {isRTL
                        ? `صفحة ${pagination.currentPage + 1} من ${pagination.totalPages}`
                        : `Page ${pagination.currentPage + 1} of ${pagination.totalPages}`}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages - 1, p + 1))}
                      disabled={!pagination.hasNext}
                      className={`px-4 py-2 rounded-xl font-semibold ${pagination.hasNext
                          ? "bg-white border border-neutral-300 hover:bg-neutral-50"
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        }`}
                    >
                      {isRTL ? "التالي" : "Next"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer brand={BRAND} />
      <BottomTabs
        labels={{
          home: isRTL ? "الرئيسية" : "Home",
          cats: isRTL ? "الفئات" : "Categories",
          cart: isRTL ? "السلة" : "Bag",
          wish: isRTL ? "المفضلة" : "Wishlist",
          account: isRTL ? "حسابي" : "Account",
        }}
      />
    </div>
  );
}
