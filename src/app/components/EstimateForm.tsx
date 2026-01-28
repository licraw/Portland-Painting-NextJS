"use client";

import { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function EstimateForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    zipCode: "",
    promoCode: "",
    howDidYouFindUs: "",
    subscribeToMailchimp: true,
    formType: "estimate",
    photos: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file") {
      const selected = files ? Array.from(files).slice(0, 4) : [];
      setFormData((p) => ({ ...p, [name]: selected }));
    } else {
      setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending Please Don't Close…");

    // recaptcha
    if (!executeRecaptcha) {
      setStatus("Recaptcha not ready, try again.");
      return;
    }
    const token = await executeRecaptcha("estimate_form");
    const recRes = await axios.post("/api/verifyRecaptcha", { gRecaptchaToken: token });
    if (!recRes.data?.success) {
      setStatus("Recaptcha failed.");
      return;
    }

    // build JSON payload (no photos)
    const {
      photos,
      subscribeToMailchimp,
      ...jsonPayload
    } = formData as typeof formData & { photos: File[] };

    try {
      // 1️⃣ create Asana task
      const taskRes = await fetch("/api/createRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPayload),
      }).then((r) => r.json());

      if (!taskRes.taskId) throw new Error("task create failed");

      // 2️⃣ upload each photo
      for (const photo of photos) {
        const fd = new FormData();
        fd.append("photo", photo);
        await fetch(`/api/uploadPhoto?taskId=${taskRes.taskId}`, {
          method: "POST",
          body: fd,
        });
      }

      // 3️⃣ send confirmation email (small payload)
      const bodyText = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Project Overview: ${formData.overview}
Promo Code: ${formData.promoCode || "None"}`;

      // send only tiny previews (<20 MB each) if needed
      const photosForEmail = await Promise.all(
        photos.map(async (f) => ({
          name: f.name,
          content: (await f.arrayBuffer()).byteLength < 20 * 1024 * 1024
            ? Buffer.from(await f.arrayBuffer()).toString("base64")
            : "",
        }))
      );

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          formType: formData.formType,
          bodyText,
          photos: photosForEmail.filter((p) => p.content),
        }),
      });

      // optional Mailchimp subscribe
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

      setStatus("Request sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        overview: "",
        promoCode: "",
        zipCode: "",
        howDidYouFindUs: "",
        subscribeToMailchimp: true,
        formType: "estimate",
        photos: [],
      });
      setFileInputKey(Date.now());
    } catch (err) {
      console.error(err);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="address"
          placeholder="Project Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
        />
      </div>

      <textarea
        name="overview"
        placeholder="Project Overview"
        value={formData.overview}
        onChange={handleChange}
        rows={4}
        required
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

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

      <input
        type="text"
        name="promoCode"
        placeholder="Enter Promo Code"
        value={formData.promoCode}
        onChange={handleChange}
        className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
      />

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
          <option value="" disabled>Select an option</option>
          <option value="1212483327157304">Previous client</option>
          <option value="1212884250991075">Friend/neighbor</option>
          <option value="1212483327157302">Google</option>
          <option value="1212483327157309">YELP</option>
          <option value="1212884250991072">Nextdoor</option>
          <option value="1212884250991073">Houzz</option>
          <option value="1212884250991074">Facebook</option>
          <option value="1212884250991076">HS Convention center</option>
          <option value="1212884250991077">HS Expo</option>
          <option value="1212483327157305">Contacted US - Comm managers</option>
          <option value="1212483327157306">Contacted US - Comm Residents</option>
          <option value="1212483327157307">CAI - Comm</option>
          <option value="1212483327157308">OWCAM - Comm</option>
          <option value="1212888118985266">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800 transition-all"
      >
        Request Estimate
      </button>

      <p className="text-center text-gray-700 mt-4">{status}</p>
    </form>
  );
}
