import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { IMG } from "@/content/images";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";

import AboutHero from "./_components/AboutHero";
import VisionMission from "./_components/VisionMission";
import Assurances from "./_components/Assurances";
import ServiceCommitments from "./_components/ServiceCommitments";
import QuickFAQ from "@/components/about/QuickFAQ";
import ContactPanel from "./_components/ContactPanel";

async function fetchSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`, {
      headers: { Accept: "application/json", "Accept-Language": "ar" },
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function About() {
  const T = COPY["ar"];
  const siteSettings = await fetchSettings();

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir="rtl">
      <PromoBar
        text={T.promo}
        lang="ar"
        onToggleLang={() => {}}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={T.search} lang="ar" />

      <AboutHero brand={BRAND} img={IMG.bannerWide} />

      <main className="max-w-7xl mx-auto px-4">
        <section className="py-8 md:py-12 grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7">
            <h2 className="text-xl md:text-2xl font-extrabold">من نحن</h2>
            <p className="mt-3 text-neutral-800 leading-relaxed">
              نحن متجرًا إلكترونيًا مستقلًا لمنتجات العناية بالبشرة ومستحضرات التجميل داخل مصر.
              لا نُصنّع المنتجات، بل نعمل كموزّع يختار بضائعَه من موردين وتُجّار جملة موثوقين،
              مع عناية دقيقة بالتحقق من الأصالة وحالة العبوة وتواريخ الصلاحية قبل الشحن.
              هدفنا أن نجعل شراء مستحضرات العناية تجربة بسيطة، واضحة، وخالية من المبالغة.
            </p>
            <p className="mt-3 text-neutral-800 leading-relaxed">
              تقوم فلسفتنا على ثلاثة أركان: الشفافية في المعلومات، الاعتمادية في التنفيذ،
              والاحترام لوقت العميل وميزانيته. إن ثقتك لا تُكتسب بشعار؛ بل تُبنى بتجربة متسقة
              في كل طلبية.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden border">
              <img src={IMG.cream} alt="تحضير الطلبات" className="w-full h-64 object-cover" />
            </div>
          </div>
        </section>

        <VisionMission brand={BRAND} />

        <Assurances brand={BRAND} />

        {/* <ValuesGrid brand={BRAND} /> */}

        {/* <HowWeWork brand={BRAND} images={{ a: IMG.cleanser, b: IMG.hero1, c: IMG.oils }} /> */}

        <ServiceCommitments brand={BRAND} />

        <QuickFAQ brand={BRAND} />

        <ContactPanel brand={BRAND} siteSettings={siteSettings} />
      </main>

      <Footer brand={BRAND} lang="ar" copy={T} />
      <BottomTabs
        labels={{
          home: "الرئيسية",
          cats: "الفئات",
          cart: "السلة",
          wish: "المفضلة",
          account: "حسابي",
        }}
      />
    </div>
  );
}
