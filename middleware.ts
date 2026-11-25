import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

// ─── Paths that must carry "noindex, follow" ────────────────────────────────
// Keep in sync with lib/seo.ts NOINDEX_PATHS
const NOINDEX_SEGMENTS = new Set([
  'cart',
  'checkout',
  'login',
  'signup',
  'account',
  'orders',
  'wallet-payment',
  'quize',
  'tetra-glow',
]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip middleware for API routes, static files, Next.js internals,
  // and PostHog proxy paths (/ingest/*) so rewrites in next.config.ts work correctly.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/ingest') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Normalize trailing slashes on localized page URLs (e.g. /en/ -> /en, /ar/catalog/ -> /ar/catalog)
    // using a 301 permanent redirect so slash and non-slash URLs never coexist in Google's index.
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const strippedPath = pathname.replace(/\/+$/, '') || '/';
      const target = new URL(request.url);
      target.pathname = strippedPath;
      return NextResponse.redirect(target, 301);
    }

    const locale = pathname.split('/')[1] || defaultLocale;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // ── Add X-Robots-Tag header for utility / filtered noindex pages ──
    const pathAfterLocale = pathname.slice(`/${locale}`.length) || '/';
    const firstSegment = pathAfterLocale.split('/')[1] || '';

    const shouldNoIndex =
      NOINDEX_SEGMENTS.has(firstSegment) ||
      ((firstSegment === 'catalog' || firstSegment === 'blog') &&
        searchParams.toString().length > 0);

    if (shouldNoIndex) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    }

    return response;
  }

  // Permanently (301) redirect unlocalized URLs (including /) to default locale (/ar...)
  // without a trailing slash, so / and /ar or /catalog and /ar/catalog never coexist.
  const target = new URL(request.url);
  const cleanPathname = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  target.pathname = `/${defaultLocale}${cleanPathname}`;
  return NextResponse.redirect(target, 301);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api        (API routes)
     * - _next      (Next.js internals)
     * - favicon    (favicon files)
     * - ingest     (PostHog proxy – must reach next.config.ts rewrites)
     * - Static files (anything with a dot extension)
     */
    '/((?!api|_next|favicon|ingest|.*\\.).*)',
  ],
};
