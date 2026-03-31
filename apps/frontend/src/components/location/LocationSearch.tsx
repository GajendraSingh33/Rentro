'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

interface LocationSearchProps {
  onSelect: (location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    lat?: number;
    lng?: number;
  }) => void;
  initialValue?: string;
}

export default function LocationSearch({ onSelect, initialValue = '' }: LocationSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['location-autocomplete', query],
    queryFn: () => api.get('/location/autocomplete', { params: { input: query } }).then((r) => r.data),
    enabled: query.length >= 3,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (suggestion: { description: string; place_id: string }) => {
    setQuery(suggestion.description);
    setIsOpen(false);
    
    // Get full location details
    try {
      const response = await api.post('/location/geocode', { address: suggestion.description });
      if (response.data) {
        onSelect({
          address: response.data.formatted_address,
          city: response.data.city || '',
          state: response.data.state || '',
          pincode: response.data.postal_code || '',
          lat: response.data.lat,
          lng: response.data.lng,
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for address..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && query.length >= 3 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : suggestions?.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            suggestions?.map((suggestion: { description: string; place_id: string }) => (
              <button
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0"
              >
                <span className="text-gray-900">{suggestion.description}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
