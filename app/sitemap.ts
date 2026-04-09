import { unstable_cache } from 'next/cache'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://safsafah.com'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.safsafah.com/api/v1'

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
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductSlug {
  slugEn?: string
  slugAr?: string
  updatedAt?: string
  updated_at?: string
}

// ─── Cached product fetcher ───────────────────────────────────────────────────
// unstable_cache persists the last successful result across revalidations.
// If the API is down when Next.js tries to refresh, the stale product list is
// served instead of an empty sitemap.

const getCachedProductSlugs = unstable_cache(
  async (): Promise<ProductSlug[]> => {
    // Fetch page 1 to discover total page count
    const firstRes = await fetch(`${API_BASE}/products?per_page=100&page=1`)

    if (!firstRes.ok) {
      throw new Error(`Products API responded with ${firstRes.status}`)
    }

    const firstData = await firstRes.json()
    const products: ProductSlug[] = firstData.data ?? []
    const lastPage: number = firstData.meta?.last_page ?? 1

    // Fetch all remaining pages in parallel
    if (lastPage > 1) {
      const pageNumbers = Array.from({ length: lastPage - 1 }, (_, i) => i + 2)
      const rest = await Promise.all(
        pageNumbers.map((page) =>
          fetch(`${API_BASE}/products?per_page=100&page=${page}`)
            .then((r) => {
              if (!r.ok) throw new Error(`Page ${page} failed with ${r.status}`)
              return r.json()
            })
            .then((d) => (d.data ?? []) as ProductSlug[])
        )
      )
      products.push(...rest.flat())
    }

    return products
  },
  ['sitemap-products'],       // cache key
  { revalidate: 3600 }        // refresh every hour; stale value kept on error
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

    const modified = new Date(
      product.updatedAt ?? product.updated_at ?? Date.now()
    )

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