import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enHome from '../locales/en/home.json';
import arHome from '../locales/ar/home.json';
import enAbout from '../locales/en/about.json';
import arAbout from '../locales/ar/about.json';
import enContact from '../locales/en/contact.json';
import arContact from '../locales/ar/contact.json';
import enAccount from '../locales/en/account.json';
import arAccount from '../locales/ar/account.json';
import enQuize from '../locales/en/quize.json';
import arQuize from '../locales/ar/quize.json';
import enCheckout from '../locales/en/checkout.json';
import arCheckout from '../locales/ar/checkout.json';
import enCart from '../locales/en/cart.json';
import arCart from '../locales/ar/cart.json';
import enWalletPayment from '../locales/en/walletPayment.json';
import arWalletPayment from '../locales/ar/walletPayment.json';
import enProducts from '../locales/en/products.json';
import arProducts from '../locales/ar/products.json';
import enBlog from '../locales/en/blog.json';
import arBlog from '../locales/ar/blog.json';

const resources = {
  en: {
    home: enHome,
    about: enAbout,
    contact: enContact,
    account: enAccount,
    quize: enQuize,
    checkout: enCheckout,
    cart: enCart,
    walletPayment: enWalletPayment,
    products: enProducts,
    blog: enBlog,
  },
  ar: {
    home: arHome,
    about: arAbout,
    contact: arContact,
    account: arAccount,
    quize: arQuize,
    checkout: arCheckout,
    cart: arCart,
    walletPayment: arWalletPayment,
    products: arProducts,
    blog: arBlog,
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
    ns: ['home', 'about', 'contact', 'account', 'quize', 'checkout', 'cart', 'walletPayment', 'products', 'blog'],
    react: {
      useSuspense: false, // Disable Suspense for SSR compatibility
    },
  });

export default i18n;
