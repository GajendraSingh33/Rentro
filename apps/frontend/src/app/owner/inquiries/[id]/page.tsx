'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import api from '@/services/api';

interface InquiryDetail {
  id: number;
  seeker_name: string;
  seeker_email: string;
  seeker_phone?: string;
  listing_id: number;
  listing_title: string;
  message: string;
  status: string;
  response_message?: string;
  contact_revealed: boolean;
  created_at: string;
  responded_at?: string;
}

export default function InquiryDetailPage() {
  useProtectedRoute('OWNER');
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [response, setResponse] = useState('');

  const inquiryId = params.id as string;

  const { data: inquiry, isLoading } = useQuery<InquiryDetail>({
    queryKey: ['inquiry', inquiryId],
    queryFn: () => api.get(`/inquiries/${inquiryId}`).then((r) => r.data),
  });

  const respondMutation = useMutation({
    mutationFn: () => api.post(`/inquiries/${inquiryId}/respond`, { response_message: response }),
    onSuccess: () => {
      toast.success('Response sent!');
      queryClient.invalidateQueries({ queryKey: ['inquiry', inquiryId] });
      setResponse('');
    },
    onError: () => toast.error('Failed to send response'),
  });

  const revealContactMutation = useMutation({
    mutationFn: () => api.post(`/inquiries/${inquiryId}/reveal-contact`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiry', inquiryId] });
      toast.success('Contact details revealed');
    },
    onError: () => toast.error('Failed to reveal contact'),
  });

  if (isLoading) {
    return <div className="animate-pulse p-8">Loading...</div>;
  }

  if (!inquiry) {
    return <div className="p-8 text-center">Inquiry not found</div>;
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    viewed: 'bg-yellow-100 text-yellow-700',
    responded: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    closed: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to Inquiries
        </button>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[inquiry.status]}`}>
                  {inquiry.status}
                </span>
                <h1 className="text-xl font-semibold mt-3">{inquiry.seeker_name}</h1>
                <p className="text-gray-500">Re: {inquiry.listing_title}</p>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(inquiry.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Seeker Contact */}
          <div className="p-6 bg-gray-50 border-b">
            <h3 className="font-medium mb-3">Seeker Contact</h3>
            {inquiry.contact_revealed ? (
              <div className="space-y-2">
                <p><span className="text-gray-500">Email:</span> {inquiry.seeker_email}</p>
                {inquiry.seeker_phone && (
                  <p><span className="text-gray-500">Phone:</span> {inquiry.seeker_phone}</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-2">Contact details are hidden</p>
                <button
                  onClick={() => revealContactMutation.mutate()}
                  disabled={revealContactMutation.isPending}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  Reveal Contact Info
                </button>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="p-6 border-b">
            <h3 className="font-medium mb-3">Message</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          </div>

          {/* Response */}
          {inquiry.response_message ? (
            <div className="p-6 border-b">
              <h3 className="font-medium mb-3">Your Response</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.response_message}</p>
              </div>
              {inquiry.responded_at && (
                <p className="text-sm text-gray-400 mt-2">
                  Sent on {new Date(inquiry.responded_at).toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <div className="p-6">
              <h3 className="font-medium mb-3">Send Response</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                placeholder="Type your response to the seeker..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => respondMutation.mutate()}
                  disabled={!response.trim() || respondMutation.isPending}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {respondMutation.isPending ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
