// Example usage in a page or another component

import Banner from "./components/Banner";
import Image from "next/image";
import ServicePreview from "./components/ServicePreview";

export default function HomePage() {
  return (
    <div>
      <Banner
        ctaLink="/estimate"
        imagePath="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
        cta="Get Estimate"
        description="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors."
      />

      {/* Image and Heading Section */}
      <div className="my-8 flex items-center justify-center gap-4">
        <Image src="/paintRoller.svg" alt="Paint Roller" width={50} height={20} />
        <h1 className="text-3xl font-bold">Welcome</h1>
      </div>

      {/* Main Text Content */}
      <div className="my-8 max-w-3xl mx-auto">
        <p>
          <strong>Portland Painting and Restoration</strong> is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Our team of professional <strong>Carpenters and Painters</strong>, along with dedicated <strong>Estimators, Project Managers, and Office Staff</strong>, work together to deliver top-tier results with a focus on client satisfaction and quality workmanship. We specialize in providing thoughtful, era-appropriate solutions that enhance and protect your property, whether through <strong>carpentry repairs, remodeling, cabinet modifications</strong>, or <strong>painting services</strong>.
        </p>
      </div>
      {/* Services Sections */}
      <ServicePreview
        title="Painting"
        icon="/paintBucket.svg"
        images={[
          "/gallery/interior1.jpeg",
          "/gallery/interior2.jpeg",
          "/gallery/interior3.jpeg",
        ]}
      >
        <p>Servicing the greater Portland, OR metro area, we offer both Interior and exterior repaints as well as chronic failure solutions like lead paint removal of old failing substrates and carpentry repairs, of which ensures a sound substrate on historic homes to preserve them for another 100 years to come. A new exterior paint coating is not just about looks, but more importantly preservation of your investment. Over time, exposure to our nature’s element, your home or property’s exterior coating can become worn, faded, cracked, peeled and even rotten. </p>
        <p>Here in the Pacific Northwest precipitation and moisture is a reliable constant that must be protected against. And conversely the sun and Ultra Violet (UV) light can cause an equal amount of damage over time. Our goal is to not only make your property look beautiful but to protect your investment from our unique weather and sun related damage.</p>
      </ServicePreview>

      <ServicePreview
        title="Carpentry"
        icon="/carpentry.svg"
        images={[
          "/gallery/carpentry1.jpg",
          "/gallery/carpentry2.jpg",
          "/gallery/carpentry3.jpg",
        ]}
      >
        <p>Ready to finally add that crown molding you’ve always wanted or refinish your cabinets? If you’ve been delaying these upgrades, now is the perfect time to take action. At <strong>Portland Painting &amp; Restoration</strong>, we’re more than just painters—we’re skilled <strong>carpentry experts</strong>. Whether you need <strong>light carpentry work</strong>, <strong>repairing damaged wood</strong>, or <strong>installing decorative moldings</strong>, our team is equipped to elevate your property. From restoration to custom details, we provide thoughtful solutions that enhance the beauty and value of your home.</p>
      </ServicePreview>

      <ServicePreview
        title="Restoration"
        icon="/carpentry.svg"
        images={[
          "/gallery/restoration1.jpg",
          "/gallery/restoration2.jpg",
          "/gallery/restoration3.jpg",
          "/gallery/restoration4.jpg",
        ]}
      >
        <p>Ready to finally add that crown molding you’ve always wanted or refinish your cabinets? If you’ve been delaying these upgrades, now is the perfect time to take action. At <strong>Portland Painting &amp; Restoration</strong>, we’re more than just painters—we’re skilled <strong>carpentry experts</strong>. Whether you need <strong>light carpentry work</strong>, <strong>repairing damaged wood</strong>, or <strong>installing decorative moldings</strong>, our team is equipped to elevate your property. From restoration to custom details, we provide thoughtful solutions that enhance the beauty and value of your home.</p>
      </ServicePreview>
    </div>
  );
}
