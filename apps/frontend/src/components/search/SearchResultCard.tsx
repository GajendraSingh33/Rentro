'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiMapPin, FiStar, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';

interface SearchResultCardProps {
  listing: SearchListing;
  isFavorited?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export interface SearchListing {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  monthly_rent: number;
  security_deposit: number;
  room_type: string;
  sharing_capacity: number;
  gender_preference: string;
  food_type: string;
  amenities: string[];
  available_rooms: number;
  available_beds: number;
  average_rating: number | null;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  thumbnail_url: string | null;
  owner_name: string;
  distance_km?: number;
}

const ROOM_TYPE_LABELS: Record<string, string> = {
  single: 'Single Room',
  double: 'Double Sharing',
  triple: 'Triple Sharing',
  dormitory: 'Dormitory',
};

const GENDER_LABELS: Record<string, string> = {
  male: 'Boys Only',
  female: 'Girls Only',
  any: 'Co-ed',
};

export function SearchResultCard({
  listing,
  isFavorited = false,
  onToggleFavorite,
}: SearchResultCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {listing.thumbnail_url && !imageError ? (
          <Image
            src={listing.thumbnail_url}
            alt={listing.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="text-4xl">🏠</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {listing.is_featured && (
            <span className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-medium">
              Featured
            </span>
          )}
          {listing.is_verified && (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
              <FiCheckCircle className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(listing.id);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isFavorited
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <FiHeart
              className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`}
            />
          </button>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-white/95 px-3 py-1 rounded-lg">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(listing.monthly_rent)}
          </span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
      </div>

      {/* Content Section */}
      <Link href={`/listings/${listing.id}`}>
        <div className="p-4">
          {/* Title & Location */}
          <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
            {listing.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <FiMapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">
              {listing.address}, {listing.city}
            </span>
          </div>

          {/* Rating & Reviews */}
          {listing.average_rating && (
            <div className="flex items-center gap-1 mb-2">
              <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-sm">
                {listing.average_rating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({listing.review_count} reviews)
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              {ROOM_TYPE_LABELS[listing.room_type] || listing.room_type}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              {GENDER_LABELS[listing.gender_preference] || listing.gender_preference}
            </span>
            {listing.sharing_capacity > 1 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <FiUsers className="w-3 h-3" /> {listing.sharing_capacity} sharing
              </span>
            )}
          </div>

          {/* Amenities Preview */}
          {listing.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded"
                >
                  {amenity}
                </span>
              ))}
              {listing.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{listing.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Availability */}
          <div className="flex items-center justify-between text-sm">
            <span
              className={`font-medium ${
                listing.available_beds > 0 || listing.available_rooms > 0
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {listing.available_beds > 0 || listing.available_rooms > 0
                ? `${listing.available_beds} beds available`
                : 'Currently full'}
            </span>
            {listing.distance_km && (
              <span className="text-gray-500">
                {listing.distance_km.toFixed(1)} km away
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SearchResultCard;
