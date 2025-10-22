import React from "react";
import { IMG } from "../../content/images";

const RV = [
  { id:11, name:{en:"Barrier Cream", ar:"كريم الحاجز"}, price:760, img:IMG.cream },
  { id:12, name:{en:"Vitamin C 15%", ar:"فيتامين سي 15%"}, price:830, img:IMG.bannerTall },
  { id:13, name:{en:"SPF 50", ar:"واقي شمس 50"}, price:430, img:IMG.hero1 },
];

export default function RecentlyViewedStrip({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const fmt = (n)=> new Intl.NumberFormat(isRTL?"ar-EG":"en-EG",{style:"currency",currency:"EGP",maximumFractionDigits:0}).format(n);
  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL?"شوهد مؤخرًا":"Recently viewed"}</div>
      <div className="relative -mx-4 md:mx-0">
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4">
          {RV.map(p=>(
            <a key={p.id} href={`/product/${p.id}`}
               className="snap-center min-w-[75%] max-w-[260px] md:min-w-[220px] rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="h-36 overflow-hidden">
                <img src={p.img} alt={isRTL?p.name.ar:p.name.en} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold line-clamp-2">{isRTL?p.name.ar:p.name.en}</div>
                <div className="text-sm font-extrabold mt-1">{fmt(p.price)}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
