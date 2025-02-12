"use client";

import Link from "next/link";
import { FiPhone } from "react-icons/fi";

type PencilBannerProps = {
  ctaAction: string;
};

export default function PencilBanner({ ctaAction }: PencilBannerProps) {
  return (
    <div className="bg-green-700 text-white py-2 px-4 text-sm font-medium">
      {/* Container with responsive horizontal padding */}
      <div className="flex items-center justify-between w-full mx-auto px-2 lg:px-16">
        {/* Left side: different text for mobile vs. desktop */}
        <div className="flex items-center gap-1">
          {/* Only visible on very small screens (mobile) */}
          <span className="block sm:hidden">FREE QUOTE</span>

          {/* Hidden on mobile, visible on larger screens */}
          <span className="hidden sm:block">
            To inquire please fill out a FREE quote request
          </span>

          {/* "HERE" link - displayed in both cases; you can conditionally hide this too if you want */}
          <Link
            href={ctaAction}
            className="underline hover:no-underline hover:text-blue-300 transition ml-1"
          >
            HERE
          </Link>
        </div>

        {/* Right side: Phone number */}
        <div>
          <a
            href="tel:5032367003"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FiPhone />
            {/* Underlined number, shorter "Call" text is replaced by icon */}
            <span className="underline hover:no-underline">(503) 236-7003</span>
          </a>
        </div>
      </div>
    </div>
  );
}
