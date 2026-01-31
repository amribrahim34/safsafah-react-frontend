import React from "react";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";
import MapPicker from "./MapPicker";

/**
 * Checkout form component containing all customer information fields
 */
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
}) {
  const { fullName, mobile, address, notes } = formData;
  const isRTL = lang === "ar";

  return (
    <div className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">
        {lang === "ar" ? "الدفع السريع" : "Ultra-fast checkout"}
      </div>

      <FormInput
        label={lang === "ar" ? "الاسم *" : "Name *"}
        value={fullName}
        onChange={(e) => onFieldChange("fullName", e.target.value)}
        onBlur={(e) => onFieldBlur("fullName", e.target.value)}
        error={fieldErrors.fullName}
        placeholder={
          lang === "ar" ? "الاسم" : "Your name"
        }
      />

      <FormInput
        label={lang === "ar" ? "الموبايل *" : "Mobile *"}
        value={mobile}
        onChange={(e) => onFieldChange("mobile", e.target.value)}
        onBlur={(e) => onFieldBlur("mobile", e.target.value)}
        error={fieldErrors.mobile}
        inputMode="tel"
        placeholder={
          lang === "ar"
            ? "01xxxxxxxxx أو +201xxxxxxxxx"
            : "01xxxxxxxxx or +201xxxxxxxxx"
        }
      />

      {/* Saved Addresses */}
      {addresses && addresses.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">
            {isRTL ? "اختر عنوان محفوظ" : "Choose saved address"}
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
                      {addr.name || (isRTL ? "📍 عنوان" : "📍 Address")}
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
                  {isRTL ? "+ إضافة عنوان جديد" : "+ Add new address"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Only show address textarea for new addresses */}
      {(selectedAddressId === "new" || selectedAddressId === null || addresses.length === 0) && (
        <FormTextarea
          label={lang === "ar" ? "العنوان التفصيلي *" : "Address *"}
          value={address}
          onChange={(e) => onFieldChange("address", e.target.value)}
          onBlur={(e) => onFieldBlur("address", e.target.value)}
          error={fieldErrors.address}
          placeholder={
            lang === "ar"
              ? "اسم الشارع، المبنى/العمارة، الدور/الشقة"
              : "Street, building, floor/apt"
          }
        />
      )}

      {/* Only show map picker for new addresses */}
      {(selectedAddressId === "new" || selectedAddressId === null || addresses.length === 0) && (
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
                {lang === "ar" ? "الموقع المحدد" : "Selected location"}
              </div>
              <div className="text-neutral-700">{formData.geoLabel}</div>
            </div>
          )}
        </>
      )}

      <FormTextarea
        label={lang === "ar" ? "ملاحظات للمندوب" : "Notes for courier"}
        value={notes}
        onChange={(e) => onFieldChange("notes", e.target.value)}
        placeholder={
          lang === "ar"
            ? "مثلاً: اتصل قبل الوصول"
            : "e.g., please call on arrival"
        }
        minHeight="70px"
      />
    </div>
  );
}
