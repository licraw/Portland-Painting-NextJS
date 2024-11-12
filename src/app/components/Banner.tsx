// src/app/components/Banner.tsx

"use client";

import Image from "next/image";

interface BannerProps {
  imagePath: string;
  cta: string;
  description: string;
  ctaLink: string;
}

export default function Banner({ imagePath, cta, description, ctaLink }: BannerProps) {
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <p className="text-lg lg:text-xl mb-4 max-w-lg">{description}</p>
        <a
          href={ctaLink}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full text-lg lg:text-xl transition"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
