// Navigation utility functions for building URLs with query parameters
import { usePathname } from 'next/navigation'

/**
 * Builds a URL with query parameters
 * @param {string} path - The base path
 * @param {Object} params - Query parameters object
 * @returns {string} - Complete URL with query string
 */
export function buildUrlWithParams(path, params = {}) {
  // Use a dummy base URL since we only need pathname and search params
  // This allows the function to work in both server and client environments
  const url = new URL(path, 'http://dummy');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => url.searchParams.append(key, item));
      } else {
        url.searchParams.set(key, value);
      }
    }
  });

  return url.pathname + url.search;
}

/**
 * Maps CTA text to appropriate catalog filters
 * @param {string} ctaText - The CTA button text
 * @returns {Object} - Query parameters for the catalog
 */
export function getCtaFilters(ctaText) {
  const text = ctaText.toLowerCase();

  // Category mappings
  if (text.includes('spf') || text.includes('واقي')) {
    return { category: 'SPF' };
  }
  if (text.includes('moisturizer') || text.includes('مرطب')) {
    return { category: 'Moisturizers' };
  }
  if (text.includes('serum') || text.includes('سيروم')) {
    return { category: 'Serums' };
  }
  if (text.includes('makeup') || text.includes('مكياج')) {
    return { category: 'Makeup' };
  }
  if (text.includes('cleanser') || text.includes('منظف')) {
    return { category: 'Cleansers' };
  }
  if (text.includes('oil') || text.includes('زيت')) {
    return { category: 'Oils' };
  }

  // Special offers
  if (text.includes('sale') || text.includes('خصم') || text.includes('on sale')) {
    return { onSale: 'true' };
  }
  if (text.includes('new') || text.includes('جديد')) {
    return { sort: 'newest' };
  }
  if (text.includes('bestseller') || text.includes('الأكثر مبيعًا')) {
    return { sort: 'bestsellers' };
  }

  // Starter kits or bundles
  if (text.includes('starter') || text.includes('kit') || text.includes('أطقم')) {
    return { tags: ['starter-kit', 'bundle'] };
  }

  return {};
}

/**
 * Maps category names to catalog filters
 * @param {string} categoryName - The category name
 * @returns {Object} - Query parameters for the catalog
 */
export function getCategoryFilters(categoryName) {
  const categoryMap = {
    'Serums': { category: 'Serums' },
    'سيرومات': { category: 'Serums' },
    'Cleansers': { category: 'Cleansers' },
    'منظفات': { category: 'Cleansers' },
    'Moisturizers': { category: 'Moisturizers' },
    'مرطبات': { category: 'Moisturizers' },
    'Makeup': { category: 'Makeup' },
    'مكياج': { category: 'Makeup' },
    'Oils': { category: 'Oils' },
    'زيوت': { category: 'Oils' },
    'SPF': { category: 'SPF' },
    'واقي شمس': { category: 'SPF' }
  };

  return categoryMap[categoryName] || {};
}
