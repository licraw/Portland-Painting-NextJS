import Image from "next/image";

export default function GreenAndSafePage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Green and Safe Practices</h1>
      <p className="text-gray-700 mb-6">
        At Portland Painting and Restoration, we prioritize environmentally
        friendly and safe practices. Our team uses eco-friendly materials and
        methods to ensure a healthier environment for your home and the planet.
      </p>
      <p className="text-gray-700 mb-8">
        Learn more about our commitment to sustainability and safety by{" "}
        <a
          href="/contact"
          className="text-green-700 font-semibold hover:underline"
        >
          contacting us
        </a>{" "}
        today.
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Green and Safe</h2>
        <p className="text-gray-700 mb-4">
          Lead was removed from residential paint products in 1978 by the EPA.
          However, many homes built before then still contain multiple layers of
          lead paint under newer layers of acrylic lead-free paint. Another
          important thing to mention is that lead paint itself was designed to
          migrate into the fibers of the wood siding and trim. This makes the
          wood material itself just as harmful as the paint. The older the home,
          the more likely that lead is present and the higher the concentration
          and potency of the lead additives used. At Portland Painting and
          Restoration, we prioritize green and safe practices in all our
          services, including our comprehensive carpentry work. Our team is
          skilled in safely handling and restoring wood structures that may be
          affected by lead, ensuring a healthier and safer environment for your
          home.
        </p>
        <div className="flex justify-center my-6">
          <Image
            src="https://paintpdx.com/wp-content/uploads/2021/04/lead-safe-certified-firm.png"
            alt="Lead Safe Certified Firm"
            width={300}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-700 mb-4">
          When hiring a painting contractor, making sure that they are an EPA
          Certified Lead Safe Firm is one of the most important things you can
          do for your family and for your home.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">We Do It the Right Way</h2>
        <p className="text-gray-700 mb-4">
          Not all painting companies and independent painters are EPA Certified.
          Hiring a non-EPA certified contractor to work for you could have huge
          potential risks to your and your family’s health. The process of
          preparing a home for painting involves several stages that can easily
          spread lead paint chips and dust. From power washing to scraping to
          sanding – if the right approach, materials, and equipment are not
          used, you will most likely find chips in your garden beds, dust inside
          of your home, and debris on adjacent properties, creating issues with
          your neighbors.
        </p>
        <p className="text-gray-700 mb-4">
          Being an EPA-certified firm isn’t cheap. Costs include worker
          training, safety gear, high-quality materials, and expensive paint
          removal equipment. You will certainly notice the difference in the
          end, whether you hire a non-compliant contractor or you hire us – the
          team that does it the safe and right way. The difference in practice
          and result is stark. From the first step of the scraping process
          through to the washing, prep, and application of finish coats – we
          will take the utmost care to contain and properly dispose of lead on
          your home.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Low-VOCs Keep You Safe</h2>
        <p className="text-gray-700 mb-4">
          Volatile Organic Compounds (VOCs) or “solvents” are a group of
          chemicals that are found in many products used today to build and
          maintain our homes. Once these chemicals are in our homes, they are
          released into the indoor air we breathe.
        </p>
        <div className="flex justify-center my-6">
          <Image
            src="https://paintpdx.com/wp-content/uploads/2021/04/vocs-in-paint.jpeg"
            alt="VOCs in Paint"
            width={300}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-700 mb-4">
          For interior AND exterior use, we strive to use products that have the
          lowest possible VOC counts while still maintaining our high
          expectations for appearance and durability. We have completely removed
          all high VOC oil and lacquer-based primers and paints from our
          interior product line and have dramatically reduced the VOCs present
          in our exterior products. With low-VOC and ultra-low-VOC products
          comprising the majority of our interior paint offerings, we can also
          provide Zero-VOC and Green options upon request!
        </p>
      </div>
    </div>
  );
}
