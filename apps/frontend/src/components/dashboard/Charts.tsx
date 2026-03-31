'use client';

import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import api from '@/services/api';

export function ViewsChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['owner-views-chart'],
    queryFn: () => api.get('/owner/dashboard/views-over-time').then((r) => r.data),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">Views Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function InquiriesChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['owner-inquiries-chart'],
    queryFn: () => api.get('/owner/dashboard/inquiries-over-time').then((r) => r.data),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">Inquiries Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ListingPerformanceChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['top-listings'],
    queryFn: () => api.get('/owner/dashboard/top-listings').then((r) => r.data),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  const chartData = data?.slice(0, 5).map((listing: any) => ({
    name: listing.title.slice(0, 20) + (listing.title.length > 20 ? '...' : ''),
    views: listing.view_count,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">Top Performing Listings</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-64 bg-gray-100 rounded" />
    </div>
  );
}
