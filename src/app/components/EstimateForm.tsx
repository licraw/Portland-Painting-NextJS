"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function EstimateForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    subscribeToMailchimp: false,
    formType: "estimate",
    photos: [],
  });
  const [status, setStatus] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready. Please try again.");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("estimate_form");
    const response = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken });

    if (!response?.data?.success) {
      setStatus("Failed to verify recaptcha! You must be a robot!");
      return;
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

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: "",
          subscribeToMailchimp: false,
          formType: "estimate",
          photos: [],
        });
      } else {
        setStatus("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error submitting request.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-12 p-10 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg shadow-2xl">
      <h2 className="text-4xl font-bold text-center text-green-900">Request an Estimate</h2>
      <p className="text-center text-gray-700 mb-6">Fill out the form below and we’ll reach out soon.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <p className="text-gray-700 mb-6">We look forward to working with you on your next project.</p>
          <Image
            src="/gallery/carpentry1.jpg"
            alt="Project Image"
            width={500}
            height={400}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-700" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-700" />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-700" />
          <input type="text" name="address" placeholder="Project Address" value={formData.address} onChange={handleChange} required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-700" />
          <textarea name="overview" placeholder="Project Overview" value={formData.overview} onChange={handleChange} rows={4} required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-700"></textarea>
          <input type="file" name="photos" multiple accept="image/*" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-700" />
          <div className="flex items-center">
            <input type="checkbox" name="subscribeToMailchimp" checked={formData.subscribeToMailchimp} onChange={handleChange} className="mr-2" />
            <label className="text-gray-700">Subscribe to our newsletter for updates and discounts</label>
          </div>
          <button type="submit" className="w-full bg-green-700 text-white font-semibold py-4 rounded-lg hover:bg-green-800 transition-all">Request Estimate</button>
          <p className="text-center text-gray-700 mt-4">{status}</p>
        </form>
      </div>
    </section>
  );
}
