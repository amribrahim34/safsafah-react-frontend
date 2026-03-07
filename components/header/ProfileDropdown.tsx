'use client';

import { User2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { getLocalizedPath, Locale } from '@/lib/locale-navigation';

interface ProfileDropdownProps {
  isRTL: boolean;
  brandPrimary: string;
  lang: Locale;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  isRTL,
  brandPrimary,
  lang,
  isOpen,
  onToggle,
  onClose,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <div className="relative profile-dropdown-container">
      <button
        onClick={onToggle}
        className="px-2 py-2 rounded-xl hover:bg-neutral-100"
      >
        <User2 className="w-6 h-6 text-neutral-800" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}
        >
          <div className="py-2">
            <Link
              href={getLocalizedPath('/account', lang)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors text-neutral-700"
              onClick={onClose}
            >
              <User2 className="w-5 h-5" />
              <span className="font-medium">{isRTL ? 'حسابي' : 'My Account'}</span>
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
