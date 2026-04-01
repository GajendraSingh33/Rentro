'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiFilter, FiX, FiGrid, FiList, FiMapPin } from 'react-icons/fi';
import {
  SearchBar,
  FilterSidebar,
  SearchResultCard,
  type FilterState,
  type SearchListing,
} from '@/components/search';
import { useAuthStore } from '@/store/authStore';

interface SearchResponse {
  data: SearchListing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters_applied: Record<string, any>;
  facets?: any;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuthStore();

  const [results, setResults] = useState<SearchListing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const [filters, setFilters] = useState<FilterState>(() => {
    const params: FilterState = {};
    if (searchParams.get('min_rent'))
      params.min_rent = Number(searchParams.get('min_rent'));
    if (searchParams.get('max_rent'))
      params.max_rent = Number(searchParams.get('max_rent'));
    if (searchParams.get('room_type'))
      params.room_type = searchParams.get('room_type') || undefined;
    if (searchParams.get('gender_preference'))
      params.gender_preference = searchParams.get('gender_preference') || undefined;
    if (searchParams.get('food_type'))
      params.food_type = searchParams.get('food_type') || undefined;
    if (searchParams.get('amenities'))
      params.amenities = searchParams.get('amenities')?.split(',');
    if (searchParams.get('available_only'))
      params.available_only = searchParams.get('available_only') === 'true';
    if (searchParams.get('verified_only'))
      params.verified_only = searchParams.get('verified_only') === 'true';
    return params;
  });

  // Fetch user's favorites on mount
  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFavoriteIds(new Set(data.data.map((f: any) => f.listing_id)));
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  // Search listings
  useEffect(() => {
    fetchListings();
  }, [searchParams, filters, sortBy, currentPage]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      // Add search params
      if (searchParams.get('query'))
        params.set('query', searchParams.get('query')!);
      if (searchParams.get('city')) params.set('city', searchParams.get('city')!);

      // Add filters
      if (filters.min_rent) params.set('min_rent', filters.min_rent.toString());
      if (filters.max_rent) params.set('max_rent', filters.max_rent.toString());
      if (filters.room_type) params.set('room_type', filters.room_type);
      if (filters.gender_preference)
        params.set('gender_preference', filters.gender_preference);
      if (filters.food_type) params.set('food_type', filters.food_type);
      if (filters.amenities?.length)
        params.set('amenities', filters.amenities.join(','));
      if (filters.available_only) params.set('available_only', 'true');
      if (filters.verified_only) params.set('verified_only', 'true');
      if (filters.wifi_included) params.set('wifi_included', 'true');
      if (filters.visitors_allowed) params.set('visitors_allowed', 'true');

      // Add pagination and sorting
      params.set('page', currentPage.toString());
      params.set('limit', '20');
      params.set('sort_by', sortBy);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?${params.toString()}`
      );
      const data: SearchResponse = await response.json();

      setResults(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleToggleFavorite = async (listingId: number) => {
    if (!token) {
      router.push('/login?redirect=/search');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle/${listingId}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);
        if (data.is_favorite) {
          newSet.add(listingId);
        } else {
          newSet.delete(listingId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const activeFilterCount = Object.values(filters).filter((v) => {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar className="mb-4" />

          {/* Results Summary & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  <span className="font-medium">{total}</span> PGs found
                  {searchParams.get('city') && (
                    <span> in {searchParams.get('city')}</span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FiFilter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="rent_asc">Price: Low to High</option>
                <option value="rent_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
                <option value="popularity">Most Popular</option>
              </select>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-36">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Results Grid */}
          <main className="flex-1">
            {isLoading ? (
              // Loading Skeleton
              <div
                className={`grid gap-4 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              // No Results
              <div className="text-center py-12">
                <FiMapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No PGs found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search in a different location.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              // Results
              <>
                <div
                  className={`grid gap-4 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {results.map((listing) => (
                    <SearchResultCard
                      key={listing.id}
                      listing={listing}
                      isFavorited={favoriteIds.has(listing.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowMobileFilters(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
