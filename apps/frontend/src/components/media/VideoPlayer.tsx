'use client';

import React from 'react';

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  className?: string;
}

export default function VideoPlayer({
  url,
  thumbnail,
  className = '',
}: VideoPlayerProps) {
  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        controls
        poster={thumbnail}
        className="w-full h-full"
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
