import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    return NextResponse.next();
  }

  // Redirect to default locale if no locale is present
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
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
