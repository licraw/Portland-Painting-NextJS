import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
        {/* Text Content - Centered */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-semibold mb-4">Portland Painting & Restoration</h2>
          <p className="text-gray-700 mx-auto md:mx-0">
            Portland Painting and Restoration is a licensed, bonded, and insured professional contractor in Oregon and Washington. Offering all the services within the painting industry, we will meet and exceed all OSHA safety regulations, and all work performed will meet or exceed PDCA standards and practices.
          </p>
        </div>

        {/* Logo - Positioned to the Right */}
        <div className="mt-8 md:mt-0 md:ml-8 flex-shrink-0">
          <Image src="/logo2.svg" alt="Portland Painting & Restoration Logo" width={120} height={120} />
        </div>
      </div>

      {/* Bottom Row - Copyright and Contact Info */}
      <div className="mt-8 text-center text-gray-600">
        <p>&copy; COPYRIGHT 2024 | <span className="text-green-700 font-semibold">(503) 236-7003</span> | OR CCB# 187803</p>
      </div>
    </footer>
  );
}
