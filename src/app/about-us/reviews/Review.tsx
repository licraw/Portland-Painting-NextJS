import React from "react";

interface ReviewProps {
  text: string;
  author: string;
}

const Review: React.FC<ReviewProps> = ({ text, author }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-md shadow-sm">
      <p className="text-gray-800 italic mb-4">{text}</p>
      <p className="text-gray-700 font-semibold text-right">- {author}</p>
    </div>
  );
};

export default Review;