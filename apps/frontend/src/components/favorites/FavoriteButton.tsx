'use client';

import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  listingId: number;
  initialFavorited?: boolean;
  onToggle?: (isFavorited: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export function FavoriteButton({
  listingId,
  initialFavorited = false,
  onToggle,
  size = 'md',
  variant = 'icon',
  className = '',
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuthStore();

  const sizeClasses = {
    sm: variant === 'icon' ? 'p-1.5' : 'px-3 py-1.5 text-sm',
    md: variant === 'icon' ? 'p-2' : 'px-4 py-2',
    lg: variant === 'icon' ? 'p-3' : 'px-6 py-3 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = async () => {
    if (!token || !user) {
      toast.error('Please login to save favorites');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle/${listingId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      const data = await response.json();
      setIsFavorited(data.is_favorite);
      onToggle?.(data.is_favorite);

      toast.success(
        data.is_favorite ? 'Added to favorites' : 'Removed from favorites'
      );
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          flex items-center gap-2 rounded-lg font-medium transition-all
          ${sizeClasses[size]}
          ${
            isFavorited
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      >
        <FiHeart
          className={`
            ${iconSizes[size]}
            ${isFavorited ? 'fill-current' : ''}
          `}
        />
        <span>{isFavorited ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        rounded-full transition-all
        ${sizeClasses[size]}
        ${
          isFavorited
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FiHeart
        className={`
          ${iconSizes[size]}
          ${isFavorited ? 'fill-current' : ''}
          ${isLoading ? 'animate-pulse' : ''}
        `}
      />
    </button>
  );
}

export default FavoriteButton;
