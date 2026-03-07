'use client';

import { X, User2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocalizedPath, Locale } from '@/lib/locale-navigation';
import LanguageSwitcher from './LanguageSwitcher';
import NavLink from './NavLink';
import logo from '../../assets/safsafah-logo.png';

interface NavItem {
  label: string;
  path: string;
}

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  lang: Locale;
  brandPrimary: string;
  isRTL: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  navItems,
  lang,
  brandPrimary,
  isRTL,
  isAuthenticated,
  onLogout,
}: MobileMenuDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`mobile-menu-container fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[101] md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <img src={logo.src} alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
              <div className="font-extrabold text-xl tracking-tight">SAFSAFAH</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === getLocalizedPath(item.path, lang);
                return (
                  <NavLink
                    key={item.path}
                    label={item.label}
                    path={item.path}
                    lang={lang}
                    isActive={isActive}
                    brandPrimary={brandPrimary}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium text-neutral-700 hover:bg-neutral-100 transition-colors ${
                      isActive ? 'bg-[var(--brand-bg)]' : ''
                    }`}
                  />
                );
              })}
            </div>

            {/* Account Section — only when authenticated */}
            {isAuthenticated && (
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
                <Link
                  href={getLocalizedPath('/account', lang)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
                  onClick={onClose}
                >
                  <User2 className="w-5 h-5" />
                  <span className="font-medium">{isRTL ? 'حسابي' : 'My Account'}</span>
                </Link>
                <button
                  onClick={() => { onClose(); onLogout(); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <LanguageSwitcher className="w-full px-4 py-3 text-lg justify-center" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
