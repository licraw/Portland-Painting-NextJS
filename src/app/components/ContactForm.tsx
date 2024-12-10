"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    subscribeToMailchimp: false,
    formType: "contact",
  });
  const [status, setStatus] = useState("");

  //@ts-expect-error use e
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //@ts-expect-error use e
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
        setStatus("Message sent successfully!");

        if (formData.subscribeToMailchimp) {
          await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.name.split(" ")[0],
              lastName: formData.name.split(" ")[1] || "",
            }),
          });
        }

        // Reset the form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: "",
          subscribeToMailchimp: false,
          formType: "contact",
        });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Error sending message.");
    }
  };

  return (
    <form className="space-y-4 bg-gray-100 p-6 rounded-lg" onSubmit={handleSubmit}>
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
        <label className="block text-gray-700">Promo Code</label>
        <input
          type="text"
          name="promoCode"
          value={formData.promoCode}
          onChange={handleChange}
          placeholder="Promo Code"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
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
        className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
      >
        Send Message
      </button>
      <p className="text-center text-gray-700 mt-4">{status}</p>
    </form>
  );
}
