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
}) {
  const { fullName, mobile, address, notes } = formData;

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
