'use client';

import { useFormContext } from 'react-hook-form';
import type { ListingFormData } from '../ListingForm';

const AMENITY_LABELS: Record<string, string> = {
  wifi: 'WiFi',
  ac: 'AC',
  tv: 'TV',
  fridge: 'Fridge',
  washing_machine: 'Washing Machine',
  geyser: 'Hot Water',
  parking: 'Parking',
  gym: 'Gym',
  power_backup: 'Power Backup',
  security: '24/7 Security',
  cctv: 'CCTV',
  lift: 'Lift',
  laundry: 'Laundry',
  housekeeping: 'Housekeeping',
};

export default function PreviewStep() {
  const { watch } = useFormContext<ListingFormData>();
  const data = watch();

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-green-800">
          ✅ Review your listing before submitting. Once submitted, it will be reviewed by our team before going live.
        </p>
      </div>

      {/* Images Preview */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {data.images.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Preview ${i + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Basic Info */}
      <div className="border rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-900">{data.title || 'Untitled'}</h3>
        <p className="text-gray-500 mt-1">{data.address}, {data.city}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{data.rent_amount?.toLocaleString() || 0}/mo
          </span>
          {data.deposit_amount > 0 && (
            <span className="text-gray-500">
              Deposit: ₹{data.deposit_amount?.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Room Type</p>
          <p className="font-medium capitalize">{data.room_type}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Sharing</p>
          <p className="font-medium">{data.sharing_type} bed(s)</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium capitalize">{data.gender_preference}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Food</p>
          <p className="font-medium">{data.food_available ? 'Available' : 'Not Included'}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
        <p className="text-gray-600 whitespace-pre-wrap">{data.description}</p>
      </div>

      {/* Amenities */}
      {data.amenities?.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {data.amenities.map((a) => (
              <span key={a} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {AMENITY_LABELS[a] || a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Preview */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
        <div className="text-gray-600">
          <p>{data.contact_name}</p>
          <p>{data.contact_phone}</p>
          <p>{data.contact_email}</p>
        </div>
      </div>
    </div>
  );
}
