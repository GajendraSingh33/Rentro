'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export const useProtectedRoute = (allowedRoles?: string[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, accessToken, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't redirect while auth is loading
    if (isLoading) return;

    // Check if user is authenticated
    if (!user || !accessToken) {
      // Redirect to login with return path
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    // Check if user has required role
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page
        router.push('/unauthorized');
      }
    }
  }, [user, accessToken, isLoading, router, pathname, allowedRoles]);

  return { user, isAuthenticated: !!user, isLoading };
};
