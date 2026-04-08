import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPostsMeta, getAllSlugs, getPostBySlug } from '@/lib/blog'
import { CtaBanner } from '@/components/blog/CtaBanner'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `${BASE_URL}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPostsMeta()
  const htmlParts = splitHtmlForCta(post.content)

  const articleSchema = generateArticleSchema(
    { title: post.title, description: post.excerpt, datePublished: post.date, author: 'Harmony Tử Vi' },
    BASE_URL,
    slug
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Trang chủ', item: BASE_URL },
    { name: 'Blog', item: `${BASE_URL}/blog` },
    { name: post.title, item: `${BASE_URL}/blog/${slug}` },
  ])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="mx-auto max-w-3xl px-4 py-16">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <span>/</span>
          <span className="truncate text-gray-600">{post.title}</span>
        </nav>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="mb-10 flex items-center gap-3 text-sm text-gray-400">
          <span>Harmony Tử Vi</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('vi-VN', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </time>
        </div>

        {/* Pull quote */}
        <p
          className="mb-12 border-l-4 pl-6 font-serif text-xl font-light italic text-gray-500"
          style={{ borderColor: 'var(--color-primary)' }}
        >
          {post.excerpt}
        </p>

        {/* Body — first half */}
        <div
          className="prose prose-lg prose-headings:font-serif prose-a:text-red-700 prose-strong:text-gray-800 prose-table:text-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlParts[0] }}
        />

        {/* Mid-article CTA */}
        <CtaBanner />

        {/* Body — second half */}
        {htmlParts[1] && (
          <div
            className="prose prose-lg prose-headings:font-serif prose-a:text-red-700 prose-strong:text-gray-800 prose-table:text-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlParts[1] }}
          />
        )}

        {/* Related posts */}
        <RelatedPosts posts={allPosts} currentSlug={slug} />

        {/* Footer nav */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border px-8 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-red-700 hover:text-red-700"
          >
            ← Xem tất cả bài viết
          </Link>
        </div>

      </article>
    </div>
  )
}

/**
 * Split HTML into 2 parts at a natural mid-article heading boundary
 * so we can insert the CTA banner between sections.
 */
function splitHtmlForCta(html: string): [string, string] {
  const h2Matches = [...html.matchAll(/<h2/g)]
  if (h2Matches.length >= 2) {
    const mid = h2Matches[Math.ceil(h2Matches.length / 2)].index!
    return [html.slice(0, mid), html.slice(mid)]
  }
  const mid = Math.floor(html.length / 2)
  const paraEnd = html.indexOf('</p>', mid)
  if (paraEnd !== -1) return [html.slice(0, paraEnd + 4), html.slice(paraEnd + 4)]
  return [html, '']
}
