'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { useLocale, getLocalizedPath } from '@/lib/locale-navigation';
import logo from '../../assets/safsafah-logo.png';
import { useState, useEffect, Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import DesktopNav from './DesktopNav';
import SearchBar from './SearchBar';
import ProfileDropdown from './ProfileDropdown';
import CartDropdown from './CartDropdown';
import MobileMenuDrawer from './MobileMenuDrawer';

interface HeaderProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
  searchPlaceholder: string;
}

function HeaderContent({ brand, searchPlaceholder }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const lang = useLocale();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchQuery') ?? '');

  const isRTL = lang === 'ar';

  // Keep search input in sync with URL params (e.g. on back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get('searchQuery') ?? '');
  }, [searchParams]);

  useEffect(() => { setMounted(true); }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCartOpen && !target.closest('.cart-dropdown-container')) setIsCartOpen(false);
      if (isProfileOpen && !target.closest('.profile-dropdown-container')) setIsProfileOpen(false);
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, isProfileOpen, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

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

      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Logo */}
          <Link href={getLocalizedPath('/', lang)} className="flex items-center gap-3 shrink-0 order-1">
            <img src={logo.src} alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
            <div className="font-extrabold text-xl tracking-tight whitespace-nowrap">SAFSAFAH</div>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`mobile-menu-button md:hidden p-2 hover:bg-neutral-100 rounded-xl transition-colors order-5 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-neutral-800" />
          </button>

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
            {/* Language Switcher — desktop only */}
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            {/* Profile Dropdown — only when authenticated */}
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

            {/* Cart Dropdown */}
            <CartDropdown
              isRTL={isRTL}
              brandPrimary={brand.primary}
              lang={lang}
              isOpen={isCartOpen}
              onToggle={() => setIsCartOpen(!isCartOpen)}
            />
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
