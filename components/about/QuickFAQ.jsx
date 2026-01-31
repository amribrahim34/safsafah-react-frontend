import React from "react";

export default function QuickFAQ({ brand }) {
  const qa = [
    {
      q: "هل المنتجات أصلية؟",
      a: "نشتري من موردين وتجار جملة موثوقين داخل مصر ونحتفظ بإثباتات الشراء. نفحص العبوة وتاريخ الصلاحية قبل الشحن.",
    },
    {
      q: "كيف يمكنني الدفع؟",
      a: "يمكنك الدفع نقدًا عند الاستلام، أو عبر البطاقة/المحافظ المتاحة وفق شركة الشحن.",
    },
    {
      q: "متى يصل طلبي؟",
      a: "عادةً 1–3 أيام عمل داخل القاهرة الكبرى، و2–5 أيام عمل لباقي المحافظات. المدة تقديرية وتعتمد على شركة الشحن.",
    },
    {
      q: "ما سياسة الإرجاع؟",
      a: "إرجاع خلال 14 يومًا للمنتجات غير المفتوحة ووفق الشروط المعلنة في صفحة الإرجاع. لمساعدتك، تواصل معنا قبل الإرجاع.",
    },
  ];
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">أسئلة سريعة</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {qa.map((x, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 bg-white">
            <div className="font-bold">{x.q}</div>
            <p className="text-sm text-neutral-700 mt-1">{x.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
