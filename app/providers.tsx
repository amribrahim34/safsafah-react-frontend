'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { setupApiInterceptors } from '@/lib/api/client';
import CartInitializer from '@/components/cart/CartInitializer';

setupApiInterceptors(store);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartInitializer />
      {children}
    </Provider>
  );
}
