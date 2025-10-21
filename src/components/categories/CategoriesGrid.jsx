export default function CategoriesGrid({ items, lang }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-extrabold">{lang==="ar"?"تسوق حسب الفئة":"Shop by category"}</h2>
        <a href="#" className="font-semibold">{lang==="ar"?"الكل":"View all"}</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((c, i) => (
          <a key={i} href="#" className="relative rounded-2xl overflow-hidden border border-neutral-200">
            <img src={c.img} alt="cat" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-white font-semibold text-lg">{lang==="ar"?c.labelAr:c.labelEn}</div>
          </a>
        ))}
      </div>
    </>
  );
}
