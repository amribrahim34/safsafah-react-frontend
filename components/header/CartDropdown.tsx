'use client';

import { ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateCartItem } from '@/store/slices/cartsSlice';
import { getLocalizedPath, Locale } from '@/lib/locale-navigation';
import { env } from '@/config';

interface CartDropdownProps {
  isRTL: boolean;
  brandPrimary: string;
  lang: Locale;
  isOpen: boolean;
  onToggle: () => void;
}

function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || '';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

function formatPrice(price: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartDropdown({
  isRTL,
  brandPrimary,
  lang,
  isOpen,
  onToggle,
}: CartDropdownProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartLoading = useAppSelector((state) => state.cart.isLoading);

  // Suppress cart-dependent output during SSR to prevent hydration mismatch.
  // The Redux store is always empty on the server, but may have items on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleRemove = async (itemId: number) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const handleUpdateQty = async (itemId: number, quantity: number) => {
    if (quantity < 1) {
      await handleRemove(itemId);
      return;
    }
    try {
      await dispatch(updateCartItem({ itemId, quantity })).unwrap();
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  return (
    <div className="relative cart-dropdown-container">
      {/* Cart Icon Button */}
      <button
        onClick={onToggle}
        className="relative px-2 py-2 rounded-xl hover:bg-neutral-100"
      >
        <ShoppingBag className="w-6 h-6 text-neutral-800" />
        {/* Badge — only after mount to match server HTML (no cart on server) */}
        {mounted && cart && cart.totalItems > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] flex items-center justify-center text-white"
            style={{ background: brandPrimary }}
          >
            {cart.totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Panel — only after mount */}
      {mounted && isOpen && (
        <div
          className={`absolute top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 ${isRTL ? 'left-0' : 'right-0'}`}
          style={{ maxHeight: '500px' }}
        >
          {cart && cart.items.length > 0 ? (
            <>
              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                    {item.productImage && (
                      <img
                        src={getImageUrl(item.productImage)}
                        alt={lang === 'ar' ? item.productNameAr : item.productNameEn}
                        className="hidden md:block w-14 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                    )}

                    {/* Product Name */}
                    <div className="flex-1 min-w-0 flex items-start">
                      <h4 className="font-semibold text-sm truncate leading-snug">
                        {lang === 'ar' ? item.productNameAr : item.productNameEn}
                      </h4>
                    </div>

                    {/* Price + Qty Controls */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="font-bold text-sm whitespace-nowrap" style={{ color: brandPrimary }}>
                        {formatPrice(item.subtotal, lang)}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={isCartLoading}
                          onClick={() =>
                            item.quantity <= 1
                              ? handleRemove(item.id)
                              : handleUpdateQty(item.id, item.quantity - 1)
                          }
                          aria-label={
                            item.quantity <= 1
                              ? (lang === 'ar' ? 'إزالة' : 'Remove')
                              : (lang === 'ar' ? 'تقليل' : 'Decrease')
                          }
                          className="w-7 h-7 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
                        >
                          {item.quantity <= 1
                            ? <Trash2 size={12} strokeWidth={2.5} />
                            : <span className="text-sm font-bold leading-none select-none">−</span>
                          }
                        </button>

                        <span className="w-7 text-center text-sm font-bold tabular-nums select-none">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          disabled={isCartLoading}
                          onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                          aria-label={lang === 'ar' ? 'زيادة' : 'Increase'}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ backgroundColor: brandPrimary }}
                        >
                          <span className="text-sm font-bold leading-none select-none">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-neutral-200 p-4 bg-neutral-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-neutral-700">
                    {lang === 'ar' ? 'المجموع' : 'Total'}
                  </span>
                  <span className="font-bold text-lg" style={{ color: brandPrimary }}>
                    {formatPrice(cart.totalPrice, lang)}
                  </span>
                </div>
                <Link
                  href={getLocalizedPath('/cart', lang)}
                  className="block w-full text-center py-2.5 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: brandPrimary }}
                >
                  {lang === 'ar' ? 'إتمام الطلب' : 'Checkout'}
                </Link>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 mb-3" />
              <p className="text-neutral-600 font-medium">
                {lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
