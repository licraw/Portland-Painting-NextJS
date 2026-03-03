interface ReviewProps {
  text: string;
  author: string;
  rating?: number;
  relativeTimeDescription?: string;
  profilePhotoUrl?: string;
}

const Review: React.FC<ReviewProps> = ({
  text,
  author,
  rating = 5,
  relativeTimeDescription,
  profilePhotoUrl,
}) => {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center mb-2 justify-between gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-5 w-5 ${index < safeRating ? "text-yellow-500" : "text-gray-300"} fill-current`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 .587l3.668 7.431 8.21 1.192-5.93 5.776 1.401 8.168L12 18.896l-7.349 3.858 1.401-8.168-5.93-5.776 8.21-1.192z" />
            </svg>
          ))}
        </div>
        {relativeTimeDescription ? (
          <p className="text-sm text-gray-500">{relativeTimeDescription}</p>
        ) : null}
      </div>
      <p className="text-gray-800 italic mb-4">{text}</p>
      <div className="flex items-center justify-end gap-2">
        {profilePhotoUrl ? (
          // Google photo hosts vary; avoid Next.js domain allowlist config for these avatars.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profilePhotoUrl}
            alt={author}
            width={28}
            height={28}
            className="rounded-full"
            loading="lazy"
          />
        ) : null}
        <p className="text-gray-700 font-semibold text-right">- {author}</p>
      </div>
    </div>
  );
};

export default Review;
