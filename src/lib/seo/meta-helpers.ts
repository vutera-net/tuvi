/**
 * SEO Meta Tag Helpers
 * Functions for canonical URLs, hreflang tags, and meta tags
 */

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(baseUrl: string, path: string): string {
  const cleanPath = path.replace(/\/$/, '') || '/'
  const url = new URL(cleanPath, baseUrl)
  return url.toString()
}

/**
 * Generate hreflang tags for Vietnamese
 */
export interface HrefLangLink {
  hrefLang: string
  href: string
}

export function generateHrefLangTags(baseUrl: string, path: string): HrefLangLink[] {
  const canonicalUrl = getCanonicalUrl(baseUrl, path)

  return [
    {
      hrefLang: 'vi',
      href: canonicalUrl,
    },
    {
      hrefLang: 'vi-VN',
      href: canonicalUrl,
    },
    {
      hrefLang: 'x-default',
      href: canonicalUrl,
    },
  ]
}

/**
 * Generate Open Graph meta tags
 */
export interface OpenGraphMeta {
  'og:type': string
  'og:url': string
  'og:title': string
  'og:description': string
  'og:image'?: string
  'og:site_name': string
  'og:locale': string
}

export function generateOpenGraphTags(
  url: string,
  title: string,
  description: string,
  type: 'website' | 'article' = 'website',
  image?: string
): OpenGraphMeta {
  return {
    'og:type': type,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:site_name': 'TuVi Ngay Moi',
    'og:locale': 'vi_VN',
  }
}

/**
 * Generate Twitter Card meta tags
 */
export interface TwitterMeta {
  'twitter:card': string
  'twitter:title': string
  'twitter:description': string
  'twitter:image'?: string
}

export function generateTwitterTags(
  title: string,
  description: string,
  image?: string
): TwitterMeta {
  return {
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  }
}

/**
 * Generate meta description (max 160 chars)
 */
export function generateMetaDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Generate SEO meta title (max 60 chars)
 */
export function generateMetaTitle(title: string, siteName = 'TuVi Ngay Moi'): string {
  const formattedTitle = `${title} | ${siteName}`
  if (formattedTitle.length > 60) {
    return `${title.substring(0, 30)} | ${siteName}`
  }
  return formattedTitle
}

/**
 * Generate keywords for Tu Vi content
 */
export function generateTuViKeywords(zodiacSign: string, year?: number): string[] {
  const baseKeywords = [
    `tu vi ${zodiacSign}`,
    `xem tu vi ${zodiacSign}`,
    `${zodiacSign} nam`,
    'tu vi dau so',
    'xem menh',
  ]

  if (year) {
    baseKeywords.push(`tu vi ${zodiacSign} nam ${year}`)
    baseKeywords.push(`${zodiacSign} nam ${year}`)
  }

  return baseKeywords
}

/**
 * Generate keywords for date selection content
 */
export function generateDateSelectionKeywords(eventType: string, month?: number, year?: number): string[] {
  const baseKeywords = [
    `xem ngay tot ${eventType}`,
    `ngay tot ${eventType}`,
    'xem ngay tot',
    'lich ngay tot',
  ]

  if (month && year) {
    baseKeywords.push(`xem ngay tot thang ${month} nam ${year}`)
    baseKeywords.push(`ngay tot ${eventType} thang ${month}`)
  }

  return baseKeywords
}

/**
 * Generate keywords for Feng Shui content
 */
export function generateFengShuiKeywords(element?: string): string[] {
  const baseKeywords = [
    'phong thuy',
    'bat trach',
    'menh ngu hanh',
    'xem menh',
    'phong thuy nha o',
  ]

  if (element) {
    baseKeywords.push(`phong thuy menh ${element}`)
    baseKeywords.push(`huong tot menh ${element}`)
  }

  return baseKeywords
}

/**
 * Generate robots meta tag value
 */
export function generateRobotsMeta(
  index = true,
  follow = true,
  maxSnippet = -1,
  maxImagePreview = 'large'
): string {
  const values: string[] = []

  if (index) values.push('index')
  else values.push('noindex')

  if (follow) values.push('follow')
  else values.push('nofollow')

  if (maxSnippet >= 0) values.push(`max-snippet:${maxSnippet}`)
  values.push(`max-image-preview:${maxImagePreview}`)

  return values.join(', ')
}

/**
 * Generate alternate links for language variants
 */
export interface AlternateLink {
  rel: 'alternate'
  hrefLang: string
  href: string
}

export function generateAlternateLinks(baseUrl: string, path: string): AlternateLink[] {
  const url = getCanonicalUrl(baseUrl, path)

  return [
    {
      rel: 'alternate',
      hrefLang: 'vi',
      href: url,
    },
    {
      rel: 'alternate',
      hrefLang: 'vi-VN',
      href: url,
    },
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: url,
    },
  ]
}
