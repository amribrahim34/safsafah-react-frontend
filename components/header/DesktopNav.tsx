'use client';

import { usePathname } from 'next/navigation';
import { getLocalizedPath, Locale } from '@/lib/locale-navigation';
import NavLink from './NavLink';

interface NavItem {
  label: string;
  path: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
  lang: Locale;
  brandPrimary: string;
}

export default function DesktopNav({ navItems, lang, brandPrimary }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-4 mx-4 shrink-0 order-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          label={item.label}
          path={item.path}
          lang={lang}
          isActive={pathname === getLocalizedPath(item.path, lang)}
          brandPrimary={brandPrimary}
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-200 whitespace-nowrap"
        />
      ))}
    </nav>
  );
}
