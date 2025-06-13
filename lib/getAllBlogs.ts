// lib/getAllBlogs.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string;
}

const contentDirectory = path.join(process.cwd(), "content");

export function getAllBlogs(): BlogMeta[] {
  const files = fs.readdirSync(contentDirectory);

  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        slug: file.replace(/\.mdx?$/, ""),
        description: data.description,
        date: data.date,
        image: data.ogImage,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}
