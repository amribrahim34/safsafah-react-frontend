import React from "react";
import { Clock, Truck, RotateCcw, CreditCard, Phone } from "lucide-react";

export default function ServiceCommitments({ brand }) {
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">التزامات الخدمة</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <Card
          icon={Truck}
          title="التسليم"
          text="تسليم إلى أغلب المحافظات عبر شركاء الشحن. عادةً 1–3 أيام عمل داخل القاهرة الكبرى، و2–5 أيام عمل للمحافظات (قد تختلف المدة وفق شركة الشحن والموقع)."
          brand={brand}
        />
        <Card
          icon={CreditCard}
          title="خيارات الدفع"
          text="الدفع عند الاستلام، أو عبر البطاقة/المحافظ المتاحة حسب شركة الشحن. جميع المعاملات تُدار عبر قنوات دفع معتمدة."
          brand={brand}
        />
        <Card
          icon={RotateCcw}
          title="سياسة الإرجاع"
          text="إمكانية الإرجاع خلال 14 يومًا للمنتجات غير المفتوحة ووفق الشروط المذكورة في صفحة الإرجاع. الهدف هو معالجة مرتجعات عادلة وواضحة."
          brand={brand}
        />
        <Card
          icon={Clock}
          title="الاستجابة"
          text="نحرص على الرد خلال أوقات العمل الرسمية. في حال ضغط الاستفسارات، نُعطي الأولوية لطلبات ما بعد الشراء والتسليم."
          brand={brand}
        />
      </div>
      <p className="text-xs text-neutral-600 mt-3">
        * جميع المواعيد تقديرية وتعتمد على شركة الشحن، حالة الطقس، وعوامل لوجستية خارجية.
      </p>
    </section>
  );
}

function Card({ icon: Icon, title, text, brand }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
      <div className="mt-1 font-bold">{title}</div>
      <p className="text-sm text-neutral-700 mt-1">{text}</p>
    </div>
  );
}
