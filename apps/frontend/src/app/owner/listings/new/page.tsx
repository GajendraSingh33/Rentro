'use client';

import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import ListingForm from '@/components/listings/ListingForm';

export default function NewListingPage() {
  useProtectedRoute('OWNER');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Listing</h1>
        <ListingForm onSuccess={() => router.push('/owner/listings')} />
      </div>
    </div>
  );
}
