'use client';

import { useFormContext } from 'react-hook-form';
import { ImageUpload } from '@/components/media';
import type { ListingFormData } from '../ListingForm';

export default function MediaStep() {
  const { watch, setValue, formState: { errors } } = useFormContext<ListingFormData>();
  const images = watch('images') || [];
  const videos = watch('videos') || [];

  const handleImagesChange = (urls: string[]) => {
    setValue('images', urls);
  };

  const handleVideosChange = (urls: string[]) => {
    setValue('videos', urls);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Property Photos * (minimum 1)
        </label>
        <ImageUpload
          images={images}
          onChange={handleImagesChange}
          maxImages={10}
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          Upload clear photos of rooms, bathroom, common areas, and building exterior.
          First image will be used as cover photo.
        </p>
      </div>

      <div className="border-t pt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Property Video (optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">Video upload coming soon</p>
          <p className="text-sm text-gray-400 mt-1">Max 2 minutes, MP4 format</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">📸 Photo Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use natural lighting when possible</li>
          <li>• Show the actual room that's available</li>
          <li>• Include photos of common areas and amenities</li>
          <li>• Make sure photos are clear and not blurry</li>
        </ul>
      </div>
    </div>
  );
}
