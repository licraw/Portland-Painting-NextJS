export default function GreenAndSafePage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Green and Safe Practices</h1>
      <p className="text-gray-700 mb-6">
        At Portland Painting and Restoration, we prioritize environmentally
        friendly and safe practices. Our team uses eco-friendly materials and
        methods to ensure a healthier environment for your home and the planet.
      </p>
      <p className="text-gray-700">
        Learn more about our commitment to sustainability and safety by{" "}
        <a
          href="/contact"
          className="text-green-700 font-semibold hover:underline"
        >
          contacting us
        </a>{" "}
        today.
      </p>
    </div>
  );
}
