import { Metadata } from "next";
import Script from "next/script";
import ContactContainer from "../components/contact/contactContainer";

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.paintpdx.com/contact#webpage",
  name: "Contact Portland Painting & Restoration",
  description:
    "Contact Portland Painting & Restoration via phone, email, or our online form to discuss your next painting or restoration project.",
  url: "https://www.paintpdx.com/contact",
  mainEntity: {
    "@type": "ContactPoint",
    telephone: "+1-503-236-7003",
    contactType: "Customer Service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

export const metadata: Metadata = {
  title: "Contact Us | Portland Painting & Restoration",
  description:
    "We look forward to collaborating with you on your next project. Contact Portland Painting & Restoration via our online form, phone, or visit our Portland office for quality painting and restoration services.",
  keywords: [
    "contact",
    "painting",
    "restoration",
    "Portland",
    "Oregon",
    "Portland Painting & Restoration",
    "professional services",
  ],
  alternates: {
    canonical: "https://www.paintpdx.com/contact",
  },
  openGraph: {
    title: "Contact Us | Portland Painting & Restoration",
    description:
      "Get in touch with Portland Painting & Restoration for quality painting and restoration services in Portland, OR. Reach us via our contact form, phone, or visit our office.",
    url: "https://www.paintpdx.com/contact",
    type: "website",
    images: [
      {
        url: "https://www.paintpdx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Painting & Restoration Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Portland Painting & Restoration",
    description:
      "Get in touch with Portland Painting & Restoration for quality painting and restoration services in Portland, OR. Reach us via our contact form, phone, or visit our office.",
    images: ["https://www.paintpdx.com/logo.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Script async id="contact-page-ld-json" type="application/ld+json">
        {JSON.stringify(contactPageJsonLd)}
      </Script>
      <ContactContainer />
    </>
  );
}
