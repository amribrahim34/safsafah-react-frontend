
import React from "react";
import { IMG } from "../../content/images";

const MOCK = [
  { name:"Nour E.", rating:5, text:{en:"Brighter in a week, zero stickiness.", ar:"تفتيح ملحوظ خلال أسبوع، بدون لزوجة."}, img: IMG.bannerTall },
  { name:"Omar S.", rating:4, text:{en:"Faded dark spots. Use SPF daily!", ar:"التصبغات خفت. لازم واقي شمس يوميًا!"}, img: IMG.serum },
  { name:"Mariam A.", rating:5, text:{en:"Light texture for Cairo heat.", ar:"ملمس خفيف مناسب لحر القاهرة."}, img: IMG.bannerWide },
];

export default function Reviews({ brand, lang }){
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar">
      {MOCK.map((r,i)=> (
        <div key={i} className="min-w-[260px] rounded-2xl border border-neutral-200 p-3 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden"><img src={r.img} alt="avatar" className="w-full h-full object-cover" /></div>
            <div>
              <div className="font-semibold text-sm">{r.name}</div>
              <div className="text-xs text-neutral-600">{"★".repeat(r.rating)}</div>
            </div>
          </div>
          <div className="text-sm mt-2">{lang==="ar"?r.text.ar:r.text.en}</div>
        </div>
      ))}
    </div>
  );
}
