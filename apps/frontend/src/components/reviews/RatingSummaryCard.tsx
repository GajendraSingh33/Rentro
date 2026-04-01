'use client';

import { FiStar } from 'react-icons/fi';

interface RatingSummary {
  average_rating: number | null;
  total_reviews: number;
  rating_distribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
  category_averages?: {
    cleanliness: number | null;
    amenities: number | null;
    location: number | null;
    value_for_money: number | null;
    owner_response: number | null;
  };
}

interface RatingSummaryCardProps {
  summary: RatingSummary;
}

export function RatingSummaryCard({ summary }: RatingSummaryCardProps) {
  const totalRatings = Object.values(summary.rating_distribution).reduce(
    (a, b) => a + b,
    0
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-5 h-5 ${
              star <= Math.round(rating)
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingPercentage = (count: number) => {
    if (totalRatings === 0) return 0;
    return (count / totalRatings) * 100;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Overall Rating */}
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">
            {summary.average_rating?.toFixed(1) || '-'}
          </div>
          {summary.average_rating && (
            <div className="mt-2">{renderStars(summary.average_rating)}</div>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {summary.total_reviews} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count =
              summary.rating_distribution[rating.toString() as '1' | '2' | '3' | '4' | '5'];
            const percentage = getRatingPercentage(count);
            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{rating}</span>
                <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Ratings */}
      {summary.category_averages && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Rating Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {summary.category_averages.cleanliness && (
              <CategoryRating
                label="Cleanliness"
                rating={summary.category_averages.cleanliness}
              />
            )}
            {summary.category_averages.amenities && (
              <CategoryRating
                label="Amenities"
                rating={summary.category_averages.amenities}
              />
            )}
            {summary.category_averages.location && (
              <CategoryRating
                label="Location"
                rating={summary.category_averages.location}
              />
            )}
            {summary.category_averages.value_for_money && (
              <CategoryRating
                label="Value for Money"
                rating={summary.category_averages.value_for_money}
              />
            )}
            {summary.category_averages.owner_response && (
              <CategoryRating
                label="Owner Response"
                rating={summary.category_averages.owner_response}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryRating({ label, rating }: { label: string; rating: number }) {
  return (
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(rating / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-900">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default RatingSummaryCard;
