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
}

export default function HomeLeadForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState<HomeLeadFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    formType: "homeLead",
    paintingAndStain: [],
    constructionAndRestoration: [],
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name as keyof HomeLeadFormData].includes(value)
          ? (prevData[name as keyof HomeLeadFormData] as string[]).filter((item) => item !== value)
          : [...(prevData[name as keyof HomeLeadFormData] as string[]), value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
  
    // Convert form state to FormData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("notes", formData.notes);
    formDataToSend.append("formType", formData.formType);
  
    // Append checkbox values (multiple selections)
    formData.paintingAndStain.forEach((item) => formDataToSend.append("paintingAndStain[]", item));
    formData.constructionAndRestoration.forEach((item) =>
      formDataToSend.append("constructionAndRestoration[]", item)
    );
  
    try {
      const result = await fetch("/api/createAsanaTask", {
        method: "POST",
        body: formDataToSend, // ✅ Send as FormData
      }).then((res) => res.json());
  
      if (result.success) {
        setStatus("Request successfully submitted!");
  
        // Reset form data
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          notes: "",
          formType: "homeLead",
          paintingAndStain: [],
          constructionAndRestoration: [],
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

      <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} rows={4} className="p-4 border rounded-lg w-full"></textarea>

      <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800">
        Submit
      </button>

      <p className="text-center text-gray-700">{status}</p>
    </form>
  );
}
