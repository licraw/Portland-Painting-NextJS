"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const pathname = usePathname();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
    setGalleryOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Reset submenus whenever toggling the entire menu
    if (!menuOpen) {
      setServicesOpen(false);
      setAboutOpen(false);
      setGalleryOpen(false);
    }
  };

  // Example "active" states:
  const isServicesActive = [
    "/painting/interior",
    "/painting/exterior",
    "/carpentry",
    "/restoration",
    "/commercial",
    "/hoa",
  ].includes(pathname);

  const isAboutActive =
    pathname === "/about-us" || pathname.startsWith("/about-us/");

  const isGalleryActive = ["/gallery/interior", "/gallery/exterior"].includes(
    pathname
  );

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

      {/* Top Nav Bar */}
      <nav className="relative z-50 bg-white">
        <div className="flex items-center justify-between px-8 lg:px-20 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 py-2">
            <Image src="/logo.svg" alt="Company Logo" width={165} height={55} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center space-x-6 text-base font-medium">
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

            {/* Services Dropdown on hover (desktop) */}
            <li className="group relative">
              <Link
                href="#"
                className={`hover:text-black transition flex items-center ${isServicesActive ? "text-black" : ""
                  }`}
              >
                Services
                <span className="ml-1 text-sm">
                  <Image
                    src="/smallArrow.svg"
                    width={16}
                    alt="Portland Painting and Restoration Logo"
                    height={16}
                    unoptimized
                  />
                </span>
              </Link>
              {/* Hover dropdown */}
              <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md rounded-md p-2 mt-0 border border-gray-200 z-20">
                <Link
                  href="/painting/interior"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/painting/interior" ? "text-black" : ""
                    }`}
                >
                  Interior Painting
                </Link>
                <Link
                  href="/painting/exterior"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/painting/exterior" ? "text-black" : ""
                    }`}
                >
                  Exterior Painting
                </Link>
                <Link
                  href="/carpentry"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/carpentry" ? "text-black" : ""
                    }`}
                >
                  Carpentry
                </Link>
                <Link
                  href="/restoration"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/restoration" ? "text-black" : ""
                    }`}
                >
                  Restoration
                </Link>
                <Link
                  href="/commercial"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/commercial" ? "text-black" : ""
                    }`}
                >
                  Commercial
                </Link>
                <Link
                  href="/hoa"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/hoa" ? "text-black" : ""
                    }`}
                >
                  HOA Services
                </Link>
              </div>
            </li>

            {/* Gallery Dropdown on hover (desktop) */}
            <li className="group relative">
              <Link
                href="#"
                className={`hover:text-black transition flex items-center ${isGalleryActive ? "text-black" : ""
                  }`}
              >
                Gallery
                <span className="ml-1 text-sm">
                  <Image
                    src="/smallArrow.svg"
                    width={16}
                    alt="Portland Painting and Restoration Logo"
                    height={16}
                    unoptimized
                  />
                </span>
              </Link>
              {/* Hover dropdown */}
              <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md rounded-md p-2 mt-0 border border-gray-200 z-20">
                <Link
                  href="/gallery/interior"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/gallery/interior" ? "text-black" : ""
                    }`}
                >
                  Interior
                </Link>
                <Link
                  href="/gallery/exterior"
                  className={`block px-4 py-2 hover:bg-gray-100 rounded-md transition ${pathname === "/gallery/exterior" ? "text-black" : ""
                    }`}
                >
                  Exterior
                </Link>
              </div>
            </li>

            {/* About Us dropdown (desktop) */}
            <li className="group relative">
              <Link
                href="#"
                className={`hover:text-black transition flex items-center ${isAboutActive ? "text-black" : ""
                  }`}
              >
                About Us
                <span className="ml-1 text-sm">
                  <Image
                    src="/smallArrow.svg"
                    width={16}
                    alt="Portland Painting and Restoration Logo"
                    height={16}
                    unoptimized
                  />
                </span>
              </Link>
              <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white shadow-md rounded-md p-2 mt-0 border border-gray-200 z-20">
                <Link
                  href="/about-us/employment"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                >
                  Employment
                </Link>
                <Link
                  href="/about-us/reviews"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                >
                  Reviews
                </Link>
                <Link
                  href="/about-us/green-and-safe"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md transition"
                >
                  Green and Safe
                </Link>
              </div>
            </li>

            <li>
              <Link
                href="/contact"
                className={`hover:text-black transition ${pathname === "/contact" ? "text-black" : ""
                  }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/save-the-planet"
                className={`hover:text-black transition ${pathname === "/save-the-planet" ? "text-green-500" : ""
                  }`}
              >
                Save The Planet
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`hover:text-black transition ${pathname === "/blogs" ? "text-black" : ""
                  }`}
              >
                Blogs
              </Link>
            </li>
          </ul>

          {/* "Get Estimate" Button (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/estimate">
              <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                Get Estimate
              </button>
            </Link>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-green-700 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Overlay (dims background) */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
            } lg:hidden`}
          onClick={toggleMenu}
          aria-hidden={!menuOpen}
        />

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close Button / Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-4">
              <Image src="/logo.svg" alt="Logo" width={120} height={45} />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-green-700 focus:outline-none"
              aria-label="Close Menu"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Mobile Nav Items */}
          <ul className="flex-1 overflow-y-auto px-4 py-6 space-y-4 text-lg">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className={`block transition ${pathname === "/" ? "text-black" : ""
                  }`}
              >
                Home
              </Link>
            </li>

            {/* Services (Accordion) */}
            <li>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center justify-between w-full text-left transition ${isServicesActive ? "text-black" : ""
                  }`}
              >
                <span>Services</span>
                <span className="ml-2 text-sm">
                  {servicesOpen ? (
                    <Image
                      className="rotate-180"
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  )}
                </span>
              </button>
              <ul
                className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${servicesOpen ? "max-h-96" : "max-h-0"
                  }`}
              >
                <li>
                  <Link
                    href="/painting/interior"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/painting/interior" ? "text-black" : ""
                      }`}
                  >
                    Interior Painting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/painting/exterior"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/painting/exterior" ? "text-black" : ""
                      }`}
                  >
                    Exterior Painting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/carpentry"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/carpentry" ? "text-black" : ""
                      }`}
                  >
                    Carpentry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/restoration"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/restoration" ? "text-black" : ""
                      }`}
                  >
                    Restoration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/commercial"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/commercial" ? "text-black" : ""
                      }`}
                  >
                    Commercial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hoa"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/hoa" ? "text-black" : ""
                      }`}
                  >
                    HOA Services
                  </Link>
                </li>
              </ul>
            </li>

            {/* Gallery (Accordion) */}
            <li>
              <button
                type="button"
                onClick={() => setGalleryOpen(!galleryOpen)}
                className={`flex items-center justify-between w-full text-left transition ${isGalleryActive ? "text-black" : ""
                  }`}
              >
                <span>Gallery</span>
                <span className="ml-2 text-sm">
                  {galleryOpen ? (
                    <Image
                      className="rotate-180"
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  )}
                </span>
              </button>
              <ul
                className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${galleryOpen ? "max-h-40" : "max-h-0"
                  }`}
              >
                <li>
                  <Link
                    href="/gallery/interior"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/gallery/interior" ? "text-black" : ""
                      }`}
                  >
                    Interior
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery/exterior"
                    onClick={toggleMenu}
                    className={`block px-2 py-1 rounded-md hover:bg-gray-100 ${pathname === "/gallery/exterior" ? "text-black" : ""
                      }`}
                  >
                    Exterior
                  </Link>
                </li>
              </ul>
            </li>

            {/* About Us (Accordion) */}
            <li>
              <button
                type="button"
                onClick={() => setAboutOpen(!aboutOpen)}
                className={`flex items-center justify-between w-full text-left transition ${isAboutActive ? "text-black" : ""
                  }`}
              >
                <span>About Us</span>
                <span className="ml-2 text-sm">
                  {aboutOpen ? (
                    <Image
                      className="rotate-180"
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/smallArrow.svg"
                      width={16}
                      height={16}
                      unoptimized
                      alt=""
                    />
                  )}
                </span>
              </button>
              <ul
                className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${aboutOpen ? "max-h-40" : "max-h-0"
                  }`}
              >
                <li>
                  <Link
                    href="/about-us/employment"
                    onClick={toggleMenu}
                    className="block px-2 py-1 rounded-md hover:bg-gray-100"
                  >
                    Employment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us/reviews"
                    onClick={toggleMenu}
                    className="block px-2 py-1 rounded-md hover:bg-gray-100"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us/green-and-safe"
                    onClick={toggleMenu}
                    className="block px-2 py-1 rounded-md hover:bg-gray-100"
                  >
                    Green and Safe
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className={`block transition ${pathname === "/contact" ? "text-black" : ""
                  }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/save-the-planet"
                onClick={toggleMenu}
                className={`block transition ${pathname === "/save-the-planet" ? "text-green-500" : ""
                  }`}
              >
                Save The Planet
              </Link>

            </li>
            <li>
              <Link
                href="/blogs"
                onClick={toggleMenu}
                className={`block transition ${pathname === "/blogs" ? "text-black" : ""
                  }`}
              >
                Blogs
              </Link>
            </li>
          </ul>

          {/* "Get Estimate" - pinned at bottom */}
          <div className="p-4 border-t border-gray-200">
            <Link href="/estimate" onClick={toggleMenu}>
              <button className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-600 transition">
                Get Estimate
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
