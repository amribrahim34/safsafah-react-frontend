'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Phone, LucideIcon } from 'lucide-react';
import { settingsService, SiteSettings } from '@/lib/api/services';
import type { BrandConfig, SupportTranslations } from './_types';

interface SupportLinksProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  t: SupportTranslations;
}

interface LinkCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
  brand: BrandConfig;
}

function LinkCard({ icon: Icon, label, href, brand }: LinkCardProps) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-neutral-200 p-3 flex items-center gap-2 hover:shadow-sm"
    >
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
      <div className="text-sm font-semibold">{label}</div>
    </a>
  );
}

export default function SupportLinks({ brand, t }: SupportLinksProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    settingsService.getSettings().then(setSettings).catch(() => {});
  }, []);

  const whatsappHref = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : null;
  const phoneHref = settings?.mobile
    ? `tel:${settings.mobile.replace(/\s/g, '')}`
    : null;

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{t.title}</div>
      <div className="grid grid-cols-2 gap-2">
        {whatsappHref && (
          <LinkCard icon={MessageCircle} label={t.whatsapp} href={whatsappHref} brand={brand} />
        )}
        {phoneHref && (
          <LinkCard icon={Phone} label={t.customerService} href={phoneHref} brand={brand} />
        )}
      </div>
    </section>
  );
}
