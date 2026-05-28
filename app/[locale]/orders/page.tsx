'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { BRAND } from '@/content/brand';
import { useDir } from '@/hooks/useDir';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPaginatedOrders, cancelOrder } from '@/store/slices/ordersSlice';
import type { PaginatedOrderItem } from '@/store/slices/ordersSlice';
import type { UIOrder, UIOrderStatus, UIStage, TabCounts } from './_components/_types';

import OrdersTabs from './_components/OrdersTabs';
import OrderCard from './_components/OrderCard';

const mapStatusToUI = (apiStatus: string): UIOrderStatus => {
  const statusMap: Record<string, UIOrderStatus> = {
    PENDING: 'In Progress',
    CONFIRMED: 'In Progress',
    PROCESSING: 'In Progress',
    SHIPPED: 'Shipped',
    OUT_FOR_DELIVERY: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Canceled',
    RETURNED: 'Returned',
  };
  return statusMap[apiStatus] ?? (apiStatus as UIOrderStatus);
};

const mapApiOrderToUI = (apiOrder: PaginatedOrderItem, lang: string): UIOrder => {
  const status = mapStatusToUI(apiOrder.status);

  let stages: UIStage[] = ['Placed'];
  if (status === 'In Progress') {
    stages = ['Placed', 'Confirmed'];
  } else if (status === 'Shipped') {
    stages = ['Placed', 'Confirmed', 'Shipped'];
  } else if (status === 'Delivered') {
    stages = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];
  } else if (status === 'Canceled') {
    stages = ['Placed', 'Canceled'];
  } else if (status === 'Returned') {
    stages = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];
  }

  return {
    id: `EG-${apiOrder.id}`,
    rawId: apiOrder.id,
    date: new Date(apiOrder.createdAt).toISOString().split('T')[0],
    addrShort: apiOrder.address?.details || (lang === 'ar' ? 'العنوان غير متوفر' : 'Address unavailable'),
    payment: 'COD',
    stages,
    eta: null,
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
      variant: '',
      qty: item.quantity,
      price: item.unitPrice,
      img: item.product.image,
      reviewed: false,
    })),
    status,
    returnInfo: status === 'Canceled' ? { state: 'Canceled' } : null,
  };
};

export default function OrdersPage() {
  const [lang, setLang] = useState('ar');
  const { i18n } = useTranslation('home');
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);
  useDir();
  const isRTL = lang === 'ar';
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { paginatedOrders, pagination, isLoading } = useAppSelector((state) => state.orders);

  const apiStatusMap: Record<string, string> = {
    progress: 'PENDING',
    shipped: 'SHIPPED',
    delivered: 'DELIVERED',
    canceled: 'CANCELED',
  };

  const handleCancel = async (rawId: number) => {
    await dispatch(cancelOrder({ orderId: String(rawId) })).unwrap();
    const status = tab === 'all' ? undefined : apiStatusMap[tab];
    dispatch(fetchPaginatedOrders({ page: currentPage, size: pageSize, status }));
  };

  useEffect(() => {
    const statusMap: Record<string, string> = {
      progress: 'PENDING',
      shipped: 'SHIPPED',
      delivered: 'DELIVERED',
      canceled: 'CANCELLED',
    };

    const status = tab === 'all' ? undefined : statusMap[tab];
    dispatch(fetchPaginatedOrders({ page: currentPage, size: pageSize, status }));
  }, [dispatch, tab, currentPage]);

  const mappedOrders = useMemo(() => {
    return paginatedOrders.map((order) => mapApiOrderToUI(order, lang));
  }, [paginatedOrders, lang]);

  const filter = (o: UIOrder) => {
    if (tab === 'progress') return o.status === 'In Progress';
    if (tab === 'shipped') return o.status === 'Shipped';
    if (tab === 'delivered') return o.status === 'Delivered';
    if (tab === 'canceled') return o.status === 'Returned' || o.status === 'Canceled';
    return true;
  };

  const orders = mappedOrders.filter(filter);

  const tabCounts: TabCounts = {
    all: pagination?.total ?? mappedOrders.length,
    progress: mappedOrders.filter((o) => o.status === 'In Progress').length,
    shipped: mappedOrders.filter((o) => o.status === 'Shipped').length,
    delivered: mappedOrders.filter((o) => o.status === 'Delivered').length,
    canceled: mappedOrders.filter((o) => o.status === 'Returned' || o.status === 'Canceled').length,
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="max-w-7xl mx-auto">
        <header className="px-4 pt-6 pb-3">
          <h1 className="text-2xl md:text-3xl font-extrabold">{isRTL ? 'طلباتي 🛍️' : 'My Orders 🛍️'}</h1>
          <p className="text-neutral-600">
            {isRTL ? 'تابعي الطلبات، أعيدي الشراء، أو اطلبِي الدعم.' : 'Track orders, buy again, or get support.'}
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
                setCurrentPage(0);
              }}
              counts={tabCounts}
            />
          </div>
        </div>

        <section className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {isLoading ? (
              <div className="rounded-2xl border border-neutral-200 p-12 bg-white text-center">
                <div className="text-4xl mb-3">⏳</div>
                <div className="text-lg font-semibold text-neutral-600">
                  {isRTL ? 'جاري تحميل طلباتك...' : 'Loading your orders...'}
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 p-6 bg-white text-center">
                <div className="text-5xl mb-2">🧴</div>
                <div className="text-lg font-extrabold">
                  {isRTL ? 'لسّه ما طلبتيش توهّجك ✨' : "You haven't ordered your glow yet ✨"}
                </div>
                <p className="text-neutral-600 mt-1">
                  {isRTL ? 'ابدئي التسوق الآن — الأفضل مبيعًا بانتظارك.' : 'Start shopping — bestsellers are waiting.'}
                </p>
                <Link
                  href="/catalog"
                  className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold"
                  style={{ background: BRAND.primary }}
                >
                  {isRTL ? 'ابدئي التسوق' : 'Start shopping'}
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                  {orders.map((o) => (
                    <OrderCard key={o.id} lang={lang} brand={BRAND} order={o} onCancel={handleCancel} />
                  ))}
                </div>

                {pagination && pagination.lastPage > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                      disabled={!pagination.hasPrevious}
                      className={`px-4 py-2 rounded-xl font-semibold ${
                        pagination.hasPrevious
                          ? 'bg-white border border-neutral-300 hover:bg-neutral-50'
                          : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {isRTL ? 'السابق' : 'Previous'}
                    </button>

                    <div className="px-4 py-2 bg-white border border-neutral-300 rounded-xl font-semibold">
                      {isRTL
                        ? `صفحة ${pagination.currentPage} من ${pagination.lastPage}`
                        : `Page ${pagination.currentPage} of ${pagination.lastPage}`}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(pagination.lastPage - 1, p + 1))}
                      disabled={!pagination.hasNext}
                      className={`px-4 py-2 rounded-xl font-semibold ${
                        pagination.hasNext
                          ? 'bg-white border border-neutral-300 hover:bg-neutral-50'
                          : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      }`}
                    >
                      {isRTL ? 'التالي' : 'Next'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
