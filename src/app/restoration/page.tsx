import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import BeforeAndAfterGallery from "../components/ImageGallery/BeforeAndAfterGallery";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.paintpdx.com/restoration#service",
  name: "Restoration Services",
  description:
    "Full-scope restoration services addressing moisture damage, lead paint, and substrate failure for Portland properties.",
  serviceType: "Home Restoration",
  provider: {
    "@id": "https://www.paintpdx.com/#organization",
  },
  areaServed: [
    { "@type": "City", name: "Portland" },
    { "@type": "City", name: "Vancouver" },
  ],
  url: "https://www.paintpdx.com/restoration",
  image: "https://www.paintpdx.com/restoration-gallery/after1.jpg",
  slogan: "Revive the beauty and integrity of your home with expert restoration.",
};

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
    "dogs",
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
      <Script async id="restoration-service" type="application/ld+json">
        {JSON.stringify(serviceJsonLd)}
      </Script>
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
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
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            lineHeight: "1.2",
          }}
          className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2] pb-8"
        >
          Restorations Service
        </h1>
        <p className="pb-4 pt-4">
          Here in the Pacific Northwest, buildings are subject to constant
          moisture that over time can degrade their integrity. Exterior
          restoration may be necessary if a building is experiencing chronic
          failure; chronic failure is typically identified as an area where the
          substrates are failing and not sound enough to hold the tension of new
          paint. An example would be an area, typically exposed to the sun where
          you see bubbles or sheathing of paint, and another coat of paint is
          probably the last thing needed and definitely a waste of your
          resources as these areas will never perform unless we get back down to
          a sound substrate, of which usually incorporates the removal of the
          paint.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Interior Column */}
            <div className="w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <h2 className="font-sans font-medium text-2xl pb-4">Interior</h2>
              <ul className="list-disc list-inside text-left space-y-2">
                <li>Plaster &amp; Drywall Repair, Installation, Resurfacing</li>
                <li>Wallpaper Removal &amp; wall restoration</li>
              </ul>
            </div>
            {/* Exterior Column */}
            <div className="w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full pb-2">
              <h2 className="font-sans font-medium text-2xl pb-4">Exterior</h2>
              <ul className="list-disc list-inside text-left space-y-2">
                <li>Lead Paint Removal</li>
                <li>Dry Rot Repair</li>
                <li>Encapsulation and tension reducing oil prime coats</li>
                <li>Siding and Trim Replacement/Restoration</li>
              </ul>
            </div>
            {/* Deck Column */}
            <div className="w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
              <h2 className="font-sans font-medium text-2xl pb-2">Deck</h2>
              <h5 className="font-sans text-lg pb-4">(w/Timber Pro)</h5>
              <ul className="list-disc list-inside text-left space-y-2">
                <li>
                  Biodegradable Non-Toxic Strippers to remove old oil stains
                </li>
                <li>Natural Wood oil stain with “UV” Protectant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BeforeAndAfterGallery
        images={[
          "/restoration-gallery/before1.jpg",
          "/restoration-gallery/after1.jpg",
        ]}
      />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 pt-0">
        <p className="pb-4 pt-0" style={{ marginTop: "-16px" }}>
          The key to a successful restoration is first understanding the root of
          the problem. This could be the integrity of the initial prime coat
          itself as a 100 year old layer is very fragile, the level of adhesion
          between the various coats of paint, an inferior product at some layer,
          or most often condensation build up as the previous painter caulked
          and sealed up the whole wall of which is suppose to breath. Selecting
          the proper materials and procedures is imperative to select the proper
          solution to the root issue, rather than just treating the symptoms, of
          which never covers the liability adjacent to the visible issues. If
          your building or deck is in need of repairs in order to protect its
          value- We can help. Each solution will be tailored to the specific
          needs of each individual project.
        </p>
      </div>
      <BeforeAndAfterGallery
        images={[
          "/restoration-gallery/before2.jpg",
          "/restoration-gallery/after2.jpg",
        ]}
      />
    </div>
  );
}
