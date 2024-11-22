import ServiceHero from "../../components/ServiceHero";
import ServiceIntro from "../../components/ServiceIntro";

export default function InteriorPaintingPage() {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero
        title="Interior Painting Services"
        subtitle="Transforming the inside of your home with vibrant, lasting colors."
        backgroundImage="/gallery/interior1.jpeg"
      />

      {/* Intro Section */}
      <ServiceIntro heading="Our Interior Painting Services">
        <p className="mb-8">
          A fresh coat of paint can completely change the look and feel of your living spaces. Our interior painting services are designed to bring new life to your walls, ceilings, and trim with precision and care. We work with you to select the perfect colors and finishes to match your style and enhance your home&apos;s interior.
        </p>
        <p className="mb-8">
          From prep work to the final coat, we take care of every detail to ensure a smooth and durable finish. Our team prioritizes cleanliness and minimal disruption, making sure your home remains comfortable during the painting process.
        </p>
        <p className="mb-8">
          Whether you&apos;re updating a single room or giving your entire home a makeover, we&apos;re here to help. Contact us to schedule a consultation and see how we can bring your vision to life.
        </p>
      </ServiceIntro>
    </div>
  );
}
