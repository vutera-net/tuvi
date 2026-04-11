import type { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const zodiacs = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
  const nguHanh = ['kim', 'moc', 'thuy', 'hoa', 'tho']

  const CURRENT_YEAR = today.getFullYear()
  const tuViYears = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2]

  const stars = [
    'tu-vi', 'liem-trinh', 'thien-dong', 'vu-khuc', 'thai-duong', 'thien-co', 
    'thien-phu', 'thai-am', 'tham-lang', 'cu-mon', 'thien-tuong', 'thien-luong', 
    'that-sat', 'pha-quan'
  ]
  const palaces = [
    'menh', 'phu-mau', 'phuc-duc', 'dien-trach', 'quan-loc', 'no-boc', 
    'thien-di', 'tat-ach', 'tai-bach', 'tu-tuc', 'phu-the', 'huynh-de'
  ]

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

  // Programmatic SEO: Star x Palace matrix
  const seoMatrixPages: MetadataRoute.Sitemap = stars.flatMap((s) =>
    palaces.map((p) => ({
      url: `${BASE_URL}/y-nghia-sao/${s}-tai-cung-${p}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.5, // Long-tail pages have slightly lower priority than main feature pages
    }))
  )

  return [...staticPages, ...zodiacPages, ...tuViNamPages, ...menhPages, ...lichPages, ...blogPosts, ...seoMatrixPages]
}
