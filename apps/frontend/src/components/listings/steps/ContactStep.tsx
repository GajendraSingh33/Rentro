'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

export default function ContactStep() {
  const { register, formState: { errors } } = useFormContext<ListingFormData>();

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-yellow-800">
          🔒 Your contact information will be masked from seekers until they send an inquiry.
          This protects your privacy while still allowing genuine inquiries.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Person Name *
        </label>
        <input
          {...register('contact_name')}
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.contact_name && (
          <p className="mt-1 text-sm text-red-600">{errors.contact_name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            {...register('contact_phone')}
            type="tel"
            placeholder="10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contact_phone && (
            <p className="mt-1 text-sm text-red-600">{errors.contact_phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp Number (optional)
          </label>
          <input
            {...register('whatsapp_number')}
            type="tel"
            placeholder="WhatsApp number if different"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          {...register('contact_email')}
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.contact_email && (
          <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
        )}
      </div>
    </div>
  );
}
