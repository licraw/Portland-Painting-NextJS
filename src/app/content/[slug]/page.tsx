// app/content/[slug]/page.tsx

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(CONTENT_DIR)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((file) => ({ slug: file.replace(/\.md$/, '') }))
}

export async function generateMetadata(context: any): Promise<Metadata> {
  const slug = (context.params as { slug: string }).slug

  try {
    const raw = await fs.readFile(
      path.join(CONTENT_DIR, `${slug}.md`),
      'utf8'
    )
    const { data } = matter(raw)

    return {
      metadataBase: new URL('https://www.paintpdx.com'),
      title: data.title ?? 'Untitled',
      description: data.description ?? '',
      openGraph: { images: data.image ? [data.image] : undefined },
      twitter:   { images: data.image ? [data.image] : undefined },
    }
  } catch {
    return {}
  }
}

export default async function Page(context: any): Promise<JSX.Element> {
  const slug = (context.params as { slug: string }).slug

  let rawMd: string
  try {
    rawMd = await fs.readFile(
      path.join(CONTENT_DIR, `${slug}.md`),
      'utf8'
    )
  } catch {
    return notFound()
  }

  const { data: fm, content } = matter(rawMd)
  const dateStr =
    fm.date instanceof Date
      ? fm.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : String(fm.date)

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)
  const html = processed.toString()

  return (
    <article className="prose prose-lg mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-2">{fm.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{dateStr}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
