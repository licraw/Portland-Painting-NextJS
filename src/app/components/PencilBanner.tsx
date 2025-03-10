"use client";

import Link from "next/link";
import { FiPhone } from "react-icons/fi";

type PencilBannerProps = {
  ctaAction: string;
};
declare function gtag(
  event: string,
  action: string,
  params: {
    send_to: string;
    value: number;
    currency: string;
    event_callback: () => void;
  }
): void;


export default function PencilBanner({ ctaAction }: PencilBannerProps) {
 
  
  const handleConversionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const callback = () => {
      window.location.href = "tel:5032367003";
    };
  
    gtag('event', 'conversion', {
      send_to: 'AW-1016197559/BVgECM6X7agaELfjx-QD',
      value: 1.0,
      currency: 'USD',
      event_callback: callback,
    });
    event.preventDefault();
    console.log("Conversion event sent");
  };
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
        <div onClick={handleConversionClick}>
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
