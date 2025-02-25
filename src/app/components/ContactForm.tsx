"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: (string | number | boolean | object)[]) => void;
  }
}
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // Add fileInputKey to help reset file input display
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    subscribeToMailchimp: false,
    formType: "contact",
    photos: [],
  });
  const [status, setStatus] = useState("");

  // @ts-expect-error - no types for event
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? Array.from(files) : [],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready. Please try again.");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("contact_form");
    const response = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken });

    if (!response?.data?.success) {
      setStatus("Failed to verify recaptcha! You must be a robot!");
      return;
    }

  
    if (window.gtag) {
      window.gtag('event', 'conversion', {
          'send_to': 'AW-1016197559/cB8cCMGRj6MaELfjx-QD',
          'value': 1.0,
          'currency': 'USD'
      });
  } else {
      console.error("gtag is not defined");
  }



    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photos" && Array.isArray(value)) {
          value.forEach((file) => formDataToSend.append("photos", file));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      const result = await fetch("/api/createAsanaTask", {
        method: "POST",
        body: formDataToSend,
      }).then((res) => res.json());

      if (result.success) {
        setStatus("Request successfully submitted!");
        if (formData.subscribeToMailchimp) {
          await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.name.split(" ")[0],
              lastName: formData.name.split(" ")[1] || "",
            }),
          });
        }
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: "",
          subscribeToMailchimp: false,
          formType: "contact",
          photos: [],
        });
        // Force file input to reset
        setFileInputKey(Date.now());
      } else {
        setStatus("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error submitting request.");
    }
  };

  return (
    <form
      className="space-y-6 bg-white p-10 rounded-lg shadow-2xl max-w-4xl mx-auto border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-bold text-center text-green-900">Get In Touch</h2>
      <p className="text-center text-gray-700 mb-6">
        We’d love to hear from you. Fill out the form below and we’ll get back to you soon.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        />
      </div>

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

      <textarea
        name="overview"
        placeholder="Your Message"
        value={formData.overview}
        onChange={handleChange}
        rows={4}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      ></textarea>

      <div>
        <label className="block text-gray-700">Upload 1 Photo (Optional)</label>
        {/* key prop forces re-mount when fileInputKey changes */}
        <input
          key={fileInputKey}
          type="file"
          name="photos"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="subscribeToMailchimp"
          checked={formData.subscribeToMailchimp}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">
          Subscribe to our newsletter for updates and discounts
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800 transition-all"
      >
        Send Message
      </button>

      <p className="text-center text-gray-700 mt-4">{status}</p>
    </form>
  );
}
