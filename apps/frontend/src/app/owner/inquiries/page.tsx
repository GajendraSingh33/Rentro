'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import InquiryList from '@/components/inquiries/InquiryList';

export default function InquiriesPage() {
  useProtectedRoute('OWNER');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Inquiries</h1>
        <InquiryList />
      </div>
    </div>
  );
}
