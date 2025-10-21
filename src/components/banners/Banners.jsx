export default function Banners({ imgWide, imgTall, brand, lang }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <a href="#" className="group relative rounded-2xl overflow-hidden border border-neutral-200 md:col-span-2">
        <img src={imgWide} alt="promo" className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="text-sm" style={{ color: brand.light }}>NEW IN</div>
          <div className="text-2xl md:text-4xl font-black leading-tight">Barrier Reset Kit</div>
          <p className="opacity-90">{lang === "ar" ? "منظف • سيروم • مرطب — مصمم لمناخ مصر." : "Cleanser • Serum • Moisturizer — designed for Egypt’s climate."}</p>
        </div>
      </a>

      <a href="#" className="group relative rounded-2xl overflow-hidden border border-neutral-200">
        <img src={imgTall} alt="promo" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="text-sm" style={{ color: brand.light }}>{lang === "ar" ? "عرض الأسبوع" : "Weekly Offer"}</div>
          <div className="text-2xl font-black">{lang === "ar" ? "خصم 20% على السيرومات" : "20% off Serums"}</div>
        </div>
      </a>
    </div>
  );
}
