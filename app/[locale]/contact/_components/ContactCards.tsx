import { Phone, Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { BRAND } from '@/content/brand';
import type { SiteSettings } from '@/lib/api/services';

interface ContactCardsTranslations {
  whatsapp: string;
  mobile: string;
  email: string;
}

interface ContactCardsProps {
  brand: typeof BRAND;
  t: ContactCardsTranslations;
  siteSettings: SiteSettings | null;
}

export default function ContactCards({ t, siteSettings }: ContactCardsProps) {
  const whatsapp = siteSettings?.whatsapp?.replace(/\D/g, '') ?? '';
  const mobile = siteSettings?.mobile ?? '';
  const email = siteSettings?.email ?? '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      <a
        href={whatsapp ? `https://wa.me/${whatsapp}` : '#'}
        className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
      >
        <div className="shrink-0 rounded-xl p-2 border">
          <SiWhatsapp className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold">{t.whatsapp}</div>
          <div className="text-sm text-neutral-600">{whatsapp ? `+${whatsapp}` : '—'}</div>
        </div>
      </a>

      <a
        href={mobile ? `tel:${mobile.replace(/\s/g, '')}` : '#'}
        className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
      >
        <div className="shrink-0 rounded-xl p-2 border">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold">{t.mobile}</div>
          <div className="text-sm text-neutral-600">{mobile || '—'}</div>
        </div>
      </a>

      <a
        href={email ? `mailto:${email}` : '#'}
        className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
      >
        <div className="shrink-0 rounded-xl p-2 border">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold">{t.email}</div>
          <div className="text-sm text-neutral-600">{email || '—'}</div>
        </div>
      </a>
    </div>
  );
}
