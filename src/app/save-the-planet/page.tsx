import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SavePlanetSection from "./SavePlantetSection";

export const metadata: Metadata = {
  title: "PPR Helping Save Your home, the planet, and Your Budget - Portland Painting and Restoration",
  description:
    "Global warming may seem like an overwhelmingly complex problem to handle but painting your house white is a step in the right direction. So we’ve gone ahead and put together some reasons to paint your house white, some of which might just surprise you!",
  alternates: {
    canonical: "https://paintpdx.com/save-the-planet/",
  },
  openGraph: {
    title: "PPR Helping Save Your home, the planet, and Your Budget - Portland Painting and Restoration",
    description:
      "Global warming may seem like an overwhelmingly complex problem to handle but painting your house white is a step in the right direction. So we’ve gone ahead and put together some reasons to paint your house white, some of which might just surprise you!",
    url: "https://paintpdx.com/save-the-planet/",
    siteName: "Portland Painting and Restoration",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPR Helping Save Your home, the planet, and Your Budget - Portland Painting and Restoration",
    description:
      "Global warming may seem like an overwhelmingly complex problem to handle but painting your house white is a step in the right direction.",
  },
};

export default function SaveThePlanetPage() {
  return (
    <div className="w-full">
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
          className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2]"
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            lineHeight: "1.2",
          }}
        >
          PPR Helping Save Your home, the planet, and Your Budget
        </h1>
      </div>

      <div className="w-full bg-white p-8 pl-6 lg:pl-20 lg:pr-20">
        <p className="pt-0 pb-4">
          Global warming may seem like an overwhelmingly complex problem to handle 
          but painting your house white is a step in the right direction.
        </p>
        <p className="pt-4 pb-0">
          So we’ve gone ahead and put together some reasons to paint your house white, 
          some of which might just surprise you!
        </p>
      </div>

      <SavePlanetSection />

      {/* ---- PDF Download & Preview Section ---- */}
      <div className="w-full bg-white p-8 pl-6 lg:pl-20 lg:pr-20">
        {/* Download Button */}
        <a
          href="/Why-you-shouldnt-paint-your-house-a-dark-color.pdf"  // <-- Change to your actual PDF filename
          download
          className="bg-green-700 text-white px-6 py-3 font-semibold hover:bg-green-800 transition inline-block"
        >
          Download PDF
        </a>

        {/* Inline PDF Preview */}
        <div className="mt-4">
        <div className="mt-4">
          <iframe
            src="/Why-you-shouldnt-paint-your-house-a-dark-color.pdf"
            width="100%"
            height="600"
            style={{ border: "none" }}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
