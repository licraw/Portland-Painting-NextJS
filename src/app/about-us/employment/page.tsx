import Image from "next/image";
import { Metadata } from "next";

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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">Join Our Team</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Be part of a company that values craftsmanship, excellence, and customer satisfaction.
        </p>
      </section>

      {/* Employment Information */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">Employment Opportunities</h2>
        <p className="text-gray-700 mb-6">
          We are one of Oregon’s top-rated painting and restoration companies. We’re always looking
          to add talented individuals to our team. Enjoy competitive pay, benefits, and career growth.
        </p>
        <p className="text-gray-700 mb-6">
          <a href="/contact" className="text-green-700 font-semibold hover:underline">
            Contact us
          </a>{" "}
          to learn more about careers with Portland Painting and Restoration.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScPxRFy4IUXbFHDJ56gKDbdY0wb9KKJllrOnyNR0FmkM17ZBA/viewform"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Apply Now
        </a>
      </section>

      {/* Image Gallery */}
      <section className="max-w-5xl mx-auto my-16">
        <h2 className="text-3xl font-semibold text-center mb-6 text-green-900">Our Work Environment</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["/employment/employment1.jpg", "/employment/employment2.jpg", "/employment/employment3.jpg"].map(
            (src, index) => (
              <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <Image src={src} alt="Gallery Image" layout="fill" objectFit="cover" />
              </div>
            )
          )}
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-green-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">Our Commitment to Diversity & Inclusion</h2>
        <p className="text-gray-700 mb-4">
          Portland Painting & Restoration provides equal opportunities to all employees and applicants
          without regard to race, religion, color, age, sex, national origin, sexual orientation,
          gender identity, genetic disposition, neurodiversity, disability, or veteran status.
        </p>
        <p className="text-gray-700">
          We are committed to fostering an inclusive environment where all employees can thrive.
        </p>
      </section>
    </div>
  );
}
