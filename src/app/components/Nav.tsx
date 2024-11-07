"use client";

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md">

      <div className="flex items-center space-x-4 bg-white p-2 rounded-md">
        <Image src="/logo.svg" alt="Company Logo" width={100} height={40} />
      </div>

      {/* Main navigation links */}
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>

        <li className="relative">
          <Link href="/painting" className="hover:text-gray-400 transition flex items-center">
            Painting
            <span className="ml-1 text-sm">&#9660;</span> {/* Down arrow icon */}
          </Link>
        </li>

        <li>
          <Link href="/carpentry" className="hover:text-gray-400 transition">
            Carpentry
          </Link>
        </li>

        <li>
          <Link href="/restoration" className="hover:text-gray-400 transition">
            Restoration
          </Link>
        </li>

        <li>
          <Link href="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
        </li>

        <li className="relative">
          <Link href="/about-us" className="hover:text-gray-400 transition flex items-center">
            About Us
            <span className="ml-1 text-sm">&#9660;</span> {/* Down arrow icon */}
          </Link>
        </li>

        <li className="relative">
          <Link href="/gallery" className="hover:text-gray-400 transition flex items-center">
            Gallery
            <span className="ml-1 text-sm">&#9660;</span> {/* Down arrow icon */}
          </Link>
        </li>
      </ul>

      <div className="hidden lg:flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h3l2-2h8l2 2h3v16H3V5z" />
        </svg>
        <span>(503) 236-7003</span>
      </div>
    </nav>
  );
}
