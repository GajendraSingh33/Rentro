'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import Link from 'next/link';

interface DashboardOverview {
  listings: { total: number; active: number; draft: number };
  views: { total: number };
  inquiries: { total: number; new: number; responded: number };
  inquiryRate: number;
}

export default function OwnerDashboard() {
  const { data, isLoading } = useQuery<DashboardOverview>({
    queryKey: ['owner-dashboard'],
    queryFn: () => api.get('/owner/dashboard/overview').then((r) => r.data),
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Listings"
          value={data?.listings.total || 0}
          subtitle={`${data?.listings.active || 0} active`}
          color="blue"
        />
        <StatCard
          title="Total Views"
          value={data?.views.total || 0}
          subtitle="All time"
          color="green"
        />
        <StatCard
          title="Inquiries"
          value={data?.inquiries.total || 0}
          subtitle={`${data?.inquiries.new || 0} new`}
          color="indigo"
        />
        <StatCard
          title="Inquiry Rate"
          value={`${data?.inquiryRate || 0}%`}
          subtitle="Inquiries/Views"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/owner/listings/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Add New Listing
          </Link>
          <Link
            href="/owner/inquiries"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            View Inquiries
            {data?.inquiries.new > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                {data.inquiries.new}
              </span>
            )}
          </Link>
          <Link
            href="/owner/listings"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Manage Listings
          </Link>
        </div>
      </div>

      {/* New Inquiries Section */}
      {data?.inquiries.new > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <span className="text-yellow-600 mr-2">🔔</span>
            <p className="text-yellow-800">
              You have <strong>{data.inquiries.new} new inquiries</strong> waiting for your response.
            </p>
            <Link
              href="/owner/inquiries?status=new"
              className="ml-auto text-yellow-700 hover:text-yellow-900 font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: number | string;
  subtitle: string;
  color: 'blue' | 'green' | 'indigo' | 'purple';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[color].split(' ')[1]}`}>{value}</p>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
