import Banner from "./components/Banner";
import Image from "next/image";
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
    </div>
  );
}
