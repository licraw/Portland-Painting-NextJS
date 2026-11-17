import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Project Stories Admin",
    template: "%s | Project Stories Admin",
  },
  robots: {
    follow: false,
    index: false,
    nocache: true,
    googleBot: {
      follow: false,
      index: false,
      noarchive: true,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
