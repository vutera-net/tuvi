import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb navigation + JSON-LD BreadcrumbList schema.
 * Pass items in order: [{label:'Trang chủ', href:'/'}, ..., {label:'Current page'}]
 * Last item (no href) is the current page — rendered as plain text.
 */
export function Breadcrumb({ items }: Props) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    item: item.href ? `${BASE_URL}${item.href}` : `${BASE_URL}/`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(schemaItems)) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span className={isLast ? 'truncate text-gray-600' : 'hover:text-gray-600'}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-gray-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
