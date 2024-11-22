"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  //@ts-expect-error use e
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
//@ts-expect-error use e
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log("Form Data:", formData);
    setTimeout(() => {
      setStatus("Message sent successfully!");
    }, 1000);
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
        <label className="block text-gray-700">Message*</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          rows={4}
          required
        ></textarea>
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
