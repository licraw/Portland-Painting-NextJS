// src/app/components/Banner.tsx

"use client";

import Image from "next/image";

interface BannerProps {
  imagePath: string;
  cta: string;
  description: string;
  ctaLink: string;
}

export default function Banner({
  imagePath,
  cta,
  description,
  ctaLink,
}: BannerProps) {
  return (
    <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[500px]">
      {/* Hero Image */}
      <Image
        src={imagePath}
        alt="Banner Image"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Text Content */}
      <div className="absolute bottom-6 left-0 right-0 text-left text-white px-6 sm:px-8 lg:px-0 lg:right-auto lg:bottom-24 lg:left-20">
        <p className="text-sm sm:text-base lg:text-xl mb-4 sm:mb-6 lg:mb-8 max-w-xs sm:max-w-md lg:max-w-lg">
          {description}
        </p>
        <a
          href={ctaLink}
          className="inline-block bg-white hover:bg-gray-300 text-black font-semibold py-2.5 px-4 sm:py-3 sm:px-5 lg:py-4 lg:px-6 rounded-full text-sm lg:text-lg transition"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
