'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

export default function BasicDetailsStep() {
  const { register, formState: { errors } } = useFormContext<ListingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Listing Title *
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="e.g., Spacious PG near Metro Station"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Describe your PG in detail - location highlights, room features, included services..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Rent (₹) *
          </label>
          <input
            {...register('rent_amount', { valueAsNumber: true })}
            type="number"
            placeholder="e.g., 8000"
            min="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.rent_amount && (
            <p className="mt-1 text-sm text-red-600">{errors.rent_amount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Deposit (₹)
          </label>
          <input
            {...register('deposit_amount', { valueAsNumber: true })}
            type="number"
            placeholder="e.g., 16000"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.deposit_amount && (
            <p className="mt-1 text-sm text-red-600">{errors.deposit_amount.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
