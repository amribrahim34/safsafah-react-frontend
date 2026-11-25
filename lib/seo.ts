import type { Metadata } from 'next';

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
