'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  listingId?: number;
  onUploadComplete?: (media: any) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  listingId,
  onUploadComplete,
  maxFiles = 10,
  maxSize = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!listingId) {
        toast.error('Please save the listing first before uploading images');
        return;
      }

      setUploading(true);

      try {
        // Upload files one by one
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('listingId', listingId.toString());

          // Simulate progress (you can use XMLHttpRequest for real progress)
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/media/upload-image`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
          }

          const media = await response.json();

          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));

          if (onUploadComplete) {
            onUploadComplete(media);
          }

          toast.success(`${file.name} uploaded successfully`);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to upload images');
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [listingId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    disabled: uploading,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mt-4">
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop images here...</p>
          ) : (
            <>
              <p className="text-gray-600">
                Drag & drop images here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, or WebP (max {maxSize}MB per file, up to {maxFiles}{' '}
                files)
              </p>
            </>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Uploading...</p>
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="truncate max-w-xs">{filename}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
