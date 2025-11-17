import { Search, User2, ShoppingBag, LogOut, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { removeFromCart } from "@/store/slices/cartsSlice";
import logo from "../../assets/safsafah-logo.png";
import { useState, useEffect } from "react";

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
  const isCartLoading = useAppSelector((state) => state.cart.isLoading);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isRTL = lang === "ar";

  // Close cart and profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCartOpen && !target.closest('.cart-dropdown-container')) {
        setIsCartOpen(false);
      }
      if (isProfileOpen && !target.closest('.profile-dropdown-container')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, isProfileOpen]);
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

  const handleRemoveFromCart = async (itemId: number) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(
      lang === "ar" ? "ar-EG" : "en-EG",
      { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
    ).format(price);
  };

  const getImageUrl = (imageUrl: string | null | undefined) => {
    // Return empty string if imageUrl is null or undefined
    if (!imageUrl) {
      return '';
    }
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    // Otherwise, prepend the API base URL
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
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
          {/* Account icon with click dropdown */}
          <div className="relative profile-dropdown-container">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="px-2 py-2 rounded-xl hover:bg-neutral-100"
            >
              <User2 className="w-6 h-6 text-neutral-800" />
            </button>

            {/* Account Dropdown */}
            {isProfileOpen && (
              <div
                className={`absolute top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}
              >
                {isAuthenticated ? (
                  <div className="py-2">
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors text-neutral-700"
                    >
                      <User2 className="w-5 h-5" />
                      <span className="font-medium">{isRTL ? "حسابي" : "My Account"}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                      style={{ color: brand.primary }}
                    >
                      <User2 className="w-5 h-5" />
                      <span className="font-medium">{isRTL ? "تسجيل الدخول" : "Sign in"}</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart icon with dropdown */}
          <div className="relative cart-dropdown-container">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative px-2 py-2 rounded-xl hover:bg-neutral-100"
            >
              <ShoppingBag className="w-6 h-6 text-neutral-800" />
              {cart && cart.totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] flex items-center justify-center text-white"
                  style={{ background: brand.primary }}
                >
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {isCartOpen && (
              <div
                className={`absolute top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 ${isRTL ? 'left-0' : 'right-0'}`}
                style={{ maxHeight: '500px' }}
              >
                {cart && cart.items.length > 0 ? (
                  <>
                    {/* Cart Items */}
                    <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                          {item.productImage && (
                            <img
                              src={getImageUrl(item.productImage)}
                              alt={lang === "ar" ? item.productNameAr : item.productNameEn}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {lang === "ar" ? item.productNameAr : item.productNameEn}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-neutral-600">
                                {lang === "ar" ? "الكمية" : "Qty"}: {item.quantity}
                              </span>
                              <span className="font-bold text-sm" style={{ color: brand.primary }}>
                                {formatPrice(item.subtotal)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.productId)}
                            disabled={isCartLoading}
                            className="p-1 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="border-t border-neutral-200 p-4 bg-neutral-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-neutral-700">
                          {lang === "ar" ? "المجموع" : "Total"}
                        </span>
                        <span className="font-bold text-lg" style={{ color: brand.primary }}>
                          {formatPrice(cart.totalPrice)}
                        </span>
                      </div>
                      <Link
                        to="/cart"
                        className="block w-full text-center py-2.5 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                        style={{ background: brand.primary }}
                      >
                        {lang === "ar" ? "إتمام الطلب" : "Checkout"}
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 mb-3" />
                    <p className="text-neutral-600 font-medium">
                      {lang === "ar" ? "السلة فارغة" : "Your cart is empty"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
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
