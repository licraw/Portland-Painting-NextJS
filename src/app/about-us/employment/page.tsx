import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join Our Team | Portland Painting & Restoration",
  description:
    "Explore employment opportunities at Portland Painting & Restoration. Join our team and help us deliver exceptional painting and restoration services in Oregon.",
  keywords: [
    "employment",
    "careers",
    "painting jobs",
    "restoration",
    "Portland Painting & Restoration",
    "diversity",
    "inclusion",
    "job opportunities",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/employment",
  },
  openGraph: {
    title: "Join Our Team | Portland Painting & Restoration",
    description:
      "Discover career opportunities at Portland Painting & Restoration. Be part of a company that values craftsmanship, excellence, and diversity.",
    url: "https://www.paintpdx.com/employment",
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
    title: "Join Our Team | Portland Painting & Restoration",
    description:
      "Explore employment opportunities at Portland Painting & Restoration. Join our team and help us deliver exceptional painting and restoration services in Oregon.",
    images: ["https://www.paintpdx.com/employment/employment1.jpg"],
  },
};

export default function EmploymentPage() {
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
          Employment
        </h1>
      </div>

      {/* Employment Information – Full Width */}
      <div className="w-full bg-white p-8 pl-6 lg:pl-20 lg:pr-20">
        <p className="pt-0 pb-4">
          We are one of Oregon’s top-rated painting and restoration companies.
          That said, we are continually looking to add to our talented crew. Our
          team enjoys competitive pay and benefits, and multiple opportunities
          for advancement. We seek to build long-term relationships with our
          painting team. Whether you are new to painting or have been in the
          trade for many years, we would love to hear from you.
        </p>
        <p className="pt-4 pb-4">
          Our workload is quite diverse, including but not limited to, classic
          residential homes, Larger HOA Communities, commercial interiors &
          exteriors, decks/stain, and beautiful full-home restorations. Our
          unique position allows our painters to begin most projects with paint
          removed prior, repairs, and thorough finishing, so plan on less
          scraping/prep, and more fun project finishing.{" "}
        </p>
        <p className="pt-4 pb-4">
          Please click the link below and fill out our online application.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScPxRFy4IUXbFHDJ56gKDbdY0wb9KKJllrOnyNR0FmkM17ZBA/viewform"
          className="bg-green-700 text-white px-6 py-3 font-semibold hover:bg-green-800 transition inline-block"
        >
          Apply Now
        </a>
      </div>

      {/* Image Gallery – UL Grid remains centered */}
      <div className="w-full p-8 pl-6 lg:pl-20 lg:pr-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/employment/employment1.jpg",
              "/employment/employment2.jpg",
              "/employment/employment3.jpg",
            ].map((src, index) => (
              <div key={index} className="relative w-full h-64 overflow-hidden">
                <Image
                  src={src}
                  alt="Gallery Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diversity & Inclusion – Full Width */}
      <div className="w-full bg-green-50 p-8 pl-6 lg:pl-20 lg:pr-20">
        <h2
          className="font-sans font-medium text-4xl lg:text-3xl text-green-900 mb-6"
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            lineHeight: "1.2",
          }}
        >
          Our Commitment to Diversity & Inclusion
        </h2>
        <p className="pt-4 pb-4 text-gray-700">
          Portland Painting & Restoration provides equal opportunities to all
          employees and applicants without regard to race, religion, color, age,
          sex, national origin, sexual orientation, gender identity, genetic
          disposition, neurodiversity, disability, or veteran status.
        </p>
        <p className="pt-4 pb-4 text-gray-700">
          We are committed to fostering an inclusive environment where all
          employees can thrive.
        </p>
      </div>
    </div>
  );
}
