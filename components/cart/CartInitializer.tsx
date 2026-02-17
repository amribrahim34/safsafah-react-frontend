'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCart } from '@/store/slices/cartsSlice';

/**
 * CartInitializer Component
 * 
 * Fetches the user's cart when the app loads (if authenticated).
 * This ensures the cart is populated in Redux state for display in the header.
 */
export default function CartInitializer() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    // Only fetch cart if user is authenticated and cart hasn't been fetched yet
    if (isAuthenticated && !cart) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, cart, dispatch]);

  // This component doesn't render anything
  return null;
}
