'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserProfile } from '@/store/slices/authSlice';
import { addToCart, fetchCart, clearLocalCart } from '@/store/slices/cartsSlice';
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
      dispatch(fetchUserProfile());
      const cartToSync = [...localCartItems];
      const wishlistToSync = [...wishlistItems];

      // Sync local cart → server by adding each item individually.
      // The backend has no /cart/sync endpoint; we use POST /cart/items per item.
      if (cartToSync.length > 0) {
        Promise.allSettled(
          cartToSync.map((item) =>
            dispatch(addToCart({ productId: item.productId, quantity: item.quantity })).unwrap()
          )
        ).finally(() => {
          localStorageManager.clearCart();
          dispatch(clearLocalCart());
          dispatch(fetchCart()); // refresh Redux state from server after sync
        });
      } else {
        dispatch(clearLocalCart());
        dispatch(fetchCart()); // always fetch server cart on login
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
