import ServiceHero from "../components/ServiceHero";
import ServiceIntro from "../components/ServiceIntro";
import Head from "next/head";

export default function CarpentryPage() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Carpentry Services | Portland Painting & Restoration</title>
        <meta
          name="description"
          content="Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland."
        />
        <meta
          name="keywords"
          content="Carpentry, carpentry services, restoration, painting, expert craftsmanship, Portland, home improvement"
        />
        <link rel="canonical" href="https://www.paintpdx.com/carpentry" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Carpentry Services | Portland Painting & Restoration" />
        <meta
          property="og:description"
          content="Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland."
        />
        <meta property="og:image" content="https://www.paintpdx.com/logo.png" />
        <meta property="og:url" content="https://www.paintpdx.com/carpentry" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Carpentry Services | Portland Painting & Restoration" />
        <meta
          name="twitter:description"
          content="Discover expert carpentry services by Portland Painting & Restoration. We offer comprehensive restoration strategies with top-notch craftsmanship and professional painting services in Portland."
        />
        <meta name="twitter:image" content="https://www.paintpdx.com/logo.png" />
      </Head>

      <div>
        {/* Hero Section */}
        <ServiceHero
          title="Carpentry Services"
          subtitle="Expert craftsmanship for every project."
          backgroundImage="/gallery/carpentry1.jpg"
        />

        {/* Intro Section */}
        <ServiceIntro
          heading="Our Carpentry Services"
        >
          <p className="mb-8">There are many painting companies in the Portland area, but not all of them offer a full range of carpentry services too. What’s the point of applying a fresh coat of paint over low-grade craftsmanship or rotten wood?</p>
          <p className="mb-8">Some carpenters don’t want to do smaller projects because they are holding out for bigger ones. This can be really frustrating for the homeowner trying to get the job done. A long time ago we came to the conclusion that it would be more convenient and beneficial to our customers to provide top-notch carpentry services as part of a comprehensive restoration strategy.</p>
        </ServiceIntro>
      </div>
    </>
  );
}
