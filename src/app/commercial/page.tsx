import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CarouselGallery from "../components/ImageGallery/CarouselGallery";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.paintpdx.com/commercial#service",
  name: "Commercial Painting Services",
  description:
    "Comprehensive commercial painting services including surface repairs, professional finishes, and maintenance planning for Portland businesses.",
  serviceType: "Commercial Interior and Exterior Painting",
  provider: {
    "@id": "https://www.paintpdx.com/#organization",
  },
  areaServed: [
    { "@type": "City", name: "Portland" },
    { "@type": "City", name: "Vancouver" },
  ],
  url: "https://www.paintpdx.com/commercial",
  image: "https://www.paintpdx.com/logo.png",
  slogan: "Interior and exterior finishes that keep your business on brand.",
};

export const metadata: Metadata = {
  title: "Commercial Painting Services | Portland Painting & Restoration",
  description:
    "Keep your workplace looking sharp with commercial painting services tailored to offices, retail, and multi-family properties across Portland and Vancouver.",
  keywords: [
    "commercial painting",
    "business painting services",
    "office painting",
    "retail painting",
    "commercial exterior painting",
    "Portland",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/commercial",
  },
  openGraph: {
    title: "Commercial Painting Services | Portland Painting & Restoration",
    description:
      "Interior and exterior commercial painting that minimizes downtime while elevating your professional image.",
    url: "https://www.paintpdx.com/commercial",
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
    title: "Commercial Painting Services | Portland Painting & Restoration",
    description:
      "Interior and exterior commercial painting that minimizes downtime while elevating your professional image.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

const propertyTypes = [
  "Multi-tenant offices",
  "Retail storefronts",
  "Restaurants & hospitality",
  "Healthcare clinics",
  "Industrial suites",
  "Mixed-use communities",
];

const interiorServices = [
  "Low-VOC coatings and protective finishes",
  "Occupied space scheduling & nightly clean-up",
  "Trim, millwork, and door refinishing",
  "Surface repairs and drywall touch-ups",
  "Specialty branding walls & wayfinding colors",
  "Facility maintenance painting plans",
];

const exteriorServices = [
  "Waterproof coatings for the PNW climate",
  "Pressure washing, scraping, and priming",
  "Commercial siding, stucco, and metal systems",
  "Parking structure and railing repaints",
  "Lead-safe preparation for historic facades",
  "Annual touch-up programs and inspections",
];

const projectAssurances = [
  "Dedicated project management and daily updates",
  "After-hours crews that reduce operational disruption",
  "Licensed, bonded, and insured across OR & WA",
  "Color consultations aligned with your brand standards",
];

const hoaComImages = [
  "1459 SE Ankeny.1.jpg",
  "2017-I AM YOGA 1.jpg",
  "24153 SE Ankeny.2.jpg",
  "2516 Belmont HOA.2.jpg",
  "2516 Belmont HOA.3.jpg",
  "2516 Belmont HOA.4.jpg",
  "2516 Belmont HOA.A1.jpg",
  "2516 Belmont HOA.A2.jpg",
  "2516 Belmont.1.jpg",
  "Greenwich.jpg",
  "GuysOn Ladder.Usable.jpg",
  "Harrison_Ct_Appartments_Web_1006.jpg",
  "NW 24th firehouse restoration (3).jpg",
  "Ryder_Print_1005.jpg",
  "Ryder_Print_1019.jpg",
  "Sorrento_Condos_Web_1003.jpg",
  "Stain Sample.JPG",
  "The Terazzo Condos 1.png",
  "The Terazzo Condos 2.png",
  "The Terazzo Condos.png",
  "TheByway.jpg",
];

const commercialGalleryImages = hoaComImages
  .filter((path) => !/HOA|Condo/i.test(path))
  .map((path) => encodeURI(`/HOA-COM/${path}`));

export default function CommercialPage() {
  return (
    <>
      <Script id="commercial-service" type="application/ld+json">
        {JSON.stringify(serviceJsonLd)}
      </Script>
      <div>
        <section className="p-8 pl-6 lg:pl-20 lg:pr-20">
          <div className="flex items-center space-x-3 bg-gray-100 py-2 px-4 rounded-full max-w-fit mb-6">
            <div className="flex items-center justify-center w-8 h-6 bg-white rounded-full">
              <Image
                src="/gallery/leaf.svg"
                alt="Portland Painting and Restoration Logo"
                width={16}
                height={16}
              />
            </div>
            <p className="text-sm font-medium text-gray-600">
              Need a proposal?{" "}
              <Link
                href="/estimate"
                className="underline hover:no-underline hover:text-gray-800 transition ml-1"
              >
                Get a free estimate
              </Link>
            </p>
          </div>
          <h1 className="font-sans font-medium text-4xl lg:text-6xl leading-tight">
            Commercial Painting Services
          </h1>
          <p className="text-lg text-gray-700 mt-6">
            High-performing businesses deserve spaces that look the part.
            Portland Painting & Restoration delivers professional commercial
            painting that respects your timeline, protects your investment, and
            keeps staff and customers comfortable throughout the process.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Whether you&apos;re refreshing a single tenant space or coordinating
            finishes across an entire campus, our team plans every phase—from
            color mockups and surface repairs to final walkthroughs—so nothing is
            left to chance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Properties We Support
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {propertyTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why Partners Choose Us</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {projectAssurances.map((assurance) => (
                  <li key={assurance}>{assurance}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="uppercase tracking-wide text-sm font-semibold text-green-700 mb-2">
                Commercial Interior Painting
              </p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Interior finishes that work as hard as your team
              </h2>
              <p className="text-gray-700 mb-6">
                Maintain a polished, healthy environment with low-VOC products,
                dust containment, and flexible scheduling tailored to your hours
                of operation. We protect workstations, coordinate overnight
                shifts, and deliver spotless results when doors reopen.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {interiorServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center mt-8 px-6 py-3 rounded-full bg-green-700 text-white hover:bg-green-600 transition"
              >
                Discuss an interior project
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <Image
                  src={encodeURI("/HOA-COM/2017-I AM YOGA 1.jpg")}
                  alt="Freshly painted commercial yoga studio interior"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <Image
                  src="/HOA-COM/Ryder_Print_1019.jpg"
                  alt="Commercial storefront exterior repaint"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div>
              <p className="uppercase tracking-wide text-sm font-semibold text-green-700 mb-2">
                Commercial Exterior Painting
              </p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Exterior protection built for Pacific Northwest weather
              </h2>
              <p className="text-gray-700 mb-6">
                From storefront facades to multi-story complexes, we stage,
                prepare, and paint with coatings engineered to resist moisture
                and UV exposure. Detailed prep, carpentry repairs, and safety
                plans keep projects running smoothly.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {exteriorServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href="/estimate"
                className="inline-flex items-center mt-8 px-6 py-3 rounded-full bg-green-700 text-white hover:bg-green-600 transition"
              >
                Schedule an exterior walkthrough
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="uppercase tracking-wide text-sm font-semibold text-green-300">
              Ready when you are
            </p>
            <h2 className="text-3xl font-semibold">
              Let&apos;s map out your next commercial painting project
            </h2>
            <p className="text-lg text-gray-200">
              Share your scope, timeline, and facility requirements. We&apos;ll
              deliver a detailed proposal that includes phasing, safety plans,
              and optional maintenance schedules so you can plan with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/estimate"
                className="px-6 py-3 rounded-full bg-white text-green-800 font-semibold hover:bg-gray-100 transition"
              >
                Request an estimate
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white font-semibold hover:bg-white/10 transition"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="uppercase tracking-wide text-sm font-semibold text-green-700">
              Commercial Project Gallery
            </p>
            <h2 className="text-3xl font-semibold text-gray-900">
              Explore recent interior and exterior work
            </h2>
            <p className="text-gray-700">
              Browse offices, retail storefronts, condo communities, and more to
              see how we handle a wide range of commercial repaint needs.
            </p>
          </div>
        </section>
        <CarouselGallery bgcolor="#e8f2ec" images={commercialGalleryImages} />
      </div>
    </>
  );
}
