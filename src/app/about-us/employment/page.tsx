export default function EmploymentPage() {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Employment Opportunities</h1>
        <p className="text-gray-700 mb-6">
          Join our team and be part of a company that values craftsmanship and customer satisfaction. Check back for current job openings or contact us for more information.
        </p>
        <p className="text-gray-700">
          <a
            href="/contact"
            className="text-green-700 font-semibold hover:underline"
          >
            Contact us
          </a>{" "}
          to learn more about careers with Portland Painting and Restoration.
        </p>
      </div>
    );
  }