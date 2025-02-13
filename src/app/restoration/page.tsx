import { Metadata } from "next";
import ServiceHero from "../components/ServiceHero";
import ServiceIntro from "../components/ServiceIntro";

export const metadata: Metadata = {
  title: "Restoration Services | Portland Painting & Restoration",
  description:
    "Revive the beauty and integrity of your home with our comprehensive restoration services. We address moisture damage, substrate failure, and more to ensure a lasting finish for your property in the Pacific Northwest.",
  keywords: [
    "restoration services",
    "home restoration",
    "exterior restoration",
    "moisture damage",
    "substrate repair",
    "Pacific Northwest",
    "Portland Painting",
    "building restoration",
    "dogs"
  ],
  openGraph: {
    title: "Restoration Services | Portland Painting & Restoration",
    description:
      "Revive the beauty and integrity of your home with our comprehensive restoration services. We address moisture damage, substrate failure, and more to prepare your property for a lasting finish.",
    url: "https://www.paintpdx.com/restoration",
    siteName: "Portland Painting & Restoration",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting & Restoration Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restoration Services | Portland Painting & Restoration",
    description:
      "Revive the beauty and integrity of your home with our comprehensive restoration services. We address moisture damage and substrate issues to ensure a durable, quality finish.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function RestorationPage() {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero
        title="Restoration Services"
        subtitle="Reviving the beauty and integrity of your home."
        backgroundImage="/gallery/restoration1.jpg"
      />

      {/* Intro Section */}
      <ServiceIntro heading="Our Restoration Services">
        <p className="mb-8">
          Here in the Pacific Northwest, buildings are subject to constant moisture that over time
          can degrade their integrity. Exterior restoration may be necessary if a building is
          experiencing chronic failure; chronic failure is typically identified as an area where the
          substrates are failing and not sound enough to hold the tension of new paint.
        </p>
        <p className="mb-8">
          The key to a successful restoration is first understanding the root of the problem. This
          could be the integrity of the initial prime coat itself as a 100-year-old layer is very
          fragile, the level of adhesion between the various coats of paint, an inferior product at
          some layer, or most often condensation build-up.
        </p>
        <p className="mb-8">
          If your building or deck is in need of repairs in order to protect its value, we can help.
          Each solution will be tailored to the specific needs of each individual project.
        </p>
      </ServiceIntro>
    </div>
  );
}
