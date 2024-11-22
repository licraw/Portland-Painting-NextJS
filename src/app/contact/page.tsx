import Image from "next/image";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md flex flex-col md:flex-row gap-8">
      {/* Contact Information */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-4">Portland Painting and Restoration</h1>
        <p className="text-gray-700 mb-6">
          We look forward to collaborating with you on your next project. Please fill out the form to contact us, or reach us using the information below.
        </p>
        <div className="text-lg font-medium mb-4">
          <p>
            <a href="tel:5032367003" className="text-green-700 hover:underline">
              (503) 236-7003
            </a>
          </p>
          <p>918 SE Stephens St.</p>
          <p>Portland, OR 97214</p>
        </div>
        <Image
          src="/gallery/interior2.jpeg"
          alt="Portland Painting and Restoration"
          width={500}
          height={400}
          className="rounded-lg shadow-lg mx-auto md:mx-0"
        />
      </div>

      {/* Contact Form */}
      <div className="flex-1">
        <ContactForm />
      </div>
    </section>
  );
}
