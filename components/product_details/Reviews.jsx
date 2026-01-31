import React, { useState } from "react";
import { Star, User } from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ r, lang }) {
  const [open, setOpen] = useState(false);
  const text = r.comment;
  const date = new Date(r.createdAt).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-EG", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <article
      className="
        snap-center flex-shrink-0
        w-[85%] max-w-sm md:max-w-none md:min-w-[260px]
        rounded-2xl border border-neutral-200 p-3 bg-white
      "
    >
      <header className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
          <User className="w-5 h-5 text-neutral-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm truncate">{r.userName}</div>
          </div>
          <div className="text-[11px] text-neutral-500">{date}</div>
        </div>
        <div className="ms-auto">
          <Stars rating={r.rating} />
        </div>
      </header>

      <p className={`text-sm mt-2 ${open ? "" : "line-clamp-3"}`}>{text}</p>
      {text && text.length > 120 && (
        <button
          className="mt-1 text-xs underline text-neutral-700"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? (lang === "ar" ? "عرض أقل" : "Show less") : (lang === "ar" ? "اقرأ المزيد" : "Read more")}
        </button>
      )}
    </article>
  );
}

export default function Reviews({ brand, lang, reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        {lang === "ar" ? "لا توجد مراجعات بعد" : "No reviews yet"}
      </div>
    );
  }

  return (
    // wrapper eats side padding so the scroller doesn't push the body width
    <div className="relative -mx-4 md:mx-0">
      <div
        className="
          flex gap-3 overflow-x-auto no-scrollbar
          snap-x snap-mandatory
          px-4 md:px-0
        "
        // make sure this container never grows wider than viewport
        style={{ maxWidth: "100vw" }}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.id} r={r} lang={lang} />
        ))}
      </div>
    </div>
  );
}
