'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPaginatedOrders, PaginatedOrderItem } from '@/store/slices/ordersSlice';
import type { BrandConfig, OrdersListTranslations } from './_types';

interface OrdersListProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  t: OrdersListTranslations;
}

export default function OrdersList({ brand, lang, t }: OrdersListProps) {
  const isRTL = lang === 'ar';
  const dispatch = useAppDispatch();
  const { paginatedOrders = [], isLoading, error } = useAppSelector(
    (state) => state.orders || {}
  );

  const fmt = (n: number) =>
    new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(n);

  const statusLabel = (status: string) =>
    t.statuses[status?.toUpperCase()] || status;

  useEffect(() => {
    dispatch(fetchPaginatedOrders({ page: 0, size: 2 }));
  }, [dispatch]);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-extrabold">{t.title}</h3>
        <a href="/orders" className="text-sm font-semibold" style={{ color: brand.primary }}>
          {t.viewAll} <ArrowRight className="inline w-3.5 h-3.5" />
        </a>
      </div>

      {isLoading && (
        <div className="text-sm text-neutral-500 py-4">{t.loading}</div>
      )}

      {error && (
        <div className="text-sm text-red-600 py-2">{t.error}</div>
      )}

      {!isLoading && !error && paginatedOrders.length === 0 && (
        <div className="text-sm text-neutral-500 py-4">{t.empty}</div>
      )}

      {!isLoading && !error && paginatedOrders.length > 0 && (
        <div className="space-y-3">
          {paginatedOrders.map((order: PaginatedOrderItem) => (
            <article key={order.id} className="rounded-2xl border border-neutral-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">#{order.id}</div>
                <div className="text-xs text-neutral-600">
                  {new Date(order.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-EG')}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {order.items?.slice(0, 4).map((item, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border">
                    <img
                      src={item.product?.image || '/placeholder.png'}
                      alt={isRTL ? item.product?.nameAr : item.product?.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order.items && order.items.length > 4 && (
                  <div className="text-xs text-neutral-600">+{order.items.length - 4}</div>
                )}
                <div className="ms-auto text-sm font-extrabold">{fmt(order.total)}</div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-full border bg-neutral-50">
                  {statusLabel(order.status)}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
