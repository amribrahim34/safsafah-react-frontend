
import React from "react";
import ProductGrid from "../products/ProductGrid";
const RECENTS = [
  { id: 102, name:{en:"Cream Cleanser", ar:"منظف كريمي"}, price:420, rating:4.6, img: "/products/retinol-eye-cream-1.jpg" },
  { id: 302, name:{en:"Oil-Free Gel Moisturizer", ar:"جل مرطب خالٍ من الزيوت"}, price:520, rating:4.6, img: "/products/some by mi retinol intense anti-age eye cream.png" },
  { id: 501, name:{en:"Glow Facial Oil", ar:"زيت توهّج للوجه"}, price:650, rating:4.5, img: "/products/cosrx advanced snail 96 mucin power essence 100ml.avif" },
];

export default function RecentlyViewed({ brand, lang }){
  return (
    <div>
      <div className="font-bold text-lg mb-3">{lang==="ar"?"شوهد مؤخرًا":"Recently viewed"}</div>
      <ProductGrid products={RECENTS} lang={lang} brand={brand} />
    </div>
  );
}
