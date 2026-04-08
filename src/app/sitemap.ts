import type { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const zodiacs = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
  const nguHanh = ['kim', 'moc', 'thuy', 'hoa', 'tho']

  const CURRENT_YEAR = today.getFullYear()
  const tuViYears = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2]

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/lich`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/xem-menh`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/tu-vi`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/xem-ngay`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/phong-thuy`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/tu-vi-hang-ngay`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
  ]

  // Daily horoscope pages per zodiac
  const zodiacPages: MetadataRoute.Sitemap = zodiacs.map((z) => ({
    url: `${BASE_URL}/tu-vi-hang-ngay?zodiac=${z}`,
    lastModified: today,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Tu Vi annual horoscope: 12 zodiacs × 4 years
  const tuViNamPages: MetadataRoute.Sitemap = zodiacs.flatMap((z) =>
    tuViYears.map((y) => ({
      url: `${BASE_URL}/tu-vi/${z}/nam-${y}`,
      lastModified: today,
      changeFrequency: 'yearly' as const,
      priority: 0.75,
    }))
  )

  // Menh pages
  const menhPages: MetadataRoute.Sitemap = nguHanh.map((m) => ({
    url: `${BASE_URL}/phong-thuy/menh-${m}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Lich: today + next 30 days
  const lichPages: MetadataRoute.Sitemap = Array.from({ length: 30 }, (_, i) => {
    const dt = new Date(today)
    dt.setDate(today.getDate() + i)
    return {
      url: `${BASE_URL}/lich/${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`,
      lastModified: dt,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }
  })

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...zodiacPages, ...tuViNamPages, ...menhPages, ...lichPages, ...blogPosts]
}
