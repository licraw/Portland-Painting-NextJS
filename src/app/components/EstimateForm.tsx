"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function EstimateForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    overview: "",
    promoCode: "",
    subscribeToMailchimp: false,
    formType: "estimate",
    photos: [],
  });
  const [status, setStatus] = useState("");

  interface ChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
    target: (EventTarget & HTMLInputElement & { files: FileList | null }) | (EventTarget & HTMLTextAreaElement) & {
      name: string;
      value: string;
      type: string;
      checked?: boolean;
      files?: FileList | null;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? Array.from(files) : [],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };


  interface ApiResponse {
    success: boolean;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");



    if (!executeRecaptcha) {
      setStatus('Recaptcha not ready. Please try again.');
      return;
    }

    const gRecaptchaToken = await executeRecaptcha('estimate_form');

    const response = await axios({
      method: "post",
      url: "/api/verifyRecaptcha",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.success === true) {
      console.log(`Success with score: ${response?.data?.score}`);
      setStatus('ReCaptcha Verified and Form Submitted!')
    } else {
      console.log(`Failure with score: ${response?.data?.score}`);
      setStatus("Failed to verify recaptcha! You must be a robot!")
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photos" && Array.isArray(value) && value.length > 0) {
          value.forEach((file) => formDataToSend.append("photos", file));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      const response = await fetch("/api/createAsanaTask", {
        method: "POST",
        body: formDataToSend,
      });

      const result: ApiResponse = await response.json();
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

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          overview: "",
          promoCode: "",
          subscribeToMailchimp: false,
          formType: "estimate",
          photos: [],
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
    <section className="max-w-6xl mx-auto my-4 p-6 bg-white border rounded-lg shadow-md flex flex-col md:flex-row gap-8">
      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-700 mb-6">
          Once we receive your request, our estimators will promptly contact
          you. We eagerly anticipate collaborating with you on your upcoming
          project.
        </p>
        <Image
          src="/gallery/carpentry1.jpg"
          alt="Project Image"
          width={500}
          height={400}
          className="rounded-lg shadow-lg mb-4 mx-auto"
        />
        <p className="text-xl font-semibold">Thank You For Your Interest!</p>
      </div>

      <div className="flex-1 bg-gray-100 p-6 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <label className="block text-gray-700">Upload Photos (Max 5)</label>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Want a promo code to receive a discount? Sign up for our
              newsletter and get money off your estimate!
            </label>
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
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Request Estimate
          </button>
          <p className="text-center text-gray-700 mt-4">{status}</p>
        </form>
      </div>
    </section>
  );
}
