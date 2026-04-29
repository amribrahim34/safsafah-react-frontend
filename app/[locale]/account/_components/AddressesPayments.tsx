'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAddresses } from '@/store/slices/addressesSlice';
import type { BrandConfig, AddressesTranslations } from './_types';

interface AddressesPaymentsProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  t: AddressesTranslations;
}

export default function AddressesPayments({ brand, lang, t }: AddressesPaymentsProps) {
  const dispatch = useAppDispatch();
  const { addresses = [], isLoading, error } = useAppSelector(
    (state) => state.addresses || {}
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{t.title}</div>

      {isLoading && (
        <div className="text-sm text-neutral-500 py-4">{t.loading}</div>
      )}

      {error && (
        <div className="text-sm text-red-600 py-2">{t.error}</div>
      )}

      {!isLoading && !error && addresses.length === 0 && (
        <div className="text-sm text-neutral-500 py-4">{t.empty}</div>
      )}

      {!isLoading && !error && addresses.length > 0 && (
        <div className="space-y-2">
          {addresses.slice(0, 2).map((address) => (
            <div
              key={address.id}
              className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50"
            >
              <div className="text-sm font-semibold">{address.name || t.fallback}</div>
              <div className="text-sm text-neutral-700">{address.details}</div>
              {address.notes && (
                <div className="text-xs text-neutral-500 mt-1">{address.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex gap-2">
        <a href="/addresses" className="px-3 py-1.5 rounded-xl border text-sm">
          {t.manage}
        </a>
      </div>
    </section>
  );
}
