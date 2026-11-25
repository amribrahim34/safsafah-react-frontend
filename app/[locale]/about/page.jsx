'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';
import { getFixedT } from '@/lib/i18n-helpers';
import Image from 'next/image';
import { BRAND } from '@/content/brand';
import VisionMission from './_components/VisionMission';
import QuickFAQ from '@/components/QuickFAQ';
import ContactPanel from './_components/ContactPanel';

export default function AboutPage() {
  const lang = useLocale();
  const t = getFixedT(lang, 'about');
  const [siteSettings, setSiteSettings] = useState(null);

  useDir();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`, {
      headers: { Accept: 'application/json', 'Accept-Language': lang },
    })
      .then((r) => r.json())
      .then((json) => setSiteSettings(json.data ?? null))
      .catch(() => {});
  }, [lang]);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir={dir}>
      
      <main className="max-w-7xl mx-auto px-4">
        <section className="py-8 md:py-12 grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7">
            <h2 className="text-xl md:text-2xl font-extrabold">{t('whoWeAre')}</h2>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t('intro')}</p>
            <p className="mt-3 text-neutral-800 leading-relaxed">{t('philosophy')}</p>
          </div>
          <div className="md:col-span-5">
            <div className="relative h-64 rounded-3xl overflow-hidden border">
              <Image src="/products/retinol-eye-cream-1.jpg" alt={t('imgAlt')} fill className="object-cover" />
            </div>
          </div>
        </section>

        <VisionMission brand={BRAND} t={t('visionMission', { returnObjects: true })} />


        <QuickFAQ  t={t('faq', { returnObjects: true })} />

        <ContactPanel brand={BRAND} siteSettings={siteSettings} t={t('contact', { returnObjects: true })} />
      </main>

    </div>
  );
}
