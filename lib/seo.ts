import type { Metadata } from 'next';
import type { SiteSettings } from '@/lib/api/services/settings.service';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://safsafah.com';

// ─── Utility / no-index pages ──────────────────────────────────────────────────
// These paths should never appear in Google's index. The set is used by both
// per-page/layout metadata and the middleware X-Robots-Tag injection.

export const NOINDEX_PATHS = new Set([
  '/cart',
  '/checkout',
  '/login',
  '/signup',
  '/account',
  '/orders',
  '/wallet-payment',
  '/quize',
  '/tetra-glow',
]);

/**
 * Returns `true` when the given pathname (without locale prefix) should carry
 * `noindex, follow` robots directives.
 *
 * Also matches any `/catalog` or `/blog` URL that carries query parameters
 * (filter / sort / search URLs like `?categoryIds=`, `?brandIds=`, `?sale=`).
 */
export function shouldNoIndex(pathnameWithoutLocale: string, hasSearchParams: boolean): boolean {
  const clean = pathnameWithoutLocale.replace(/\/+$/, '') || '/';
  if (NOINDEX_PATHS.has(clean)) return true;
  if ((clean === '/catalog' || clean === '/blog') && hasSearchParams) return true;
  return false;
}

/** Shared noindex robots metadata object */
export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

/**
 * Build canonical + bidirectional hreflang alternates for a given path
 * (without locale prefix). Use `''` for the homepage (`/[locale]`).
 */
export function buildAlternates(
  locale: string,
  pathWithoutLocale: string,
): Metadata['alternates'] {
  const cleanPath = pathWithoutLocale.replace(/\/+$/, '');
  const lang = locale === 'en' ? 'en' : 'ar';
  return {
    canonical: `${BASE_URL}/${lang}${cleanPath}`,
    languages: {
      'ar-EG': `${BASE_URL}/ar${cleanPath}`,
      'en-EG': `${BASE_URL}/en${cleanPath}`,
      'x-default': `${BASE_URL}/ar${cleanPath}`,
    },
  };
}

/**
 * Builds the site-wide schema.org/Organization JSON-LD object with social `sameAs`
 * links and contact metadata so search engines and AI crawlers can connect the brand
 * to its official profiles.
 */
export function buildOrganizationJsonLd(settings: SiteSettings) {
  const sameAs = [settings.facebook, settings.instagram, settings.tiktok].filter(
    (url): url is string => Boolean(url),
  );
  const digits = settings.mobile?.replace(/\D/g, '') || '';
  const telephone = digits
    ? digits.startsWith('0')
      ? `+2${digits}`
      : `+${digits}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: 'Safsafah',
    alternateName: 'صفصافة',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/safsafah-logo1.png`,
    },
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      ...(settings.email ? { email: settings.email } : {}),
      ...(telephone ? { telephone } : {}),
      areaServed: 'EG',
      availableLanguage: ['Arabic', 'English'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
    },
  };
}
