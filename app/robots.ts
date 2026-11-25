import type { MetadataRoute } from 'next'

const BASE_URL = 'https://safsafah.com'

// Generated robots.txt (Next.js metadata route). A static robots.txt at the
// project root is NOT served by Next — only files in public/ are — so this
// route is the reliable way to serve it alongside app/sitemap.ts.
//
// NOTE: Do NOT Disallow /cart, /checkout, /login, /account, or /catalog?* here!
// Googlebot must be allowed to crawl those URLs so it can see the
// `noindex, follow` meta tag / X-Robots-Tag header (and 404 on invalid URLs)
// and drop any previously indexed URLs cleanly from Google's index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/ingest/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
