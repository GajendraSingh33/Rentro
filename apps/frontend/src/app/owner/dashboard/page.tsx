'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import OwnerDashboard from '@/components/dashboard/OwnerDashboard';

export default function DashboardPage() {
  useProtectedRoute('OWNER');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Owner Dashboard</h1>
        <OwnerDashboard />
      </div>
    </div>
  );
}
