import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-900">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
    </nav>
  );
}
