import { unstable_cache } from 'next/cache'
import type { MetadataRoute } from 'next'

export const revalidate = 3600

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://safsafah.com'
const FALLBACK_PROD_API = 'https://api.safsafah.com/api'

function normalizeApiUrl(rawUrl?: string): string {
  if (!rawUrl || !rawUrl.trim()) return FALLBACK_PROD_API
  return rawUrl.trim().replace(/\/api\/v1\/?$/, '/api').replace(/\/+$/, '')
}

// ─── Static routes ────────────────────────────────────────────────────────────
// Use real last-modified dates — not new Date() — so Google doesn't think
// these pages change on every crawl.

const staticRoutes: {
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '',               lastModified: '2025-01-01', changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/catalog',       lastModified: '2025-01-01', changeFrequency: 'daily',   priority: 0.9 },
  { path: '/about',         lastModified: '2025-01-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact',       lastModified: '2025-01-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/refund-policy', lastModified: '2025-01-01', changeFrequency: 'yearly',  priority: 0.4 },
  { path: '/blog',          lastModified: '2025-01-01', changeFrequency: 'weekly',  priority: 0.7 },
  { path: '/landing/beauty-of-joseon-relief-sun-aqua-fresh', lastModified: '2026-11-25', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/landing/dr-althea-345-relief-cream', lastModified: '2026-11-25', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/landing/cicaplast-baume-b5', lastModified: '2026-11-25', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/landing/vichy-normaderm', lastModified: '2026-11-25', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/landing/tetra-glow', lastModified: '2026-11-25', changeFrequency: 'weekly', priority: 0.9 },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductSlug {
  slugEn?: string
  slugAr?: string
  updatedAt?: string
}

function mapProduct(p: any): ProductSlug {
  return {
    slugEn: typeof p?.slugEn === 'string' && p.slugEn.trim() ? p.slugEn.trim() : undefined,
    slugAr: typeof p?.slugAr === 'string' && p.slugAr.trim() ? p.slugAr.trim() : undefined,
    updatedAt: p?.updatedAt || p?.updated_at || undefined,
  }
}

// ─── API Product Fetcher ───────────────────────────────────────────────────────

async function fetchProductsFromApi(baseUrl: string): Promise<ProductSlug[]> {
  // Use limit=100 and per_page=100 so Laravel accepts the batch size
  const firstRes = await fetch(`${baseUrl}/products?limit=100&per_page=100&page=1`, {
    headers: { Accept: 'application/json' },
  })

  if (!firstRes.ok) {
    throw new Error(`Products API responded with ${firstRes.status} (${baseUrl})`)
  }

  const firstData = await firstRes.json()
  const rawFirstList: any[] = firstData.data ?? []
  const products: ProductSlug[] = rawFirstList.map(mapProduct)
  const lastPage: number = Number(firstData.meta?.last_page) || 1

  // Fetch all remaining pages in controlled batches (batch size 3) to prevent overwhelming PHP-FPM
  if (lastPage > 1) {
    const remainingPages = Array.from({ length: lastPage - 1 }, (_, i) => i + 2)
    const BATCH_SIZE = 3

    for (let i = 0; i < remainingPages.length; i += BATCH_SIZE) {
      const batch = remainingPages.slice(i, i + BATCH_SIZE)
      const batchResults = await Promise.allSettled(
        batch.map(async (page) => {
          const res = await fetch(`${baseUrl}/products?limit=100&per_page=100&page=${page}`, {
            headers: { Accept: 'application/json' },
          })
          if (!res.ok) throw new Error(`Page ${page} failed with ${res.status}`)
          const json = await res.json()
          return (json.data ?? []).map(mapProduct) as ProductSlug[]
        })
      )

      for (const res of batchResults) {
        if (res.status === 'fulfilled') {
          products.push(...res.value)
        } else {
          console.warn('[sitemap] Failed fetching product page:', res.reason)
        }
      }
    }
  }

  return products
}

// ─── Cached product fetcher ───────────────────────────────────────────────────
// unstable_cache persists the last successful result across revalidations.
// If the API is down when Next.js tries to refresh, the stale product list is
// served instead of an empty sitemap.

const getCachedProductSlugs = unstable_cache(
  async (): Promise<ProductSlug[]> => {
    const primaryApi = normalizeApiUrl(process.env.NEXT_PUBLIC_API_BASE_URL)

    try {
      return await fetchProductsFromApi(primaryApi)
    } catch (primaryErr) {
      // If primary API (e.g. localhost during build or misconfigured URL) fails, fallback to production API
      if (primaryApi !== FALLBACK_PROD_API) {
        console.warn(`[sitemap] Primary API (${primaryApi}) failed. Retrying with production API (${FALLBACK_PROD_API})...`, primaryErr)
        try {
          return await fetchProductsFromApi(FALLBACK_PROD_API)
        } catch (fallbackErr) {
          console.error('[sitemap] Production fallback API also failed:', fallbackErr)
          throw fallbackErr
        }
      }
      throw primaryErr
    }
  },
  ['sitemap-products-slugs-v2'], // cache key
  { revalidate: 3600 }           // refresh every hour; stale value kept on error
)

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // 1. Static pages — one entry per locale, each with hreflang alternates
  //    Both EN and AR are listed explicitly so Google indexes both as first-class pages.
  for (const route of staticRoutes) {
    const alternates = {
      languages: {
        en: `${BASE_URL}/en${route.path}`,
        ar: `${BASE_URL}/ar${route.path}`,
      },
    }

    // English entry
    entries.push({
      url: `${BASE_URL}/en${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    })

    // Arabic entry
    entries.push({
      url: `${BASE_URL}/ar${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    })
  }

  // 2. Dynamic product pages — stale cache survives an API outage
  let products: ProductSlug[] = []
  try {
    products = await getCachedProductSlugs()
  } catch (err) {
    // Log so we can monitor API health; sitemap still returns static entries
    console.error('[sitemap] Failed to fetch product slugs:', err)
  }

  for (const product of products) {
    // Skip products that are missing both slugs
    if (!product.slugEn && !product.slugAr) continue

    const modified = product.updatedAt ? new Date(product.updatedAt) : new Date('2025-01-01')

    // Use the EN URL as the canonical; AR as the alternate (and vice-versa)
    if (product.slugEn) {
      entries.push({
        url: `${BASE_URL}/en/product/${product.slugEn}`,
        lastModified: modified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/product/${product.slugEn}`,
            ...(product.slugAr && { ar: `${BASE_URL}/ar/product/${product.slugAr}` }),
          },
        },
      })
    }

    if (product.slugAr) {
      entries.push({
        url: `${BASE_URL}/ar/product/${product.slugAr}`,
        lastModified: modified,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            ar: `${BASE_URL}/ar/product/${product.slugAr}`,
            ...(product.slugEn && { en: `${BASE_URL}/en/product/${product.slugEn}` }),
          },
        },
      })
    }
  }

  return entries
}
