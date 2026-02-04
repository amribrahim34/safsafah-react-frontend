'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const localeMatch = pathname?.match(/^\/(ar|en)/);
    const locale = localeMatch ? localeMatch[1] : 'ar';
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [pathname]);

  return null;
}
