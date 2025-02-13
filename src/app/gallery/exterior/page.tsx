
import type { Metadata } from "next";
import Image from 'next/image';
import imageFiles from './galleryFiles';

export const metadata: Metadata = {
  title: "Exterior Gallery | Portland Painting & Restoration",
  description:
    "Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings.",
  keywords: [
    "exterior gallery",
    "painting projects",
    "exterior painting",
    "portfolio",
    "home improvement",
    "Portland Painting",
    "restoration",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/exterior-gallery",
  },
  openGraph: {
    title: "Exterior Gallery | Portland Painting & Restoration",
    description:
      "Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings.",
    url: "https://www.paintpdx.com/exterior-gallery",
    type: "website",
    images: "https://www.paintpdx.com/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exterior Gallery | Portland Painting & Restoration",
    description:
      "Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings.",
    images: "https://www.paintpdx.com/logo.png",
  },
};

export default async function ExteriorGalleryPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Exterior Gallery</h1>
        <p className="text-gray-700 mb-6">
          Discover our portfolio of exceptional exterior painting projects. From
          elegant facades to colorful accents, we take pride in enhancing the
          beauty of homes and buildings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageFiles.map((src, index) => (
            <div key={index} className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Exterior Project ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
