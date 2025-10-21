
import React from "react";

export default function RatingBreakdown({ brand, lang, rating=4.7, count=120 }){
  const bars = [5,4,3,2,1].map(star=>({ star, pct: star>=4? (star===5?60:25): (star===3?10: (star===2?3:2)) }));
  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-white">
      <div className="text-3xl font-black">{rating}
        <span className="text-sm text-neutral-500">/5</span>
      </div>
      <div className="text-sm text-neutral-600">{count} {lang==="ar"?"تقييم":"ratings"}</div>
      <div className="mt-3 space-y-2">
        {bars.map(b=> (
          <div key={b.star} className="flex items-center gap-2">
            <div className="w-10 text-xs">{b.star}★</div>
            <div className="flex-1 h-2 bg-neutral-100 rounded overflow-hidden">
              <div className="h-full" style={{width:`${b.pct}%`, background:brand.primary}} />
            </div>
            <div className="w-10 text-xs text-right">{b.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}