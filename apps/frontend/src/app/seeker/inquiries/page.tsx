'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiMessageCircle,
  FiMapPin,
  FiCalendar,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface Inquiry {
  id: number;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  owner_response: string | null;
  response_at: string | null;
  listing: {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    thumbnail_url: string | null;
    owner: {
      id: number;
      first_name: string;
      last_name: string;
      email?: string;
      phone?: string;
    };
  };
}

type StatusFilter = 'all' | 'pending' | 'viewed' | 'responded' | 'rejected';

const INQUIRY_STATUS: Record<string, { label: string; bg: string; text: string }> = {
  new: { label: 'New', bg: 'bg-blue-100', text: 'text-blue-700' },
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  viewed: { label: 'Viewed', bg: 'bg-purple-100', text: 'text-purple-700' },
  responded: { label: 'Responded', bg: 'bg-green-100', text: 'text-green-700' },
  rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function SeekerInquiriesPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedInquiry, setExpandedInquiry] = useState<number | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login?redirect=/seeker/inquiries');
      return;
    }
    fetchInquiries();
  }, [token, router, statusFilter, currentPage]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: '10',
      });
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seeker/dashboard/inquiries?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch inquiries');

      const data = await response.json();
      setInquiries(data.data);
      setTotalPages(data.meta?.total_pages || 1);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      toast.error('Failed to load inquiries');
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      inq.listing.title.toLowerCase().includes(q) ||
      inq.listing.city.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q)
    );
  });

  if (isLoading && inquiries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiMessageCircle className="w-6 h-6 text-blue-500" />
            My Inquiries
          </h1>
          <p className="text-gray-600 mt-1">
            Track your PG inquiries and responses from owners
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {(['all', 'pending', 'viewed', 'responded', 'rejected'] as StatusFilter[]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiMessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {statusFilter === 'all' ? 'No inquiries yet' : `No ${statusFilter} inquiries`}
            </h2>
            <p className="text-gray-500 mb-6">
              {statusFilter === 'all'
                ? 'Start exploring PGs and send inquiries to property owners.'
                : `You don't have any ${statusFilter} inquiries at the moment.`}
            </p>
            <button
              onClick={() => router.push('/search')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse PGs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Main Content */}
                <div className="flex p-4 gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {inquiry.listing.thumbnail_url ? (
                      <Image
                        src={inquiry.listing.thumbnail_url}
                        alt={inquiry.listing.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        🏠
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/listings/${inquiry.listing.id}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
                        >
                          {inquiry.listing.title}
                        </Link>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <FiMapPin className="w-3 h-3" />
                          {inquiry.listing.city}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-gray-900">
                          {formatPrice(inquiry.listing.monthly_rent)}
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${
                            INQUIRY_STATUS[inquiry.status]?.bg || 'bg-gray-100'
                          } ${INQUIRY_STATUS[inquiry.status]?.text || 'text-gray-700'}`}
                        >
                          {INQUIRY_STATUS[inquiry.status]?.label || inquiry.status}
                        </span>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FiCalendar className="w-3 h-3" />
                        Sent on {formatDate(inquiry.created_at)}
                      </div>
                      <button
                        onClick={() =>
                          setExpandedInquiry(
                            expandedInquiry === inquiry.id ? null : inquiry.id
                          )
                        }
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {expandedInquiry === inquiry.id ? 'Show Less' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedInquiry === inquiry.id && (
                  <div className="border-t px-4 py-4 bg-gray-50">
                    {/* Your Message */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </h4>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                        {inquiry.message}
                      </p>
                    </div>

                    {/* Owner Response */}
                    {inquiry.owner_response ? (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Owner's Response
                        </h4>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-700">
                            {inquiry.owner_response}
                          </p>
                          {inquiry.response_at && (
                            <p className="text-xs text-gray-400 mt-2">
                              Responded on {formatDateTime(inquiry.response_at)}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      inquiry.status !== 'rejected' && (
                        <div className="mb-4">
                          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                            <p className="text-sm text-yellow-700">
                              ⏳ Waiting for owner's response...
                            </p>
                          </div>
                        </div>
                      )
                    )}

                    {/* Owner Contact (if responded) */}
                    {inquiry.status === 'responded' && inquiry.listing.owner && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Contact Owner
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {inquiry.listing.owner.first_name?.[0]?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {inquiry.listing.owner.first_name}{' '}
                              {inquiry.listing.owner.last_name}
                            </p>
                            <div className="flex gap-4 mt-1">
                              {inquiry.listing.owner.email && (
                                <a
                                  href={`mailto:${inquiry.listing.owner.email}`}
                                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <FiMail className="w-3 h-3" />
                                  Email
                                </a>
                              )}
                              {inquiry.listing.owner.phone && (
                                <a
                                  href={`tel:${inquiry.listing.owner.phone}`}
                                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <FiPhone className="w-3 h-3" />
                                  Call
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-4 pt-4 border-t">
                      <Link
                        href={`/listings/${inquiry.listing.id}`}
                        className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        View Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
