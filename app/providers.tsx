'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { setupApiInterceptors } from '@/lib/api/client';
import CartInitializer from '@/components/cart/CartInitializer';
import GuestDataInitializer from '@/components/auth/GuestDataInitializer';
import AuthSyncInitializer from '@/components/auth/AuthSyncInitializer';

setupApiInterceptors(store);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GuestDataInitializer />
      <CartInitializer />
      <AuthSyncInitializer />
      {children}
    </Provider>
  );
}
