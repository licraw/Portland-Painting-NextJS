"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverPainting, setHoverPainting] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md relative">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-4 bg-white p-2 rounded-md">
        <Image src="/logo.svg" alt="Company Logo" width={100} height={40} />
      </Link>

      {/* Main Navigation Links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 text-base font-medium absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent px-8 lg:px-0 py-4 lg:py-0 z-10`}
      >
        <li>
          <Link
            href="/"
            className={`hover:text-gray-400 transition ${
              pathname === "/" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setHoverPainting(true)}
          onMouseLeave={() => setHoverPainting(false)}
        >
          <Link
            href="#"
            className={`hover:text-gray-400 transition flex items-center ${
              pathname === "/painting" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Painting
            <span className="ml-1 text-sm">&#9660;</span>
          </Link>
          {/* Sub Navigation */}
          {hoverPainting && (
            <ul className="absolute left-0 top-full bg-gray-800 shadow-md rounded-md p-2 space-y-2">
              <li>
                <Link
                  href="/painting/interior"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md transition"
                >
                  Interior
                </Link>
              </li>
              <li>
                <Link
                  href="/painting/exterior"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md transition"
                >
                  Exterior
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            href="/carpentry"
            className={`hover:text-gray-400 transition ${
              pathname === "/carpentry" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Carpentry
          </Link>
        </li>
        <li>
          <Link
            href="/restoration"
            className={`hover:text-gray-400 transition ${
              pathname === "/restoration" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Restoration
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`hover:text-gray-400 transition ${
              pathname === "/contact" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/about-us"
            className={`hover:text-gray-400 transition flex items-center ${
              pathname === "/about-us" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className={`hover:text-gray-400 transition flex items-center ${
              pathname === "/gallery" ? "underline underline-offset-4 decoration-2 decoration-white" : ""
            }`}
          >
            Gallery
          </Link>
        </li>
      </ul>

      {/* Hamburger Icon (Mobile Only) */}
      <button onClick={toggleMenu} className="text-white focus:outline-none lg:hidden">
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Contact (Desktop Only) */}
      <div className="hidden lg:flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h3l2-2h8l2 2h3v16H3V5z"
          />
        </svg>
        <span>(503) 236-7003</span>
      </div>
    </nav>
  );
}
