import Image from "next/image";
import Review from "./Review";
import { Metadata } from "next";
import { reviews } from "./reviews";
import Link from "next/link";
import googleReviewsSnapshot from "@/data/google-reviews.json";
import { FaGoogle } from "react-icons/fa";

type SnapshotReview = {
  author_name?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text: string;
  time?: string;
};

type ReviewsSnapshot = {
  place_id?: string | null;
  name?: string | null;
  url?: string | null;
  rating?: number | null;
  user_ratings_total?: number | null;
  reviews?: SnapshotReview[];
};

type DisplayReview = {
  text: string;
  author: string;
  rating: number;
  relativeTimeDescription?: string;
  profilePhotoUrl?: string;
  time?: string;
};

type ReviewsPageData = {
  rating: number;
  userRatingsTotal: number;
  url?: string;
  placeId?: string;
  placeName?: string;
  reviews: DisplayReview[];
} | null;

function getGoogleReviewsFromSnapshot(): ReviewsPageData {
  const snapshot = googleReviewsSnapshot as ReviewsSnapshot;
  const snapshotReviews = Array.isArray(snapshot.reviews) ? snapshot.reviews : [];
  const mappedReviews: DisplayReview[] = snapshotReviews.map((review) => ({
    text: review.text,
    author: review.author_name ?? "Google User",
    rating: review.rating ?? 5,
    relativeTimeDescription: review.relative_time_description,
    profilePhotoUrl: review.profile_photo_url,
    time: review.time,
  }));

  if (!mappedReviews.length) {
    return null;
  }

  return {
    rating: snapshot.rating ?? 0,
    userRatingsTotal: snapshot.user_ratings_total ?? 0,
    url: snapshot.url ?? undefined,
    placeId: snapshot.place_id ?? undefined,
    placeName: snapshot.name ?? undefined,
    reviews: mappedReviews,
  };
}

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
  const googleData = getGoogleReviewsFromSnapshot();
  const displayRating = googleData?.rating ?? 4.9;
  const ratingCount = googleData?.userRatingsTotal ?? reviews.length;

  const displayReviews: DisplayReview[] =
    googleData?.reviews?.length
      ? [...googleData.reviews]
          .sort((a, b) => {
            const aTime = a.time ? new Date(a.time).getTime() : 0;
            const bTime = b.time ? new Date(b.time).getTime() : 0;
            return bTime - aTime;
          })
          .slice(0, 5)
      : reviews.map((review) => ({
          text: review.text,
          author: review.author,
          rating: 5,
        }));

  const mapEmbedQuery =
    "Portland Painting and Restoration, 918 SE Stephens St, Portland, OR 97214";
  const mapEmbedUrl = mapEmbedQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapEmbedQuery)}&output=embed`
    : undefined;

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
            {googleData?.url ? (
              <a
                href={googleData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                <FaGoogle className="text-[#4285F4]" aria-hidden="true" />
                View on Google
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800">
                <FaGoogle className="text-[#4285F4]" aria-hidden="true" />
                Google Reviews
              </div>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mb-6">
            Google rating {displayRating.toFixed(1)} based on{" "}
            {ratingCount.toLocaleString()} reviews
          </p>
          <p className="text-center text-sm text-gray-500 mb-6">
            Showing latest 5 reviews
          </p>

          {/* Reviews List */}
          <div className="space-y-6">
            {displayReviews.map((review, index) => (
              <Review
                key={`${review.author}-${index}`}
                text={review.text}
                author={review.author}
                rating={review.rating}
                relativeTimeDescription={review.relativeTimeDescription}
                profilePhotoUrl={review.profilePhotoUrl}
              />
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
          {googleData?.url ? (
            <p className="text-center mt-4">
              <a
                href={googleData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-semibold hover:underline"
              >
                View all Google reviews
              </a>
            </p>
          ) : null}
          {mapEmbedUrl ? (
            <div className="mt-10">
              <h2 className="text-2xl font-medium text-center mb-4">
                Find Us On Google Maps
              </h2>
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="420"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Portland Painting and Restoration on Google Maps"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
