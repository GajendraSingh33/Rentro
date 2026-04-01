'use client';

import { useState, useEffect } from 'react';
import {
  FiUsers,
  FiHome,
  FiMessageCircle,
  FiStar,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface PlatformOverview {
  total_users: number;
  total_seekers: number;
  total_owners: number;
  total_admins: number;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;

  total_listings: number;
  active_listings: number;
  pending_listings: number;
  verified_listings: number;
  featured_listings: number;
  new_listings_today: number;
  new_listings_this_week: number;

  total_inquiries: number;
  pending_inquiries: number;
  responded_inquiries: number;
  new_inquiries_today: number;

  total_reviews: number;
  average_platform_rating: number;
}

interface Activity {
  type: string;
  timestamp: string;
  data: Record<string, any>;
}

export default function AdminDashboardPage() {
  const { token } = useAuthStore();
  const [overview, setOverview] = useState<PlatformOverview | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [overviewRes, activityRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/analytics/activity?limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (overviewRes.ok) {
        const data = await overviewRes.json();
        setOverview(data);
      }

      if (activityRes.ok) {
        const data = await activityRes.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <FiUsers className="w-4 h-4 text-blue-500" />;
      case 'listing_created':
        return <FiHome className="w-4 h-4 text-green-500" />;
      case 'inquiry_sent':
        return <FiMessageCircle className="w-4 h-4 text-purple-500" />;
      case 'review_posted':
        return <FiStar className="w-4 h-4 text-yellow-500" />;
      default:
        return <FiActivity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'user_registered':
        return `${activity.data.name} registered as ${activity.data.role}`;
      case 'listing_created':
        return `New listing: ${activity.data.title} in ${activity.data.city}`;
      case 'inquiry_sent':
        return `${activity.data.seeker} inquired about ${activity.data.listing}`;
      case 'review_posted':
        return `${activity.data.user} reviewed ${activity.data.listing} (${activity.data.rating}★)`;
      default:
        return 'Unknown activity';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{overview?.total_users || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-500">
              Seekers: <span className="font-medium text-gray-700">{overview?.total_seekers}</span>
            </span>
            <span className="text-gray-500">
              Owners: <span className="font-medium text-gray-700">{overview?.total_owners}</span>
            </span>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +{overview?.new_users_this_week || 0} this week
          </div>
        </div>

        {/* Listings Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Listings</p>
              <p className="text-3xl font-bold text-gray-900">{overview?.total_listings || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiHome className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-500">
              Active: <span className="font-medium text-green-600">{overview?.active_listings}</span>
            </span>
            <span className="text-gray-500">
              Pending: <span className="font-medium text-yellow-600">{overview?.pending_listings}</span>
            </span>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +{overview?.new_listings_this_week || 0} this week
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Inquiries</p>
              <p className="text-3xl font-bold text-gray-900">{overview?.total_inquiries || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiMessageCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-500">
              Pending: <span className="font-medium text-yellow-600">{overview?.pending_inquiries}</span>
            </span>
            <span className="text-gray-500">
              Responded: <span className="font-medium text-green-600">{overview?.responded_inquiries}</span>
            </span>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +{overview?.new_inquiries_today || 0} today
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{overview?.total_reviews || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiStar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-gray-500">
              Avg Rating:{' '}
              <span className="font-medium text-yellow-600">
                {overview?.average_platform_rating?.toFixed(1) || 'N/A'}★
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <FiCheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{overview?.verified_listings || 0}</p>
            <p className="text-sm text-gray-500">Verified Listings</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <FiTrendingUp className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{overview?.featured_listings || 0}</p>
            <p className="text-sm text-gray-500">Featured Listings</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiUsers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{overview?.new_users_today || 0}</p>
            <p className="text-sm text-gray-500">New Users Today</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FiClock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{overview?.pending_listings || 0}</p>
            <p className="text-sm text-gray-500">Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {activities.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No recent activity</div>
          ) : (
            activities.map((activity, index) => (
              <div key={index} className="p-4 flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{getActivityText(activity)}</p>
                  <p className="text-xs text-gray-400">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
