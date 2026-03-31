'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/health`,
        );
        if (response.ok) {
          setApiStatus('Connected ✓');
        } else {
          setApiStatus('Disconnected');
        }
      } catch (error) {
        setApiStatus('Connection failed');
      }
    };

    checkApi();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-fluid py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Rentro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect PG accommodation for your needs
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                For PG Seekers
              </h2>
              <p className="text-gray-600 mb-4">
                Search and discover amazing PG accommodations in your city
              </p>
              <button className="btn-primary w-full">Get Started</button>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-purple-600">
                For PG Owners
              </h2>
              <p className="text-gray-600 mb-4">
                List your PG property and reach potential tenants
              </p>
              <button className="btn-primary w-full">List Property</button>
            </div>
          </div>

          <div className="card mb-8">
            <h3 className="text-lg font-semibold mb-4">API Status</h3>
            <p className="text-lg">
              Backend API:{' '}
              <span
                className={`font-bold ${
                  apiStatus.includes('✓')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {apiStatus}
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">PG Listings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
