'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import OwnerListingsList from '@/components/listings/OwnerListingsList';

export default function ListingsPage() {
  useProtectedRoute('OWNER');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <OwnerListingsList />
      </div>
    </div>
  );
}
