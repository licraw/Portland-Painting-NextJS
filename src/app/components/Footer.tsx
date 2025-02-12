"use client";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!executeRecaptcha) {
      return;
    }

    // 1) Get reCAPTCHA token
    const gRecaptchaToken = await executeRecaptcha("contact_form");

    // 2) Verify reCAPTCHA token
    const response = await axios.post("/api/verifyRecaptcha", {
      gRecaptchaToken
    });

    if (response?.data?.success !== true) {
      console.error(`reCAPTCHA validation failed with score: ${response?.data?.score}`);
      setStatus("Failed reCAPTCHA. 😢");
      return;
    }

    // 3) Handle subscription
    const subscribeResponse = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (subscribeResponse.status === 200) {
      setStatus("Success! 🎉");
      setEmail("");
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } else {
      setStatus("Failed to subscribe. 😢");
    }
  };

  return (
    <footer className="bg-[#0D120D] text-white py-10">
      <div className="mx-auto px-6 lg:px-20">
        {/* Top: Newsletter Signup */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-700 pb-6 mb-6 gap-6">
          {/* Left side: Text */}
          <div className="lg:w-1/2">
            <h3 className="text-xl font-semibold">Never miss an update</h3>
            <p className="text-gray-400 text-sm mt-2">
              Get all the latest news, blog post and services updates from Portland, delivered directly to your inbox.
              <br />
              We’ll rarely send more than one email a month.
            </p>
          </div>
          {/* Right side: Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4 lg:w-1/2"
          >
            <input
              onChange={handleChange}
              type="email"
              value={email}
              placeholder="Email address"
              className="p-2 w-full sm:w-auto flex-grow rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              Submit
            </button>
            {status && <p className="text-sm text-gray-400">{status}</p>}
          </form>
        </div>

        {/* Middle: Company Info */}
        <div className="border-b border-gray-700 pb-6 mb-6">
          <h3 className="text-xl font-semibold">Portland Painting & Restoration</h3>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Portland Painting and Restoration is a licensed, bonded, and insured 
            professional contractor in Oregon and Washington. Offering all the services 
            within the painting industry, we will meet and exceed all OSHA safety regulations, 
            and all work performed will meet or exceed PDCA standards and practices.
          </p>
        </div>

        {/* Bottom: 3-Column Links + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {/* Services */}
          <div>
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>
                <Link href="/painting/interior" className="hover:text-white">
                  Painting
                </Link>
              </li>
              <li>
                <Link href="/carpentry" className="hover:text-white">
                  Carpentry
                </Link>
              </li>
              <li>
                <Link href="/restoration" className="hover:text-white">
                  Restoration
                </Link>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>
                <Link href="/about-us/green-and-safe" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-semibold">Contact Us</h4>
            <p className="text-gray-400 mt-2 leading-relaxed">
              <a href="tel:5032367003" className="hover:text-white">
                (503) 236-7003
              </a>
              <br />
              918 SE Stephens St. Portland, OR 97214
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs mt-10">
          © 2024 Portland Painting & Restoration. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
