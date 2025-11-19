import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.paintpdx.com/hoa#service",
  name: "HOA Painting & Maintenance Services",
  description:
    "Exterior and interior painting services for homeowner associations, condo boards, and planned communities across Portland and Vancouver.",
  serviceType:
    "HOA painting, maintenance coatings, and community common-area upgrades",
  provider: {
    "@id": "https://www.paintpdx.com/#organization",
  },
  areaServed: [
    { "@type": "City", name: "Portland" },
    { "@type": "City", name: "Vancouver" },
  ],
  url: "https://www.paintpdx.com/hoa",
  image: "https://www.paintpdx.com/logo.png",
  slogan: "Reliable painting partners for condo boards and managed communities.",
};

export const metadata: Metadata = {
  title: "HOA Painting Services | Portland Painting & Restoration",
  description:
    "Dedicated painting, repair, and maintenance programs for HOAs, condo associations, and multi-building communities in the Portland metro.",
  keywords: [
    "HOA painting",
    "condo association painting",
    "community maintenance painting",
    "Portland HOA painters",
    "common area painting",
    "multi-family painting",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/hoa",
  },
  openGraph: {
    title: "HOA Painting Services | Portland Painting & Restoration",
    description:
      "Reliable HOA painting services with flexible scheduling, transparent communication, and maintenance planning.",
    url: "https://www.paintpdx.com/hoa",
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
    title: "HOA Painting Services | Portland Painting & Restoration",
    description:
      "Reliable HOA painting services with flexible scheduling, transparent communication, and maintenance planning.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

const communityTypes = [
  "Homeowner associations and master-planned communities",
  "Condominium boards & multi-story properties",
  "Townhome clusters and zero lot line neighborhoods",
  "55+ and active adult communities",
  "Mixed-use developments with shared amenities",
];

const clubhouseServices = [
  "Low-odor coatings for gyms, clubhouses, and leasing offices",
  "Color refreshes that align with community branding",
  "Drywall repairs, trim refinishing, and door updates",
  "Scheduling around events to keep amenities open",
  "Dedicated point of contact for board communication",
];

const exteriorServices = [
  "Full-building repaints, trims, and fascia repairs",
  "Fence, railing, and pergola maintenance programs",
  "Protective coatings for pools, mail kiosks, and amenities",
  "Moisture mitigation and caulking for Pacific Northwest weather",
  "Maintenance plans with prioritized punch lists and budgeting support",
];

const boardAssurances = [
  "Detailed scopes ready for board approval",
  "Crew leads who communicate daily",
  "Staging plans that keep driveways and pathways open",
  "Warranty documentation and future maintenance schedules",
];

export default function HoaPage() {
  return (
    <>
      <Script id="hoa-service" type="application/ld+json">
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
              Serving HOA and condo boards across Portland & Vancouver
            </p>
          </div>
          <h1 className="font-sans font-medium text-4xl lg:text-6xl leading-tight">
            HOA Painting & Maintenance Programs
          </h1>
          <p className="text-lg text-gray-700 mt-6">
            Board members juggle budgets, resident expectations, and strict
            timelines. We partner with associations to create painting plans
            that are highly organized, minimally disruptive, and laser-focused on
            protecting community assets.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Our team handles everything from pre-project communication and
            signage to final punch lists, so you can report back with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Communities We Support
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {communityTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">How We Help Boards</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {boardAssurances.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href="/estimate"
                className="inline-flex items-center mt-6 px-6 py-3 rounded-full bg-green-700 text-white hover:bg-green-600 transition"
              >
                Request a proposal
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-wide text-sm font-semibold text-green-700 mb-2">
                Clubhouses & Shared Interiors
              </p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Keep amenity buildings welcoming and on-brand
              </h2>
              <p className="text-gray-700 mb-6">
                From entry lobbies to fitness rooms, we use low-odor products and
                fast-drying finishes that minimize closure time. Residents stay
                informed, and your amenities reopen clean and refreshed.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {clubhouseServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <Image
                  src="/hoa/hoa-community.jpeg"
                  alt="Placeholder image showing HOA clubhouse concept"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <Image
                  src="/hoa/hoa-exterior.jpeg"
                  alt="Placeholder image showing HOA exterior buildings"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="uppercase tracking-wide text-sm font-semibold text-green-700 mb-2">
                Exterior Building & Amenity Care
              </p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Phased repainting built for multi-building communities
              </h2>
              <p className="text-gray-700 mb-6">
                We coordinate staging, traffic plans, and moisture mitigation so
                exterior work keeps pace with the Pacific Northwest seasons.
                Detailed prep and carpentry repairs ensure every phase lasts.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {exteriorServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center mt-6 px-6 py-3 rounded-full border border-green-700 text-green-800 hover:bg-green-50 transition"
              >
                Plan a walkthrough
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="uppercase tracking-wide text-sm font-semibold text-green-300">
              Simplify your next board vote
            </p>
            <h2 className="text-3xl font-semibold">
              Get a turnkey HOA painting roadmap
            </h2>
            <p className="text-lg text-gray-200">
              We&apos;ll deliver a phased plan, sample schedules, and reserve
              budgeting insights so you can communicate clearly with residents.
              Let&apos;s build a long-term partnership that protects your
              community&apos;s appearance and investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/estimate"
                className="px-6 py-3 rounded-full bg-white text-green-800 font-semibold hover:bg-gray-100 transition"
              >
                Request an HOA estimate
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white font-semibold hover:bg-white/10 transition"
              >
                Talk with our team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
