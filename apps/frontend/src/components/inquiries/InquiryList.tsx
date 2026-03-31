'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/services/api';
import Link from 'next/link';

interface Inquiry {
  id: number;
  listing_id: number;
  listing_title: string;
  seeker_name: string;
  seeker_email: string;
  message: string;
  status: 'new' | 'viewed' | 'responded' | 'rejected' | 'closed';
  created_at: string;
  response_message?: string;
}

interface InquiryListProps {
  filterStatus?: string;
}

export default function InquiryList({ filterStatus }: InquiryListProps) {
  const [selectedStatus, setSelectedStatus] = useState(filterStatus || 'all');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['inquiries', selectedStatus],
    queryFn: () =>
      api
        .get('/inquiries', { params: selectedStatus !== 'all' ? { status: selectedStatus } : {} })
        .then((r) => r.data),
  });

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    responded: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    closed: 'bg-gray-100 text-gray-700',
  };

  if (isLoading) {
    return <InquiryListSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'new', 'viewed', 'responded', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === status
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Inquiry Cards */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.data?.map((inquiry: Inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} statusColors={statusColors} />
          ))}
        </div>
      )}
    </div>
  );
}

function InquiryCard({
  inquiry,
  statusColors,
}: {
  inquiry: Inquiry;
  statusColors: Record<string, string>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [response, setResponse] = useState('');
  const queryClient = useQueryClient();

  const respondMutation = useMutation({
    mutationFn: () =>
      api.post(`/inquiries/${inquiry.id}/respond`, { response_message: response }),
    onSuccess: () => {
      toast.success('Response sent successfully!');
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      setIsExpanded(false);
    },
    onError: () => toast.error('Failed to send response'),
  });

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                {inquiry.status}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">{inquiry.seeker_name}</h3>
            <p className="text-sm text-gray-500">{inquiry.listing_title}</p>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded">{inquiry.message}</p>
          </div>

          {inquiry.response_message && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Your Response:</h4>
              <p className="text-gray-600 bg-green-50 p-3 rounded">{inquiry.response_message}</p>
            </div>
          )}

          {inquiry.status !== 'responded' && inquiry.status !== 'closed' && (
            <div className="mt-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => respondMutation.mutate()}
                  disabled={!response.trim() || respondMutation.isPending}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {respondMutation.isPending ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InquiryListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}
