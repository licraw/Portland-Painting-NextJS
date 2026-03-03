import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import googleReviewsSnapshot from "@/data/google-reviews.json";

type SnapshotReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  time?: string;
};

type ReviewsSnapshot = {
  rating?: number | null;
  user_ratings_total?: number | null;
  url?: string | null;
  reviews?: SnapshotReview[];
};

type ReviewsWidgetProps = {
  title?: string;
  limit?: number;
  className?: string;
};

export default function ReviewsWidget({
  title = "What Homeowners Are Saying",
  limit = 3,
  className = "",
}: ReviewsWidgetProps) {
  const snapshot = googleReviewsSnapshot as ReviewsSnapshot;
  const allReviews = Array.isArray(snapshot.reviews) ? snapshot.reviews : [];
  const visibleReviews = [...allReviews]
    .sort((a, b) => {
      const aTime = a.time ? new Date(a.time).getTime() : 0;
      const bTime = b.time ? new Date(b.time).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);

  return (
    <section className={`p-8 pl-6 lg:pl-20 lg:pr-20 ${className}`.trim()}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="font-sans font-medium text-3xl lg:text-4xl leading-tight">
            {title}
          </h2>
          {snapshot.url ? (
            <a
              href={snapshot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              <FaGoogle className="text-[#4285F4]" aria-hidden="true" />
              View on Google
            </a>
          ) : null}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Google rating {(snapshot.rating ?? 0).toFixed(1)} from{" "}
          {(snapshot.user_ratings_total ?? 0).toLocaleString()} reviews
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {visibleReviews.map((review, index) => (
            <article
              key={`${review.author_name ?? "Google User"}-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-800 italic">
                &ldquo;
                {(review.text ?? "").length > 220
                  ? `${(review.text ?? "").slice(0, 220)}...`
                  : review.text}
                &rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-900">
                {review.author_name ?? "Google User"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(review.rating ?? 5)} / 5 on Google
              </p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/about-us/reviews"
            className="text-green-700 font-semibold hover:underline"
          >
            See all reviews and map details
          </Link>
        </div>
      </div>
    </section>
  );
}
