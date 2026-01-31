import React from "react";
import { ShieldCheck, Truck, CreditCard, RotateCcw, Lock } from "lucide-react";

export default function Assurances({ brand }) {
  const items = [
    { icon: ShieldCheck, text: "منتجات أصلية من موردين معتمدين" },
    { icon: Truck,       text: "توصيل موثوق داخل مصر وفق نطاق شركة الشحن" },
    { icon: CreditCard,  text: "الدفع عند الاستلام أو بالبطاقة/المحافظ المتاحة" },
    { icon: RotateCcw,   text: "إمكانية الإرجاع خلال 14 يومًا وفق سياسة المرتجعات" },
    { icon: Lock,        text: "حماية بياناتك واحترام خصوصيتك" },
  ];
  return (
    <section className="py-6">
      <div className="rounded-3xl border border-neutral-200 p-4 md:p-5 bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              <it.icon className="w-5 h-5" style={{ color: brand.primary }} />
              <div className="text-sm font-semibold">{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
