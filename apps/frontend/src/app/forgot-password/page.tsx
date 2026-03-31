'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      setEmail('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Forgot Password?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold text-green-900 mb-2">Check Your Email</h2>
              <p className="text-green-700 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-green-600 mb-6">
                The link will expire in 1 hour. If you don't see the email, check your spam folder.
              </p>
              <Link href="/login" className="btn-primary w-full">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <p className="text-center text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
                  Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
