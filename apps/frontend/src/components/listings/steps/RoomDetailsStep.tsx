'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

const ROOM_TYPES = [
  { value: 'single', label: 'Single Room', description: 'Private room for one person' },
  { value: 'double', label: 'Double Sharing', description: '2 people per room' },
  { value: 'triple', label: 'Triple Sharing', description: '3 people per room' },
  { value: 'dormitory', label: 'Dormitory', description: '4+ people per room' },
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male Only' },
  { value: 'female', label: 'Female Only' },
  { value: 'any', label: 'Any Gender' },
];

export default function RoomDetailsStep() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<ListingFormData>();
  const selectedRoomType = watch('room_type');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Room Type *</label>
        <div className="grid grid-cols-2 gap-4">
          {ROOM_TYPES.map((type) => (
            <label
              key={type.value}
              className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRoomType === type.value
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                {...register('room_type')}
                type="radio"
                value={type.value}
                className="sr-only"
              />
              <span className="font-medium text-gray-900">{type.label}</span>
              <span className="text-sm text-gray-500">{type.description}</span>
            </label>
          ))}
        </div>
        {errors.room_type && (
          <p className="mt-1 text-sm text-red-600">{errors.room_type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Beds per Room
        </label>
        <select
          {...register('sharing_type', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>{num} {num === 1 ? 'bed' : 'beds'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Gender Preference *</label>
        <div className="flex gap-4">
          {GENDER_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                {...register('gender_preference')}
                type="radio"
                value={option.value}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
