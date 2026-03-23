import { Metadata } from "next";
import TradeShowContainer from "../components/trade-show/tradeShowContainer";

export const metadata: Metadata = {
  title: "Trade Show | Portland Painting & Restoration",
  description:
    "Connect with Portland Painting & Restoration at our trade show and learn more about our painting, restoration, and carpentry services.",
  keywords: [
    "trade show",
    "painting",
    "restoration",
    "Portland",
    "Oregon",
    "Portland Painting & Restoration",
    "professional services",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/trade-show",
  },
  openGraph: {
    title: "Trade Show | Portland Painting & Restoration",
    description:
      "Connect with Portland Painting & Restoration at our trade show and learn more about our painting, restoration, and carpentry services.",
    url: "https://www.paintpdx.com/trade-show",
    type: "website",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting & Restoration Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Show | Portland Painting & Restoration",
    description:
      "Connect with Portland Painting & Restoration at our trade show and learn more about our painting, restoration, and carpentry services.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function ContactPage() {
  return <TradeShowContainer />;
}
