export default function Newsletter({ brand, lang, copy }) {
  const t = copy.sections?.signup || {
    title: lang==="ar" ? "خصم 10% على أول طلب" : "Get 10% off your first order",
    sub: lang==="ar" ? "نصائح روتين وعروض خاصة" : "Routine tips & insider offers",
    placeholder: lang==="ar" ? "ادخل بريدك الإلكتروني" : "Enter your email",
    cta: lang==="ar" ? "اشترك" : "Subscribe",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-24 md:pb-16">
      <div className="rounded-3xl border border-neutral-200 p-6 md:p-10"
           style={{ background: "linear-gradient(135deg,#f6fffb,#ffffff)" }}>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">{t.title}</h3>
            <p className="mt-2 text-neutral-600">{t.sub}</p>
          </div>
          <form className="flex gap-3" onSubmit={(e)=>e.preventDefault()}>
            <input
              className="flex-1 rounded-2xl border border-neutral-300 bg-white px-4 py-3 focus:outline-none focus:ring-2"
              style={{ outlineColor: brand.primary }}
              placeholder={t.placeholder}
              type="email"
              required
            />
            <button className="rounded-2xl text-white px-6 py-3 font-semibold"
                    style={{ background: brand.primary }}>
              {t.cta}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
