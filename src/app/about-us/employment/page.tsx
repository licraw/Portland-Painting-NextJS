import Image from "next/image";

export default function EmploymentPage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Employment Opportunities</h1>
      <p className="text-gray-700 mb-6">
        Join our team and be part of a company that values craftsmanship and
        customer satisfaction. Check back for current job openings or contact us
        for more information.
      </p>
      <p className="text-gray-700 mb-8">
        <a
          href="/contact"
          className="text-green-700 font-semibold hover:underline"
        >
          Contact us
        </a>{" "}
        to learn more about careers with Portland Painting and Restoration.
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Employment</h2>
        <p className="text-gray-700 mb-4">
          We are one of Oregon’s top-rated painting and restoration companies.
          That said, we are continually looking to add to our talented crew. Our
          team enjoys competitive pay and benefits, and multiple opportunities
          for advancement. We seek to build long-term relationships with our
          painting team. Whether you are new to painting or have been in the
          trade for many years, we would love to hear from you.
        </p>
        <p className="text-gray-700 mb-4">
          Our workload is quite diverse, including but not limited to, classic
          residential homes, larger HOA communities, commercial interiors &
          exteriors, decks/stain, and beautiful full-home restorations. Our
          unique position allows our painters to begin most projects with paint
          removed prior, repairs, and thorough finishing, so plan on less
          scraping/prep, and more fun project finishing.
        </p>
        <p className="text-gray-700 font-semibold">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScPxRFy4IUXbFHDJ56gKDbdY0wb9KKJllrOnyNR0FmkM17ZBA/viewform"
            className="text-green-700 hover:underline"
          >
            Please click here to fill out our online application.
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="relative w-full h-48">
            <Image
              src="https://paintpdx.com/wp-content/uploads/2021/06/38411832_10160583946185403_7928926029790314496_n.jpg"
              alt="Gallery Image 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-sm"
            />
          </div>
          <div className="relative w-full h-48">
            <Image
              src="https://paintpdx.com/wp-content/uploads/2021/06/13502044_10157016401825403_8134280406231638635_n.jpg"
              alt="Gallery Image 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-sm"
            />
          </div>
          <div className="relative w-full h-48">
            <Image
              src="https://paintpdx.com/wp-content/uploads/2021/06/13533103_10157016401795403_5905741920847608270_n.jpg"
              alt="Gallery Image 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>


      <div>
        <h2 className="text-xl font-semibold mb-4">
          Our Commitment to Diversity, Equity & Inclusion
        </h2>
        <p className="text-gray-700 mb-4">
          Portland Painting & Restoration provides equal opportunities to all
          employees and applicants for employment without regard to race,
          religion, color, age, sex, national origin, sexual orientation, gender
          identity, genetic disposition, neurodiversity, disability, veteran
          status, or any other protected category under federal, state, and
          local law.
        </p>
        <p className="text-gray-700 mb-4">
          We continue to embrace and support anyone who interacts with our
          company by valuing integrity, excellence, and communication. We
          acknowledge that creating an inclusive environment is an ongoing task
          and requires the commitment of our community. We commit to using these
          practices and updating them as we continue to grow and learn.
        </p>
      </div>
    </div>
  );
}
