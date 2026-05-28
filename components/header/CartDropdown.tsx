'use client';

import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  removeFromCart,
  updateCartItem,
  removeLocalCartItem,
  updateLocalCartItemQuantity,
} from '@/store/slices/cartsSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import { productsService } from '@/lib/api/services/products.service';
import type { Product } from '@/types';
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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const localItems = useAppSelector((state) => state.cart.localItems);

  // Suppress cart-dependent output during SSR to prevent hydration mismatch.
  // The Redux store is always empty on the server, but may have items on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [guestProducts, setGuestProducts] = useState<Product[]>([]);
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated || localItems.length === 0) {
      setGuestProducts([]);
      return;
    }
    setGuestLoading(true);
    Promise.all(localItems.map((li) => productsService.getProduct(li.productId)))
      .then(setGuestProducts)
      .finally(() => setGuestLoading(false));
  }, [isAuthenticated, localItems]);

  const totalItems = isAuthenticated
    ? (cart?.totalItems ?? 0)
    : localItems.reduce((sum, li) => sum + li.quantity, 0);

  const guestCartItems = localItems.flatMap((li) => {
    const p = guestProducts.find((prod) => prod.id === li.productId);
    if (!p) return [];
    return [{
      productId: li.productId,
      name: lang === 'ar' ? p.nameAr : p.nameEn,
      image: p.image,
      price: p.price,
      quantity: li.quantity,
      slugEn: p.slugEn,
      slugAr: p.slugAr,
    }];
  });

  const guestTotal = guestCartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

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

  const handleGuestRemove = (productId: number) => {
    dispatch(removeLocalCartItem(productId));
    localStorageManager.setCartItems(
      localStorageManager.getCartItems().filter((ci) => ci.productId !== productId)
    );
  };

  const handleGuestUpdateQty = (productId: number, quantity: number) => {
    if (quantity < 1) {
      handleGuestRemove(productId);
      return;
    }
    dispatch(updateLocalCartItemQuantity({ productId, quantity }));
    localStorageManager.setCartItems(
      localStorageManager.getCartItems().map((ci) =>
        ci.productId === productId ? { ...ci, quantity } : ci
      )
    );
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
        {mounted && totalItems > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full text-[11px] flex items-center justify-center text-white"
            style={{ background: brandPrimary }}
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Panel — only after mount */}
      {mounted && isOpen && (
        <div
          className={`absolute top-full mt-2 lg:w-96 md:w-80 w-60 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 ${isRTL ? 'left-0' : 'right-0'}`}
          style={{ maxHeight: '500px' }}
        >
          {isAuthenticated ? (
            cart && cart.items.length > 0 ? (
              <>
                {/* Items List */}
                <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                  {cart.items.map((item) => {
                    const slug = lang === 'ar' ? item.productSlugAr : item.productSlugEn;
                    const productHref = slug ? getLocalizedPath(`/product/${slug}`, lang) : '#';
                    return (
                      <div key={item.id} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                        {item.productImage && (
                          <Link href={productHref} onClick={onToggle} className="flex-shrink-0">
                            <Image
                              src={getImageUrl(item.productImage)}
                              alt={lang === 'ar' ? item.productNameAr : item.productNameEn}
                              width={56}
                              height={56}
                              className="w-14 h-14 object-cover rounded-lg"
                            />
                          </Link>
                        )}

                        {/* Product Name */}
                        <div className="flex-1 min-w-0 flex items-start">
                          <Link href={productHref} onClick={onToggle} className="hover:underline block min-w-0">
                            <h4 className="font-semibold text-sm truncate leading-snug">
                              {lang === 'ar' ? item.productNameAr : item.productNameEn}
                            </h4>
                          </Link>
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
                    );
                  })}
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
            )
          ) : guestLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900" />
            </div>
          ) : guestCartItems.length > 0 ? (
            <>
              {/* Guest Items List */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                {guestCartItems.map((item) => {
                  const slug = lang === 'ar' ? item.slugAr : item.slugEn;
                  const productHref = slug ? getLocalizedPath(`/product/${slug}`, lang) : '#';
                  return (
                    <div key={item.productId} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                      {item.image && (
                        <Link href={productHref} onClick={onToggle} className="flex-shrink-0">
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        </Link>
                      )}

                      {/* Product Name */}
                      <div className="flex-1 min-w-0 flex items-start">
                        <Link href={productHref} onClick={onToggle} className="hover:underline block min-w-0">
                          <h4 className="font-semibold text-sm truncate leading-snug">
                            {item.name}
                          </h4>
                        </Link>
                      </div>

                      {/* Price + Qty Controls */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="font-bold text-sm whitespace-nowrap" style={{ color: brandPrimary }}>
                          {formatPrice(item.price * item.quantity, lang)}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity <= 1
                                ? handleGuestRemove(item.productId)
                                : handleGuestUpdateQty(item.productId, item.quantity - 1)
                            }
                            aria-label={
                              item.quantity <= 1
                                ? (lang === 'ar' ? 'إزالة' : 'Remove')
                                : (lang === 'ar' ? 'تقليل' : 'Decrease')
                            }
                            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
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
                            onClick={() => handleGuestUpdateQty(item.productId, item.quantity + 1)}
                            aria-label={lang === 'ar' ? 'زيادة' : 'Increase'}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-white transition-all"
                            style={{ backgroundColor: brandPrimary }}
                          >
                            <span className="text-sm font-bold leading-none select-none">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guest Cart Footer */}
              <div className="border-t border-neutral-200 p-4 bg-neutral-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-neutral-700">
                    {lang === 'ar' ? 'المجموع' : 'Total'}
                  </span>
                  <span className="font-bold text-lg" style={{ color: brandPrimary }}>
                    {formatPrice(guestTotal, lang)}
                  </span>
                </div>
                <Link
                  href={getLocalizedPath('/cart', lang)}
                  onClick={onToggle}
                  className="block w-full text-center py-2.5 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: brandPrimary }}
                >
                  {lang === 'ar' ? 'عرض السلة' : 'View Cart'}
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
