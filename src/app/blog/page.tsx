import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/blog'
import { ConditionalAdSlot } from '@/components/common/ConditionalAdSlot'

export const metadata: Metadata = {
  title: 'Blog Tử Vi & Phong Thủy',
  description:
    'Kiến thức chuyên sâu về Tử Vi Đẩu Số, Ngũ Hành, Phong Thủy và huyền học phương Đông từ đội ngũ chuyên gia Harmony Tử Vi.',
}

const CATEGORIES: Record<string, string> = {
  'tu-vi': 'Tử Vi',
  'ngu-hanh': 'Ngũ Hành',
  'phong-thuy': 'Phong Thủy',
  'tu-vi-hang-ngay': 'Dự Báo',
  'lich-van-nien': 'Lịch Vạn Niên',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const allPosts = getAllPostsMeta()
  const posts = category ? allPosts.filter((p) => p.category === category) : allPosts
  const activeLabel = category ? (CATEGORIES[category] ?? category) : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>

      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
          Kiến Thức Huyền Học
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
          Tạp Chí Tử Vi
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-500">
          Những góc nhìn sâu sắc về Tử Vi Đẩu Số, Ngũ Hành & Phong Thủy — phân tích từ tri thức cổ đại.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4">
          <div className="flex gap-1 py-3">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                !category
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={!category ? { backgroundColor: 'var(--color-primary)' } : {}}
            >
              Tất cả
            </Link>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <Link
                key={key}
                href={`/blog?category=${key}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  category === key
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={category === key ? { backgroundColor: 'var(--color-primary)' } : {}}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ad slot - free tier only */}
      <div className="flex justify-center py-4">
        <ConditionalAdSlot size="leaderboard" />
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        {activeLabel && (
          <p className="mb-6 text-sm text-gray-500">
            Hiển thị bài viết trong chủ đề: <strong className="text-gray-800">{activeLabel}</strong>
            {' '}·{' '}
            <Link href="/blog" className="underline hover:text-red-700">Xem tất cả</Link>
          </p>
        )}

        {posts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <p className="text-lg">Chưa có bài viết trong chủ đề này.</p>
            <Link href="/blog" className="mt-4 inline-block text-sm underline hover:text-gray-600">
              Xem tất cả bài viết
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {post.category && CATEGORIES[post.category] && (
                  <span
                    className="mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {CATEGORIES[post.category]}
                  </span>
                )}
                <h2 className="mb-3 flex-1 font-serif text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-700">
                  {post.title}
                </h2>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-500">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('vi-VN', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                    })}
                  </time>
                  <span className="font-medium transition-colors group-hover:text-red-700" style={{ color: 'var(--color-primary)' }}>
                    Đọc tiếp →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
