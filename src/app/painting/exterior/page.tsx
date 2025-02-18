import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CarouselGallery from "../../components/ImageGallery/CarouselGallery";
import imageFiles from "@/app/gallery/exterior/galleryFiles";

export const metadata: Metadata = {
  title: "Exterior Painting Services | Portland Painting & Restoration",
  description:
    "Enhance your home's curb appeal with our exterior painting services. We use durable, weather-resistant finishes to protect and beautify your home. Contact us today for a free estimate.",
  keywords: [
    "exterior painting",
    "painting services",
    "home improvement",
    "weather-resistant paint",
    "curb appeal",
    "Portland Painting",
    "restoration",
    "free estimate",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/exterior-painting",
  },
  openGraph: {
    title: "Exterior Painting Services | Portland Painting & Restoration",
    description:
      "Enhance your home's curb appeal with our exterior painting services. We use durable, weather-resistant finishes to protect and beautify your home.",
    url: "https://www.paintpdx.com/exterior-painting",
    type: "website",
    images: "https://www.paintpdx.com/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exterior Painting Services | Portland Painting & Restoration",
    description:
      "Enhance your home's curb appeal with our exterior painting services. We use durable, weather-resistant finishes to protect and beautify your home.",
    images: "https://www.paintpdx.com/logo.png",
  },
};

export default function ExteriorPaintingPage() {
  const imageSet1 = imageFiles.slice(0, 12);
  const imageSet2 = imageFiles.slice(12, 24);
  return (
    <>
      <div>
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
            className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2]"
          >
            Exterior Residential Painting
          </h1>
          <p className="pb-4 pt-4">
            Welcome to Portland Painting and Restoration, your premier
            destination for exceptional exterior painting services in Portland,
            Oregon. With our team of skilled professionals and a commitment to
            delivering outstanding results, we are the go-to choice for all your
            painting needs.
          </p>
          <p className="pb-4 pt-4">
            In the beautiful Pacific Northwest, our region’s unique weather
            patterns pose challenges for maintaining the exterior of your
            property. The constant moisture and unpredictable climate can lead
            to structural damage if left unchecked. That’s why it’s crucial to
            invest in high-quality exterior painting services to protect your
            home or business.
          </p>
          <p className="pb-4 pt-4">
            At Portland Painting and Restoration, we understand the importance
            of proper surface preparation for a long-lasting paint coating. Our
            meticulous process starts with pressure washing, removing dirt and
            mildew to ensure a clean canvas for the new paint. This step is
            crucial as it allows the paint to bond effectively, resulting in a
            durable and consistent finish. Additionally, we offer comprehensive
            carpentry services to address any structural issues before painting,
            ensuring that your property’s exterior is not only beautiful but
            also sound and secure. Our expert carpenters are skilled in repairs
            and enhancements, providing a seamless integration with our painting
            services to give your property a complete makeover.
          </p>
        </div>
      </div>
      <CarouselGallery images={imageSet1} />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 light-green-bg">
        <p className="pb-4 pt-4">
          Our skilled painters are experts in surface preparation, meticulously
          scraping, sanding, caulking, and priming your property. We take pride
          in our attention to detail, knowing that thorough preparation is the
          foundation for a beautiful and long-lasting paint job. By sealing any
          bare wood and addressing gaps that can contribute to moisture
          intrusion, we provide optimal protection against the elements.
        </p>
        <p className="pb-4 pt-4">
          When it comes to choosing the right paint, we only work with
          top-quality materials that can withstand the challenging climate of
          Portland. Our extensive range of paints and coatings ensures that we
          can meet your specific needs, whether you desire vibrant colors or a
          more subdued finish. We tailor our services to enhance the aesthetic
          appeal of your property while also providing durable protection
          against the elements.
        </p>
        <p className="pb-12 pt-4">
          Customer satisfaction is at the heart of our business. After the final
          coat of paint is expertly applied, our dedicated team conducts a
          thorough walk-through with you to ensure your complete satisfaction.
          We address any concerns or touch-ups that may be required, ensuring
          that the end result exceeds your expectations.
        </p>
      </div>
      <CarouselGallery bgcolor="#e8f2ec" images={imageSet2} />
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20 light-green-bg pt-0">
        <div className="pl-6 lg:pl-20 lg:pr-20 pb-8">
          <h2 className="font-sans font-medium text-4xl lg:text-4xl leading-[1.2] pb-8 text-center">
            Exterior Painting Services
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
                <li>Minimum 25yr Warranty Paint</li>
                <li>Pressure Washing &amp; Gutter Cleaning</li>
                <li>Carpentry repairs</li>
                <li>Mildew &amp; Algae Remediation</li>
                <li>Masking &amp; Protection</li>
                <li>Sanding (w/lead dust collection)</li>
              </ul>

              <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
                <li>Priming &amp; Stain blocking</li>
                <li>Scraping</li>
                <li>Spackling</li>
                <li>Caulking</li>
                <li>Foundation Patching and Repair</li>
              </ul>

              <ul className="list-disc list-inside text-left space-y-2 w-full max-w-[90%] mx-auto md:mx-0 md:max-w-full">
                <li>Professional Paint Application</li>
                <li>Spray, Brush &amp; Roll</li>
                <li>Paint/Stain &amp; Varnish</li>
                <li>Storm Windows &amp; Shutters</li>
                <li>Trim Application</li>
                <li>Metal Applications</li>
                <li>Porches &amp; Deck Restoration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="p-8 pl-6 lg:pl-20 lg:pr-20">
        <p className="pt-4 pb-4">
          At Portland Painting and Restoration, we prioritize attention to
          detail and take pride in delivering precise and clean paintwork. Our
          professionals use advanced techniques and equipment to ensure seamless
          edges and even coverage, providing a polished and professional
          appearance to every room.
        </p>
        <p className="pt-4 pb-4">
          Customer satisfaction is our utmost priority. We work closely with you
          throughout the process, from the initial consultation to the final
          walk-through, to ensure that your expectations are not only met but
          exceeded. Our team is dedicated to providing exceptional service,
          clear communication, and completing the project in a timely manor.
        </p>
      </div>
    </>
  );
}
