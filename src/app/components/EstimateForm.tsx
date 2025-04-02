"use client";

import { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function EstimateForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // This key resets the file input label after successful submission
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    howDidYouFindUs: "", // new field for the custom field "How did you find us?"
    subscribeToMailchimp: true,
    formType: "estimate",
    photos: [] as File[],
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file") {
      // Only accept up to three files.
      const selectedFiles = files ? Array.from(files).slice(0, 4) : [];
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFiles,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        // Show popup if the server indicates photos were not attached.
        if (result.message.includes("without photos")) {
          alert("Sorry, unable to send photos. Estimate request sent without photos.");
        }
        setStatus(result.message);

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

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: "",
          howDidYouFindUs: "",
          subscribeToMailchimp: false,
          formType: "estimate",
          photos: [],
        });
        // Reset file input label
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
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-10 rounded-lg shadow-2xl max-w-4xl mx-auto border border-gray-200 my-12"
    >
      <h2 className="text-4xl font-bold text-center text-green-900">
        Request an Estimate
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Fill out the form below and we’ll reach out soon.
      </p>

      {/* Name + Email */}
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

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

      {/* Address */}
      <input
        type="text"
        name="address"
        placeholder="Project Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

      {/* Project Overview */}
      <textarea
        name="overview"
        placeholder="Project Overview"
        value={formData.overview}
        onChange={handleChange}
        rows={4}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      ></textarea>

      {/* File Input */}
      <div>
        <label className="block text-gray-700">Upload up to 4 Photos (Optional)</label>
        <input
          key={fileInputKey}
          type="file"
          name="photos"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* Promo Code */}
      <input
        type="text"
        name="promoCode"
        placeholder="Enter Promo Code"
        value={formData.promoCode}
        onChange={handleChange}
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

      {/* How Did You Find Us? */}
      <div className="flex flex-col">
        <label htmlFor="howDidYouFindUs" className="text-gray-700 mb-2">
          How did you find us?
        </label>
        <select
          id="howDidYouFindUs"
          name="howDidYouFindUs"
          value={formData.howDidYouFindUs}
          onChange={handleChange}
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="1209743111880011">Google</option>
          <option value="1209743111880012">Yelp</option>
          <option value="1209743111880013">Nextdoor</option>
          <option value="1209744980063491">Houzz</option>
          <option value="1209743111880014">Facebook</option>
          <option value="1209743111880015">Email</option>
          <option value="1209743111880016">friend / neighbor</option>
          <option value="1209743111880017">other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800 transition-all"
      >
        Request Estimate
      </button>

      {/* Status Message */}
      <p className="text-center text-gray-700 mt-4">{status}</p>
    </form>
  );
}
