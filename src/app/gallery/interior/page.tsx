import Image from 'next/image';
import imageFiles from './galleryFiles';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

export const metadata = {
  title: "Interior Gallery | Portland Painting & Restoration",
  description:
    "Explore our collection of stunning interior painting projects. From vibrant living spaces to soothing bedrooms, our work showcases our dedication to quality and craftsmanship.",
  keywords: [
    "interior gallery",
    "interior painting",
    "painting projects",
    "interior design",
    "home improvement",
    "quality painting",
    "Portland Painting",
    "restoration",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/interior-gallery",
  },
  openGraph: {
    title: "Interior Gallery | Portland Painting & Restoration",
    description:
      "Explore our collection of stunning interior painting projects. From vibrant living spaces to soothing bedrooms, our work showcases our dedication to quality and craftsmanship.",
    url: "https://www.paintpdx.com/interior-gallery",
    type: "website",
    images: "https://www.paintpdx.com/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Gallery | Portland Painting & Restoration",
    description:
      "Explore our collection of stunning interior painting projects. From vibrant living spaces to soothing bedrooms, our work showcases our dedication to quality and craftsmanship.",
    images: "https://www.paintpdx.com/logo.png",
  },
};


export default async function InteriorGalleryPage() {

  return (
    <>
      {/* <div className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Interior Gallery</h1>
        <p className="text-gray-700 mb-6">
          Explore our collection of stunning interior painting projects. From
          vibrant living spaces to soothing bedrooms, our work showcases our
          dedication to quality and craftsmanship.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> */}
        <ImageGallery images={imageFiles} />
        {/* </div>
      </div> */}
    </>
  );
}
