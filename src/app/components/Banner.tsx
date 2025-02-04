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
    <div className="relative w-full h-[400px] lg:h-[500px]">
      {/* Hero Image */}
      <Image
        src={imagePath}
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Text Content */}
      <div className="absolute bottom-8 left-2 text-left text-white px-4 lg:bottom-24 lg:left-20">
        <p className="text-base lg:text-xl mb-6 lg:mb-8 max-w-xs lg:max-w-lg">
          {description}
        </p>
        <a
          href={ctaLink}
          className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-5 lg:py-4 lg:px-6 rounded-full text-sm lg:text-lg transition"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
