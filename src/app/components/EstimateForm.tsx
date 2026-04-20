"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const INSTAGRAM_OPTION_GID = "1213363131795302";
const UTM_SOURCE_STORAGE_KEY = "utm_source";

export default function EstimateForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [status, setStatus] = useState("");
  const [isInstagramAttribution, setIsInstagramAttribution] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    zipCode: "",
    promoCode: "",
    howDidYouFindUs: "",
    preferredDays: [] as string[],
    preferredTimeOfDay: "",
    schedulingNotes: "",
    subscribeToMailchimp: true,
    formType: "estimate",
    photos: [] as File[],
  });

  useEffect(() => {
    const storedSource = window.localStorage.getItem(UTM_SOURCE_STORAGE_KEY)?.trim().toLowerCase();
    const fromInstagram = storedSource === "instagram";
    setIsInstagramAttribution(fromInstagram);

    if (fromInstagram) {
      setFormData((prev) => ({
        ...prev,
        howDidYouFindUs: INSTAGRAM_OPTION_GID,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file") {
      const selected = files ? Array.from(files).slice(0, 4) : [];
      setFormData((p) => ({ ...p, [name]: selected }));
    } else if (name === "preferredDays" && type === "checkbox") {
      setFormData((p) => {
        const current = p.preferredDays ?? [];
        return {
          ...p,
          preferredDays: checked
            ? Array.from(new Set([...current, value]))
            : current.filter((d) => d !== value),
        };
      });
    } else {
      const normalizedValue = name === "zipCode" ? value.replace(/\s+/g, "") : value;
      setFormData((p) => ({
        ...p,
        [name]: type === "checkbox" ? checked : normalizedValue,
      }));
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
    if (isInstagramAttribution && !jsonPayload.howDidYouFindUs) {
      jsonPayload.howDidYouFindUs = INSTAGRAM_OPTION_GID;
    }

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

      const emailFd = new FormData();
      emailFd.append("name", formData.name);
      emailFd.append("email", formData.email);
      emailFd.append("formType", formData.formType);
      emailFd.append("bodyText", bodyText);
      emailFd.append("asanaTaskId", taskRes.taskId);
      photos.forEach((p) => {
        if (p.size <= 2 * 1024 * 1024) emailFd.append("photos", p);
      });

      await fetch("/api/sendEmail", {
        method: "POST",
        body: emailFd,
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
        howDidYouFindUs: isInstagramAttribution ? INSTAGRAM_OPTION_GID : "",
        preferredDays: [],
        preferredTimeOfDay: "",
        schedulingNotes: "",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div>
          <input
            type="text"
            name="address"
            placeholder="Project Address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            aria-describedby="estimate-address-help"
            className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          />
          <p id="estimate-address-help" className="mt-2 text-xs text-gray-600">
            Used for scheduling/logistics only.
          </p>
        </div>
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          required
          inputMode="numeric"
          autoComplete="postal-code"
          pattern="[0-9]{5}(-[0-9]{4})?"
          title="Enter a 5-digit ZIP code (or ZIP+4)."
          className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full self-start"
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
            className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
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
            className="p-4 border rounded-lg focus:ring-2 focus:ring-green-700 w-full"
          />
        </div>
      </fieldset>

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

      {!isInstagramAttribution && (
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
            <option value="1213363131795302">Instagram</option>
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
      )}

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
