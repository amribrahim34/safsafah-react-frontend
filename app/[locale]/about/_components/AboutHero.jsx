import React from "react";

export default function AboutHero({ brand, img }) {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img src={img} alt="عن المتجر" className="w-full h-[40vh] md:h-[48vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 h-[40vh] md:h-[48vh] flex items-end pb-8">
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">عن المتجر</h1>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-2xl">
            متجر مستقل يختار منتجات موثوقة من موردين معتمدين داخل مصر؛ تجربة شراء
            واضحة ومحترمة، من اختيار المنتج حتى الاستلام.
          </p>
        </div>
      </div>
    </section>
  );
}
