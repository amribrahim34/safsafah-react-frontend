import { Home, Grid2X2, ShoppingCart, Heart, User2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomTabs({ labels }) {
  const location = useLocation();
  
  const tabs = [
    { path: "/", icon: Home, label: labels.home },
    { path: "/catalog", icon: Grid2X2, label: labels.cats },
    { path: "/cart", icon: ShoppingCart, label: labels.cart },
    { path: "/wishlist", icon: Heart, label: labels.wish },
    { path: "/account", icon: User2, label: labels.account }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
      <div className="grid grid-cols-5 text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link 
              key={tab.path}
              to={tab.path} 
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
