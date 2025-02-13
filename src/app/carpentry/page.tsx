import ServiceHero from "../components/ServiceHero";
import ServiceIntro from "../components/ServiceIntro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carpentry Services | Portland Painting & Restoration",
  description:
    "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
  keywords: [
    "Carpentry",
    "carpentry services",
    "restoration",
    "painting",
    "expert craftsmanship",
    "Portland",
    "home improvement",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/carpentry",
  },
  openGraph: {
    title: "Carpentry Services | Portland Painting & Restoration",
    description:
      "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
    url: "https://www.paintpdx.com/carpentry",
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
    title: "Carpentry Services | Portland Painting & Restoration",
    description:
      "Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function CarpentryPage() {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero
        title="Carpentry Services"
        subtitle="Expert craftsmanship for every project."
        backgroundImage="/gallery/carpentry1.jpg"
      />

      {/* Intro Section */}
      <ServiceIntro heading="Our Carpentry Services">
        <p className="mb-8">
          There are many painting companies in the Portland area, but not all of them offer a full
          range of carpentry services too. What’s the point of applying a fresh coat of paint over
          low-grade craftsmanship or rotten wood?
        </p>
        <p className="mb-8">
          Some carpenters don’t want to do smaller projects because they are holding out for bigger
          ones. This can be really frustrating for the homeowner trying to get the job done. A long
          time ago we came to the conclusion that it would be more convenient and beneficial to our
          customers to provide top-notch carpentry services as part of a comprehensive restoration
          strategy.
        </p>
      </ServiceIntro>
    </div>
  );
}
