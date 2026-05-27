import '@/lib/i18n';
import React from "react";
import { useTranslation } from "react-i18next";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import MapPicker from "./MapPicker";
import { Language, AddressResponse } from "@/types/models/common";
import { BrandColors } from "@/types/models/brand";

export interface CheckoutFormData {
  fullName: string;
  mobile: string;
  address: string;
  notes: string;
  coords: { lat: number; lng: number } | null;
  geoLabel: string;
}

interface CheckoutFormProps {
  lang: Language;
  brand: BrandColors;
  formData: CheckoutFormData;
  onFieldChange: (field: string, value: string | { lat: number; lng: number } | null) => void;
  fieldErrors: Record<string, string | undefined>;
  onFieldBlur: (field: string, value: string) => void;
  addresses?: AddressResponse[];
  selectedAddressId: number | "new" | null;
  onAddressSelect: (address: AddressResponse | "new") => void;
}

export default function CheckoutForm({
  lang,
  brand,
  formData,
  onFieldChange,
  fieldErrors,
  onFieldBlur,
  addresses = [],
  selectedAddressId,
  onAddressSelect,
}: CheckoutFormProps) {
  const { t } = useTranslation('checkout');
  const { fullName, mobile, address, notes } = formData;
  const isRTL = lang === "ar";

  return (
    <div className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">
        {t('form.title')}
      </div>

      <FormInput
        label={t('form.name')}
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange("fullName", e.target.value)}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => onFieldBlur("fullName", e.target.value)}
        error={fieldErrors.fullName}
        inputMode={undefined}
        placeholder={t('form.namePlaceholder')}
      />

      <FormInput
        label={t('form.mobile')}
        value={mobile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange("mobile", e.target.value)}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => onFieldBlur("mobile", e.target.value)}
        error={fieldErrors.mobile}
        inputMode="tel"
        placeholder={t('form.mobilePlaceholder')}
      />

      {/* Saved Addresses */}
      {addresses && addresses.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">
            {t('form.savedAddresses')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => onAddressSelect(addr)}
                className={`
                  rounded-lg border-2 p-2.5 cursor-pointer transition-all
                  ${selectedAddressId === addr.id
                    ? 'border-current bg-opacity-5'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }
                `}
                style={selectedAddressId === addr.id ? { borderColor: brand.primary, backgroundColor: brand.primary + '0D' } : {}}
              >
                <div className="flex items-start gap-2">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    ${selectedAddressId === addr.id ? 'border-current' : 'border-neutral-300'}
                  `}
                  style={selectedAddressId === addr.id ? { borderColor: brand.primary } : {}}>
                    {selectedAddressId === addr.id && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.primary }}></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">
                      {addr.name || t('form.addressLabel')}
                    </div>
                    <div className="text-xs text-neutral-700 line-clamp-2">{addr.details}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* New Address Option */}
            <div
              onClick={() => onAddressSelect("new")}
              className={`
                rounded-lg border-2 p-2.5 cursor-pointer transition-all
                ${selectedAddressId === "new"
                  ? 'border-current bg-opacity-5'
                  : 'border-neutral-200 hover:border-neutral-300'
                }
              `}
              style={selectedAddressId === "new" ? { borderColor: brand.primary, backgroundColor: brand.primary + '0D' } : {}}
            >
              <div className="flex items-center gap-2">
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${selectedAddressId === "new" ? 'border-current' : 'border-neutral-300'}
                `}
                style={selectedAddressId === "new" ? { borderColor: brand.primary } : {}}>
                  {selectedAddressId === "new" && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.primary }}></div>
                  )}
                </div>
                <div className="text-xs font-semibold">
                  {t('form.addNewAddress')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Only show address textarea for new addresses */}
      {(selectedAddressId === "new" || selectedAddressId === null || addresses.length === 0) && (
        <FormTextarea
          label={t('form.address')}
          value={address}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onFieldChange("address", e.target.value)}
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => onFieldBlur("address", e.target.value)}
          error={fieldErrors.address}
          placeholder={t('form.addressPlaceholder')}
        />
      )}

      {/* Only show map picker for new addresses */}
      {/* {(selectedAddressId === "new" || selectedAddressId === null || addresses.length === 0) && (
        <>
          <MapPicker
            lang={lang}
            brand={brand}
            onPick={({ coords, label }) => {
              onFieldChange("coords", coords);
              onFieldChange("geoLabel", label);
            }}
          />

          {formData.geoLabel && (
            <div className="mt-2 text-sm rounded-xl bg-neutral-50 border border-neutral-200 p-2">
              <div className="font-semibold">
                {t('form.selectedLocation')}
              </div>
              <div className="text-neutral-700">{formData.geoLabel}</div>
            </div>
          )}
        </>
      )} */}

      <FormTextarea
        label={t('form.notes')}
        value={notes}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onFieldChange("notes", e.target.value)}
        onBlur={undefined}
        error={undefined}
        placeholder={t('form.notesPlaceholder')}
        minHeight="70px"
      />
    </div>
  );
}
