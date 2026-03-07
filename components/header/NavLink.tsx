'use client';

import Link from 'next/link';
import { getLocalizedPath, Locale } from '@/lib/locale-navigation';

interface NavLinkProps {
  label: string;
  path: string;
  lang: Locale;
  isActive: boolean;
  brandPrimary: string;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({
  label,
  path,
  lang,
  isActive,
  brandPrimary,
  onClick,
  className = '',
}: NavLinkProps) {
  return (
    <Link
      href={getLocalizedPath(path, lang)}
      onClick={onClick}
      className={className}
      style={isActive ? { color: brandPrimary } : undefined}
    >
      {label}
    </Link>
  );
}
