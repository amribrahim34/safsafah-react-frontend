import { Search, User2, ShoppingBag, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import logo from "../../assets/safsafah-logo.png";

interface HeaderProps {
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
  searchPlaceholder: string;
  lang?: string;
}

export default function Header({ brand, searchPlaceholder, lang = "ar" }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get auth state from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cart = useAppSelector((state) => state.cart.cart);

  const isRTL = lang === "ar";
  const navItems = [
    { label: isRTL ? "الرئيسية" : "Home", path: "/" },
    { label: isRTL ? "المتجر" : "Shop", path: "/catalog" },
    { label: isRTL ? "اختبار البشرة" : "Skin Quiz", path: "/quize" },
    { label: isRTL ? "من نحن" : "About", path: "/about" },
    { label: isRTL ? "تواصل معنا" : "Contact", path: "/contact" }
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, navigate to login
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo + name (don't shrink) */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
          <div className="font-extrabold text-xl tracking-tight whitespace-nowrap">SAFSAFAH</div>
        </Link>

        {/* Desktop nav — lighter spacing; don't push */}
        <nav className="hidden md:flex items-center gap-4 mx-4 shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-200 whitespace-nowrap"
              style={{ color: location.pathname === item.path ? brand.primary : undefined }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Fluid search: grows but capped; min width guard */}
        <div className="flex-1 max-w-[760px] min-w-[260px] hidden md:block">
          <div className="relative">
            <Search
              className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 opacity-60 ${isRTL ? "right-3" : "left-3"}`}
            />
            <input
              className={`w-full rounded-2xl border border-neutral-200 bg-white/80 px-4 py-2
                          focus:outline-none focus:ring-2 ${isRTL ? "pr-9" : "pl-9"}`}
              style={{ outlineColor: brand.primary }}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>

        {/* Actions (account/cart) — don't shrink, keep tight */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hidden md:inline-block px-3 py-2 rounded-2xl text-sm font-semibold text-white whitespace-nowrap"
              style={{ background: brand.primary }}
            >
              {isRTL ? "تسجيل الدخول" : "Sign in"}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 transition-opacity"
              style={{ background: brand.primary }}
            >
              <LogOut className="w-4 h-4" />
              {isRTL ? "تسجيل الخروج" : "Logout"}
            </button>
          )}

          {/* Account icon (no label on small to save width) */}
          <Link to={isAuthenticated ? "/account" : "/login"} className="px-2 py-2 rounded-xl hover:bg-neutral-100">
            <User2 className="w-6 h-6 text-neutral-800" />
          </Link>

          {/* Cart icon with badge */}
          <Link to="/cart" className="relative px-2 py-2 rounded-xl hover:bg-neutral-100">
            <ShoppingBag className="w-6 h-6 text-neutral-800" />
            {cart && cart.totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] flex items-center justify-center text-white"
                style={{ background: brand.primary }}
              >
                {cart.totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search — RTL-aware icon/padding */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 opacity-60 ${isRTL ? "right-3" : "left-3"}`} />
          <input
            className={`w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3
                        focus:outline-none focus:ring-2 ${isRTL ? "pr-10" : "pl-10"}`}
            style={{ outlineColor: brand.primary }}
            placeholder={searchPlaceholder}
          />
        </div>
      </div>
    </header>
  );
}
