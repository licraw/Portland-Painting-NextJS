import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Green and Safe Practices | Portland Painting & Restoration",
  description:
    "Discover our eco-friendly and sustainable painting solutions. At Portland Painting & Restoration, we prioritize green practices, lead safety, and low-VOC/zero-VOC paints for a healthier home and planet.",
  keywords: [
    "green practices",
    "safe painting",
    "eco-friendly",
    "sustainable painting",
    "lead safety",
    "low VOC",
    "zero VOC",
    "environmentally friendly",
    "Portland Painting",
    "restoration",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/green-safe",
  },
  openGraph: {
    title: "Green and Safe Practices | Portland Painting & Restoration",
    description:
      "Discover our eco-friendly and sustainable painting solutions. At Portland Painting & Restoration, we prioritize green practices, lead safety, and low-VOC/zero-VOC paints for a healthier home and planet.",
    url: "https://www.paintpdx.com/green-safe",
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
    title: "Green and Safe Practices | Portland Painting & Restoration",
    description:
      "Discover our eco-friendly and sustainable painting solutions. At Portland Painting & Restoration, we prioritize green practices, lead safety, and low-VOC/zero-VOC paints for a healthier home and planet.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function GreenAndSafePage() {
  // Define common heading styles
  const headingStyle = {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontWeight: 500,
    lineHeight: "1.2",
  };

  return (
    <div>
      <div className="w-full">
        {/* Top Section */}
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
            style={headingStyle}
          >
            Green and Safe Practices
          </h1>
        </div>

        {/* Sustainable Painting Practices – Full Width */}
        <div className="w-full bg-white p-8 pl-6 lg:pl-20 lg:pr-20 pt-0">
          <p className="pt-4 pb-4 text-gray-700">
            Lead was removed from residential paint products in 1978 by the EPA.
            However, many homes built before then still contain multiple layers
            of lead paint under newer layers of acrylic lead-free paint. Another
            important thing to mention is that lead paint itself was designed to
            migrate into the fibers of the wood siding and trim. This makes the
            wood material itself just as harmful as the paint. The older the
            home, the more likely that lead is present and the higher the
            concentration and potency of the lead additives used. At Portland
            Painting and Restoration, we prioritize green and safe practices in
            all our services, including our comprehensive carpentry work. Our
            team is skilled in safely handling and restoring wood structures
            that may be affected by lead, ensuring a healthier and safer
            environment for your home.
          </p>

          <Image
            src="https://paintpdx.com/wp-content/uploads/2021/04/lead-safe-certified-firm.png"
            alt="Lead Safe Certified Firm"
            width={300}
            height={300}
            style={{ margin: "0 auto" }}
          />

          <p className="pt-4 pb-4">
            When hiring a painting contractor, making sure that they are an EPA
            Certified Lead Safe Firm is one of the most important things you can
            do for your family and for your home.
          </p>

          {/* Lead Safety & Compliance – Full Width */}
          <h2 className="font-sans font-medium text-2xl lg:text-3xl leading-[1.2] text-center pt-8">
            We do it the right way.{" "}
          </h2>
          <p className="pt-4 pb-4">
            Not all painting companies and independent painters are EPA
            Certified, hiring a non­ EPA certified contractor to work for you
            could have huge potential risks to you and your family’s health. The
            process of preparing a home for painting involves several stages
            that can easily spread lead paint chips and dust. From power washing
            to scraping to sanding – if the right approach, materials, and
            equipment are not used you will most likely find chips in your
            garden beds, dust inside of your home, and debris on adjacent
            properties creating issues with your neighbors.
          </p>
          <p className="pt-4 pb-4">
            Being an EPA-certified firm isn’t cheap. Costs include worker
            training, safety gear, high-quality materials, and expensive paint
            removal equipment. You will certainly notice the difference in the
            end whether you hire a non-compliant contractor or you hire us, the
            team that does is the safe way and right way. The difference in
            practice and result is stark. From the first step of the scraping
            process through to the washing, prep, and application of finish
            coats- we will take the utmost care to contain and properly dispose
            of lead on your home.
          </p>
          <h2 className="font-sans font-medium text-2xl lg:text-3xl leading-[1.2] text-center pt-8">
            Low-VOCs keep you safe.{" "}
          </h2>
          <p className="pt-4 pb-4 text-gray-700">
            Volatile Organic Compounds (VOCs) or “solvents” are a group of
            chemicals that are found in many products used today to build and
            maintain our homes. Once these chemicals are in our homes they are
            released into the indoor air we breathe.
          </p>
          <div className="flex justify-center my-6">
            <Image
              src="https://paintpdx.com/wp-content/uploads/2021/04/vocs-in-paint.jpeg"
              alt="VOCs in Paint"
              width={300}
              height={300}
            />
          </div>
          <p className="pt-4 pb-4">
          For interior AND exterior use, we strive to use products that have the lowest possible VOC counts while still maintaining our high expectations for appearance and durability. We have completely removed all high VOC oil and lacquer-based primers and paints from our interior product line and have dramatically reduced the VOCs present in our exterior products. With low-VOC and ultra-low-VOC products comprising the majority of our interior paint offerings, we can also provide Zero-VOC and Green options upon request! </p>
        </div>
      </div>
    </div>
  );
}
