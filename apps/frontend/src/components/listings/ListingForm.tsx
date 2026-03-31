'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/services/api';

// Step Components
import BasicDetailsStep from './steps/BasicDetailsStep';
import LocationStep from './steps/LocationStep';
import RoomDetailsStep from './steps/RoomDetailsStep';
import AmenitiesStep from './steps/AmenitiesStep';
import MediaStep from './steps/MediaStep';
import ContactStep from './steps/ContactStep';
import PreviewStep from './steps/PreviewStep';

const listingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  rent_amount: z.number().min(1000, 'Rent must be at least ₹1000'),
  deposit_amount: z.number().min(0),
  address: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().length(6, 'Pincode must be 6 digits'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  room_type: z.enum(['single', 'double', 'triple', 'dormitory']),
  sharing_type: z.number().min(1).max(10),
  gender_preference: z.enum(['male', 'female', 'any']),
  food_available: z.boolean(),
  food_type: z.enum(['veg', 'non_veg', 'both', 'none']).optional(),
  amenities: z.array(z.string()),
  rules: z.array(z.string()).optional(),
  nearby_landmarks: z.string().optional(),
  contact_name: z.string().min(2),
  contact_phone: z.string().min(10),
  contact_email: z.string().email(),
  whatsapp_number: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one image required'),
  videos: z.array(z.string()).optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;

const STEPS = [
  { id: 'basic', title: 'Basic Details', component: BasicDetailsStep },
  { id: 'location', title: 'Location', component: LocationStep },
  { id: 'room', title: 'Room Details', component: RoomDetailsStep },
  { id: 'amenities', title: 'Amenities', component: AmenitiesStep },
  { id: 'media', title: 'Photos & Videos', component: MediaStep },
  { id: 'contact', title: 'Contact Info', component: ContactStep },
  { id: 'preview', title: 'Preview', component: PreviewStep },
];

interface ListingFormProps {
  initialData?: Partial<ListingFormData>;
  listingId?: number;
  onSuccess?: () => void;
}

export default function ListingForm({ initialData, listingId, onSuccess }: ListingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isEditing = !!listingId;

  const methods = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: initialData || {
      amenities: [],
      rules: [],
      images: [],
      videos: [],
      food_available: false,
      gender_preference: 'any',
      room_type: 'single',
      sharing_type: 1,
      deposit_amount: 0,
    },
    mode: 'onChange',
  });

  const createMutation = useMutation({
    mutationFn: (data: ListingFormData) => api.post('/listings', data),
    onSuccess: () => {
      toast.success('Listing created successfully!');
      onSuccess?.();
    },
    onError: () => toast.error('Failed to create listing'),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ListingFormData) => api.put(`/listings/${listingId}`, data),
    onSuccess: () => {
      toast.success('Listing updated successfully!');
      onSuccess?.();
    },
    onError: () => toast.error('Failed to update listing'),
  });

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await methods.trigger(fields as any);
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: ListingFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 text-center text-sm ${
                  index <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">{STEPS[currentStep].title}</h2>
            <CurrentStepComponent />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : isEditing ? 'Update Listing' : 'Submit for Approval'}
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function getStepFields(step: number): string[] {
  const fields: Record<number, string[]> = {
    0: ['title', 'description', 'rent_amount', 'deposit_amount'],
    1: ['address', 'city', 'state', 'pincode'],
    2: ['room_type', 'sharing_type', 'gender_preference'],
    3: ['amenities', 'food_available'],
    4: ['images'],
    5: ['contact_name', 'contact_phone', 'contact_email'],
    6: [],
  };
  return fields[step] || [];
}
