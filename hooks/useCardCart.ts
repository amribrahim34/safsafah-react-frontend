'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToCart,
  addLocalCartItem,
} from '@/store/slices/cartsSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import { showProductToast } from '@/lib/swal';
import { useTranslation } from 'react-i18next';

export function useCardCart(productId: number, lang: 'ar' | 'en') {
  const { t } = useTranslation('products');
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cart = useAppSelector((state) => state.cart.cart);
  const localItems = useAppSelector((state) => state.cart.localItems);
  const loadingProductId = useAppSelector((state) => state.cart.loadingProductId);

  const isInCart = !!(
    cart?.items?.find((i) => i.productId === productId) ||
    localItems.find((i) => i.productId === productId)
  );

  const isLoading = loadingProductId === productId;

  const handleAddToCart = async () => {
    if (isInCart) return;

    const isRtl = lang === 'ar';

    if (isAuthenticated) {
      try {
        await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
        showProductToast(t('added_to_cart'), isRtl);
      } catch {
        // error already captured in slice
      }
    } else {
      const currentItems = localStorageManager.getCartItems();
      const existing = currentItems.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        currentItems.push({ productId, quantity: 1 });
      }
      localStorageManager.setCartItems(currentItems);
      dispatch(addLocalCartItem(productId));
      showProductToast(t('added_to_cart'), isRtl);
    }
  };

  return { isInCart, isLoading, handleAddToCart };
}
