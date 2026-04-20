"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface HomeLeadFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  notes: string;
  preferredDays: string[];
  preferredTimeOfDay: string;
  schedulingNotes: string;
  formType: "homeLead";
  paintingAndStain: string[];
  constructionAndRestoration: string[];
  subscribeToMailchimp: boolean;
  photos: File[];
}

export default function HomeLeadForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState<HomeLeadFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    notes: "",
    preferredDays: [],
    preferredTimeOfDay: "",
    schedulingNotes: "",
    formType: "homeLead",
    paintingAndStain: [],
    constructionAndRestoration: [],
    subscribeToMailchimp: false,
    photos: [],
  });

  /* ---------- handlers ---------- */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;

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

      if (name === "preferredDays" && type === "checkbox") {
        const current = prev.preferredDays ?? [];
        return {
          ...prev,
          preferredDays: checked
            ? Array.from(new Set([...current, value]))
            : current.filter((d) => d !== value),
        };
      }

      if (type === "file") {
        return { ...prev, photos: files ? Array.from(files).slice(0, 4) : [] };
      }

      const normalizedValue = name === "zipCode" ? value.replace(/\s+/g, "") : value;
      return { ...prev, [name]: type === "checkbox" ? checked : normalizedValue };
    });
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

      const emailFd = new FormData();
      emailFd.append("name", formData.name);
      emailFd.append("email", formData.email);
      emailFd.append("formType", formData.formType);
      emailFd.append("bodyText", bodyText);
      emailFd.append("asanaTaskId", taskId);
      photos.forEach((p) => {
        if (p.size <= 2 * 1024 * 1024) emailFd.append("photos", p);
      });

      await fetch("/api/sendEmail", {
        method: "POST",
        body: emailFd,
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
        zipCode: "",
        notes: "",
        preferredDays: [],
        preferredTimeOfDay: "",
        schedulingNotes: "",
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

      <div>
        <input
          className="p-4 border rounded-lg w-full"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          autoComplete="street-address"
          aria-describedby="home-lead-address-help"
        />
        <p id="home-lead-address-help" className="mt-2 text-xs text-gray-600">
          Used for scheduling/logistics only.
        </p>
      </div>

      <input
        className="p-4 border rounded-lg w-full mt-4"
        required
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={handleChange}
        inputMode="numeric"
        autoComplete="postal-code"
        pattern="[0-9]{5}(-[0-9]{4})?"
        title="Enter a 5-digit ZIP code (or ZIP+4)."
      />

      <fieldset className="space-y-4 border border-gray-200 rounded-lg p-6">
        <legend className="px-2 text-gray-700 font-medium">
          Scheduling Preferences (Optional)
        </legend>

        <div>
          <p className="text-sm text-gray-600 mb-2">Preferred days</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="preferredDays"
                  value={day}
                  checked={formData.preferredDays.includes(day)}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="preferredTimeOfDay" className="text-sm text-gray-600 mb-2">
            Preferred time of day
          </label>
          <select
            id="preferredTimeOfDay"
            name="preferredTimeOfDay"
            value={formData.preferredTimeOfDay}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
          >
            <option value="">Select an option (optional)</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Anytime">Anytime</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="schedulingNotes" className="text-sm text-gray-600 mb-2">
            Scheduling notes
          </label>
          <textarea
            id="schedulingNotes"
            name="schedulingNotes"
            placeholder="Gate codes, parking notes, best contact method, etc."
            value={formData.schedulingNotes}
            onChange={handleChange}
            rows={3}
            className="p-4 border rounded-lg w-full"
          />
        </div>
      </fieldset>

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
