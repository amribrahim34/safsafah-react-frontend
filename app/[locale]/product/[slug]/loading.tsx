import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ProductLoading() {
  const T = COPY["ar"];
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-neutral-500 animate-pulse">
          جاري التحميل...
        </div>
      </div>
      <Footer brand={BRAND} />
    </div>
  );
}
