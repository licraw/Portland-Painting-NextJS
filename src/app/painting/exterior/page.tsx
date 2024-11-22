import ServiceHero from "../../components/ServiceHero";
import ServiceIntro from "../../components/ServiceIntro";

export default function ExteriorPaintingPage() {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero
        title="Exterior Painting Services"
        subtitle="Enhancing curb appeal with durable, weather-resistant finishes."
        backgroundImage="/gallery/exterior1.jpeg"
      />

      {/* Intro Section */}
      <ServiceIntro heading="Our Exterior Painting Services">
        <p className="mb-8">
          Your home&apos;s exterior is its first impression, and a high-quality paint job can make it shine. Our exterior painting services are designed to protect your home from the elements while delivering a stunning visual upgrade.
        </p>
        <p className="mb-8">
          We begin by preparing the surfaces to ensure proper adhesion and longevity of the paint. This includes cleaning, sanding, and repairing any damage to the exterior. We then apply premium-quality paint that withstands harsh weather conditions, ensuring your home stays beautiful for years to come.
        </p>
        <p className="mb-8">
          Let us help you increase your home&apos;s value and curb appeal with expert exterior painting. Contact us to discuss your project and get a free estimate.
        </p>
      </ServiceIntro>
    </div>
  );
}
