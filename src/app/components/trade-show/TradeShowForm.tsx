"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface HomeLeadFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  formType: string;
  paintingAndStain: string[];
  constructionAndRestoration: string[];
  subscribeToMailchimp: boolean;
  photos: File[]; // Added photos array
}

export default function HomeLeadForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  // Add fileInputKey to help reset file input display
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [formData, setFormData] = useState<HomeLeadFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    formType: "homeLead",
    subscribeToMailchimp: false,
    paintingAndStain: [],
    constructionAndRestoration: [],
    photos: [], // Initialize photos
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
  
    setFormData((prevData) => {
      // Ensure checkbox fields are handled as arrays
      if (["paintingAndStain", "constructionAndRestoration"].includes(name)) {
        const currentArray = Array.isArray(prevData[name as keyof HomeLeadFormData])
          ? (prevData[name as keyof HomeLeadFormData] as string[])
          : [];
  
        return {
          ...prevData,
          [name]: checked
            ? [...currentArray, value] // Add if checked
            : currentArray.filter((item) => item !== value), // Remove if unchecked
        };
      }
  
      // Handle file inputs
      if (type === "file") {
        return {
          ...prevData,
          [name]: files ? Array.from(files) : [],
        };
      }
  
      // Handle other inputs (text, email, etc.)
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready. Please try again.");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("home_lead_form");
    const response = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken });

    if (!response?.data?.success) {
      setStatus("Failed to verify reCAPTCHA! You must be a robot!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("notes", formData.notes);
    formDataToSend.append("formType", formData.formType);
    formDataToSend.append("paintingAndStain", formData.paintingAndStain.join(","));
    formDataToSend.append("constructionAndRestoration", formData.constructionAndRestoration.join(","));

    // Append photo file if it exists
    formData.photos.forEach((file) => formDataToSend.append("photos", file));

    try {
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
          notes: "",
          formType: "homeLead",
          subscribeToMailchimp: false,
          paintingAndStain: [],
          constructionAndRestoration: [],
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
    <form onSubmit={handleSubmit} className="p-10 bg-white shadow-2xl rounded-lg max-w-4xl mx-auto border border-gray-200 space-y-6">
      <h2 className="text-4xl font-bold text-center text-green-900">Home Lead Form</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="p-4 border rounded-lg w-full" />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="p-4 border rounded-lg w-full" />
      </div>

      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="p-4 border rounded-lg w-full" />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="p-4 border rounded-lg w-full" />

      {/* Painting & Stain Section */}
      <h3 className="text-xl font-semibold">Painting & Stain</h3>
      {["Interior", "Exterior", "Deck", "Paint Stain", "Paint Removal", "Restoration: Extensive Preparations & Repairs"].map((item) => (
        <label key={item} className="block">
          <input type="checkbox" name="paintingAndStain" value={item} onChange={handleChange} checked={formData.paintingAndStain.includes(item)} className="mr-2" />
          {item}
        </label>
      ))}

      {/* Construction & Restoration Section */}
      <h3 className="text-xl font-semibold">Construction & Restoration</h3>
      {[
        "Repairs- Minor",
        "Repairs- Large scope",
        "Deck",
        "Fence",
        "Arbor, trellis, planter box, etc",
        "Renovation/Remodel",
        "Kitchen",
        "Bath",
        "Design Build",
        "Additions",
        "Custom",
      ].map((item) => (
        <label key={item} className="block">
          <input type="checkbox" name="constructionAndRestoration" value={item} onChange={handleChange} checked={formData.constructionAndRestoration.includes(item)} className="mr-2" />
          {item}
        </label>
      ))}

      {/* Notes Field */}
      <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} rows={4} className="p-4 border rounded-lg w-full"></textarea>

      {/* Photo Upload Input (Identical to ContactForm) */}
      <div>
        <label className="block text-gray-700">Upload 1 Photo (Optional)</label>
        <input
          key={fileInputKey}
          type="file"
          name="photos"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* Subscribe Checkbox */}
      <div className="flex items-center">
        <input type="checkbox" name="subscribeToMailchimp" checked={formData.subscribeToMailchimp} onChange={handleChange} className="mr-2" />
        <label className="text-gray-700">Subscribe to our newsletter for updates and discounts</label>
      </div>

      <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800">
        Submit
      </button>

      <p className="text-center text-gray-700">{status}</p>
    </form>
  );
}
