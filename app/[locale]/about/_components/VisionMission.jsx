import React from "react";

export default function VisionMission({ brand }) {
  return (
    <section className="py-6 md:py-10 grid md:grid-cols-2 gap-4">
      <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-neutral-50">
        <div className="text-sm font-semibold opacity-70">الرؤية</div>
        <h3 className="mt-1 text-lg md:text-xl font-extrabold">
          أن نكون الوجهة الأكثر ثقة في مصر حيث تصبح العناية بالبشرة والجمال سهلة ومبهجة وحقيقية — مع كل منتج، كل مرة.
        </h3>
      </div>
      <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-white">
        <div className="text-sm font-semibold opacity-70">الرسالة</div>
        <p className="mt-1 text-neutral-800 leading-relaxed">
          نسعى إلى توفير منتجات عناية بالبشرة ومستحضرات تجميل أصلية وعالية الجودة عبر منصّة موثوقة تعتمد على التقنية.
          نُيسّر الوصول إلى الجمال بثقة من خلال الشفافية، والاختيار المسؤول للموردين، وخدمة يعتمد عليها—
          لبناء علاقات طويلة المدى وربحية مستدامة قائمة على النزاهة والبساطة والاحترام.
        </p>
      </div>
    </section>
  );
}
