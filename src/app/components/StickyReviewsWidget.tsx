"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import googleReviewsSnapshot from "@/data/google-reviews.json";

type ReviewsSnapshot = {
  rating?: number | null;
  user_ratings_total?: number | null;
  url?: string | null;
};

export default function StickyReviewsWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const storageKey = "sticky_reviews_widget_dismissed_v1";
  const snapshot = googleReviewsSnapshot as ReviewsSnapshot;
  const rating = (snapshot.rating ?? 0).toFixed(1);
  const total = (snapshot.user_ratings_total ?? 0).toLocaleString();

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(storageKey);
      if (dismissed === "true") {
        setIsVisible(false);
      }
    } catch {
      // Ignore storage errors and keep widget visible.
    }
  }, []);

  const dismissWidget = () => {
    setIsVisible(false);
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch {
      // Ignore storage errors; in-memory hide still works.
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 right-4 left-4 md:left-auto z-40">
      <div className="mx-auto md:mx-0 max-w-md rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-xl px-4 py-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => dismissWidget()}
            className="text-gray-400 hover:text-gray-700 text-3xl font-semibold leading-none cursor-pointer"
            aria-label="Dismiss reviews widget"
          >
            ×
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Google Reviews
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {rating} rating from {total} reviews
            </p>
          </div>
          <FaGoogle className="text-[#4285F4] shrink-0" aria-hidden="true" />
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm">
          <Link href="/about-us/reviews" className="text-green-700 font-semibold hover:underline">
            Read reviews
          </Link>
          {snapshot.url ? (
            <a
              href={snapshot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-semibold hover:underline"
            >
              View on Google
            </a>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
