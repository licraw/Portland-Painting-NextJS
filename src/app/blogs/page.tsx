// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "../../../lib/getAllBlogs";

export const metadata = {
  title: "Blog | Portland Painting & Restoration",
  description: "Read our latest articles on painting, restoration, and home care tips in Portland.",
};

export default function BlogPage() {
  const posts = getAllBlogs();

  return (
    <div className="w-full p-8 lg:pl-20 lg:pr-20">
      <h1 className="text-4xl font-bold mb-8">Insights from Portland Painting & Restoration</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/content/${post.slug}`}
            className="block group bg-white shadow hover:shadow-md rounded overflow-hidden transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
            <p className="text-sm text-gray-500">
  {new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
