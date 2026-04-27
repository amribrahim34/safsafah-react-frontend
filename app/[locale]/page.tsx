import { BRAND } from "@/content/brand";
import { IMG } from "@/content/images";
// import { COPY } from "@/content/copy";

import ClientWrapper from "@/components/ClientWrapper";
import BrandTrust from "@/components/home/trust/BrandTrust";
import Banners from "@/components/home/banners/Banners";
import NewArrivals from "@/components/home/arrivals/NewArrivals";
import BestSellers from "@/components/home/bestsellers/BestSellers";
import CategoriesSection from "@/components/home/categories/CategoriesSection";
import BrandsSection from "@/components/home/brands/BrandsSection";
// import MoreBanners from "@/components/home/banners/ExtraBanners";
import Footer from "@/components/footer/Footer";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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
