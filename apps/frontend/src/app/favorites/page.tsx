'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiHeart, FiTrash2, FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { FavoriteCard } from '@/components/favorites';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface Favorite {
  id: number;
  notes: string | null;
  created_at: string;
  listing: {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    room_type: string;
    average_rating: number | null;
    thumbnail_url: string | null;
    available_beds: number;
    is_verified: boolean;
    amenities: string[];
  };
}

type SortOption = 'recent' | 'price_low' | 'price_high' | 'rating';

export default function FavoritesPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login?redirect=/favorites');
      return;
    }
    fetchFavorites();
  }, [token, router]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch favorites');
      
      const data = await response.json();
      setFavorites(data.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/${favoriteId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!response.ok) throw new Error('Failed to remove');
      
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    setIsDeleting(true);
    try {
      const promises = Array.from(selectedIds).map((id) =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      
      await Promise.all(promises);
      
      setFavorites((prev) =>
        prev.filter((f) => !selectedIds.has(f.id))
      );
      setSelectedIds(new Set());
      toast.success(`Removed ${selectedIds.size} items`);
    } catch (error) {
      console.error('Failed to bulk delete:', error);
      toast.error('Failed to remove some items');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateNotes = async (favoriteId: number, notes: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/${favoriteId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes }),
        }
      );
      
      if (!response.ok) throw new Error('Failed to update');
      
      setFavorites((prev) =>
        prev.map((f) =>
          f.id === favoriteId ? { ...f, notes } : f
        )
      );
      toast.success('Notes updated');
    } catch (error) {
      console.error('Failed to update notes:', error);
      toast.error('Failed to update notes');
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredFavorites.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFavorites.map((f) => f.id)));
    }
  };

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter((f) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        f.listing.title.toLowerCase().includes(q) ||
        f.listing.city.toLowerCase().includes(q) ||
        f.listing.address.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.listing.monthly_rent - b.listing.monthly_rent;
        case 'price_high':
          return b.listing.monthly_rent - a.listing.monthly_rent;
        case 'rating':
          return (b.listing.average_rating || 0) - (a.listing.average_rating || 0);
        case 'recent':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiHeart className="w-6 h-6 text-red-500" />
            My Favorites
          </h1>
          <p className="text-gray-600 mt-1">
            {favorites.length} saved {favorites.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring PGs and save your favorites for easy comparison.
            </p>
            <button
              onClick={() => router.push('/search')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse PGs
            </button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredFavorites.length && filteredFavorites.length > 0}
                    onChange={selectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    Select all ({filteredFavorites.length})
                  </span>
                </label>

                {selectedIds.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span className="text-sm">
                      {isDeleting ? 'Removing...' : `Remove ${selectedIds.size} selected`}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Favorites Grid/List */}
            {filteredFavorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">
                  No favorites match your search "{searchQuery}"
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                    : 'space-y-4'
                }
              >
                {filteredFavorites.map((favorite) => (
                  <FavoriteCard
                    key={favorite.id}
                    favorite={favorite}
                    viewMode={viewMode}
                    isSelected={selectedIds.has(favorite.id)}
                    onSelect={() => toggleSelect(favorite.id)}
                    onRemove={() => handleRemoveFavorite(favorite.id)}
                    onUpdateNotes={(notes) => handleUpdateNotes(favorite.id, notes)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
