import type { MetadataRoute } from 'next'

const BASE_URL = 'https://safsafah.com'
const API_BASE  = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.safsafah.com/api/v1'
const locales   = ['en', 'ar'] as const

// ─── Static routes ────────────────────────────────────────────────────────────

const staticRoutes: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '',               changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/catalog',       changeFrequency: 'daily',   priority: 0.9 },
  { path: '/about',         changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact',       changeFrequency: 'monthly', priority: 0.7 },
  { path: '/refund-policy', changeFrequency: 'yearly',  priority: 0.4 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface ProductSlug {
  slugEn?: string
  slugAr?: string
  updatedAt?: string
  updated_at?: string
}

async function fetchAllProductSlugs(): Promise<ProductSlug[]> {
  try {
    // Fetch all pages so we get every product slug
    const firstRes = await fetch(`${API_BASE}/products?per_page=100&page=1`, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    })
    if (!firstRes.ok) return []

    const firstData = await firstRes.json()
    const products: ProductSlug[] = firstData.data ?? []
    const lastPage: number = firstData.meta?.last_page ?? 1

    // Fetch remaining pages in parallel (if any)
    if (lastPage > 1) {
      const pageNumbers = Array.from({ length: lastPage - 1 }, (_, i) => i + 2)
      const rest = await Promise.all(
        pageNumbers.map((page) =>
          fetch(`${API_BASE}/products?per_page=100&page=${page}`, {
            next: { revalidate: 3600 },
          }).then((r) => r.json()).then((d) => (d.data ?? []) as ProductSlug[])
        )
      )
      products.push(...rest.flat())
    }

    return products
  } catch {
    return []
  }
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // 1. Static pages for every locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    }
  }

  // 2. Dynamic product pages
  const products = await fetchAllProductSlugs()

  for (const product of products) {
    const modified = product.updatedAt ?? product.updated_at ?? new Date().toISOString()

    if (product.slugEn) {
      entries.push({
        url: `${BASE_URL}/en/product/${product.slugEn}`,
        lastModified: new Date(modified),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    if (product.slugAr) {
      entries.push({
        url: `${BASE_URL}/ar/product/${product.slugAr}`,
        lastModified: new Date(modified),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return entries
}