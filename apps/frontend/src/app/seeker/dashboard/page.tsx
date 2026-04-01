'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiSearch,
  FiHeart,
  FiMessageCircle,
  FiStar,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiEye,
  FiCalendar,
} from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface DashboardOverview {
  total_inquiries: number;
  pending_inquiries: number;
  responded_inquiries: number;
  total_favorites: number;
  total_reviews: number;
  recent_searches: number;
}

interface RecentInquiry {
  id: number;
  message: string;
  status: string;
  created_at: string;
  listing: {
    id: number;
    title: string;
    city: string;
    monthly_rent: number;
    thumbnail_url: string | null;
  };
}

interface ActivityItem {
  id: number;
  type: 'inquiry' | 'favorite' | 'review' | 'view';
  title: string;
  description: string;
  timestamp: string;
  link: string;
}

const INQUIRY_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  viewed: { bg: 'bg-purple-100', text: 'text-purple-700' },
  responded: { bg: 'bg-green-100', text: 'text-green-700' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function SeekerDashboardPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();

  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login?redirect=/seeker/dashboard');
      return;
    }
    fetchDashboardData();
  }, [token, router]);

  const fetchDashboardData = async () => {
    try {
      const [overviewRes, inquiriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seeker/dashboard/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seeker/dashboard/inquiries?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (overviewRes.ok) {
        const data = await overviewRes.json();
        setOverview(data);
      }

      if (inquiriesRes.ok) {
        const data = await inquiriesRes.json();
        setRecentInquiries(data.data);
        
        // Build activity timeline from inquiries
        const inquiryActivities: ActivityItem[] = data.data.map((inq: RecentInquiry) => ({
          id: inq.id,
          type: 'inquiry' as const,
          title: `Inquiry sent`,
          description: inq.listing.title,
          timestamp: inq.created_at,
          link: `/seeker/inquiries/${inq.id}`,
        }));
        setActivities(inquiryActivities);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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
    return formatDate(dateString);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your PG search activity
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/search"
            className="flex items-center gap-3 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSearch className="w-6 h-6" />
            <span className="font-medium">Search PGs</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-3 bg-white border p-4 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <FiHeart className="w-6 h-6 text-red-500" />
            <span className="font-medium text-gray-700">My Favorites</span>
          </Link>
          <Link
            href="/seeker/inquiries"
            className="flex items-center gap-3 bg-white border p-4 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <FiMessageCircle className="w-6 h-6 text-green-500" />
            <span className="font-medium text-gray-700">My Inquiries</span>
          </Link>
          <Link
            href="/seeker/reviews"
            className="flex items-center gap-3 bg-white border p-4 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
          >
            <FiStar className="w-6 h-6 text-yellow-500" />
            <span className="font-medium text-gray-700">My Reviews</span>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiMessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.total_inquiries || 0}
                </div>
                <div className="text-sm text-gray-500">Total Inquiries</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.pending_inquiries || 0}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.responded_inquiries || 0}
                </div>
                <div className="text-sm text-gray-500">Responses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiHeart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.total_favorites || 0}
                </div>
                <div className="text-sm text-gray-500">Favorites</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiStar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.total_reviews || 0}
                </div>
                <div className="text-sm text-gray-500">Reviews</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FiEye className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {overview?.recent_searches || 0}
                </div>
                <div className="text-sm text-gray-500">Searches</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Inquiries */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
                <Link
                  href="/seeker/inquiries"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>

              {recentInquiries.length === 0 ? (
                <div className="p-8 text-center">
                  <FiMessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No inquiries yet</p>
                  <Link
                    href="/search"
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Start searching for PGs
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {recentInquiries.map((inquiry) => (
                    <Link
                      key={inquiry.id}
                      href={`/seeker/inquiries/${inquiry.id}`}
                      className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {inquiry.listing.thumbnail_url ? (
                          <img
                            src={inquiry.listing.thumbnail_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🏠
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {inquiry.listing.title}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <FiMapPin className="w-3 h-3" />
                              {inquiry.listing.city}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {formatPrice(inquiry.listing.monthly_rent)}
                            </div>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                                INQUIRY_STATUS_COLORS[inquiry.status]?.bg || 'bg-gray-100'
                              } ${INQUIRY_STATUS_COLORS[inquiry.status]?.text || 'text-gray-700'}`}
                            >
                              {inquiry.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {inquiry.message}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <FiCalendar className="w-3 h-3" />
                          {formatDate(inquiry.created_at)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Activity Timeline</h2>
              </div>

              {activities.length === 0 ? (
                <div className="p-6 text-center">
                  <FiClock className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No recent activity</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="space-y-4">
                    {activities.slice(0, 10).map((activity, index) => (
                      <div key={activity.id} className="flex gap-3">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.type === 'inquiry'
                                ? 'bg-blue-100 text-blue-600'
                                : activity.type === 'favorite'
                                ? 'bg-red-100 text-red-600'
                                : activity.type === 'review'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {activity.type === 'inquiry' && (
                              <FiMessageCircle className="w-4 h-4" />
                            )}
                            {activity.type === 'favorite' && (
                              <FiHeart className="w-4 h-4" />
                            )}
                            {activity.type === 'review' && (
                              <FiStar className="w-4 h-4" />
                            )}
                            {activity.type === 'view' && (
                              <FiEye className="w-4 h-4" />
                            )}
                          </div>
                          {index < activities.length - 1 && (
                            <div className="w-px h-full bg-gray-200 mt-2" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                          <Link
                            href={activity.link}
                            className="hover:text-blue-600"
                          >
                            <p className="text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {activity.description}
                            </p>
                          </Link>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                💡 Tips for Finding the Perfect PG
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Save multiple PGs to compare them easily
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Send inquiries with specific questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Check reviews before visiting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Visit during different times of day
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
