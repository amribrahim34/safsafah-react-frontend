'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export type Locale = 'ar' | 'en';

/**
 * Extract the current locale from the URL pathname
 * @returns The current locale ('ar' or 'en'), defaults to 'ar'
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  
  const locale = useMemo(() => {
    if (!pathname) return 'ar';
    
    const match = pathname.match(/^\/(ar|en)/);
    return (match?.[1] as Locale) || 'ar';
  }, [pathname]);
  
  return locale;
}

/**
 * Get a localized path by prepending the locale
 * @param path - The path to localize (e.g., '/catalog', '/product/123')
 * @param locale - Optional locale to use. If not provided, uses current locale from URL
 * @returns Localized path (e.g., '/ar/catalog', '/en/product/123')
 */
export function getLocalizedPath(path: string, locale?: Locale): string {
  // Remove any existing locale prefix from the path
  const pathWithoutLocale = path.replace(/^\/(ar|en)/, '');
  
  // Ensure path starts with /
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  
  // Use provided locale or default to 'ar'
  const targetLocale = locale || 'ar';
  
  return `/${targetLocale}${cleanPath}`;
}

/**
 * Hook that provides locale-aware navigation functions
 * @returns Object with push and replace functions that automatically handle locale
 */
export function useLocaleRouter() {
  const router = useRouter();
  const currentLocale = useLocale();
  
  return useMemo(() => ({
    push: (path: string, locale?: Locale) => {
      const localizedPath = getLocalizedPath(path, locale || currentLocale);
      router.push(localizedPath);
    },
    replace: (path: string, locale?: Locale) => {
      const localizedPath = getLocalizedPath(path, locale || currentLocale);
      router.replace(localizedPath);
    },
    /**
     * Switch to a different locale while maintaining the current path
     * @param newLocale - The locale to switch to
     */
    switchLocale: (newLocale: Locale) => {
      const pathname = window.location.pathname;
      const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
      const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
      router.push(newPath);
    }
  }), [router, currentLocale]);
}

/**
 * Get the opposite locale
 * @param locale - Current locale
 * @returns The opposite locale
 */
export function getOppositeLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}
