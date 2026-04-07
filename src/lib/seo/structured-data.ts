/**
 * JSON-LD Structured Data Generator
 * Generates structured data for search engines (Google, Bing)
 */

export interface FAQItem {
  question: string
  answer: string
}

export interface ArticleMetadata {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
}

export interface BreadcrumbItem {
  name: string
  item: string
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[], appName: string, appUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(metadata: ArticleMetadata, appUrl: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    image: metadata.image || `${appUrl}/og-image.png`,
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified || metadata.datePublished,
    author: {
      '@type': 'Organization',
      name: metadata.author || 'TuVi Ngay Moi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TuVi Ngay Moi',
      logo: {
        '@type': 'ImageObject',
        url: `${appUrl}/logo.png`,
      },
    },
    url: `${appUrl}/blog/${slug}`,
  }
}

/**
 * Generate WebApplication schema
 */
export function generateWebAppSchema(appName: string, appUrl: string, appDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: appName,
    url: appUrl,
    description: appDescription,
    applicationCategory: 'LifestyleApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
      description: 'Free with premium tiers available',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100',
    },
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

/**
 * Generate LocalBusiness schema for Vietnamese business context
 */
export function generateLocalBusinessSchema(businessName: string, appUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    url: appUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['vi', 'en'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Vietnam',
    },
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(
  name: string,
  url: string,
  logo: string,
  sameAsUrls: string[] = []
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    sameAs: sameAsUrls,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
    },
  }
}

/**
 * Generate Person schema (for horoscope content)
 */
export function generatePersonSchema(name: string, zodiacSign: string, birthYear: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description: `Horoscope and destiny analysis for ${zodiacSign} (${birthYear})`,
  }
}

/**
 * Generate Event schema (for date selection content)
 */
export function generateEventSchema(eventType: string, date: string, appUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Auspicious Date for ${eventType}`,
    startDate: date,
    description: `Auspicious date selection for ${eventType} in Vietnamese Feng Shui tradition`,
    url: appUrl,
  }
}

/**
 * Helper to render schema as script tag
 */
export function schemaToScript(schema: Record<string, any>): string {
  return JSON.stringify(schema)
}
