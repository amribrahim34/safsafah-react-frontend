import React from "react";
import { Search, FileCheck, Boxes, Layers, PackageCheck, Truck } from "lucide-react";

export default function HowWeWork({ brand, images }) {
  const steps = [
    {
      icon: Search,
      title: "اختيار المورّد",
      desc: "نتعامل مع موردين وتجار جملة معروفين ونراجع تاريخهم في السوق قبل الشراء.",
      img: images.a,
    },
    {
      icon: FileCheck,
      title: "التحقق من الأصالة",
      desc: "طلب فاتورة شراء، ومراجعة العلامات المميِّزة للمنتج، وفحص تواريخ الصلاحية.",
      img: images.b,
    },
    {
      icon: Boxes,
      title: "التخزين المنظّم",
      desc: "حفظ المنتجات في مكان جاف ومغلق بعيدًا عن الحرارة المباشرة للحفاظ على الجودة.",
      img: images.c,
    },
    {
      icon: PackageCheck,
      title: "تجهيز الطلب",
      desc: "مراجعة الأصناف، حماية الشحنة بمواد مناسبة، وإرفاق بيانات التواصل والفاتورة.",
      img: images.a,
    },
    {
      icon: Truck,
      title: "الشحن والمتابعة",
      desc: "تسليم الطلب لشركة الشحن وإرسال تحديثات الحالة حتى الاستلام.",
      img: images.b,
    },
    {
      icon: Layers,
      title: "خدمة ما بعد البيع",
      desc: "الدعم عند الحاجة بخصوص التبديل أو الإرجاع وفق السياسة المعلنة.",
      img: images.c,
    },
  ];
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">كيف نعمل</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <article key={i} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
            <div className="h-36">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <s.icon className="w-5 h-5" style={{ color: brand.primary }} />
              <div className="mt-1 font-bold">{s.title}</div>
              <p className="text-sm text-neutral-700 mt-1">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
