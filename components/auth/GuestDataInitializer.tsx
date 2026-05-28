'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLocalCartItems } from '@/store/slices/cartsSlice';
import { setWishlistItems } from '@/store/slices/wishlistSlice';
import { localStorageManager } from '@/lib/localStorageManager';

export default function GuestDataInitializer() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setLocalCartItems(localStorageManager.getCartItems()));
      dispatch(setWishlistItems(localStorageManager.getWishlistItems()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
