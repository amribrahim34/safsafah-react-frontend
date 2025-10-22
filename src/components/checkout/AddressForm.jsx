import React from "react";

export default function AddressForm({ lang, brand, addr, setAddr }) {
  const set = (k, v) => setAddr({ ...addr, [k]: v });

  const Label = ({ children }) => <div className="text-sm font-semibold mb-1">{children}</div>;
  const Input = (props) => (
    <input
      {...props}
      className={`w-full rounded-2xl border border-neutral-300 px-3 py-2 ${props.className || ""}`}
      style={{ outlineColor: brand.primary }}
    />
  );
  const cities = ["Cairo", "Giza", "Alexandria", "Sharqia", "Dakahlia", "Qalyubia"];

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="font-bold text-lg mb-3">{lang === "ar" ? "عنوان التوصيل" : "Delivery address"}</div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label>{lang === "ar" ? "الاسم الأول *" : "First name *"}</Label>
          <Input value={addr.firstName} onChange={(e) => set("firstName", e.target.value)} />
        </div>
        <div>
          <Label>{lang === "ar" ? "اسم العائلة" : "Last name"}</Label>
          <Input value={addr.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div>
          <Label>{lang === "ar" ? "الموبايل *" : "Mobile *"}</Label>
          <Input
            placeholder={lang === "ar" ? "01xxxxxxxxx أو +201xxxxxxxxx" : "01xxxxxxxxx or +201xxxxxxxxx"}
            value={addr.phone}
            onChange={(e) => set("phone", e.target.value)}
            inputMode="tel"
          />
        </div>
        <div>
          <Label>{lang === "ar" ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}</Label>
          <Input value={addr.email} onChange={(e) => set("email", e.target.value)} type="email" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div>
          <Label>{lang === "ar" ? "المدينة *" : "City *"}</Label>
          <select
            className="w-full rounded-2xl border border-neutral-300 px-3 py-2"
            value={addr.city}
            onChange={(e) => set("city", e.target.value)}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>{lang === "ar" ? "المنطقة/الحي *" : "District *"}</Label>
          <Input value={addr.district} onChange={(e) => set("district", e.target.value)} />
        </div>
      </div>

      <div className="mt-3">
        <Label>{lang === "ar" ? "الشارع *" : "Street *"}</Label>
        <Input value={addr.street} onChange={(e) => set("street", e.target.value)} />
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <div>
          <Label>{lang === "ar" ? "المبنى" : "Building"}</Label>
          <Input value={addr.building} onChange={(e) => set("building", e.target.value)} />
        </div>
        <div>
          <Label>{lang === "ar" ? "الدور" : "Floor"}</Label>
          <Input value={addr.floor} onChange={(e) => set("floor", e.target.value)} />
        </div>
        <div>
          <Label>{lang === "ar" ? "الشقة" : "Apt."}</Label>
          <Input value={addr.apt} onChange={(e) => set("apt", e.target.value)} />
        </div>
        <div>
          <Label>{lang === "ar" ? "علامة مميزة" : "Landmark"}</Label>
          <Input value={addr.landmark} onChange={(e) => set("landmark", e.target.value)} />
        </div>
      </div>

      <div className="mt-3">
        <Label>{lang === "ar" ? "ملاحظات للمندوب" : "Notes for courier"}</Label>
        <textarea
          value={addr.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="w-full rounded-2xl border border-neutral-300 px-3 py-2 min-h-[80px]"
        />
      </div>
    </section>
  );
}
