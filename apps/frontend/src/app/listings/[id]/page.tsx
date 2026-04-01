'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiMapPin,
  FiStar,
  FiUsers,
  FiCalendar,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiWifi,
  FiHome,
  FiCoffee,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
} from 'react-icons/fi';
import { FavoriteButton } from '@/components/favorites';
import { ReviewCard, RatingSummaryCard, ReviewForm } from '@/components/reviews';
import { SearchResultCard, type SearchListing } from '@/components/search';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface ListingDetail {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  monthly_rent: number;
  security_deposit: number;
  room_type: string;
  sharing_capacity: number;
  gender_preference: string;
  food_type: string;
  amenities: string[];
  total_rooms: number;
  available_rooms: number;
  total_beds: number;
  available_beds: number;
  average_rating: number | null;
  review_count: number;
  view_count: number;
  is_verified: boolean;
  is_featured: boolean;
  wifi_included: boolean;
  electricity_included: boolean;
  water_included: boolean;
  breakfast_included: boolean;
  lunch_included: boolean;
  dinner_included: boolean;
  food_cost_per_month: number | null;
  house_rules: string;
  gate_closing_time: string;
  visitors_allowed: boolean;
  smoking_allowed: boolean;
  pets_allowed: boolean;
  available_from: string;
  created_at: string;
  owner: {
    id: number;
    first_name: string;
    last_name: string;
  };
  media: Array<{
    id: number;
    url: string;
    type: string;
    is_thumbnail: boolean;
  }>;
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

const FOOD_LABELS: Record<string, string> = {
  veg: 'Vegetarian',
  non_veg: 'Non-Vegetarian',
  both: 'Veg & Non-Veg',
  none: 'No Food Provided',
};

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { token, user } = useAuthStore();
  const listingId = Number(params.id);

  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingSummary, setRatingSummary] = useState<any>(null);
  const [similarListings, setSimilarListings] = useState<SearchListing[]>([]);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSendingInquiry, setIsSendingInquiry] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (listingId) {
      fetchListing();
      fetchReviews();
      fetchSimilarListings();
      if (token) checkFavoriteStatus();
    }
  }, [listingId, token]);

  const fetchListing = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/${listingId}`
      );
      if (!response.ok) throw new Error('Listing not found');
      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.error('Failed to fetch listing:', error);
      toast.error('Failed to load listing');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/listing/${listingId}`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/listing/${listingId}/summary`),
      ]);
      
      if (reviewsRes.ok) {
        const data = await reviewsRes.json();
        setReviews(data.data);
      }
      
      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setRatingSummary(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const fetchSimilarListings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/similar/${listingId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSimilarListings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch similar listings:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/check/${listingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.is_favorite);
      }
    } catch (error) {
      console.error('Failed to check favorite status:', error);
    }
  };

  const handleSendInquiry = async () => {
    if (!token) {
      router.push(`/login?redirect=/listings/${listingId}`);
      return;
    }

    if (!inquiryMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsSendingInquiry(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiries`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listing_id: listingId,
            message: inquiryMessage,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send inquiry');
      }

      toast.success('Inquiry sent successfully!');
      setShowInquiryForm(false);
      setInquiryMessage('');
    } catch (error: any) {
      console.error('Failed to send inquiry:', error);
      toast.error(error.message || 'Failed to send inquiry');
    } finally {
      setIsSendingInquiry(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const images = listing?.media?.filter((m) => m.type === 'image') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
        <Link href="/search" className="text-blue-600 hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {images.length > 0 ? (
              <Image
                src={images[currentImageIndex]?.url}
                alt={listing.title}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
                <span className="text-6xl">🏠</span>
              </div>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((i) =>
                      i === 0 ? images.length - 1 : i - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((i) =>
                      i === images.length - 1 ? 0 : i + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-20 h-14 flex-shrink-0 rounded overflow-hidden ${
                    i === currentImageIndex
                      ? 'ring-2 ring-blue-500'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FiMapPin className="w-4 h-4" />
                    <span>{listing.address}, {listing.city}, {listing.state}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <FavoriteButton
                    listingId={listing.id}
                    initialFavorited={isFavorited}
                    onToggle={(val) => setIsFavorited(val)}
                  />
                  <button
                    onClick={() => {
                      navigator.share?.({
                        title: listing.title,
                        url: window.location.href,
                      });
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {listing.is_verified && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FiCheckCircle className="w-4 h-4" /> Verified
                  </span>
                )}
                {listing.is_featured && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {ROOM_TYPE_LABELS[listing.room_type]}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {GENDER_LABELS[listing.gender_preference]}
                </span>
              </div>

              {/* Rating */}
              {listing.average_rating && (
                <div className="flex items-center gap-2 mt-4">
                  <FiStar className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{listing.average_rating.toFixed(1)}</span>
                  <span className="text-gray-500">
                    ({listing.review_count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">About this PG</h2>
              <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Room Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Room Type</div>
                  <div className="font-medium">{ROOM_TYPE_LABELS[listing.room_type]}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Sharing</div>
                  <div className="font-medium">{listing.sharing_capacity} persons</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Rooms</div>
                  <div className="font-medium">{listing.total_rooms}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Available</div>
                  <div className={`font-medium ${
                    listing.available_beds > 0 ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {listing.available_beds} beds
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {listing.amenities?.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <FiCheckCircle className="w-4 h-4 text-green-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Food Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Food</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Food Type</span>
                  <span className="font-medium">{FOOD_LABELS[listing.food_type]}</span>
                </div>
                {listing.food_type !== 'none' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Breakfast</span>
                      <span>{listing.breakfast_included ? '✓ Included' : '✗ Not included'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Lunch</span>
                      <span>{listing.lunch_included ? '✓ Included' : '✗ Not included'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dinner</span>
                      <span>{listing.dinner_included ? '✓ Included' : '✗ Not included'}</span>
                    </div>
                    {listing.food_cost_per_month && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Food Cost</span>
                        <span className="font-medium">
                          {formatPrice(listing.food_cost_per_month)}/month
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* House Rules */}
            {listing.house_rules && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">House Rules</h2>
                <p className="text-gray-700 whitespace-pre-line mb-4">
                  {listing.house_rules}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={listing.visitors_allowed ? 'text-green-600' : 'text-red-500'}>
                      {listing.visitors_allowed ? '✓' : '✗'}
                    </span>
                    Visitors allowed
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={listing.smoking_allowed ? 'text-green-600' : 'text-red-500'}>
                      {listing.smoking_allowed ? '✓' : '✗'}
                    </span>
                    Smoking allowed
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={listing.pets_allowed ? 'text-green-600' : 'text-red-500'}>
                      {listing.pets_allowed ? '✓' : '✗'}
                    </span>
                    Pets allowed
                  </div>
                  {listing.gate_closing_time && (
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      Gate closes at {listing.gate_closing_time}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Reviews</h2>
                {token && user?.role === 'SEEKER' && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <div className="mb-6">
                  <ReviewForm
                    listingId={listing.id}
                    onSubmit={(review) => {
                      setShowReviewForm(false);
                      fetchReviews();
                    }}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}

              {ratingSummary && ratingSummary.total_reviews > 0 && (
                <RatingSummaryCard summary={ratingSummary} />
              )}

              <div className="mt-6 space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isOwner={listing.owner?.id === user?.id}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(listing.monthly_rent)}
                  <span className="text-base font-normal text-gray-500">/month</span>
                </div>
                {listing.security_deposit && (
                  <div className="text-sm text-gray-600 mt-1">
                    Security Deposit: {formatPrice(listing.security_deposit)}
                  </div>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={listing.wifi_included ? 'text-green-600' : 'text-gray-400'}>
                      {listing.wifi_included ? '✓' : '✗'}
                    </span>
                    WiFi {listing.wifi_included ? 'included' : 'not included'}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={listing.electricity_included ? 'text-green-600' : 'text-gray-400'}>
                      {listing.electricity_included ? '✓' : '✗'}
                    </span>
                    Electricity {listing.electricity_included ? 'included' : 'extra'}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={listing.water_included ? 'text-green-600' : 'text-gray-400'}>
                      {listing.water_included ? '✓' : '✗'}
                    </span>
                    Water {listing.water_included ? 'included' : 'extra'}
                  </div>
                </div>

                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Inquiry
                </button>
              </div>

              {/* Inquiry Form Modal */}
              {showInquiryForm && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Send Inquiry</h3>
                  <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Hi, I'm interested in this PG. I would like to know more about..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md resize-none"
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSendInquiry}
                      disabled={isSendingInquiry}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSendingInquiry ? 'Sending...' : 'Send'}
                    </button>
                    <button
                      onClick={() => setShowInquiryForm(false)}
                      className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Posted by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {listing.owner?.first_name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">
                      {listing.owner?.first_name} {listing.owner?.last_name}
                    </div>
                    <div className="text-sm text-gray-500">Property Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Similar PGs Nearby</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarListings.map((listing) => (
                <SearchResultCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
