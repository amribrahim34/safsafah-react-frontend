const CART_KEY = 'guest_cart';
const WISHLIST_KEY = 'guest_wishlist';

export type LocalCartItem = { productId: number; quantity: number };

const safeRead = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const localStorageManager = {
  getCartItems(): LocalCartItem[] {
    return safeRead<LocalCartItem[]>(CART_KEY, []);
  },

  setCartItems(items: LocalCartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  clearCart(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_KEY);
  },

  getWishlistItems(): number[] {
    return safeRead<number[]>(WISHLIST_KEY, []);
  },

  setWishlistItems(ids: number[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  },

  clearWishlist(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(WISHLIST_KEY);
  },
};
