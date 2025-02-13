import imageFiles from './galleryFiles';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Image from 'next/image';

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
        <div>
        <div className='p-8 pl-6 lg:pl-20 lg:pr-20'>
          <div className="flex items-center space-x-3 bg-gray-100 py-2 px-4 rounded-full max-w-fit mb-4">
            <div className="flex items-center justify-center w-8 h-6 bg-white rounded-full">
              <Image
                src="/gallery/leaf.svg"
                alt="Portland Painting and Restoration Logo"
                width={16}
                height={16}
              />
            </div>
            <p className="text-sm font-medium text-gray-600">
              Portland and Vancouver’s premier repair
            </p>
          </div>
          <h1
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              lineHeight: "1.2",
            }}
            className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2]"
          >
            Interior Painting Gallery
          </h1>
        </div>
      </div>
        <ImageGallery images={imageFiles} />
    </>
  );
}
