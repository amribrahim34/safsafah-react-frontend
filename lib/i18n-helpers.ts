import i18n from '@/lib/i18n';
import type { TFunction } from 'i18next';

export type SupportedLocale = 'ar' | 'en';

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return locale === 'en' ? 'en' : 'ar';
}

/**
 * Returns a bound i18next translator locked to the given locale & namespace.
 * Resolves synchronously during both SSR and initial client render without
 * mutating the shared i18n singleton or waiting for useEffect.
 */
export function getFixedT(locale?: string | null, ns = 'home'): TFunction {
  return i18n.getFixedT(normalizeLocale(locale), ns);
}
