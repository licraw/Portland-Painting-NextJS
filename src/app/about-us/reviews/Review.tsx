import Image from 'next/image';

interface ReviewProps {
  text: string;
  author: string;
}

const Review: React.FC<ReviewProps> = ({ text, author }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center mb-2">
        <Image src="/stars.png" alt="5 stars" width={120} height={24} />
      </div>
      <p className="text-gray-800 italic mb-4">{text}</p>
      <p className="text-gray-700 font-semibold text-right">- {author}</p>
    </div>
  );
};

export default Review;

