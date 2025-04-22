"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Buffer } from "buffer";

interface HomeLeadFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  formType: "homeLead";
  paintingAndStain: string[];
  constructionAndRestoration: string[];
  subscribeToMailchimp: boolean;
  photos: File[];
}

export default function HomeLeadForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState<HomeLeadFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    formType: "homeLead",
    paintingAndStain: [],
    constructionAndRestoration: [],
    subscribeToMailchimp: false,
    photos: [],
  });

  /* ---------- handlers ---------- */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    setFormData((prev) => {
      if (["paintingAndStain", "constructionAndRestoration"].includes(name)) {
        const current = prev[name as keyof HomeLeadFormData] as string[];
        return {
          ...prev,
          [name]: checked
            ? [...current, value]
            : current.filter((v) => v !== value),
        };
      }

      if (type === "file") {
        return { ...prev, photos: files ? Array.from(files).slice(0, 4) : [] };
      }

      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const toBase64IfSmall = async (file: File) => {
    if (file.size >= 20 * 1024 * 1024) return null; // Gmail cap safety
    const buf = Buffer.from(await file.arrayBuffer());
    return { name: file.name, content: buf.toString("base64") };
  };

  /* ---------- submit ---------- */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending Please Don't Close…");

    /* 1️⃣ recaptcha */
    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready. Try again.");
      return;
    }
    const token = await executeRecaptcha("home_lead_form");
    const rec = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken: token });
    if (!rec.data?.success) {
      setStatus("Recaptcha failed.");
      return;
    }

    try {
      /* 2️⃣ create task */
      const { photos, subscribeToMailchimp, ...jsonPayload } = formData;
      const { taskId } = await fetch("/api/createRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPayload),
      }).then((r) => r.json());

      if (!taskId) throw new Error("Task creation failed");

      /* 3️⃣ upload photos */
      for (const photo of photos) {
        const fd = new FormData();
        fd.append("photo", photo);
        await fetch(`/api/uploadPhoto?taskId=${taskId}`, {
          method: "POST",
          body: fd,
        });
      }

      /* 4️⃣ confirmation email */
      const bodyText = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Notes: ${formData.notes}`;

      const emailPhotos = (await Promise.all(photos.map(toBase64IfSmall))).filter(Boolean);

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          formType: formData.formType,
          bodyText,
          photos: emailPhotos,
        }),
      });

      /* 5️⃣ mailchimp */
      if (subscribeToMailchimp) {
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

      /* 6️⃣ reset */
      setStatus("Request sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
        formType: "homeLead",
        paintingAndStain: [],
        constructionAndRestoration: [],
        subscribeToMailchimp: false,
        photos: [],
      });
      setFileInputKey(Date.now());
    } catch (err) {
      console.error(err);
      setStatus("Error submitting request.");
    }
  };

  /* ---------- UI ---------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 bg-white shadow-2xl rounded-lg max-w-4xl mx-auto border border-gray-200 space-y-6"
    >
      <h2 className="text-4xl font-bold text-center text-green-900">Estimate Form</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          className="p-4 border rounded-lg w-full"
          required
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="p-4 border rounded-lg w-full"
          required
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <input
        className="p-4 border rounded-lg w-full"
        required
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        className="p-4 border rounded-lg w-full"
        required
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      {/* painting & stain */}
      <div>
        <h3 className="text-xl font-semibold">Painting & Stain</h3>
        <p className="text-sm text-gray-600">Click all that apply</p>
        {["Interior", "Exterior", "Deck", "Paint", "Stain"].map((item) => (
          <label key={item} className="block">
            <input
              className="mr-2"
              type="checkbox"
              name="paintingAndStain"
              value={item}
              checked={formData.paintingAndStain.includes(item)}
              onChange={handleChange}
            />
            {item}
          </label>
        ))}
      </div>

      {/* construction & restoration */}
      <div>
        <h3 className="text-xl font-semibold">Construction & Restoration</h3>
        <p className="text-sm text-gray-600">Click all that apply</p>
        {[
          "Restoration: Extensive Preparations & Repairs",
          "Paint Removal",
          "Repairs- Minor",
          "Repairs- Large scope",
          "Deck",
          "Fence",
          "Arbor, trellis, planter box, etc",
          "Renovation/Remodel",
          "Kitchen",
          "Bath",
          "Custom",
        ].map((item) => (
          <label key={item} className="block">
            <input
              className="mr-2"
              type="checkbox"
              name="constructionAndRestoration"
              value={item}
              checked={formData.constructionAndRestoration.includes(item)}
              onChange={handleChange}
            />
            {item}
          </label>
        ))}
      </div>

      <textarea
        className="p-4 border rounded-lg w-full"
        name="notes"
        placeholder="Notes"
        rows={4}
        value={formData.notes}
        onChange={handleChange}
      />

      {/* photos */}
      <div>
        <label className="block text-gray-700">Upload up to 4 Photos (optional)</label>
        <input
          key={fileInputKey}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          type="file"
          name="photos"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800"
      >
        Submit
      </button>

      <p className="text-center text-gray-700">{status}</p>
    </form>
  );
}
