import Banner from "./components/Banner";
import Image from "next/image";
import About from "./components/home/About";
import Services from "./components/home/Services";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration",
  description:
    "Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Transform your space with expert painting and restoration services.",
  keywords: [
    "painting",
    "restoration",
    "repair",
    "remodeling",
    "home improvement",
    "Portland Painting",
    "Vancouver",
    "finish contractors",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/",
  },
  openGraph: {
    title: "Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration",
    description:
      "Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Discover our expert painting and restoration services to transform your space.",
    url: "https://www.paintpdx.com/",
    type: "website",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting and Restoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration",
    description:
      "Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Discover our expert painting and restoration services.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function HomePage() {
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
            Transform Your Space with Painting and Restoration Experts
          </h1>
        </div>

        <Banner
          ctaLink="/estimate"
          imagePath="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
          cta="Get Estimate"
          description="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors."
        />

        <About />
        <Services />
      </div>
    </>
  );
}
