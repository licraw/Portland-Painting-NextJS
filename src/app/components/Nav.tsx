"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverPainting, setHoverPainting] = useState(false);
  const [hoverAboutUs, setHoverAboutUs] = useState(false);
  const [hoverGallery, setHoverGallery] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <style jsx>{`
        li {
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 25.2px;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #07070780;
        }
        li:active {
          color: black;
        }
      `}</style>
      <nav className="flex flex-col bg-white shadow-md relative">
        {/* Main Navigation */}
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 py-2">
            <Image src="/logo.svg" alt="Company Logo" width={150} height={50} />
          </Link>

          {/* Main Navigation Links */}
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 text-base font-medium absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent px-8 lg:px-0 py-4 lg:py-0 z-10`}
          >
            <li>
              <Link
                href="/"
                className={`hover:text-black transition ${
                  pathname === "/" ? "text-black" : ""
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
                className={`transition flex items-center ${
                  pathname === "/painting/interior" ||
                  pathname === "/painting/exterior"
                    ? "text-black"
                    : ""
                }`}
              >
                Painting
                <span className="ml-1 text-sm">&#9660;</span>
              </Link>
              {/* Sub Navigation */}
              {hoverPainting && (
                <ul className="absolute left-0 top-full bg-white shadow-md rounded-md p-2 space-y-2 border border-gray-200">
                  <li>
                    <Link
                      href="/painting/interior"
                      className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition
                        ${pathname === "/painting/interior" ? "text-black" : ""}
                        `}
                    >
                      Interior
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/painting/exterior"
                      className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition
                        ${
                          pathname === "/painting/exterior" ? "text-black" : ""
                        }`}
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
                className={`hover:text-black transition ${
                  pathname === "/carpentry" ? "text-black" : ""
                }`}
              >
                Carpentry
              </Link>
            </li>
            <li>
              <Link
                href="/restoration"
                className={`hover:text-black transition ${
                  pathname === "/restoration" ? "text-black" : ""
                }`}
              >
                Restoration
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-black transition ${
                  pathname === "/contact" ? "text-black" : ""
                }`}
              >
                Contact
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setHoverAboutUs(true)}
              onMouseLeave={() => setHoverAboutUs(false)}
            >
              <Link
                href="#"
                className={`transition flex items-center ${
                  pathname === "/about-us" ? "text-black" : ""
                }`}
              >
                About Us
                <span className="ml-1 text-sm">&#9660;</span>
              </Link>
              {/* Sub Navigation */}
              {hoverAboutUs && (
                <ul className="absolute left-0 top-full bg-white shadow-md rounded-md p-2 space-y-2 border border-gray-200">
                  <li>
                    <Link
                      href="/about-us/employment"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                    >
                      Employment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us/reviews"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us/green-and-safe"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                    >
                      Green and Safe
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setHoverGallery(true)}
              onMouseLeave={() => setHoverGallery(false)}
            >
              <Link
                href="#"
                className={`transition flex items-center ${
                  pathname === "/gallery/interior" ||
                  pathname === "/gallery/exterior"
                    ? "text-black"
                    : ""
                }`}
              >
                Gallery
                <span className="ml-1 text-sm">&#9660;</span>
              </Link>
              {/* Sub Navigation */}
              {hoverGallery && (
                <ul className="absolute left-0 top-full bg-white shadow-md rounded-md p-2 space-y-2 border border-gray-200">
                  <li>
                    <Link
                      href="/gallery/interior"
                      className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition
                        ${
                          pathname === "/gallery/interior" ? "text-black" : ""
                        }`}
                    >
                      Interior
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gallery/exterior"
                      className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition
                        ${
                          pathname === "/gallery/exterior" ? "text-black" : ""
                        }`}
                    >
                      Exterior
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Hamburger Icon (Mobile Only) */}
          <button
            onClick={toggleMenu}
            className="text-green-700 focus:outline-none lg:hidden"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Contact (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/estimate">
              <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                Get An Estimate
              </button>
            </Link>
            </div>
        </div>
      </nav>
    </>
  );
}
