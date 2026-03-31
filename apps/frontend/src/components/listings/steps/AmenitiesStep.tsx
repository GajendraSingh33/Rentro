'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'fridge', label: 'Refrigerator', icon: '🧊' },
  { id: 'washing_machine', label: 'Washing Machine', icon: '🧺' },
  { id: 'geyser', label: 'Geyser/Hot Water', icon: '🚿' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'power_backup', label: 'Power Backup', icon: '🔋' },
  { id: 'security', label: '24/7 Security', icon: '🔒' },
  { id: 'cctv', label: 'CCTV', icon: '📹' },
  { id: 'lift', label: 'Lift', icon: '🛗' },
  { id: 'laundry', label: 'Laundry Service', icon: '👕' },
  { id: 'housekeeping', label: 'Housekeeping', icon: '🧹' },
];

const FOOD_TYPES = [
  { value: 'veg', label: 'Vegetarian Only' },
  { value: 'non_veg', label: 'Non-Vegetarian Only' },
  { value: 'both', label: 'Both Veg & Non-Veg' },
  { value: 'none', label: 'No Food Provided' },
];

export default function AmenitiesStep() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ListingFormData>();
  const amenities = watch('amenities') || [];
  const foodAvailable = watch('food_available');

  const toggleAmenity = (amenityId: string) => {
    const current = amenities || [];
    if (current.includes(amenityId)) {
      setValue('amenities', current.filter((a) => a !== amenityId));
    } else {
      setValue('amenities', [...current, amenityId]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Amenities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                amenities.includes(amenity.id)
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{amenity.icon}</span>
              <span className="text-sm">{amenity.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center gap-3 mb-4">
          <input
            {...register('food_available')}
            type="checkbox"
            id="food_available"
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="food_available" className="text-sm font-medium text-gray-700">
            Food/Meals Available
          </label>
        </div>

        {foodAvailable && (
          <div className="ml-8 space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
            {FOOD_TYPES.map((type) => (
              <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('food_type')}
                  type="radio"
                  value={type.value}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
