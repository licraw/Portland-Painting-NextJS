// Example usage in a page or another component

import Banner from "./components/Banner";
import Image from "next/image";
import ServicePreview from "./components/ServicePreview";
import About from "./components/home/About";
import Services from "./components/home/Services";

export default function HomePage() {
  return (
    <div>
      <div className='p-8 pl-6 lg:pl-20 lg:pr-20'>
      <div className="flex items-center space-x-3 bg-gray-100 py-2 px-4 rounded-full max-w-fit mb-4">
        <div className="flex items-center justify-center w-8 h-6 bg-white rounded-full">
          <Image
            src="/gallery/leaf.svg"
            alt="Portland Painting and Restoration Logo"
            width={16}
            height={16}
          />
        </div>
        <p className="text-sm font-medium text-gray-600">
          Portland and Vancouver’s premier repair
        </p>
      </div>
      <h1
        style={{
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 500,
          lineHeight: "1.2",
        }}
        className="font-sans font-medium text-4xl md:text-2xl lg:text-7xl leading-[1.2]"
      >
        Transform Your Space with Painting and Restoration Experts
      </h1>
      </div>

      <Banner
        ctaLink="/estimate"
        imagePath="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
        cta="Get Estimate"
        description="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors."
      />

      <About />
      <Services />
      {/* Services Sections */}
      {/* <ServicePreview
        title="Painting"
        icon="/paintBucket.svg"
        images={[
          "/gallery/interior1.jpeg",
          "/gallery/interior2.jpeg",
          "/gallery/interior3.jpeg",
        ]}
        secondaryImages={[
          "/gallery/exterior1.jpeg",
          "/gallery/exterior2.jpeg",
          "/gallery/exterior3.jpeg",
        ]}
      >
        <p>
          Servicing the greater Portland, OR metro area, we offer both Interior
          and exterior repaints as well as chronic failure solutions like lead
          paint removal of old failing substrates and carpentry repairs, of
          which ensures a sound substrate on historic homes to preserve them for
          another 100 years to come. A new exterior paint coating is not just
          about looks, but more importantly preservation of your investment.
          Over time, exposure to our nature’s element, your home or property’s
          exterior coating can become worn, faded, cracked, peeled and even
          rotten.{" "}
        </p>
        <p>
          Here in the Pacific Northwest precipitation and moisture is a reliable
          constant that must be protected against. And conversely the sun and
          Ultra Violet (UV) light can cause an equal amount of damage over time.
          Our goal is to not only make your property look beautiful but to
          protect your investment from our unique weather and sun related
          damage.
        </p>
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
        <p>
          Ready to finally add that crown molding you’ve always wanted or
          refinish your cabinets? If you’ve been delaying these upgrades, now is
          the perfect time to take action. At{" "}
          <strong>Portland Painting &amp; Restoration</strong>, we’re more than
          just painters—we’re skilled <strong>carpentry experts</strong>.
          Whether you need <strong>light carpentry work</strong>,{" "}
          <strong>repairing damaged wood</strong>, or{" "}
          <strong>installing decorative moldings</strong>, our team is equipped
          to elevate your property. From restoration to custom details, we
          provide thoughtful solutions that enhance the beauty and value of your
          home.
        </p>
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
        <p>
          Ready to finally add that crown molding you’ve always wanted or
          refinish your cabinets? If you’ve been delaying these upgrades, now is
          the perfect time to take action. At{" "}
          <strong>Portland Painting &amp; Restoration</strong>, we’re more than
          just painters—we’re skilled <strong>carpentry experts</strong>.
          Whether you need <strong>light carpentry work</strong>,{" "}
          <strong>repairing damaged wood</strong>, or{" "}
          <strong>installing decorative moldings</strong>, our team is equipped
          to elevate your property. From restoration to custom details, we
          provide thoughtful solutions that enhance the beauty and value of your
          home.
        </p>
      </ServicePreview> */}
    </div>
  );
}
