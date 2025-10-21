export default function JournalSection({ brand, lang, articles }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-4">
        {lang === "ar" ? "مجلّة اللمعان" : "Glow Journal"}
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {(articles || []).map((a, idx) => (
          <a key={idx} href={a.href || "#"} className="group rounded-2xl overflow-hidden border border-neutral-200">
            <img src={a.img} alt="article" className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="font-semibold">{lang === "ar" ? a.titleAr : a.titleEn}</div>
              <div className="text-sm text-neutral-600 mt-1">
                {a.meta || (lang === "ar" ? "قراءة سريعة" : "3-min read")}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
