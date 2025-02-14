import Image from "next/image";
import Review from "./Review";
import { Metadata } from "next";
import { reviews } from "./reviews";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Reviews | Portland Painting & Restoration",
  description:
    "Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service.",
  keywords: [
    "customer reviews",
    "testimonials",
    "Portland Painting & Restoration",
    "painting reviews",
    "restoration reviews",
    "quality painting",
    "professional painters",
    "customer satisfaction",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/reviews",
  },
  openGraph: {
    title: "Customer Reviews | Portland Painting & Restoration",
    description:
      "Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service.",
    url: "https://www.paintpdx.com/reviews",
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
    title: "Customer Reviews | Portland Painting & Restoration",
    description:
      "Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function ReviewsPage() {
  return (
    <div className="w-full">
      {/* Common Top Navigation and Intro */}
      <div className="w-full p-8 pl-6 lg:pl-20 lg:pr-20">
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
          className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2] pb-0"
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            lineHeight: "1.2",
          }}
        >
          Customer Reviews
        </h1>
      </div>

      {/* Introductory Paragraph – Full Width */}
      <div className="w-full bg-white p-8 pl-6 lg:pl-20 lg:pr-20 pt-0 pb-0">
        <p className="pt-0 pb-4 text-gray-700">
          See what our customers say about their experiences with Portland
          Painting and Restoration.
        </p>
      </div>

      {/* Reviews Display – Full Width */}
      <div className="w-full p-8 pl-6 lg:pl-20 lg:pr-20">
        <div className="max-w-5xl mx-auto">
          {/* Rating Display */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl font-extrabold text-green-900 mr-2">
              4.9
            </span>
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-6 w-6 text-yellow-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431 8.21 1.192-5.93 5.776 1.401 8.168L12 18.896l-7.349 3.858 1.401-8.168-5.93-5.776 8.21-1.192z" />
                </svg>
              ))}
            </div>
            <Image
              src="/googlereviews1.png"
              alt="Google Reviews"
              width={150}
              height={50}
              className="rounded-lg"
            />
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Review key={index} text={review.text} author={review.author} />
            ))}
          </div>

          <p className="text-center text-gray-700 mt-8">
            Have feedback?{" "}
            <a
              href="/contact"
              className="text-green-700 font-semibold hover:underline"
            >
              Contact us
            </a>{" "}
            to share your thoughts.
          </p>
        </div>
      </div>
    </div>
  );
}
