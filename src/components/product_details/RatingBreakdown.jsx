
import React from "react";

export default function RatingBreakdown({ brand, lang, rating=4.7, count=120, ratingDistribution }){
  // Extract percentages from ratingDistribution or use defaults
  const getPercentage = (ratingData) => {
    // If ratingData is undefined or null, return 0
    if (ratingData == null) return 0;

    // If it's already a number, return it directly
    if (typeof ratingData === 'number') {
      return ratingData;
    }

    // If it's an object with parsedValue
    if (typeof ratingData === 'object' && typeof ratingData.parsedValue === 'number') {
      return ratingData.parsedValue;
    }

    // Try to parse source if it exists
    if (typeof ratingData === 'object' && ratingData.source) {
      const parsed = parseFloat(ratingData.source);
      return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
  };

  const bars = [
    { star: 5, pct: ratingDistribution ? getPercentage(ratingDistribution.fiveStarsPercentage) : 60 },
    { star: 4, pct: ratingDistribution ? getPercentage(ratingDistribution.fourStarsPercentage) : 25 },
    { star: 3, pct: ratingDistribution ? getPercentage(ratingDistribution.threeStarsPercentage) : 10 },
    { star: 2, pct: ratingDistribution ? getPercentage(ratingDistribution.twoStarsPercentage) : 3 },
    { star: 1, pct: ratingDistribution ? getPercentage(ratingDistribution.oneStarPercentage) : 2 },
  ];

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
            <div className="w-10 text-xs text-right">{Math.round(b.pct)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}