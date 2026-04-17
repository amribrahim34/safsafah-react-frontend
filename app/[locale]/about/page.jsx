import { BRAND } from "@/content/brand";
import { IMG } from "@/content/images";

import enAbout from "@/locales/en/about.json";
import arAbout from "@/locales/ar/about.json";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";

import VisionMission from "./_components/VisionMission";
import ServiceCommitments from "./_components/ServiceCommitments";
import QuickFAQ from "@/components/about/QuickFAQ";
import ContactPanel from "./_components/ContactPanel";

import enHome from "@/locales/en/home.json";
import arHome from "@/locales/ar/home.json";

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

export default async function About({ params }) {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "ar";
  const t = lang === "en" ? enAbout : arAbout;
  const homeT = lang === "en" ? enHome : arHome;

  const siteSettings = await fetchSettings();

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir={lang === "ar" ? "rtl" : "ltr"}>
      <PromoBar
        text={homeT.promo}
        lang={lang}
        onToggleLang={() => {}}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={homeT.search} lang={lang} />

      <main className="max-w-7xl mx-auto px-4">
        <section className="py-8 md:py-12 grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7">
            <h2 className="text-xl md:text-2xl font-extrabold">{t.whoWeAre}</h2>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t.intro}</p>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t.philosophy}</p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden border">
              <img src={IMG.cream} alt={t.imgAlt} className="w-full h-64 object-cover" />
            </div>
          </div>
        </section>

        <VisionMission brand={BRAND} t={t.visionMission} />

        <ServiceCommitments brand={BRAND} t={t.serviceCommitments} />

        <QuickFAQ brand={BRAND} t={t.faq} />

        <ContactPanel brand={BRAND} siteSettings={siteSettings} t={t.contact} />
      </main>

      <Footer brand={BRAND} lang={lang} copy={homeT} />
      <BottomTabs labels={t.bottomTabs} />
    </div>
  );
}
