'use client';

import '@/lib/i18n';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BRAND } from '@/content/brand';
import { useAppSelector } from '@/store/hooks';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import OverviewHeader from './_components/OverviewHeader';
import OrdersList from './_components/OrdersList';
import WishlistGrid from './_components/WishlistGrid';
import BeautyProfileCard from './_components/BeautyProfileCard';
import AddressesPayments from './_components/AddressesPayments';
import SupportLinks from './_components/SupportLinks';

import type {
  OverviewHeaderTranslations,
  OrdersListTranslations,
  WishlistGridTranslations,
  BeautyProfileTranslations,
  AddressesTranslations,
  SupportTranslations,
} from './_components/_types';

export default function ProfilePage() {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('account');
  const { t: tHome } = useTranslation('home');
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const overviewT = t('overview', { returnObjects: true }) as OverviewHeaderTranslations;
  const ordersT = t('orders', { returnObjects: true }) as OrdersListTranslations;
  const wishlistT = t('wishlist', { returnObjects: true }) as WishlistGridTranslations;
  const beautyT = t('beautyProfile', { returnObjects: true }) as BeautyProfileTranslations;
  const addressesT = t('addresses', { returnObjects: true }) as AddressesTranslations;
  const supportT = t('support', { returnObjects: true }) as SupportTranslations;

  const pageLoading = t('page.loading');
  const searchPlaceholder = tHome('search') as string;
  const promoText = tHome('promo') as string;

  if (isLoading && !user) {
    return (
      <div
        className="min-h-screen bg-white text-neutral-900"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <PromoBar text={promoText} brand={BRAND} />
        <Header brand={BRAND} searchPlaceholder={searchPlaceholder} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
                style={{ borderColor: BRAND.primary }}
              />
              <p className="text-neutral-600">{pageLoading}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-neutral-900"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <PromoBar text={promoText} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={searchPlaceholder} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {user && (
          <OverviewHeader brand={BRAND} lang={lang} user={user} t={overviewT} />
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),380px] items-start mt-4">
          <div className="space-y-6">
            <OrdersList brand={BRAND} lang={lang} t={ordersT} />
            <WishlistGrid brand={BRAND} lang={lang} t={wishlistT} />
            <BeautyProfileCard brand={BRAND} lang={lang} t={beautyT} />
            {/* <RecentlyViewedStrip brand={BRAND} lang={lang} t={recentlyViewedT} /> */}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* <RewardsWallet brand={BRAND} lang={lang} user={user} t={rewardsT} /> */}
            <AddressesPayments brand={BRAND} lang={lang} t={addressesT} />
            {/* <SettingsPanel brand={BRAND} lang={lang} user={user} t={settingsT} /> */}
            <SupportLinks brand={BRAND} lang={lang} t={supportT} />
          </aside>
        </div>
      </main>

      <Footer brand={BRAND} />
    </div>
  );
}
