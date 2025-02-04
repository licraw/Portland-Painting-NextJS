'use client';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import React from 'react';
import { useState } from 'react';
import Link from "next/link";


export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('Sending...');
  console.log("Form submitted");

  if (!executeRecaptcha) {
    return;
  }

  const gRecaptchaToken = await executeRecaptcha('contact_form');

  const response = await axios({
    method: "post",
    url: "/api/verifyRecaptcha",
    data: {
      gRecaptchaToken,
    },
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  if (response?.data?.success === true) {
    console.log(`Success with score: ${response?.data?.score}`);
  } else {
    console.log(`Failure with score: ${response?.data?.score}`);
    return;
  }

  const subscribeResponse = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
    }),
  });

  if (subscribeResponse.status === 200) {
    setStatus('Success! 🎉');
    setEmail('');
    setTimeout(() => {
      setStatus('');
    }, 5000);
  } else {
    setStatus('Failed to subscribe. 😢');
  }

}




  return (
    <footer className="bg-[#0D120D] text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Newsletter Signup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-700 pb-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Never miss an update</h3>
            <p className="text-gray-400 text-sm">
              Get all the latest news, blog posts, and service updates from Portland, delivered directly to your inbox.
              <br /> We’ll rarely send more than one email a month.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 md:mt-0 flex items-center space-x-3">
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email address"
              className="p-2 w-64 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">Submit</button>
            <p className="text-sm">{status}</p>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Company Description */}
          <div>
            <h3 className="text-xl font-semibold">Portland Painting & Restoration</h3>
            <p className="text-gray-400 mt-2">
              Portland Painting and Restoration is a licensed, bonded, and insured professional contractor in Oregon and Washington.
              Offering all the services within the painting industry, we will meet and exceed all OSHA safety regulations, and all work
              performed will meet or exceed PDCA standards and practices.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold">Services</h4>
              <ul className="mt-2 space-y-1 text-gray-400">
                <li><Link href="/painting/interior">Painting</Link></li>
                 <li><Link href="/carpentry">Carpentry</Link></li>
                <li><Link href="/restoration">Restoration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-2 space-y-1 text-gray-400">
                <li><Link href="/about-us/reviews">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/projects">Projects</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold">Contact Us</h4>
            <p className="text-gray-400 mt-2">
              <a href="tel:5032367003" className="text-gray-400 hover:text-white">(503) 236-7003</a>
              <br />
              918 SE Stephens St, Portland, OR 97214
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center text-gray-500 text-xs mt-10">
          © 2024 Portland Painting & Restoration. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
