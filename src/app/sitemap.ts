import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvingaymoi.vn'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const zodiacs = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
  const nguHanh = ['kim', 'moc', 'thuy', 'hoa', 'tho']

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

  // Menh pages
  const menhPages: MetadataRoute.Sitemap = nguHanh.map((m) => ({
    url: `${BASE_URL}/phong-thuy/menh-${m}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...zodiacPages, ...menhPages]
}
