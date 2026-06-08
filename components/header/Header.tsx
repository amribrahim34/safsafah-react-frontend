'use client';

import { useTranslation } from 'react-i18next';
import { Menu, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { getLocalizedPath } from '@/lib/locale-navigation';
import logo from '../../assets/safsafah-logo1.png';
import { useState, useEffect, Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import DesktopNav from './DesktopNav';
import SearchBar from './SearchBar';
import ProfileDropdown from './ProfileDropdown';
import CartDrawer from './CartDrawer';
import MobileMenuDrawer from './MobileMenuDrawer';

interface HeaderProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

function HeaderContent({ brand }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cart = useAppSelector((state) => state.cart.cart);
  const localItems = useAppSelector((state) => state.cart.localItems);

  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchQuery') ?? '');

  const isRTL = lang === 'ar';
  const { t } = useTranslation('home');
  const searchPlaceholder = t('search');

  const totalItems = isAuthenticated
    ? (cart?.totalItems ?? 0)
    : localItems.reduce((sum, li) => sum + li.quantity, 0);

  useEffect(() => {
    setSearchQuery(searchParams.get('searchQuery') ?? '');
  }, [searchParams]);

  useEffect(() => { setMounted(true); }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest('.profile-dropdown-container')) setIsProfileOpen(false);
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu or cart drawer is open
  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isCartOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen, isCartOpen]);

  const navItems = [
    { label: isRTL ? 'الرئيسية' : 'Home', path: '/' },
    { label: isRTL ? 'المتجر' : 'Shop', path: '/catalog' },
    { label: isRTL ? 'اختبار البشرة' : 'Skin Quiz', path: '/quize' },
    { label: isRTL ? 'من نحن' : 'About', path: '/about' },
    { label: isRTL ? 'تواصل معنا' : 'Contact', path: '/contact' },
  ];

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    const path = trimmed ? `/catalog?searchQuery=${encodeURIComponent(trimmed)}` : '/catalog';
    router.push(getLocalizedPath(path, lang));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      router.push(getLocalizedPath('/login', lang));
    }
  };

  const cartBadge = mounted && totalItems > 0 && (
    <span
      className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] flex items-center justify-center text-white"
      style={{ background: brand.primary }}
    >
      {totalItems}
    </span>
  );

  return (
    <>
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        lang={lang}
        brandPrimary={brand.primary}
        isRTL={isRTL}
        isAuthenticated={mounted && isAuthenticated}
        onLogout={handleLogout}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        isRTL={isRTL}
        brandPrimary={brand.primary}
        lang={lang}
        mounted={mounted}
      />

      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        {/* Mobile header row */}
        <div className="md:hidden relative h-[60px] flex items-center px-4">
          {/* Hamburger — always physically left */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-button absolute left-4 p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-neutral-800" />
          </button>

          {/* Logo — always physically centered */}
          <Link
            href={getLocalizedPath('/', lang)}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <Image src={logo} alt="SAFSAFAH" width={80} height={10} className="rounded-2xl object-contain" />
          </Link>

          {/* Right group: Login/Profile + Cart — always physically right */}
          <div className="absolute right-4 flex items-center gap-1">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-neutral-100 rounded-xl transition-colors"
              aria-label={t('header.cart')}
            >
              <ShoppingBag className="w-6 h-6 text-neutral-800" />
              {cartBadge}
            </button>
          </div>
        </div>

        {/* Desktop header row */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 py-3 items-center gap-3">
          {/* Logo */}
          <Link href={getLocalizedPath('/', lang)} className="flex items-center gap-3 shrink-0">
            <Image src={logo} alt="SAFSAFAH" width={100} height={10} className="rounded-2xl object-contain" />
          </Link>

          {/* Desktop Nav */}
          <DesktopNav navItems={navItems} lang={lang} brandPrimary={brand.primary} />

          {/* Desktop Search */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            brandPrimary={brand.primary}
            placeholder={searchPlaceholder}
            isRTL={isRTL}
          />
          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 order-4">
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            {/* Login — not authenticated */}
            {mounted && !isAuthenticated && (
              <Link
                href={getLocalizedPath('/login', lang)}
                className="text-sm font-semibold px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors whitespace-nowrap order-4"
                style={{ color: brand.primary }}
              >
                {t('header.login')}
              </Link>
            )}

            {/* Profile dropdown — authenticated */}
            {mounted && isAuthenticated && (
              <ProfileDropdown
                isRTL={isRTL}
                brandPrimary={brand.primary}
                lang={lang}
                isOpen={isProfileOpen}
                onToggle={() => setIsProfileOpen(!isProfileOpen)}
                onClose={() => setIsProfileOpen(false)}
                onLogout={handleLogout}
              />
            )}

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: brand.primary }}
              aria-label={t('header.cart')}
            >
              <ShoppingBag className="w-4 h-4" />
              {t('header.cart')}
              {mounted && totalItems > 0 && (
                <span className="bg-white/30 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          brandPrimary={brand.primary}
          placeholder={searchPlaceholder}
          isRTL={isRTL}
          isMobile
        />
      </header>
    </>
  );
}

export default function Header(props: HeaderProps) {
  return (
    <Suspense fallback={null}>
      <HeaderContent {...props} />
    </Suspense>
  );
}
