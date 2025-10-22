import React, { useState } from "react";
import { Star } from "lucide-react";
import { IMG } from "../../../content/images";

const DATA = [
  { name: "Nour", city: "Cairo", rating: 5,
    text: { en: "Delivery next day & glow in a week!", ar: "التوصيل تاني يوم وتوهّج خلال أسبوع!" },
    img: IMG.bannerTall },
  { name: "Omar", city: "Giza", rating: 4,
    text: { en: "Real products, prices are fair.", ar: "منتجات أصلية والأسعار معقولة." },
    img: IMG.cream },
  { name: "Mariam", city: "Alex", rating: 5,
    text: { en: "Great support, love the SPF.", ar: "دعم ممتاز وواقي الشمس رهيب." },
    img: IMG.hero2 },
];

export default function Testimonials({ brand, lang = "ar" }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-lg md:text-xl font-extrabold mb-3">
        {lang === "ar" ? "قالوا عنّا (مصريين)" : "What Egyptians say"}
      </h3>

      <div className="relative -mx-4 md:mx-0">
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4">
          {DATA.map((r, i) => (
            <article key={i}
              className="snap-center min-w-[85%] max-w-sm md:min-w-[320px] rounded-2xl border border-neutral-200 bg-white p-4">
              <header className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img src={r.img} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">{r.name} · {r.city}</div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < r.rating ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                </div>
              </header>
              <p className="text-sm mt-2">{lang === "ar" ? r.text.ar : r.text.en}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
