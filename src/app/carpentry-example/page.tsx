import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import ReviewsWidget from "../components/ReviewsWidget";

const featuredPhotos = [
  {
    src: "/carpentry-gallery/carpentry1.jpg",
    alt: "Exterior rot repair carpentry work",
    label: "Rot repair",
  },
  {
    src: "/carpentry-gallery/carpentry8.jpg",
    alt: "Deck rebuild carpentry project",
    label: "Deck rebuild",
  },
  {
    src: "/carpentry-gallery/carpentry12.jpg",
    alt: "Interior finish carpentry and trim work",
    label: "Interior trim",
  },
];

const serviceSections = [
  {
    eyebrow: "Exterior Repairs",
    title: "Exterior Carpentry Repair Services",
    description:
      "Exterior wood damage is one of the most common issues facing homes in the Pacific Northwest. Our carpenters repair light structural and aesthetic wood damage to restore durability and help prevent future moisture intrusion.",
    items: [
      "Dry rot and wood rot repair",
      "Siding repair and replacement",
      "Exterior trim repair",
      "Door frame repair and replacement",
      "Window installation and flashing",
    ],
  },
  {
    eyebrow: "Decks & Porches",
    title: "Deck and Porch Carpentry",
    description:
      "Decks and porches are exposed to constant weather and need periodic repairs or rebuilding. We repair and rebuild these structures to restore safety, durability, and curb appeal.",
    items: [
      "Deck construction and repair",
      "Porch, rail, and skirt repairs",
      "Trex decking installation",
      "Stair and railing construction",
      "Porch column and post replacement",
    ],
  },
  {
    eyebrow: "Interior Finish Carpentry",
    title: "Interior Carpentry Services",
    description:
      "Interior finish carpentry adds architectural detail and refinement to interior spaces. Our carpenters install trim, paneling, flooring, and built-ins that enhance both modern and historic homes.",
    items: [
      "Baseboard and trim installation",
      "Crown molding installation",
      "Door and window trim installation",
      "Wainscot and wall paneling",
      "Built-in shelving and cabinets",
      "Custom woodworking",
      "Wood and LVP flooring installation",
    ],
  },
  {
    eyebrow: "Custom Projects",
    title: "Custom Carpentry and Outdoor Structures",
    description:
      "These smaller custom projects are popular on their own and pair especially well with larger renovation, painting, and restoration work.",
    items: [
      "Pergolas, arbors, and garden structures",
      "Built-in benches and storage",
      "Garbage enclosures",
      "Custom shelving",
      "Outdoor structures",
      "New garage carpentry",
    ],
  },
];

const reasonsToChoose = [
  "Detailed project management and communication from start to finish",
  "Experienced carpenters and painters working together on the same home",
  "Repair-first approach that preserves original materials when possible",
  "Lead-safe certified work practices for older Portland homes",
  "Trusted locally since 2004",
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.paintpdx.com/carpentry-example#service",
  name: "Carpentry Repair, Restoration and Construction",
  description:
    "Carpentry repair, wood rot restoration, deck rebuilding, finish carpentry, and custom carpentry services for Portland-area homes.",
  serviceType: "Residential Carpentry Services",
  provider: {
    "@id": "https://www.paintpdx.com/#organization",
  },
  areaServed: [
    { "@type": "City", name: "Portland" },
    { "@type": "City", name: "Vancouver" },
  ],
  url: "https://www.paintpdx.com/carpentry-example",
  image: featuredPhotos.map((photo) => `https://www.paintpdx.com${photo.src}`),
  slogan:
    "Repairing and rebuilding the wood structures that protect and define your home.",
};

export const metadata: Metadata = {
  title: "Carpentry Example Page | Portland Painting & Restoration",
  description:
    "Example carpentry page layout for Portland Painting & Restoration featuring exterior repairs, decks, finish carpentry, custom projects, and a lead-focused call to action.",
  alternates: {
    canonical: "https://www.paintpdx.com/carpentry-example",
  },
  openGraph: {
    title: "Carpentry Example Page | Portland Painting & Restoration",
    description:
      "Explore an example carpentry page layout focused on repairs, restoration, decks, finish carpentry, and custom projects.",
    url: "https://www.paintpdx.com/carpentry-example",
    type: "website",
    images: ["https://www.paintpdx.com/carpentry-gallery/carpentry1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carpentry Example Page | Portland Painting & Restoration",
    description:
      "An example carpentry landing page focused on stronger structure, clearer services, and better lead generation.",
    images: ["https://www.paintpdx.com/carpentry-gallery/carpentry1.jpg"],
  },
};

function SectionCard({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <section className="rounded-[2rem] border border-[#d9e1d9] bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#54705f]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-sans text-3xl font-medium leading-tight text-[#1d3126]">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">
        {description}
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-gray-200 bg-[#f8fbf7] px-4 py-3 text-gray-800"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CarpentryExamplePage() {
  return (
    <>
      <Script async id="carpentry-example-service" type="application/ld+json">
        {JSON.stringify(serviceJsonLd)}
      </Script>

      <main className="bg-[linear-gradient(180deg,#f7f3eb_0%,#ffffff_28%,#eef5ee_100%)]">
        <section className="px-6 py-12 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d6ddd2] bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <div className="flex h-6 w-8 items-center justify-center rounded-full bg-[#eef5ee]">
                <Image
                  src="/gallery/leaf.svg"
                  alt="Portland Painting and Restoration logo leaf"
                  width={16}
                  height={16}
                />
              </div>
              <span>Example layout for a higher-converting carpentry page</span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#54705f]">
                  Carpentry Example
                </p>
                <h1 className="mt-4 max-w-4xl font-sans text-5xl font-medium leading-[1.05] text-[#1d3126] lg:text-7xl">
                  Carpentry Repair, Restoration &amp; Construction
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                  Repairing and rebuilding the wood structures that protect and
                  define your home, from dry rot repairs to custom carpentry and
                  historic preservation.
                </p>
                <div className="mt-8 space-y-5 text-base leading-8 text-gray-700">
                  <p>
                    Our carpentry division grew from decades of repairing and
                    restoring Portland homes. That experience gives us a deep
                    understanding of how houses are built and how they fail.
                  </p>
                  <p>
                    Many of our clients first hire us for repairs or painting
                    projects, then continue working with our team on bathroom
                    upgrades, kitchen improvements, trim modernization, and
                    other custom carpentry work.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/estimate"
                    className="inline-flex items-center justify-center rounded-full bg-[#1f5c3a] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#18462d]"
                  >
                    Request an Estimate
                  </Link>
                  <Link
                    href="/carpentry"
                    className="inline-flex items-center justify-center rounded-full border border-[#9eb4a1] bg-white px-6 py-3 text-base font-semibold text-[#1d3126] transition hover:bg-[#f7fbf6]"
                  >
                    View Current Carpentry Page
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#d9e1d9] bg-white/90 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#54705f]">
                  Why this version leads better
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700">
                  <li>Homeowners can scan by problem instead of reading one long list.</li>
                  <li>Google gets clear topic groupings for repairs, decks, interiors, and custom work.</li>
                  <li>The painting plus carpentry advantage is explained early instead of implied.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {featuredPhotos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-[1.75rem] border border-[#d9e1d9] bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <figcaption className="px-5 py-4 text-base font-semibold text-[#1d3126]">
                    {photo.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-6 lg:px-20 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-6">
            {serviceSections.map((section) => (
              <SectionCard key={section.title} {...section} />
            ))}
          </div>
        </section>

        <section className="px-6 py-12 lg:px-20">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#1d3126] p-8 text-white lg:grid-cols-[1fr_1fr] lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b9d3bf]">
                Why Homeowners Choose PPR
              </p>
              <h2 className="mt-3 font-sans text-3xl font-medium leading-tight lg:text-4xl">
                Repair-minded carpentry backed by restoration experience
              </h2>
            </div>
            <ul className="space-y-3 text-base leading-7 text-[#edf5ee]">
              {reasonsToChoose.map((reason) => (
                <li key={reason} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-16 lg:px-20 lg:pb-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#d9e1d9] bg-white p-8 text-center shadow-sm lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#54705f]">
              Call To Action
            </p>
            <h2 className="mt-3 font-sans text-3xl font-medium leading-tight text-[#1d3126] lg:text-5xl">
              Need carpentry repairs or improvements?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-700">
              Our estimator can evaluate your project and provide recommendations
              for repairs, restoration, or new carpentry work.
            </p>
            <Link
              href="/estimate"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1f5c3a] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#18462d]"
            >
              Request an Estimate
            </Link>
          </div>
        </section>

        <ReviewsWidget title="Carpentry Reviews" className="bg-transparent pb-16" />
      </main>
    </>
  );
}
