import { env } from '@/config';
import type { SiteSettings } from '@/lib/api/services/settings.service';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  facebook: 'https://facebook.com/SafsafahSknCare/',
  instagram: 'https://www.instagram.com/safsafah_2025',
  tiktok: null,
  whatsapp: '201061016045',
  email: 'safsafah035@gmail.com',
  mobile: '201061016045',
};

/**
 * Fetches site settings on the server with ISR caching (1h) and falls back
 * to verified defaults so SSR footer links and Organization schema stay populated.
 */
export async function getSettingsServer(): Promise<SiteSettings> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/settings`, {
      next: { revalidate: 3600, tags: ['settings'] },
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return DEFAULT_SITE_SETTINGS;

    const json = await response.json();
    const data = json?.data ?? json;
    if (!data || typeof data !== 'object') return DEFAULT_SITE_SETTINGS;

    return {
      facebook: data.facebook ?? null,
      instagram: data.instagram ?? null,
      tiktok: data.tiktok ?? null,
      whatsapp: data.whatsapp ?? null,
      email: data.email ?? null,
      mobile: data.mobile ?? null,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
