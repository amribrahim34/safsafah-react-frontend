import React from "react";
import { IMG } from "../../content/images";

const WISHLIST = [
  { id:1, name:{en:"Niacinamide 10% Serum", ar:"سيروم نيايسيناميد 10%"}, price:520, img:IMG.serum },
  { id:2, name:{en:"Hydrating Cleanser", ar:"منظف مرطب"}, price:350, img:IMG.cleanser },
  { id:3, name:{en:"SPF 50 PA++++", ar:"واقي شمس SPF 50"}, price:430, img:IMG.hero1 },
];

export default function WishlistGrid({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const fmt = (n)=> new Intl.NumberFormat(isRTL?"ar-EG":"en-EG",{style:"currency",currency:"EGP",maximumFractionDigits:0}).format(n);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-3">{isRTL?"المفضلة":"Wishlist"}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {WISHLIST.map(p=>(
          <article key={p.id} className="rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="h-36 md:h-48 overflow-hidden">
              <img src={p.img} alt={isRTL?p.name.ar:p.name.en} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold line-clamp-2">{isRTL?p.name.ar:p.name.en}</div>
              <div className="text-sm font-extrabold mt-1">{fmt(p.price)}</div>
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1.5 rounded-xl text-white text-sm" style={{background:brand.primary}}>
                  {isRTL?"أضف للسلة":"Add to cart"}
                </button>
                <button className="px-3 py-1.5 rounded-xl border text-sm">{isRTL?"تنبيهات السعر":"Price alert"}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
