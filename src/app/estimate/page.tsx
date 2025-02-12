import EstimateForm from "../components/EstimateForm";
import Head from "next/head";

export default function Estimate() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Get an Estimate | Portland Painting & Restoration</title>
        <meta
          name="description"
          content="Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs."
        />
        <meta
          name="keywords"
          content="estimate, free quote, painting estimate, restoration estimate, Portland Painting, home improvement"
        />
        <link rel="canonical" href="https://www.paintpdx.com/estimate" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Get an Estimate | Portland Painting & Restoration" />
        <meta
          property="og:description"
          content="Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs."
        />
        <meta property="og:image" content="https://www.paintpdx.com/logo.png" />
        <meta property="og:url" content="https://www.paintpdx.com/estimate" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get an Estimate | Portland Painting & Restoration" />
        <meta
          name="twitter:description"
          content="Request a free estimate for your painting and restoration project. Contact Portland Painting & Restoration today for a personalized quote tailored to your needs."
        />
        <meta name="twitter:image" content="https://www.paintpdx.com/logo.png" />
      </Head>

      <div className="min-h-screen flex flex-col items-center">
        <EstimateForm />
      </div>
    </>
  );
}
