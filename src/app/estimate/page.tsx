import { Metadata } from "next";
import EstimateForm from "../components/EstimateForm";

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
    <div className="min-h-screen flex flex-col items-center">
      <EstimateForm />
    </div>
  );
}
