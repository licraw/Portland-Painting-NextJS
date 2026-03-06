import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllBlogSlugs, getBlogBySlug } from "../../../../lib/getAllBlogs";

type SlugPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return {};

  return {
    metadataBase: new URL("https://www.paintpdx.com"),
    title: post.title || "Untitled",
    description: post.description || "",
    openGraph: { images: post.image ? [post.image] : undefined },
    twitter: { images: post.image ? [post.image] : undefined },
  };
}

export default async function Page({ params }: SlugPageProps): Promise<JSX.Element> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return notFound();

  const parsedDate = new Date(post.date);
  const dateStr = Number.isNaN(parsedDate.getTime())
    ? post.date
    : parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  const isoDate = Number.isNaN(parsedDate.getTime())
    ? new Date().toISOString()
    : parsedDate.toISOString();

  const heroImage = post.image;
  const absoluteImage = heroImage
    ? (heroImage.startsWith("http")
        ? heroImage
        : `https://www.paintpdx.com${heroImage}`
      ).replace(/\s/g, "%20")
    : undefined;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.paintpdx.com/content/${post.slug}#blogposting`,
    headline: post.title,
    description: post.description,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteImage ? [absoluteImage] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.paintpdx.com/content/${post.slug}`,
    },
    author: {
      "@id": "https://www.paintpdx.com/#organization",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.paintpdx.com/#organization",
      name: "Portland Painting & Restoration",
      logo: {
        "@type": "ImageObject",
        url: "https://www.paintpdx.com/logo.png",
      },
    },
  };

  const html =
    post.contentType === "html"
      ? post.content
      : (
          await unified()
            .use(remarkParse)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeStringify)
            .process(post.content)
        ).toString();

  return (
    <>
      <Script async id={`blog-post-${post.slug}-ld-json`} type="application/ld+json">
        {JSON.stringify(blogPostingJsonLd)}
      </Script>
      <article className="prose prose-lg mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{dateStr}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}
 
