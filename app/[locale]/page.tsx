import Image from "next/image";
import { BRAND } from "@/content/brand";
// import { COPY } from "@/content/copy";

import ClientWrapper from "@/components/ClientWrapper";
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
    <ClientWrapper lang={lang} className="">
      <section className="mx-2 lg:mx-10">
        <h1 className="sr-only">
          {lang === 'ar' 
            ? 'صفصافه - أفضل منتجات العناية بالبشرة والتجميل' 
            : 'Safsafah - Premium Skincare & Cosmetics'}
        </h1>
        {/* Server-rendered content */}
        <NewArrivals brand={BRAND} />
        <section id="categories">
          <CategoriesSection />
        </section>
        <section id="banner_1" className="py-4"> 
          <div className=" ">
            <Image src="/banners/discover_cleanser.jpeg" alt="Discover Cleanser" width={1920} height={600} className="w-full h-auto" />
          </div>
        </section>  
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
