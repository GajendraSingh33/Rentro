'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiMapPin, FiFilter, FiX } from 'react-icons/fi';

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  showFilters?: boolean;
  className?: string;
}

interface AutocompleteSuggestion {
  type: 'city' | 'area' | 'listing' | 'landmark';
  value: string;
  display: string;
  metadata?: {
    city?: string;
    listing_id?: number;
    count?: number;
  };
}

export function SearchBar({
  onSearch,
  showFilters = true,
  className = '',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [location, setLocation] = useState(searchParams.get('city') || '');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (location.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search/autocomplete?query=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [location]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (location) params.set('city', location);

    if (onSearch) {
      onSearch(query, location);
    } else {
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleSuggestionClick = (suggestion: AutocompleteSuggestion) => {
    if (suggestion.type === 'listing' && suggestion.metadata?.listing_id) {
      router.push(`/listings/${suggestion.metadata.listing_id}`);
    } else {
      setLocation(suggestion.value);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 bg-white rounded-lg shadow-lg p-2 md:p-1">
        {/* Location Input */}
        <div className="relative flex-1" ref={suggestionsRef}>
          <div className="flex items-center px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <FiMapPin className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="City, area, or landmark"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
            {location && (
              <button
                onClick={() => setLocation('')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.value}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  {suggestion.type === 'city' && (
                    <FiMapPin className="w-4 h-4 text-blue-500" />
                  )}
                  {suggestion.type === 'listing' && (
                    <FiSearch className="w-4 h-4 text-green-500" />
                  )}
                  <div>
                    <div className="text-sm text-gray-700">{suggestion.display}</div>
                    <div className="text-xs text-gray-400 capitalize">
                      {suggestion.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Query Input */}
        <div className="flex items-center px-4 py-3 md:py-2 flex-1">
          <FiSearch className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search PG name, amenities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:py-2 rounded-lg md:rounded-l-none font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
