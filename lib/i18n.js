import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enHome from '../locales/en/home.json';
import arHome from '../locales/ar/home.json';

const resources = {
  en: {
    home: enHome,
  },
  ar: {
    home: arHome,
  },
};

// Initialize i18n - works on both client and server
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language — must be static to avoid SSR/client hydration mismatch
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    // Namespace configuration
    defaultNS: 'home',
    ns: ['home'],
    react: {
      useSuspense: false, // Disable Suspense for SSR compatibility
    },
  });

export default i18n;
