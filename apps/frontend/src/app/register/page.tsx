'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, UserRole } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error: authError } = useAuthStore();

  const [step, setStep] = useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain lowercase letters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letters';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain numbers';
    } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password must contain special characters (@$!%*?&)';
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // First name
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedRole) return;

    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: selectedRole,
        phone_number: formData.phoneNumber || undefined,
      });

      // Redirect based on role
      const redirectPath = selectedRole === UserRole.OWNER ? '/dashboard/owner' : '/dashboard/seeker';
      router.push(redirectPath);
    } catch (err) {
      // Error is already handled by the store
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {step === 'role' ? (
          // Role Selection Step
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Rentro</h1>
              <p className="text-gray-600">What are you looking for?</p>
            </div>

            <div className="space-y-4">
              {/* Seeker Card */}
              <button
                onClick={() => handleRoleSelect(UserRole.SEEKER)}
                className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition text-left card"
              >
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm Looking for a PG</h3>
                <p className="text-gray-600 text-sm">
                  Search and find the perfect PG accommodation for your needs
                </p>
              </button>

              {/* Owner Card */}
              <button
                onClick={() => handleRoleSelect(UserRole.OWNER)}
                className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition text-left card"
              >
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a PG Owner</h3>
                <p className="text-gray-600 text-sm">
                  List your PG property and reach potential tenants
                </p>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        ) : (
          // Registration Form Step
          <div>
            <button
              onClick={() => setStep('role')}
              className="flex items-center text-primary hover:text-primary-dark mb-6"
            >
              ← Back
            </button>

            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedRole === UserRole.SEEKER ? 'I\'m a PG Seeker' : 'I\'m a PG Owner'}
              </h2>
              <p className="text-gray-600 mb-6">Create your account</p>

              {authError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{authError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  <p className="mt-2 text-xs text-gray-500">
                    Must contain uppercase, lowercase, number, and special character
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-primary-dark">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:text-primary-dark">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full mt-6"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
