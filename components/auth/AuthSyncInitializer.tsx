'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { syncGuestCart, clearLocalCart } from '@/store/slices/cartsSlice';
import { addToWishlist, clearWishlist } from '@/store/slices/wishlistSlice';
import { localStorageManager } from '@/lib/localStorageManager';

export default function AuthSyncInitializer() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const localCartItems = useAppSelector((state) => state.cart.localItems);

  const prevAuth = useRef(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !prevAuth.current) {
      const cartToSync = [...localCartItems];
      const wishlistToSync = [...wishlistItems];

      if (cartToSync.length > 0) {
        dispatch(syncGuestCart()).then(() => {
          localStorageManager.clearCart();
        });
      } else {
        dispatch(clearLocalCart());
      }

      if (wishlistToSync.length > 0) {
        Promise.allSettled(
          wishlistToSync.map((productId) => dispatch(addToWishlist(productId)).unwrap())
        ).finally(() => {
          dispatch(clearWishlist());
          localStorageManager.clearWishlist();
        });
      }
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
