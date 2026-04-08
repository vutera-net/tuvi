import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'

interface Props {
  posts: BlogPostMeta[]
  currentSlug: string
}

export function RelatedPosts({ posts, currentSlug }: Props) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3)
  if (related.length === 0) return null

  return (
    <aside className="not-prose mt-16 border-t pt-12">
      <h2 className="mb-6 font-serif text-xl font-bold text-gray-900">Bài viết liên quan</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 font-serif text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-700">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
            <span className="mt-3 block text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              Đọc tiếp →
            </span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
