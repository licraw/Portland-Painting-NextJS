import Banner from "./components/Banner";
import Image from "next/image";
import About from "./components/home/About";
import Services from "./components/home/Services";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration
        </title>
        <meta
          name="description"
          content="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Transform your space with expert painting and restoration services."
        />
        <meta
          name="keywords"
          content="painting, restoration, repair, remodeling, home improvement, Portland Painting, Vancouver, finish contractors"
        />
        <link rel="canonical" href="https://www.example.com/" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta
          property="og:title"
          content="Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration"
        />
        <meta
          property="og:description"
          content="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Discover our expert painting and restoration services to transform your space."
        />
        <meta
          property="og:image"
          content="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
        />
        <meta property="og:url" content="https://www.example.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Transform Your Space with Painting and Restoration Experts | Portland Painting & Restoration"
        />
        <meta
          name="twitter:description"
          content="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors. Discover our expert painting and restoration services."
        />
        <meta
          name="twitter:image"
          content="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
        />
      </Head>

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
            className="font-sans font-medium text-4xl lg:text-7xl leading-[1.2]"
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
    </>
  );
}
