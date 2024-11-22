export default function ExteriorGalleryPage() {
  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Exterior Gallery</h1>
      <p className="text-gray-700 mb-6">
        Discover our portfolio of exceptional exterior painting projects. From
        elegant facades to colorful accents, we take pride in enhancing the
        beauty of homes and buildings.
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
