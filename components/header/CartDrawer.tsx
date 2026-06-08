'use client';

import { X, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  brandPrimary: string;
  lang: Locale;
  mounted: boolean;
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

export default function CartDrawer({
  isOpen,
  onClose,
  isRTL,
  brandPrimary,
  lang,
  mounted,
}: CartDrawerProps) {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartLoading = useAppSelector((state) => state.cart.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const localItems = useAppSelector((state) => state.cart.localItems);

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

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[102] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel — always slides from the right */}
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl z-[103] flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: brandPrimary }} />
            <h2 className="font-bold text-lg text-neutral-800">{t('header.cart')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto">
          {isAuthenticated ? (
            cart && cart.items.length > 0 ? (
              <div className="p-4 space-y-3">
                {cart.items.map((item) => {
                  const slug = lang === 'ar' ? item.productSlugAr : item.productSlugEn;
                  const productHref = slug ? getLocalizedPath(`/product/${slug}`, lang) : '#';
                  return (
                    <div key={item.id} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                      {item.productImage && (
                        <Link href={productHref} onClick={onClose} className="flex-shrink-0">
                          <Image
                            src={getImageUrl(item.productImage)}
                            alt={lang === 'ar' ? item.productNameAr : item.productNameEn}
                            width={56}
                            height={56}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        </Link>
                      )}

                      <div className="flex-1 min-w-0 flex items-start">
                        <Link href={productHref} onClick={onClose} className="hover:underline block min-w-0">
                          <h4 className="font-semibold text-sm truncate leading-snug">
                            {lang === 'ar' ? item.productNameAr : item.productNameEn}
                          </h4>
                        </Link>
                      </div>

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
                            aria-label={item.quantity <= 1 ? t('header.remove') : t('header.decrease')}
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
                            aria-label={t('header.increase')}
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
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-neutral-300 mb-3" />
                <p className="text-neutral-600 font-medium">{t('header.cartEmpty')}</p>
              </div>
            )
          ) : guestLoading ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900" />
            </div>
          ) : guestCartItems.length > 0 ? (
            <div className="p-4 space-y-3">
              {guestCartItems.map((item) => {
                const slug = lang === 'ar' ? item.slugAr : item.slugEn;
                const productHref = slug ? getLocalizedPath(`/product/${slug}`, lang) : '#';
                return (
                  <div key={item.productId} className="flex gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors">
                    {item.image && (
                      <Link href={productHref} onClick={onClose} className="flex-shrink-0">
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 object-cover rounded-lg"
                        />
                      </Link>
                    )}

                    <div className="flex-1 min-w-0 flex items-start">
                      <Link href={productHref} onClick={onClose} className="hover:underline block min-w-0">
                        <h4 className="font-semibold text-sm truncate leading-snug">
                          {item.name}
                        </h4>
                      </Link>
                    </div>

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
                          aria-label={item.quantity <= 1 ? t('header.remove') : t('header.decrease')}
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
                          aria-label={t('header.increase')}
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-3" />
              <p className="text-neutral-600 font-medium">{t('header.cartEmpty')}</p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {((isAuthenticated && cart && cart.items.length > 0) ||
          (!isAuthenticated && guestCartItems.length > 0)) && (() => {
          const subtotal = isAuthenticated
            ? cart!.items.reduce((sum, i) => sum + i.subtotal, 0)
            : guestTotal;
          const discount = isAuthenticated ? (cart!.discountAmount ?? 0) : 0;
          const total = isAuthenticated ? (cart!.totalPrice ?? 0) : guestTotal;

          return (
            <div className="border-t border-neutral-200 p-4 bg-neutral-50 shrink-0">
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">{t('header.subtotal')}</span>
                  <span className="font-medium text-neutral-800">{formatPrice(subtotal, lang)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">{t('header.discount')}</span>
                    <span className="font-medium text-green-600">−{formatPrice(discount, lang)}</span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-2 flex items-center justify-between">
                  <span className="font-semibold text-neutral-700">{t('header.total')}</span>
                  <span className="font-bold text-lg" style={{ color: brandPrimary }}>
                    {formatPrice(total, lang)}
                  </span>
                </div>
              </div>

              <Link
                href={getLocalizedPath('/cart', lang)}
                onClick={onClose}
                className="block w-full text-center py-2.5 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ background: brandPrimary }}
              >
                {isAuthenticated ? t('header.checkout') : t('header.viewCart')}
              </Link>
            </div>
          );
        })()}
      </div>
    </>
  );
}
