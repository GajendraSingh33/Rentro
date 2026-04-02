'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface PageContent {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

export default function PrivacyPage() {
  const router = useRouter();
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/content/slug/privacy-policy`);
        setContent(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load privacy policy');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Rentro
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {content?.title || 'Privacy Policy'}
          </h1>
          {content?.updated_at && (
            <p className="text-sm text-gray-500 mb-6">
              Last updated: {new Date(content.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <div
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: content?.content || '' }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <button onClick={() => router.push('/terms')} className="hover:text-blue-600">
              Terms & Conditions
            </button>
            <button onClick={() => router.push('/privacy')} className="hover:text-blue-600">
              Privacy Policy
            </button>
            <button onClick={() => router.push('/refund-policy')} className="hover:text-blue-600">
              Refund Policy
            </button>
            <button onClick={() => router.push('/contact')} className="hover:text-blue-600">
              Contact Us
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} Rentro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
