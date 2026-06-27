import type { MetadataRoute } from 'next'

const BASE_URL = 'https://safsafah.com'

// Generated robots.txt (Next.js metadata route). A static robots.txt at the
// project root is NOT served by Next — only files in public/ are — so this
// route is the reliable way to serve it alongside app/sitemap.ts.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
