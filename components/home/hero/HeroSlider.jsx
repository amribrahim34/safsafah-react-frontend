import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { buildUrlWithParams, getCtaFilters } from "../../../lib/navigation";

export default function HeroSlider({ slides, brand }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const id = setInterval(() => {
      const next = (i + 1) % slides.length;
      setI(next);
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5500);
    return () => clearInterval(id);
  }, [i, slides.length]);

  // useEffect(() => {
  //   const onResize = () => {
  //     const el = ref.current; if (!el) return;
  //     el.scrollTo({ left: i * el.clientWidth });
  //   };
  //   window.addEventListener("resize", onResize);
  //   return () => window.removeEventListener("resize", onResize);
  // }, [i]);

  return (
    <div className="relative">
      <div ref={ref} className="w-full h-[68vh] md:h-[78vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex no-scrollbar">
        {slides.map((s, idx) => (
          <div key={idx} className="min-w-full snap-start relative">
            <img src={s.img} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="px-4 md:px-8 lg:px-12 pb-10 md:pb-0 w-full max-w-7xl mx-auto">
                <div className="max-w-xl text-white">
                  <h1 className="text-3xl md:text-5xl font-black leading-tight">{s.title}</h1>
                  <p className="mt-2 text-white/90 text-lg md:text-xl">{s.sub}</p>
                  <div className="mt-5 flex gap-3">
                    <Link
                      href={buildUrlWithParams('/catalog', getCtaFilters(s.cta1))}
                      className="rounded-2xl px-5 py-3 font-semibold text-white"
                      style={{ background: brand.primary }}
                    >
                      {s.cta1}
                    </Link>
                    <Link
                      href={buildUrlWithParams('/catalog', getCtaFilters(s.cta2))}
                      className="rounded-2xl border px-5 py-3 font-semibold text-white/90 border-white/70"
                    >
                      {s.cta2}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`w-2 h-2 rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`} aria-label={`Go to ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}
