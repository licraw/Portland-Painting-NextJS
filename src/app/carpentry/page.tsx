import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import imageFiles from "@/app/carpentry/galleryFiles";
import CarouselGallery from "../components/ImageGallery/CarouselGallery";

export const metadata: Metadata = {
  title: "Carpentry Services | Portland Painting & Restoration",
  description:
    "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
  keywords: [
    "Carpentry",
    "carpentry services",
    "restoration",
    "painting",
    "expert craftsmanship",
    "Portland",
    "home improvement",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/carpentry",
  },
  openGraph: {
    title: "Carpentry Services | Portland Painting & Restoration",
    description:
      "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
    url: "https://www.paintpdx.com/carpentry",
    type: "website",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting & Restoration Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carpentry Services | Portland Painting & Restoration",
    description:
      "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function CarpentryPage() {
  const imageSet1 = imageFiles.slice(0, 8);
  const imageSet2 = imageFiles.slice(8, 16);
  return (
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
        <h1 className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2]">
          Carpentry Services
        </h1>
        <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Custom Woodworking</li>
              <li>Wood Rot Restoration</li>
              <li>Siding Installation &amp; Repair</li>
              <li>Deck Construction, Re-decking, Repair</li>
            </ul>
            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Porch Restoration / Resurfacing</li>
              <li>Wood or LVP Flooring Installation &amp; Repair</li>
              <li>Shelves Installation</li>
              <li>Door &amp; Window Installation/Repair</li>
            </ul>
            <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <li>Staircase &amp; Railing Construction/Repair</li>
              <li>Adding Flashing (Windows/Doors/Butt Joints)</li>
              <li>Outdoor Structures: Pergolas, Benches, Arbors</li>
            </ul>
          </div>
        </div>

        <p className="pt-4 pb-4">
          There are many painting companies in the Portland area, but not all of
          them offer a full range of carpentry services too. What’s the point of
          applying a fresh coat of paint over low-grade craftsmanship or rotten
          wood?
        </p>
        <p className="pt-4 pb-8">
          Some carpenters don’t want to do smaller projects because they are
          holding out for bigger ones. This can be really frustrating for the
          homeowner trying to get the job done. A long time ago we came to the
          conclusion that it would be more convenient and beneficial to our
          customers to provide top-notch carpentry services as part of a
          comprehensive restoration strategy.
        </p>
      </div>
      <CarouselGallery images={imageSet1} bgcolor="white" />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 pt-0">
        {" "}
        <p className="pt-4 pb-4">
          This keeps you from being blindsided by unexpected repairs or
          renovations that may pop up over the course of your painting project.
          Small fixes like these can halt work for weeks while you scramble to
          find a carpenter to fix them. This won’t happen with Portland Painting
          and Restoration’s team of carpenters who have the experience to take
          care of any difficulties as they arise, so your project does not stop!
        </p>
      </div>
      <div className="pt-12 light-green-bg">
        <CarouselGallery images={imageSet2} bgcolor="#e8f2ec" />
      </div>
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 light-green-bg pt-0">
        <p className="pt-0 pb-4">
          Below are some carpentry services we offer, but not nearly all.
          Inquire with a free estimate to find out how we can better assist you
          with your carpentry needs!
        </p>
        <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Interior Column */}
              <div className="w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
                <h2 className="font-sans font-medium text-2xl pb-4">
                  Interior
                </h2>
                <ul className="list-disc list-inside text-left space-y-2">
                  <li>Baseboard Installation</li>
                  <li>Built-In Shelving</li>
                  <li>Crown Molding Installation</li>
                  <li>Custom Cabinets</li>
                  <li>Door and Window Trim Installation</li>
                  <li>Wainscot Paneling</li>
                </ul>
              </div>
              {/* Exterior Column */}
              <div className="w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
                <h2 className="font-sans font-medium text-2xl pb-4">
                  Exterior
                </h2>
                <ul className="list-disc list-inside text-left space-y-2">
                  <li>Front porch repairs/rebuilds</li>
                  <li>Door and Window Installation</li>
                  <li>Dry Rot Repair</li>
                  <li>Siding/Shingle Replacement</li>
                  <li>Stair/Railing Repair and Rebuild</li>
                  <li>Trim Installation and Flashing Details</li>
                  <li>General Repairs</li>
                  <li>Garbage Surrounds</li>
                  <li>Historic Front Door Rehabilitation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
