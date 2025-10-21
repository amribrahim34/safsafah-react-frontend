import React, { useState } from "react";
import { IMG } from "../../content/images";
import { Star, CheckCircle2 } from "lucide-react";

const MOCK = [
  {
    name: "Nour E.",
    rating: 5,
    text: {
      en: "Brighter in a week, zero stickiness. Texture sinks in fast and plays well under SPF.",
      ar: "تفتيح ملحوظ خلال أسبوع، بدون لزوجة. القوام يمتص بسرعة ويتناسب مع واقي الشمس."
    },
    title: { en: "Real glow, fast", ar: "توهّج حقيقي بسرعة" },
    img: IMG.bannerTall,
    date: "2025-08-14",
    verified: true,
    photos: [IMG.serum]
  },
  {
    name: "Omar S.",
    rating: 4,
    text: {
      en: "Faded dark spots. Use SPF daily! Slight tingle first days.",
      ar: "التصبغات خفّت. لازم واقي شمس يوميًا! فيه وخز بسيط أول أيام."
    },
    title: { en: "Spots fading", ar: "التصبغات اختفت تدريجيًا" },
    img: IMG.serum,
    date: "2025-07-01",
    verified: true,
    photos: []
  },
  {
    name: "Mariam A.",
    rating: 5,
    text: {
      en: "Light texture for Cairo heat. No pilling under makeup.",
      ar: "ملمس خفيف مناسب لحر القاهرة. لا يتكتل تحت المكياج."
    },
    title: { en: "Perfect under makeup", ar: "مثالي تحت المكياج" },
    img: IMG.bannerWide,
    date: "2025-06-19",
    verified: false,
    photos: [IMG.bannerWide]
  },
];

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
  const text = lang === "ar" ? r.text.ar : r.text.en;
  const title = r.title ? (lang === "ar" ? r.title.ar : r.title.en) : null;
  const date = new Date(r.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-EG", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <article
      className="
        snap-center flex-shrink-0
        w-[85%] max-w-sm md:max-w-none md:min-w-[260px]
        rounded-2xl border border-neutral-200 p-3 bg-white
      "
    >
      <header className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={r.img} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm truncate">{r.name}</div>
            {r.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> {lang === "ar" ? "مشتري موثّق" : "Verified Buyer"}
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-500">{date}</div>
        </div>
        <div className="ms-auto">
          <Stars rating={r.rating} />
        </div>
      </header>

      {title && <div className="mt-2 text-sm font-semibold">{title}</div>}

      <p className={`text-sm mt-1 ${open ? "" : "line-clamp-3"}`}>{text}</p>
      {text.length > 120 && (
        <button
          className="mt-1 text-xs underline text-neutral-700"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? (lang === "ar" ? "عرض أقل" : "Show less") : (lang === "ar" ? "اقرأ المزيد" : "Read more")}
        </button>
      )}

      {!!(r.photos && r.photos.length) && (
        <div className="mt-2 flex gap-2">
          {r.photos.map((p, i) => (
            <button key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-neutral-200">
              <img src={p} alt="user photo" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Reviews({ brand, lang, reviews = MOCK }) {
  return (
    // wrapper eats side padding so the scroller doesn’t push the body width
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
        {reviews.map((r, i) => (
          <ReviewCard key={i} r={r} lang={lang} />
        ))}
      </div>
    </div>
  );
}
