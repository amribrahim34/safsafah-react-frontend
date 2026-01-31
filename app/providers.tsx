'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { setupApiInterceptors } from '@/lib/api/client';

setupApiInterceptors(store);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
