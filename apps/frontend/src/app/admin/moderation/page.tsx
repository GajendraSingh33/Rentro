'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/services/api';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

interface PendingListing {
  id: number;
  title: string;
  city: string;
  rent_amount: number;
  owner: { name: string; email: string };
  created_at: string;
  images: string[];
}

export default function ModerationPage() {
  useProtectedRoute('ADMIN');
  const queryClient = useQueryClient();
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['pending-listings'],
    queryFn: () => api.get('/admin/moderation/pending').then((r) => r.data),
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => api.post(`/admin/moderation/listings/${id}/approve`),
    onSuccess: () => {
      toast.success('Listing approved!');
      queryClient.invalidateQueries({ queryKey: ['pending-listings'] });
    },
    onError: () => toast.error('Failed to approve'),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      api.post(`/admin/moderation/listings/${id}/reject`, { reason }),
    onSuccess: () => {
      toast.success('Listing rejected');
      queryClient.invalidateQueries({ queryKey: ['pending-listings'] });
      setRejectingId(null);
      setRejectReason('');
    },
    onError: () => toast.error('Failed to reject'),
  });

  if (isLoading) {
    return <div className="animate-pulse p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Moderation Queue</h1>
        
        {data?.data?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No listings pending approval</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.data?.map((listing: PendingListing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex">
                  {/* Image */}
                  <div className="w-48 h-40 flex-shrink-0">
                    {listing.images?.[0] ? (
                      <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-lg">{listing.title}</h3>
                    <p className="text-gray-500">{listing.city}</p>
                    <p className="text-indigo-600 font-bold">₹{listing.rent_amount?.toLocaleString()}/mo</p>
                    <p className="text-sm text-gray-400 mt-2">
                      By: {listing.owner?.name} ({listing.owner?.email})
                    </p>
                    <p className="text-sm text-gray-400">
                      Submitted: {new Date(listing.created_at).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => approveMutation.mutate(listing.id)}
                        disabled={approveMutation.isPending}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectingId(listing.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>

                    {/* Reject Form */}
                    {rejectingId === listing.id && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Reason for rejection..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => rejectMutation.mutate({ id: listing.id, reason: rejectReason })}
                            disabled={!rejectReason.trim() || rejectMutation.isPending}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm disabled:opacity-50"
                          >
                            Confirm Reject
                          </button>
                          <button
                            onClick={() => {
                              setRejectingId(null);
                              setRejectReason('');
                            }}
                            className="px-3 py-1 border border-gray-300 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
