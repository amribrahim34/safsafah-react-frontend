
import React from "react";
import ProductGrid from "../products/ProductGrid";
import { IMG } from "../../content/images";

const RECENTS = [
  { id: 102, name:{en:"Cream Cleanser", ar:"منظف كريمي"}, price:420, rating:4.6, img: IMG.cream },
  { id: 302, name:{en:"Oil-Free Gel Moisturizer", ar:"جل مرطب خالٍ من الزيوت"}, price:520, rating:4.6, img: IMG.serum },
  { id: 501, name:{en:"Glow Facial Oil", ar:"زيت توهّج للوجه"}, price:650, rating:4.5, img: IMG.oils },
];

export default function RecentlyViewed({ brand, lang }){
  return (
    <div>
      <div className="font-bold text-lg mb-3">{lang==="ar"?"شوهد مؤخرًا":"Recently viewed"}</div>
      <ProductGrid products={RECENTS} lang={lang} brand={brand} />
    </div>
  );
}
