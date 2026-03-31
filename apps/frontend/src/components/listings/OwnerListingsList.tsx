'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import Link from 'next/link';

interface Listing {
  id: number;
  title: string;
  city: string;
  rent_amount: number;
  status: string;
  view_count: number;
  images: string[];
  created_at: string;
}

export default function OwnerListingsList() {
  const { data, isLoading } = useQuery({
    queryKey: ['owner-listings'],
    queryFn: () => api.get('/listings/owner/my-listings').then((r) => r.data),
  });

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
    inactive: 'bg-yellow-100 text-yellow-700',
    pending_approval: 'bg-blue-100 text-blue-700',
    rejected: 'bg-red-100 text-red-700',
  };

  if (isLoading) {
    return <ListingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link
          href="/owner/listings/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Add New
        </Link>
      </div>

      {data?.data?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't created any listings yet</p>
          <Link
            href="/owner/listings/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {data?.data?.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} statusColors={statusColors} />
          ))}
        </div>
      )}
    </div>
  );
}

function ListingCard({
  listing,
  statusColors,
}: {
  listing: Listing;
  statusColors: Record<string, string>;
}) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-36 flex-shrink-0">
          {listing.images?.[0] ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[listing.status]}`}>
                {listing.status.replace('_', ' ')}
              </span>
              <h3 className="font-semibold text-gray-900 mt-2">{listing.title}</h3>
              <p className="text-sm text-gray-500">{listing.city}</p>
            </div>
            <p className="text-lg font-bold text-indigo-600">₹{listing.rent_amount?.toLocaleString()}/mo</p>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
            <span>👁 {listing.view_count} views</span>
            <span>📅 {new Date(listing.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <Link
              href={`/owner/listings/${listing.id}/edit`}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              Edit
            </Link>
            <Link
              href={`/listings/${listing.id}`}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow h-36 animate-pulse" />
      ))}
    </div>
  );
}
