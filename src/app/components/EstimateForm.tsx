'use client';
import Image from "next/image";
import { useState } from "react";

export default function EstimateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: ""
        });
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Error sending email.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-4 p-6 bg-white border rounded-lg shadow-md flex flex-col md:flex-row gap-8">
      {/* Left Side: Image and Text */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-700 mb-6">
          Once we receive your request, our estimators will promptly contact you. We eagerly anticipate collaborating with you on your upcoming project.
        </p>
        <Image
          src="/gallery/carpentry1.jpg"
          alt="Project Image"
          width={500}
          height={400}
          className="rounded-lg shadow-lg mb-4 mx-auto"
        />
        <p className="text-xl font-semibold">Thank You For Your Interest!</p>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 bg-gray-100 p-6 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Project Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Project Overview*</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">
              Want a promo code to receive a discount? Sign up for our newsletter and get money off your estimate!
            </label>
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              placeholder="Promo Code"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <button type="submit" className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition">
            Request Estimate
          </button>
          <p className="text-center text-gray-700 mt-4">{status}</p>
        </form>
      </div>
    </section>
  );
}
