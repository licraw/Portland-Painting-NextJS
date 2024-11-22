export default function InteriorGalleryPage() {
  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Interior Gallery</h1>
      <p className="text-gray-700 mb-6">
        Explore our collection of stunning interior painting projects. From
        vibrant living spaces to soothing bedrooms, our work showcases our
        dedication to quality and craftsmanship.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Image placeholders */}
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
        <div className="bg-gray-200 rounded-lg h-48"></div>
      </div>
    </div>
  );
}
