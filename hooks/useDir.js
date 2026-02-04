'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook that automatically sets document direction based on locale in URL
 * Reads locale from pathname and sets dir attribute accordingly
 */
export function useDir() {
  const pathname = usePathname();
  
  useEffect(() => {
    if (!pathname) return;
    
    // Extract locale from pathname
    const match = pathname.match(/^\/(ar|en)/);
    const locale = match?.[1] || 'ar';
    
    // Set direction based on locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [pathname]);
}
