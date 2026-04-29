'use client';

import '@/lib/i18n';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useDir } from '@/hooks/useDir';
import { BRAND } from '@/content/brand';
import { settingsService, type SiteSettings } from '@/lib/api/services';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import QuickFAQ from '@/components/about/QuickFAQ';
import ContactCards from './_components/ContactCards';
import ContactForm, { type ContactFormTranslations } from './_components/ContactForm';
import ResponseHoursPanel from './_components/ResponseHoursPanel';

export default function ContactPage() {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('contact');
  const { t: tHome } = useTranslation('home');
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useDir();

  if (i18n.language !== lang) i18n.changeLanguage(lang);

  useEffect(() => {
    settingsService.getSettings().then(setSiteSettings).catch(() => {});
  }, []);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir={dir}>
      <PromoBar text={tHome('promo')} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={tHome('search')} />

      <main className="max-w-7xl mx-auto">
        <header className="px-4 pt-6 pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold">{t('pageTitle')}</h1>
          <p className="text-neutral-600 mt-1">{t('pageSubtitle')}</p>
        </header>

        <section className="px-4">
          <ContactCards
            brand={BRAND}
            t={t('contactCards', { returnObjects: true }) as { whatsapp: string; mobile: string; email: string }}
            siteSettings={siteSettings}
          />
        </section>

        <section className="px-4 py-6 md:py-8 grid md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-7">
            <ContactForm
              brand={BRAND}
              t={t('form', { returnObjects: true }) as ContactFormTranslations}
              siteSettings={siteSettings}
              lang={lang}
            />
          </div>
          <div className="md:col-span-5">
            <ResponseHoursPanel
              t={t('responseHours', { returnObjects: true }) as { title: string; hours: string; tipsTitle: string; tips: string[] }}
            />
          </div>
        </section>

        <section className="px-4 pb-10">
          <QuickFAQ brand={BRAND} t={t('faq', { returnObjects: true })} />
        </section>
      </main>

      <Footer brand={BRAND} />
    </div>
  );
}
