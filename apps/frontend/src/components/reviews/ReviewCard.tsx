'use client';

import { useState } from 'react';
import { FiStar, FiThumbsUp, FiFlag, FiMessageSquare } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: number;
  listing_id: number;
  rating: number;
  cleanliness_rating: number | null;
  amenities_rating: number | null;
  location_rating: number | null;
  value_for_money_rating: number | null;
  owner_response_rating: number | null;
  title: string | null;
  content: string;
  pros: string[];
  cons: string[];
  stay_duration_months: number | null;
  is_current_resident: boolean;
  is_verified: boolean;
  helpful_count: number;
  owner_response: string | null;
  owner_responded_at: Date | null;
  created_at: Date;
  reviewer: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
}

interface ReviewCardProps {
  review: Review;
  onMarkHelpful?: (reviewId: number) => void;
  onReport?: (reviewId: number) => void;
  isOwner?: boolean;
  onAddResponse?: (reviewId: number, response: string) => void;
}

export function ReviewCard({
  review,
  onMarkHelpful,
  onReport,
  isOwner = false,
  onAddResponse,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState('');

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${sizeClass} ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitResponse = () => {
    if (responseText.trim() && onAddResponse) {
      onAddResponse(review.id, responseText);
      setResponseText('');
      setShowResponseForm(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            {review.reviewer.avatar_url ? (
              <img
                src={review.reviewer.avatar_url}
                alt={review.reviewer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-blue-600 font-semibold">
                {review.reviewer.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {review.reviewer.name}
              </span>
              {review.is_verified && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                  Verified Stay
                </span>
              )}
              {review.is_current_resident && (
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  Current Resident
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              {review.stay_duration_months && (
                <span className="ml-2">
                  • Stayed {review.stay_duration_months} months
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderStars(review.rating, 'md')}
          <span className="font-semibold text-gray-900 ml-1">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      )}

      {/* Content */}
      <p
        className={`text-gray-700 ${
          !isExpanded && review.content.length > 300 ? 'line-clamp-3' : ''
        }`}
      >
        {review.content}
      </p>
      {review.content.length > 300 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm hover:underline mt-1"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Pros & Cons */}
      {(review.pros.length > 0 || review.cons.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-3">
          {review.pros.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-green-600 mb-1">Pros</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {review.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-green-500">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-red-600 mb-1">Cons</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {review.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-red-500">-</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Category Ratings */}
      {(review.cleanliness_rating ||
        review.amenities_rating ||
        review.location_rating ||
        review.value_for_money_rating) && (
        <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t">
          {review.cleanliness_rating && (
            <div className="text-sm">
              <span className="text-gray-500">Cleanliness:</span>{' '}
              {renderStars(review.cleanliness_rating)}
            </div>
          )}
          {review.amenities_rating && (
            <div className="text-sm">
              <span className="text-gray-500">Amenities:</span>{' '}
              {renderStars(review.amenities_rating)}
            </div>
          )}
          {review.location_rating && (
            <div className="text-sm">
              <span className="text-gray-500">Location:</span>{' '}
              {renderStars(review.location_rating)}
            </div>
          )}
          {review.value_for_money_rating && (
            <div className="text-sm">
              <span className="text-gray-500">Value:</span>{' '}
              {renderStars(review.value_for_money_rating)}
            </div>
          )}
        </div>
      )}

      {/* Owner Response */}
      {review.owner_response && (
        <div className="mt-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-900">Owner's Response</span>
            {review.owner_responded_at && (
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(review.owner_responded_at), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700">{review.owner_response}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t">
        <button
          onClick={() => onMarkHelpful?.(review.id)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
        >
          <FiThumbsUp className="w-4 h-4" />
          Helpful ({review.helpful_count})
        </button>
        <button
          onClick={() => onReport?.(review.id)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
        >
          <FiFlag className="w-4 h-4" />
          Report
        </button>
        {isOwner && !review.owner_response && (
          <button
            onClick={() => setShowResponseForm(true)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <FiMessageSquare className="w-4 h-4" />
            Respond
          </button>
        )}
      </div>

      {/* Response Form (for owners) */}
      {showResponseForm && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write your response..."
            className="w-full px-3 py-2 border rounded-md text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSubmitResponse}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Submit Response
            </button>
            <button
              onClick={() => {
                setShowResponseForm(false);
                setResponseText('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
