"use client";

import Image from 'next/image';
import { useState } from 'react';

// Helper to generate the watermarked image URL
const getWatermarkedUrl = (url: string) => {
  return `/api/image-proxy?imageUrl=${encodeURIComponent(url)}`;
};

type Media = {
  url: string;
  alt: string;
};

type ProductGalleryProps = {
  media: Media[];
};

export default function ProductGallery({ media }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(media[0] || null);

  if (!activeImage) {
    return <div className="aspect-square w-full rounded-lg bg-secondary" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={getWatermarkedUrl(activeImage.url)}
          alt={activeImage.alt || 'Product image'}
          fill
          className="object-cover"
          unoptimized // Required if the image is processed by an external service or proxy
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {media.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`relative aspect-square w-full overflow-hidden rounded-md border-2 ${
              activeImage.url === image.url ? 'border-primary' : 'border-transparent'
            }`}
          >
            <Image
              src={getWatermarkedUrl(image.url)}
              alt={image.alt || `Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}
