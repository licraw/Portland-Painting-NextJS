import imageFiles from "./galleryFiles";
import MasonryGallery from "../../components/ImageGallery/MasonryGallery";
import Image from "next/image";
import Link from "next/link";

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
        <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
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
              Get a free estimate today
              <Link
                href="/estimate"
                className="underline hover:no-underline hover:text-gray-800 transition ml-1"
              >
                 here!
              </Link>
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
          <p className="pb-4 pt-4"> At Portland Painting and Restoration, we excel in both exterior painting and carpentry services to protect and beautify your property. Our professional painters deliver a consistent, durable finish that withstands the Pacific Northwest’s challenging weather. Simultaneously, our skilled carpenters address any structural issues, ensuring your exterior is not only visually stunning but also robust and secure. </p>
        </div>
      </div>
      <MasonryGallery images={imageFiles} />
    </>
  );
}
