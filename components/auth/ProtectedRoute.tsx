'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that redirects unauthenticated users to login page
 *
 * @param children - The component to render if user is authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const user = useAppSelector((state) => state.auth.user);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Give a brief moment for token validation to complete on mount
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isInitializing && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isInitializing, isAuthenticated, router]);

  // Show loading state while checking authentication or during initial token validation
  if (isLoading || (isInitializing && isAuthenticated && !user) || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
