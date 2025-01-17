"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    overview: '',
    promoCode: '',
    subscribeToMailchimp: false,
    formType: 'contact',
    photos: [],
  });
  const [status, setStatus] = useState('');

  interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    overview: string;
    promoCode: string;
    subscribeToMailchimp: boolean;
    formType: string;
    photos: File[];
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === 'file') {
      setFormData((prevData: FormData) => ({
        ...prevData,
        [name]: files ? Array.from(files) : [],
      }));
    } else {
      setFormData((prevData: FormData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photos' && Array.isArray(value) && value.length > 0) {
            if (Array.isArray(value)) {
              value.forEach((file: File) => formDataToSend.append('photos', file));
            }
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      const response = await fetch('/api/createAsanaTask', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Request successfully submitted!');

        if (formData.subscribeToMailchimp) {
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.name.split(' ')[0],
              lastName: formData.name.split(' ')[1] || '',
            }),
          });
        }

        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          overview: '',
          promoCode: '',
          subscribeToMailchimp: false,
          formType: 'contact',
          photos: [],
        });
      } else {
        setStatus('Failed to submit request.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error submitting request.');
    }
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
        className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
      >
        Send Message
      </button>
      <p className="text-center text-gray-700 mt-4">{status}</p>
    </form>
  );
}
