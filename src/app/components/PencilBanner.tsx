"use client";

import Link from "next/link";

type PencilBannerProps = {
  ctaText: string;
  ctaAction: string;
  description: string;
};

export default function PencilBanner({
  ctaText,
  ctaAction,
  description,
}: PencilBannerProps) {
  return (
    <div className="bg-green-700 text-white py-2 px-4 text-sm font-medium">
      <div className="flex justify-center items-center gap-2 max-w-screen-xl mx-auto">
        <span className="truncate">{description}</span>
        <Link
          href={ctaAction}
          className="underline hover:no-underline hover:text-blue-300 transition"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
