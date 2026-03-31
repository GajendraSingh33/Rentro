'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

export default function LocationStep() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<ListingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Address *
        </label>
        <textarea
          {...register('address')}
          rows={2}
          placeholder="House/Building number, Street name, Area"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input
            {...register('city')}
            type="text"
            placeholder="e.g., Bangalore"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <input
            {...register('state')}
            type="text"
            placeholder="e.g., Karnataka"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
          <input
            {...register('pincode')}
            type="text"
            maxLength={6}
            placeholder="e.g., 560001"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nearby Landmarks
        </label>
        <input
          {...register('nearby_landmarks')}
          type="text"
          placeholder="e.g., Near MG Road Metro, 2 min from Phoenix Mall"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          📍 Location will be verified and shown on map after approval. Please ensure the address is accurate.
        </p>
      </div>
    </div>
  );
}
