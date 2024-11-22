import ServiceHero from "../components/ServiceHero";
import ServiceIntro from "../components/ServiceIntro";

export default function CarpentryPage() {
  return (
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
  );
}
