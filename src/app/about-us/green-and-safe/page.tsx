import Image from "next/image";

export default function GreenAndSafePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">Green and Safe Practices</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Eco-friendly materials and methods to ensure a healthier home and planet.
        </p>
      </section>

      {/* Green & Safe Section */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">Sustainable Painting Practices</h2>
        <p className="text-gray-700 mb-6">
          At Portland Painting and Restoration, we use environmentally conscious materials and methods to provide sustainable painting solutions.
        </p>
        <a
          href="/contact"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Contact Us
        </a>
      </section>

      {/* Lead Safety Section */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-green-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">Lead Safety & Compliance</h2>
        <p className="text-gray-700 mb-4">
          Homes built before 1978 may contain lead-based paint. Our certified experts handle lead safely, protecting your home and family.
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
      </section>

      {/* Proper Painting Procedures */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">We Do It the Right Way</h2>
        <p className="text-gray-700 mb-4">
          Using the right approach and high-quality materials ensures a safe, clean, and eco-friendly painting process.
        </p>
      </section>

      {/* VOC Awareness */}
      <section className="max-w-5xl mx-auto my-16 p-8 bg-green-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-green-900">Low-VOC & Zero-VOC Paints</h2>
        <p className="text-gray-700 mb-4">
          We use low-VOC and zero-VOC paints to reduce indoor air pollution and create a safer environment.
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
      </section>
    </div>
  );
}
