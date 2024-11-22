export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
      <p className="text-gray-700 mb-6">
        See what our customers have to say about their experiences with Portland
        Painting and Restoration. We’re proud of our reputation for quality work
        and excellent service.
      </p>
      <p className="text-gray-700">
        Have feedback?{" "}
        <a
          href="/contact"
          className="text-green-700 font-semibold hover:underline"
        >
          Contact us
        </a>{" "}
        to share your thoughts or leave a review.
      </p>
    </div>
  );
}
