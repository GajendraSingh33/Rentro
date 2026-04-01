'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiMapPin, FiEdit2, FiCheckCircle, FiStar } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface Favorite {
  id: number;
  listing_id?: number;
  notes: string | null;
  created_at: string;
  listing: {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    room_type: string;
    gender_preference?: string;
    available_rooms?: number;
    available_beds?: number;
    average_rating: number | null;
    thumbnail_url: string | null;
    is_available?: boolean;
    is_verified?: boolean;
    amenities?: string[];
  };
}

interface FavoriteCardProps {
  favorite: Favorite;
  viewMode?: 'grid' | 'list';
  isSelected?: boolean;
  onSelect?: () => void;
  onRemove?: (favoriteId: number) => void;
  onUpdateNotes?: (favoriteId: number, notes: string) => void;
}

export function FavoriteCard({
  favorite,
  viewMode = 'list',
  isSelected = false,
  onSelect,
  onRemove,
  onUpdateNotes,
}: FavoriteCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(favorite.notes || '');
  const { token } = useAuthStore();
  const listingId = favorite.listing_id || favorite.listing.id;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = async () => {
    if (!token) return;

    setIsRemoving(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/listing/${listingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove favorite');
      }

      onRemove?.(favorite.id);
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      toast.error('Failed to remove favorite');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/${favorite.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      setIsEditingNotes(false);
      onUpdateNotes?.(favorite.id, notes);
      toast.success('Notes updated');
    } catch (error) {
      console.error('Failed to update notes:', error);
      toast.error('Failed to update notes');
    }
  };

  // Grid view layout
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
        {onSelect && (
          <div className="absolute top-2 left-2 z-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 rounded border-gray-300"
            />
          </div>
        )}
        
        {/* Image */}
        <div className="relative aspect-[4/3]">
          {favorite.listing.thumbnail_url ? (
            <Image
              src={favorite.listing.thumbnail_url}
              alt={favorite.listing.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {favorite.listing.is_available === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Currently Full</span>
            </div>
          )}
          {favorite.listing.is_verified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
              <FiCheckCircle className="w-3 h-3" /> Verified
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <Link
            href={`/listings/${favorite.listing.id}`}
            className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
          >
            {favorite.listing.title}
          </Link>
          
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <FiMapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{favorite.listing.city}</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="font-bold text-lg text-gray-900">
              {formatPrice(favorite.listing.monthly_rent)}
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </div>
            {favorite.listing.average_rating && (
              <div className="flex items-center gap-1 text-sm">
                <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{favorite.listing.average_rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {favorite.notes && (
            <p className="mt-2 text-sm text-gray-600 italic line-clamp-1">
              "{favorite.notes}"
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t">
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <FiEdit2 className="w-3 h-3" />
              Notes
            </button>
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto"
            >
              <FiTrash2 className="w-3 h-3" />
              {isRemoving ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>

        {/* Edit Notes Modal */}
        {isEditingNotes && (
          <div className="absolute inset-0 bg-white p-4 flex flex-col">
            <h4 className="font-medium mb-2">Edit Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add personal notes..."
              className="flex-1 w-full px-3 py-2 border rounded-md text-sm resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSaveNotes}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditingNotes(false);
                  setNotes(favorite.notes || '');
                }}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List view layout (default)

  // List view layout (default)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex">
        {/* Checkbox for selection */}
        {onSelect && (
          <div className="flex items-center px-3 border-r bg-gray-50">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 rounded border-gray-300"
            />
          </div>
        )}

        {/* Image */}
        <div className="relative w-32 sm:w-48 flex-shrink-0">
          {favorite.listing.thumbnail_url ? (
            <Image
              src={favorite.listing.thumbnail_url}
              alt={favorite.listing.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-3xl">🏠</span>
            </div>
          )}
          {favorite.listing.is_available === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium text-sm">Currently Full</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <Link
                href={`/listings/${favorite.listing.id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
              >
                {favorite.listing.title}
              </Link>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <FiMapPin className="w-4 h-4 mr-1" />
                <span>{favorite.listing.city}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-900">
                {formatPrice(favorite.listing.monthly_rent)}
              </div>
              <div className="text-sm text-gray-500">/month</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              {favorite.listing.room_type}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              {favorite.listing.gender_preference}
            </span>
            {favorite.listing.average_rating && (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">
                ⭐ {favorite.listing.average_rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Notes */}
          {isEditingNotes ? (
            <div className="mt-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add personal notes..."
                className="w-full px-3 py-2 border rounded-md text-sm resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingNotes(false);
                    setNotes(favorite.notes || '');
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            favorite.notes && (
              <p className="mt-3 text-sm text-gray-600 italic line-clamp-2">
                "{favorite.notes}"
              </p>
            )
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Link
              href={`/listings/${favorite.listing.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <FiEdit2 className="w-3 h-3" />
              {favorite.notes ? 'Edit Notes' : 'Add Notes'}
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <FiTrash2 className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
