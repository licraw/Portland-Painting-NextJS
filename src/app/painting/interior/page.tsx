import CarouselGallery from "../../components/ImageGallery/CarouselGallery";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import imageFiles from "@/app/gallery/interior/galleryFiles";

export const metadata: Metadata = {
  title: "Interior Painting Services | Portland Painting & Restoration",
  description:
    "Transform your home with our professional interior painting services. We specialize in vibrant, lasting colors that elevate your living spaces. Contact us today to schedule a consultation.",
  keywords: [
    "interior painting",
    "painting services",
    "home makeover",
    "vibrant colors",
    "professional painters",
    "Portland Painting",
    "restoration",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/interior-painting",
  },
  openGraph: {
    title: "Interior Painting Services | Portland Painting & Restoration",
    description:
      "Transform your home with our professional interior painting services. We specialize in vibrant, lasting colors that elevate your living spaces.",
    url: "https://www.paintpdx.com/interior-painting",
    type: "website",
    images: "https://www.paintpdx.com/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Painting Services | Portland Painting & Restoration",
    description:
      "Transform your home with our professional interior painting services. We specialize in vibrant, lasting colors that elevate your living spaces.",
    images: "https://www.paintpdx.com/logo.png",
  },
};

export default function InteriorPaintingPage() {
  const imageSet1 = imageFiles.slice(0, 12);
  const imageSet2 = imageFiles.slice(12, 24);
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
            Interior Residential Painting
          </h1>
          <p className="pb-4 pt-4">
            Looking for top-quality interior painting services in Portland,
            Oregon? Look no further than Portland Painting and Restoration. With
            our team of skilled professionals and a commitment to excellence, we
            are your go-to choice for transforming the interior of your home or
            business.
          </p>
          <p className="pb-4 pt-4">
            At Portland Painting and Restoration, we understand that the
            interior of your property is a reflection of your style and
            personality. Whether you’re looking to refresh the walls with a new
            coat of paint or completely revamp the color scheme. In addition to our
            exceptional painting services, we also offer comprehensive carpentry
            services to enhance your interior further, ensuring that every
            detail of your space is crafted to perfection.
          </p>
        </div>
      </div>
      <CarouselGallery images={imageSet1} />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 light-green-bg">
        <h2 className="font-sans font-medium text-4xl lg:text-4xl leading-[1.2] text-center pb-8">
          Interior Painting Services
        </h2>
        <div className="max-w-4xl mx-auto pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Masking &amp; Protection</li>
              <li>Paint/Stain/Varnish</li>
              <li>Wallpaper Removal</li>
              <li>Complete Wall Preparation</li>
              <li>Drywall repairs</li>
            </ul>

            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Complete Wood Preparation</li>
              <li>Priming Walls/Wood</li>
              <li>Caulking</li>
              <li>Spackling</li>
              <li>Professional Product Application</li>
            </ul>

            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Paint/Stain/Varnish</li>
              <li>Spray, Brush &amp; Roll</li>
              <li>Multiple Color Applications</li>
              <li>Cabinets &amp; Doors</li>
              <li>High-end Mill pack finishing</li>
              <li>No and Low VOC Paints</li>
            </ul>
          </div>
        </div>
        <p className="pb-4 pt-4">
          Our interior painting process begins with thorough preparation to
          ensure a consistent finish. We start by carefully inspecting the
          surfaces, repairing any imperfections such as cracks or holes, and
          applying a high-quality primer. This step is vital as it creates a
          smooth and even base for the paint, resulting in a
          professional-looking result.
        </p>
        <p className="pb-12 pt-4">
          We offer a wide range of paint options, including low VOC and
          eco-friendly paints, to cater to your specific needs and preferences.
          Our skilled painters are experienced in working with different
          textures and finishes, from matte to glossy, to achieve the desired
          look and feel for your space.
        </p>
      </div>
      <CarouselGallery bgcolor="#e8f2ec" images={imageSet2} />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
        <p className="pt-4 pb-4">
          At Portland Painting and Restoration, we prioritize attention to
          detail and take pride in delivering precise and clean paintwork. Our
          professionals use advanced techniques and equipment to ensure seamless
          edges and even coverage, providing a polished and professional
          appearance to every room.
        </p>
        <p className="pt-4 pb-4">
          Customer satisfaction is our utmost priority. We work closely with you
          throughout the process, from the initial consultation to the final
          walk-through, to ensure that your expectations are not only met but
          exceeded. Our team is dedicated to providing exceptional service,
          clear communication, and completing the project in a timely manor.
        </p>
        <p className="pt-4 pb-4">
          In addition to interior painting, we offer a comprehensive range of
          services to transform your space fully. Whether you&rsquo;re looking to simply add fresh paint, modernize your trim, install LVP flooring, repaint or update your cabinets, our experienced professionals have the expertise to help. 
        </p>
        <p className="pt-4 pb-4">
          Don&rsquo;t settle for anything less than the best for your interior
          painting project. Contact Portland Painting and Restoration today for
          a consultation and let us show you why we are the preferred choice for
          interior painting services in Portland, Oregon. Transform your space
          with our expert craftsmanship and exceptional service.
        </p>
      </div>
    </>
  );
}
