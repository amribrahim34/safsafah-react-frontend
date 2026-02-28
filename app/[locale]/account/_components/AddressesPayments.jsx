'use client';

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAddresses } from "@/store/slices/addressesSlice";

export default function AddressesPayments({ brand, lang = "ar" }) {
  const isRTL = lang === "ar";
  const dispatch = useAppDispatch();
  const { addresses = [], isLoading, error } = useAppSelector((state) => state.addresses || {});

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL ? "العناوين" : "Addresses"}</div>

      {isLoading && (
        <div className="text-sm text-neutral-500 py-4">
          {isRTL ? "جاري التحميل..." : "Loading..."}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 py-2">
          {isRTL ? "حدث خطأ أثناء تحميل العناوين" : "Error loading addresses"}
        </div>
      )}

      {!isLoading && !error && addresses && addresses.length === 0 && (
        <div className="text-sm text-neutral-500 py-4">
          {isRTL ? "لا توجد عناوين محفوظة" : "No saved addresses"}
        </div>
      )}

      {!isLoading && !error && addresses && addresses.length > 0 && (
        <div className="space-y-2">
          {addresses.slice(0, 2).map((address) => (
            <div key={address.id} className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
              <div className="text-sm font-semibold">
                {address.name || (isRTL ? "📍 العنوان" : "📍 Address")}
              </div>
              <div className="text-sm text-neutral-700">{address.details}</div>
              {address.notes && (
                <div className="text-xs text-neutral-500 mt-1">{address.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* <div className="mt-3 text-sm text-neutral-600">
        {isRTL ? "الطريقة الافتراضية: الدفع عند الاستلام" : "Default method: Cash on Delivery"}
      </div> */}
      <div className="mt-2 flex gap-2">
        <a href="/addresses" className="px-3 py-1.5 rounded-xl border text-sm">{isRTL ? "إدارة العناوين" : "Manage addresses"}</a>
        {/* <a href="/payment" className="px-3 py-1.5 rounded-xl border text-sm">{isRTL ? "طرق الدفع" : "Payment methods"}</a> */}
      </div>
    </section>
  );
}
