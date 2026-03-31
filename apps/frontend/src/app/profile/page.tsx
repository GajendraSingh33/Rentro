'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { api } from '@/services/api';

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  useProtectedRoute(); // Protect this route

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    bio: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.phone_number || '',
        bio: user.bio || '',
      });
      if (user.avatar_url) {
        setImagePreview(user.avatar_url);
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = async () => {
    if (!profileImage) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', profileImage);

      const response = await api.post('/auth/upload/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Profile picture uploaded successfully');
      setProfileImage(null);
      // Update auth store with new user data
      useAuthStore.setState({ user: response.data });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

        {/* Profile Picture Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Picture</h2>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Image Preview */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                {imagePreview || user.avatar_url ? (
                  <Image
                    src={imagePreview || user.avatar_url || '/default-avatar.png'}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1">
              <label htmlFor="image-input" className="block">
                <button
                  type="button"
                  className="btn-secondary"
                >
                  Choose Image
                </button>
                <input
                  id="image-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG, or WebP. Max 5MB.
              </p>

              {profileImage && (
                <button
                  onClick={uploadProfilePicture}
                  disabled={isLoading}
                  className="btn-primary mt-4"
                >
                  {isLoading ? 'Uploading...' : 'Upload Photo'}
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}
        </div>

        {/* Profile Information Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="input-field"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                className="input-field bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone_number"
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                className="input-field"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* User Role (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {user.role === 'seeker' ? '🔍 PG Seeker' : '🏠 PG Owner'}
                </span>
              </div>
            </div>

            {/* Account Info */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Email Verified</p>
                  <p className="font-medium">
                    {user.email_verified ? '✓ Yes' : '✗ Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Account Status</p>
                  <p className="font-medium">
                    {user.is_active ? '✓ Active' : '✗ Inactive'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                {user.last_login_at && (
                  <div>
                    <p className="text-gray-500">Last Login</p>
                    <p className="font-medium">
                      {new Date(user.last_login_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn-ghost flex-1"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
