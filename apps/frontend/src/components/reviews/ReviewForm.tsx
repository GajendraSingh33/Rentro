'use client';

import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  listingId: number;
  onSubmit?: (review: any) => void;
  onCancel?: () => void;
}

interface ReviewData {
  listing_id: number;
  rating: number;
  cleanliness_rating?: number;
  amenities_rating?: number;
  location_rating?: number;
  value_for_money_rating?: number;
  owner_response_rating?: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  stay_duration_months?: number;
  is_current_resident?: boolean;
}

export function ReviewForm({ listingId, onSubmit, onCancel }: ReviewFormProps) {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewData>({
    listing_id: listingId,
    rating: 0,
    content: '',
    pros: [],
    cons: [],
  });
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleRatingChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addPro = () => {
    if (newPro.trim()) {
      setFormData((prev) => ({
        ...prev,
        pros: [...(prev.pros || []), newPro.trim()],
      }));
      setNewPro('');
    }
  };

  const addCon = () => {
    if (newCon.trim()) {
      setFormData((prev) => ({
        ...prev,
        cons: [...(prev.cons || []), newCon.trim()],
      }));
      setNewCon('');
    }
  };

  const removePro = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pros: prev.pros?.filter((_, i) => i !== index),
    }));
  };

  const removeCon = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cons: prev.cons?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Please login to submit a review');
      return;
    }

    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (formData.content.length < 20) {
      toast.error('Review must be at least 20 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit review');
      }

      const review = await response.json();
      toast.success('Review submitted successfully!');
      onSubmit?.(review);
    } catch (error: any) {
      console.error('Failed to submit review:', error);
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>

      {/* Overall Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Rating *
        </label>
        <StarRating
          value={formData.rating}
          onChange={(val) => handleRatingChange('rating', val)}
        />
      </div>

      {/* Category Ratings */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Cleanliness</label>
          <StarRating
            value={formData.cleanliness_rating || 0}
            onChange={(val) => handleRatingChange('cleanliness_rating', val)}
            size="sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Amenities</label>
          <StarRating
            value={formData.amenities_rating || 0}
            onChange={(val) => handleRatingChange('amenities_rating', val)}
            size="sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Location</label>
          <StarRating
            value={formData.location_rating || 0}
            onChange={(val) => handleRatingChange('location_rating', val)}
            size="sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Value for Money</label>
          <StarRating
            value={formData.value_for_money_rating || 0}
            onChange={(val) => handleRatingChange('value_for_money_rating', val)}
            size="sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Owner Response</label>
          <StarRating
            value={formData.owner_response_rating || 0}
            onChange={(val) => handleRatingChange('owner_response_rating', val)}
            size="sm"
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Review Title
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Summarize your experience"
          maxLength={255}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Share your experience staying at this PG (minimum 20 characters)"
          rows={4}
          className="w-full px-3 py-2 border rounded-md resize-none"
        />
        <div className="text-xs text-gray-500 mt-1">
          {formData.content.length}/2000 characters
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-green-700 mb-2">
            Pros
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newPro}
              onChange={(e) => setNewPro(e.target.value)}
              placeholder="Add a pro"
              className="flex-1 px-3 py-1 border rounded-md text-sm"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())}
            />
            <button
              type="button"
              onClick={addPro}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1">
            {formData.pros?.map((pro, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-green-500">+</span>
                <span className="flex-1">{pro}</span>
                <button
                  type="button"
                  onClick={() => removePro(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block text-sm font-medium text-red-700 mb-2">
            Cons
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCon}
              onChange={(e) => setNewCon(e.target.value)}
              placeholder="Add a con"
              className="flex-1 px-3 py-1 border rounded-md text-sm"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())}
            />
            <button
              type="button"
              onClick={addCon}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1">
            {formData.cons?.map((con, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-red-500">-</span>
                <span className="flex-1">{con}</span>
                <button
                  type="button"
                  onClick={() => removeCon(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stay Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stay Duration (months)
          </label>
          <input
            type="number"
            min="1"
            value={formData.stay_duration_months || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                stay_duration_months: e.target.value
                  ? parseInt(e.target.value)
                  : undefined,
              }))
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_current_resident || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_current_resident: e.target.checked,
                }))
              }
              className="rounded"
            />
            <span className="text-sm text-gray-700">
              I am currently staying here
            </span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function StarRating({
  value,
  onChange,
  size = 'md',
}: {
  value: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}) {
  const [hoverValue, setHoverValue] = useState(0);
  const sizeClass = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8';

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <FiStar
            className={`${sizeClass} transition-colors ${
              star <= (hoverValue || value)
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default ReviewForm;
