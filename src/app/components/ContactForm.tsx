"use client";

import { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    subscribeToMailchimp: true,
    howDidYouFindUs: "",
    formType: "contact",
    photos: [] as File[],
  });

  /* ----------------------- helpers ----------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        photos: files ? Array.from(files).slice(0, 4) : [],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const toBase64IfSmall = async (file: File) => {
    if (file.size >= 20 * 1024 * 1024) return null; // Gmail 25 MB limit
    const buf = Buffer.from(await file.arrayBuffer());
    return { name: file.name, content: buf.toString("base64") };
  };

  /* ----------------------- submit ----------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending Please Don't Close…");

    /* 1️⃣ recaptcha */
    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready. Try again.");
      return;
    }
    const token = await executeRecaptcha("contact_form");
    const recRes = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken: token });
    if (!recRes.data?.success) {
      setStatus("Recaptcha failed.");
      return;
    }

    /* optional gtag */
    window.gtag?.("event", "conversion", {
      send_to: "AW-1016197559/cB8cCMGRj6MaELfjx-QD",
      value: 1.0,
      currency: "USD",
    });

    try {
      /* 2️⃣ create Asana task (no photos) */
      const { photos, subscribeToMailchimp, ...jsonPayload } = formData;
      const createRes = await fetch("/api/createRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPayload),
      }).then((r) => r.json());

      if (!createRes.taskId) throw new Error("Task creation failed");

      /* 3️⃣ upload each photo */
      for (const file of photos) {
        const fd = new FormData();
        fd.append("photo", file);
        await fetch(`/api/uploadPhoto?taskId=${createRes.taskId}`, {
          method: "POST",
          body: fd,
        });
      }

      /* 4️⃣ send confirmation email */
      const bodyText = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.overview}`;

      const emailPhotos = (
        await Promise.all(photos.map(toBase64IfSmall))
      ).filter(Boolean);

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

      /* 5️⃣ Mailchimp subscribe */
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
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        overview: "",
        promoCode: "",
        subscribeToMailchimp: true,
        howDidYouFindUs: "",
        formType: "contact",
        photos: [],
      });
      setFileInputKey(Date.now());
    } catch (err) {
      console.error(err);
      setStatus("Error submitting request.");
    }
  };

  /* ----------------------- UI ----------------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-10 rounded-lg shadow-2xl max-w-4xl mx-auto border border-gray-200"
    >
      <h2 className="text-4xl font-bold text-center text-green-900">Get In Touch</h2>
      <p className="text-center text-gray-700 mb-6">
        We’d love to hear from you. Fill out the form below and we’ll get back to you soon.
      </p>

      {/* name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          required
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          required
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* phone */}
      <input
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        required
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      {/* message */}
      <textarea
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        required
        name="overview"
        placeholder="Your Message"
        rows={4}
        value={formData.overview}
        onChange={handleChange}
      />

      {/* photos */}
      <div>
        <label className="block text-gray-700">Upload up to 4 Photos (optional)</label>
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

      {/* how did you find us */}
      <div className="flex flex-col">
        <label htmlFor="howDidYouFindUs" className="text-gray-700 mb-2">
          How did you find us?
        </label>
        <select
          id="howDidYouFindUs"
          name="howDidYouFindUs"
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          required
          value={formData.howDidYouFindUs}
          onChange={handleChange}
        >
          <option value="" disabled>Select an option</option>
          <option value="1209743111880011">Google</option>
          <option value="1209743111880012">Yelp</option>
          <option value="1209743111880013">Nextdoor</option>
          <option value="1209744980063491">Houzz</option>
          <option value="1209743111880014">Facebook</option>
          <option value="1209743111880015">Email</option>
          <option value="1209743111880016">Friend / Neighbor</option>
          <option value="1209743111880017">Other</option>
        </select>
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
