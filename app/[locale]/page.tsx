import { BRAND } from "@/content/brand";
import { IMG } from "@/content/images";
// import { COPY } from "@/content/copy";

import ClientWrapper from "@/components/ClientWrapper";
import Footer from "@/components/footer/Footer";
import BrandTrust from "./_components/BrandTrust";
import Banners from "./_components/Banners";
import NewArrivals from "./_components/NewArrivals";
import BestSellers from "./_components/BestSellers";
import CategoriesSection from "./_components/CategoriesSection";
import BrandsSection from "./_components/BrandsSection";


type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  
  return (
    <ClientWrapper lang={lang}>
      <h1 className="sr-only">
        {lang === 'ar' 
          ? 'صفصافه - أفضل منتجات العناية بالبشرة والتجميل' 
          : 'Safsafah - Premium Skincare & Cosmetics'}
      </h1>

      {/* Server-rendered content */}
      <BrandTrust brand={BRAND} lang={lang} />

      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND}  />
      </section>
      {/* <MoreBanners brand={BRAND} lang={lang} /> */}

      <NewArrivals brand={BRAND} />

      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND}  />
      </section>

      <section id="categories">
        <CategoriesSection />
      </section>

      <section id="brands">
        <BrandsSection />
      </section>

      <section id="bestsellers">
        <BestSellers brand={BRAND} />
      </section>

      {/* <Newsletter brand={BRAND} lang={lang} copy={COPY[lang as keyof typeof COPY]} /> */}

      <Footer brand={BRAND} />
    </ClientWrapper>
  );
}

// Generate static params for known locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}
