import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Head from 'next/head';

export default async function ExteriorGalleryPage() {
  const directoryPath = path.join(process.cwd(), 'public/exterior-gallery');
  const imageFiles = fs.readdirSync(directoryPath)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .map(file => `/exterior-gallery/${file}`);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Exterior Gallery | Portland Painting & Restoration</title>
        <meta
          name="description"
          content="Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings."
        />
        <meta
          name="keywords"
          content="exterior gallery, painting projects, exterior painting, portfolio, home improvement, Portland Painting, restoration"
        />
        <link rel="canonical" href="https://www.paintpdx.com/exterior-gallery" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Exterior Gallery | Portland Painting & Restoration" />
        <meta
          property="og:description"
          content="Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings."
        />
        <meta property="og:image" content="https://www.paintpdx.com/logo.png" />
        <meta property="og:url" content="https://www.paintpdx.com/exterior-gallery" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exterior Gallery | Portland Painting & Restoration" />
        <meta
          name="twitter:description"
          content="Explore our portfolio of exceptional exterior painting projects. From elegant facades to colorful accents, see how Portland Painting & Restoration enhances the beauty of homes and buildings."
        />
        <meta name="twitter:image" content="https://www.paintpdx.com/logo.png" />
      </Head>

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
    </>
  );
}
