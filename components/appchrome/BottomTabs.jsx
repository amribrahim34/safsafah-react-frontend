'use client';

import { Home, Grid2X2, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function BottomTabs() {
  const pathname = usePathname();
  const { locale } = useParams();

  const isAr = locale === 'ar';
  const labels = {
    home:    isAr ? "الرئيسية" : "Home",
    cats:    isAr ? "المنتجات" : "Catalog",
    cart:    isAr ? "السلة"    : "Bag",
    account: isAr ? "حسابي"   : "Account",
  };

  const tabs = [
    { path: `/${locale}`,         icon: Home,         label: labels.home    },
    { path: `/${locale}/catalog`, icon: Grid2X2,      label: labels.cats    },
    { path: `/${locale}/cart`,    icon: ShoppingCart, label: labels.cart    },
    { path: `/${locale}/account`, icon: User2,        label: labels.account },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
      <div className="grid grid-cols-4 text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`py-3 flex flex-col items-center gap-1 ${
                isActive ? 'text-blue-600' : 'text-neutral-600'
              }`}
            >
              <Icon className="w-5 h-5"/>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
