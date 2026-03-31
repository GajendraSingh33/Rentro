'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Media {
  id: number;
  url: string;
  thumbnail_url?: string;
  is_cover: boolean;
  display_order: number;
  media_type: string;
  original_filename: string;
}

interface ImageGalleryProps {
  media: Media[];
  listingId: number;
  onDelete?: (mediaId: number) => void;
  onSetCover?: (mediaId: number) => void;
  editable?: boolean;
}

export default function ImageGallery({
  media,
  listingId,
  onDelete,
  onSetCover,
  editable = false,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (mediaId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setDeleting(mediaId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/media/${mediaId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      toast.success('Image deleted successfully');
      if (onDelete) onDelete(mediaId);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  const handleSetCover = async (mediaId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/media/${mediaId}/set-cover`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ listingId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to set cover image');
      }

      toast.success('Cover image updated');
      if (onSetCover) onSetCover(mediaId);
    } catch (error: any) {
      toast.error(error.message || 'Failed to set cover image');
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-gray-500">No images uploaded yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={item.thumbnail_url || item.url}
              alt={item.original_filename}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedImage(item)}
            />

            {item.is_cover && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Cover
              </div>
            )}

            {editable && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!item.is_cover && (
                  <button
                    onClick={() => handleSetCover(item.id)}
                    className="bg-white text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-100"
                    title="Set as cover image"
                  >
                    Set Cover
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                  title="Delete image"
                >
                  {deleting === item.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.original_filename}
              className="max-w-full max-h-[90vh] object-contain"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {selectedImage.is_cover && (
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-2 rounded">
                Cover Image
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
