import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export default async function ExteriorGalleryPage() {
  const directoryPath = path.join(process.cwd(), 'public/exterior-gallery');
  const imageFiles = fs.readdirSync(directoryPath)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .map(file => `/exterior-gallery/${file}`);

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Exterior Gallery</h1>
      <p className="text-gray-700 mb-6">
        Discover our portfolio of exceptional exterior painting projects. From
        elegant facades to colorful accents, we take pride in enhancing the
        beauty of homes and buildings.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageFiles.map((src, index) => (
          <div key={index} className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <Image 
              src={src} 
              alt={`Exterior Project ${index + 1}`} 
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
