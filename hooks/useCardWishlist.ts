'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist, toggleLocalItem } from '@/store/slices/wishlistSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import { showProductToast } from '@/lib/swal';
import { useTranslation } from 'react-i18next';
import posthog from 'posthog-js';
import { addToWishlist as fbAddToWishlist } from '@/lib/fbpixel';

export function useCardWishlist(
  productId: number,
  isInWishlistProp: boolean,
  lang: 'ar' | 'en'
) {
  const { t } = useTranslation('products');
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const loadingProductId = useAppSelector((state) => state.wishlist.loadingProductId);

  const [optimistic, setOptimistic] = useState<boolean | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isInWishlist =
    optimistic !== null
      ? optimistic
      : hasInteracted
      ? wishlistItems.includes(productId)
      : wishlistItems.includes(productId) || isInWishlistProp;

  const isLoading = loadingProductId === productId;

  const handleToggle = async () => {
    if (isLoading) return;
    const isRtl = lang === 'ar';
    const next = !isInWishlist;
    setOptimistic(next);

    if (isAuthenticated) {
      try {
        if (isInWishlist) {
          await dispatch(removeFromWishlist(productId)).unwrap();
          showProductToast(t('removed_from_wishlist'), isRtl);
        } else {
          await dispatch(addToWishlist(productId)).unwrap();
          showProductToast(t('added_to_wishlist'), isRtl);
        }
        posthog.capture(isInWishlist ? 'wishlist_item_removed' : 'wishlist_item_added', {
          product_id: productId,
        });
        if (!isInWishlist) fbAddToWishlist({ id: productId });
        setHasInteracted(true);
        setOptimistic(null);
      } catch (error) {
        posthog.captureException(error);
        setOptimistic(!next);
      }
    } else {
      const currentItems = localStorageManager.getWishlistItems();
      const idx = currentItems.indexOf(productId);
      if (idx >= 0) {
        currentItems.splice(idx, 1);
      } else {
        currentItems.push(productId);
      }
      localStorageManager.setWishlistItems(currentItems);
      dispatch(toggleLocalItem(productId));
      setHasInteracted(true);
      setOptimistic(null);
      showProductToast(
        next ? t('added_to_wishlist') : t('removed_from_wishlist'),
        isRtl
      );
    }
  };

  return { isInWishlist, isLoading, handleToggle };
}
