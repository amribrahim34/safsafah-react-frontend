import React, { useEffect } from "react";
import { ArrowRight, Download, RefreshCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPaginatedOrders } from "@/store/slices/ordersSlice";

export default function OrdersList({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const dispatch = useAppDispatch();
  const { paginatedOrders = [], isLoading, error } = useAppSelector((state) => state.orders || {});
  const fmt = (n)=> new Intl.NumberFormat(isRTL?"ar-EG":"en-EG",{style:"currency",currency:"EGP",maximumFractionDigits:0}).format(n);

  useEffect(() => {
    // Fetch first 2 orders for the profile summary
    dispatch(fetchPaginatedOrders({ page: 0, size: 2 }));
  }, [dispatch]);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-extrabold">{isRTL?"طلباتي":"My orders"}</h3>
        <a href="/orders" className="text-sm font-semibold" style={{color:brand.primary}}>
          {isRTL?"عرض الكل":"View all"} <ArrowRight className="inline w-3.5 h-3.5" />
        </a>
      </div>

      {isLoading && (
        <div className="text-sm text-neutral-500 py-4">
          {isRTL ? "جاري التحميل..." : "Loading..."}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 py-2">
          {isRTL ? "حدث خطأ أثناء تحميل الطلبات" : "Error loading orders"}
        </div>
      )}

      {!isLoading && !error && paginatedOrders && paginatedOrders.length === 0 && (
        <div className="text-sm text-neutral-500 py-4">
          {isRTL ? "لا توجد طلبات" : "No orders yet"}
        </div>
      )}

      {!isLoading && !error && paginatedOrders && paginatedOrders.length > 0 && (
        <div className="space-y-3">
          {paginatedOrders.map(order => (
            <article key={order.id} className="rounded-2xl border border-neutral-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">#{order.id}</div>
                <div className="text-xs text-neutral-600">
                  {new Date(order.createdAt).toLocaleDateString(isRTL?"ar-EG":"en-EG")}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {order.items && order.items.slice(0,4).map((item, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border">
                    <img
                      src={item.product?.image || "/placeholder.png"}
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
                  {isRTL ? statusAr(order.status) : order.status}
                </span>
                <div className="ms-auto flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl border text-sm hover:bg-neutral-50">
                    <Download className="inline w-4 h-4" /> {isRTL?"الفاتورة":"Invoice"}
                  </button>
                  <button className="px-3 py-1.5 rounded-xl text-white text-sm" style={{background:brand.primary}}>
                    <RefreshCcw className="inline w-4 h-4" /> {isRTL?"إعادة الشراء":"Reorder"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const statusAr = (s) => ({
  "DELIVERED": "تم التسليم",
  "OUT_FOR_DELIVERY": "خارج للتسليم",
  "PACKED": "تم التجهيز",
  "PLACED": "تم الطلب",
  "PENDING": "قيد الانتظار",
  "CONFIRMED": "تم التأكيد",
  "PROCESSING": "قيد المعالجة",
  "SHIPPED": "تم الشحن",
  "CANCELLED": "ملغي",
  "RETURNED": "تم الإرجاع"
}[s?.toUpperCase()] || s);
