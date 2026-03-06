import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
  contentType: "markdown" | "html";
}

type SheetRow = Record<string, string>;

const contentDirectory = path.join(process.cwd(), "content");
const defaultImage = "/logo.png";

function normalizeDate(dateValue: string): string {
  if (!dateValue) return new Date(0).toISOString();
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? dateValue : parsed.toISOString();
}

function sanitizeHtml(rawHtml: string): string {
  return rawHtml
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)[^>]*\/?\s*>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "");
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapSheetRows(values: string[][]): SheetRow[] {
  if (!values.length) return [];
  const headers = values[0].map((header) => header.trim().toLowerCase());
  return values.slice(1).map((row) => {
    const mapped: SheetRow = {};
    headers.forEach((header, index) => {
      mapped[header] = row[index]?.trim() ?? "";
    });
    return mapped;
  });
}

async function getSheetBlogs(): Promise<BlogPost[]> {
  const sheetId = process.env.BLOG_SHEET_ID;
  const range = process.env.BLOG_SHEET_RANGE;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId || !range || !apiKey) return [];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId
  )}/values/${encodeURIComponent(range)}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) return [];

    const payload = (await response.json()) as { values?: string[][] };
    const rows = mapSheetRows(payload.values ?? []);

    return rows
      .filter((row) => {
        const publishedFlag = (row.published ?? "true").toLowerCase();
        return publishedFlag !== "false" && publishedFlag !== "0";
      })
      .map((row) => {
        const slug = row.slug ? toSlug(row.slug) : toSlug(row.title);
        return {
          slug,
          title: row.title || slug,
          description: row.description || "",
          date: normalizeDate(row.date),
          image: row.image || defaultImage,
          content: sanitizeHtml(row.html || ""),
          contentType: "html" as const,
        };
      })
      .filter((post) => Boolean(post.slug && post.title && post.content));
  } catch {
    return [];
  }
}

function getLocalMarkdownBlogs(): BlogPost[] {
  const files = fs.readdirSync(contentDirectory);

  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: String(data.title ?? file.replace(/\.mdx?$/, "")),
        slug: file.replace(/\.mdx?$/, ""),
        description: String(data.description ?? ""),
        date: normalizeDate(String(data.date ?? "")),
        image: String(data.ogImage ?? data.image ?? defaultImage),
        content,
        contentType: "markdown" as const,
      };
    });
}

export async function getAllBlogs(): Promise<BlogMeta[]> {
  const [sheetBlogs, localBlogs] = await Promise.all([
    getSheetBlogs(),
    Promise.resolve(getLocalMarkdownBlogs()),
  ]);

  const dedupedLocalBlogs = localBlogs.filter(
    (localPost) => !sheetBlogs.some((sheetPost) => sheetPost.slug === localPost.slug)
  );

  return [...sheetBlogs, ...dedupedLocalBlogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      date: post.date,
      image: post.image,
    }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const [sheetBlogs, localBlogs] = await Promise.all([
    getSheetBlogs(),
    Promise.resolve(getLocalMarkdownBlogs()),
  ]);

  const normalizedSlug = toSlug(slug);
  const fromSheet = sheetBlogs.find((post) => post.slug === normalizedSlug);
  if (fromSheet) return fromSheet;

  const fromLocal = localBlogs.find((post) => post.slug === normalizedSlug);
  return fromLocal ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const [sheetBlogs, localBlogs] = await Promise.all([
    getSheetBlogs(),
    Promise.resolve(getLocalMarkdownBlogs()),
  ]);

  return [...new Set([...sheetBlogs.map((post) => post.slug), ...localBlogs.map((post) => post.slug)])];
}
