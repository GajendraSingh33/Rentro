'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';

interface VideoUploadProps {
  listingId?: number;
  onUploadComplete?: (media: any) => void;
  maxSize?: number; // in MB
}

export default function VideoUpload({
  listingId,
  onUploadComplete,
  maxSize = 100,
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!listingId) {
        toast.error('Please save the listing first before uploading videos');
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0]; // Only allow one video at a time
      setUploading(true);
      setCurrentFile(file.name);
      setUploadProgress(0);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('listingId', listingId.toString());

        // Use XMLHttpRequest for upload progress tracking
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentComplete);
          }
        });

        const response = await new Promise<any>((resolve, reject) => {
          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error('Upload failed'));
            }
          });

          xhr.addEventListener('error', () => reject(new Error('Upload failed')));

          xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/media/upload-video`);
          xhr.setRequestHeader(
            'Authorization',
            `Bearer ${localStorage.getItem('token')}`
          );
          xhr.send(formData);
        });

        if (onUploadComplete) {
          onUploadComplete(response);
        }

        toast.success('Video uploaded successfully');
      } catch (error: any) {
        toast.error(error.message || 'Failed to upload video');
      } finally {
        setUploading(false);
        setUploadProgress(0);
        setCurrentFile('');
      }
    },
    [listingId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/mpeg': ['.mpeg'],
      'video/quicktime': ['.mov'],
    },
    maxFiles: 1,
    maxSize: maxSize * 1024 * 1024,
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
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>

        <div className="mt-4">
          {isDragActive ? (
            <p className="text-purple-600 font-medium">Drop video here...</p>
          ) : (
            <>
              <p className="text-gray-600">
                Drag & drop a video here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">
                MP4, MPEG, or MOV (max {maxSize}MB)
              </p>
            </>
          )}
        </div>

        {uploading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Uploading {currentFile}...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <p>⚠️ Large videos may take several minutes to upload</p>
      </div>
    </div>
  );
}
