import { Leaf, ShieldCheck } from "lucide-react";

export default function Footer({ brand, lang, copy }) {
  const nav = copy.nav || {};
  const sections = copy.sections || {};
  const footer = copy.footer || {
    about: lang==="ar"
      ? "نختار عناية قائمة على العلم لبيئة مصر مع توصيل سريع ونصيحة صادقة."
      : "We curate science-backed skincare for Egypt with fast delivery and honest advice.",
    rights: lang==="ar" ? "جميع الحقوق محفوظة." : "All rights reserved.",
  };

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/safsafah-logo.png" alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
            <div className="font-extrabold text-xl tracking-tight">SAFSAFAH</div>
          </div>
          <p className="mt-4 text-neutral-600">{footer.about}</p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-3">{lang==="ar" ? "روابط سريعة" : "Quick links"}</div>
          <ul className="space-y-2 text-neutral-600">
            <li><a href="#" className="hover:opacity-80" style={{ color: brand.primary }}>{nav.shop || (lang==="ar"?"المتجر":"Shop")}</a></li>
            <li><a href="#bestsellers" className="hover:opacity-80" style={{ color: brand.primary }}>{nav.bestsellers || (lang==="ar"?"الأكثر مبيعًا":"Bestsellers")}</a></li>
            <li><a href="#categories" className="hover:opacity-80" style={{ color: brand.primary }}>{sections.categories || (lang==="ar"?"تسوق حسب الفئة":"Shop by category")}</a></li>
            <li><a href="#" className="hover:opacity-80" style={{ color: brand.primary }}>{nav.contact || (lang==="ar"?"تواصل":"Contact")}</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <div className="font-semibold mb-3">{lang==="ar" ? "المساعدة" : "Help"}</div>
          <ul className="space-y-2 text-neutral-600">
            <li><a href="#" className="hover:opacity-80">FAQ</a></li>
            <li><a href="#" className="hover:opacity-80">Shipping & Returns</a></li>
            <li><a href="#" className="hover:opacity-80">Privacy</a></li>
          </ul>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3">
            <Leaf className="w-5 h-5" style={{ color: brand.primary }} />
            <div className="text-sm">{lang==="ar" ? "تعبئة صديقة للبيئة" : "Eco-friendly packaging"}</div>
          </div>
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" style={{ color: brand.primary }} />
            <div className="text-sm">{lang==="ar" ? "دفع آمن وبطاقات محلية" : "Secure checkout & local cards"}</div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 pb-24 md:pb-8">
        © {new Date().getFullYear()} SAFSAFAH — {footer.rights}
      </div>
    </footer>
  );
}
