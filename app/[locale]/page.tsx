import Image from "next/image";
import { BRAND } from "@/content/brand";
// import { COPY } from "@/content/copy";

import ClientWrapper from "@/components/ClientWrapper";
import MoreBanners from "./_components/MoreBanners";
import NewArrivals from "./_components/NewArrivals";
import BestSellers from "./_components/BestSellers";
import CategoriesSection from "./_components/CategoriesSection";
import BrandsSection from "./_components/BrandsSection";
import HomeProductSection from "./_components/HomeProductSection";


type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  
  return (
    <ClientWrapper lang={lang} className="">
      <section className="mx-2 lg:mx-10">
        <h1 className="sr-only">
          {lang === 'ar' 
            ? 'صفصافه - أفضل منتجات العناية بالبشرة والتجميل' 
            : 'Safsafah - Premium Skincare & Cosmetics'}
        </h1>
        {/* Server-rendered content */}
        <HomeProductSection
          titleKey="homeSections.onSale.title"
          viewAllKey="homeSections.onSale.viewAll"
          filters={{ sale: true }}
          viewAllPath="/catalog?sale=true"
          brand={BRAND}
        />
        <MoreBanners />
        <NewArrivals brand={BRAND} />
        <section id="categories">
          <CategoriesSection />
        </section>
        <HomeProductSection
          titleKey="homeSections.brandSomebymi.title"
          viewAllKey="homeSections.brandSomebymi.viewAll"
          filters={{ brandIds: [3] }}
          viewAllPath="/catalog?brandIds=3"
          brand={BRAND}
        />
        <section id="banner_1" className="py-4">
          <div className=" ">
            <Image src="/banners/discover_cleanser.jpeg" alt="Discover Cleanser" width={1920} height={600} className="w-full h-auto" />
          </div>
        </section> 
        <HomeProductSection
          titleKey="homeSections.category18.title"
          viewAllKey="homeSections.category18.viewAll"
          filters={{ categoryIds: [18] }}
          viewAllPath="/catalog?categoryIds=18"
          brand={BRAND}
        /> 
        <section id="brands">
          <BrandsSection />
        </section>

        <section id="bestsellers">
          <BestSellers brand={BRAND} />
        </section>
        
        

        {/* <Newsletter brand={BRAND} lang={lang} copy={COPY[lang as keyof typeof COPY]} /> */}

      </section>
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
