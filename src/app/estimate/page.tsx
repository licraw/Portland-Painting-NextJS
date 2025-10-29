import { Metadata } from "next";
import Script from "next/script";
import EstimateForm from "../components/EstimateForm";

const estimatePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.paintpdx.com/estimate#webpage",
  name: "Request an Estimate",
  description:
    "Request a free estimate from Portland Painting & Restoration for painting, carpentry, and restoration projects.",
  url: "https://www.paintpdx.com/estimate",
  potentialAction: {
    "@type": "QuoteAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.paintpdx.com/estimate",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Quote",
      name: "Painting and Restoration Project Estimate",
    },
  },
};

export const metadata: Metadata = {
  title: "Get an Estimate | Portland Painting & Restoration",
  description:
    "Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs.",
  keywords: [
    "estimate",
    "free quote",
    "painting estimate",
    "restoration estimate",
    "Portland Painting",
    "home improvement",
  ],
  authors: [{ name: "Portland Painting & Restoration" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.paintpdx.com/estimate",
  },
  openGraph: {
    title: "Get an Estimate | Portland Painting & Restoration",
    description:
      "Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs.",
    url: "https://www.paintpdx.com/estimate",
    siteName: "Portland Painting & Restoration",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting & Restoration logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get an Estimate | Portland Painting & Restoration",
    description:
      "Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs.",
    images: ["https://www.paintpdx.com/logo.png"],
    site: "@yourtwitterhandle",
  },
};

export default function Estimate() {
  return (
    <>
      <Script id="estimate-page-ld-json" type="application/ld+json">
        {JSON.stringify(estimatePageJsonLd)}
      </Script>
      <div className="min-h-screen flex flex-col items-center">
        <EstimateForm />
      </div>
    </>
  );
}
