'use client';

import '@/lib/i18n';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';
import Image from 'next/image';
import { BRAND } from '@/content/brand';
import { IMG } from '@/content/images';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import VisionMission from './_components/VisionMission';
import ServiceCommitments from './_components/ServiceCommitments';
import QuickFAQ from '@/components/about/QuickFAQ';
import ContactPanel from './_components/ContactPanel';

export default function AboutPage() {
  const lang = useLocale();
  const { t, i18n } = useTranslation('about');
  const { t: tHome } = useTranslation('home');
  const [siteSettings, setSiteSettings] = useState(null);

  useDir();

  // Sync i18next language with the URL locale before render to avoid hydration mismatch
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`, {
      headers: { Accept: 'application/json', 'Accept-Language': 'ar' },
    })
      .then((r) => r.json())
      .then((json) => setSiteSettings(json.data ?? null))
      .catch(() => {});
  }, []);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir={dir}>
      <PromoBar text={tHome('promo')} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={tHome('search')} />

      <main className="max-w-7xl mx-auto px-4">
        <section className="py-8 md:py-12 grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7">
            <h2 className="text-xl md:text-2xl font-extrabold">{t('whoWeAre')}</h2>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t('intro')}</p>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t('philosophy')}</p>
          </div>
          <div className="md:col-span-5">
            <div className="relative h-64 rounded-3xl overflow-hidden border">
              <Image src={IMG.cream} alt={t('imgAlt')} fill className="object-cover" />
            </div>
          </div>
        </section>

        <VisionMission brand={BRAND} t={t('visionMission', { returnObjects: true })} />

        <ServiceCommitments brand={BRAND} t={t('serviceCommitments', { returnObjects: true })} />

        <QuickFAQ brand={BRAND} t={t('faq', { returnObjects: true })} />

        <ContactPanel brand={BRAND} siteSettings={siteSettings} t={t('contact', { returnObjects: true })} />
      </main>

      <Footer brand={BRAND} />
    </div>
  );
}
