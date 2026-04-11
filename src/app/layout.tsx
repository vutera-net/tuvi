import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Serif } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Providers } from '@/components/layout/Providers'
import { StickyCTA } from '@/components/funnel/StickyCTA'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
})

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Harmony Tử Vi - Phong Thủy, Tử Vi & Xem Ngày',
    template: '%s | Harmony Tử Vi',
  },
  description:
    'Nền tảng phong thủy, tử vi và xem ngày tốt xấu toàn diện nhất cho người Việt. Luận mệnh Ngũ Hành, lá số Tử Vi, chọn ngày đẹp, phong thủy nhà ở.',
  keywords: ['phong thủy', 'tử vi', 'xem ngày tốt xấu', 'lịch vạn niên', 'luận mệnh', 'ngũ hành'],
  authors: [{ name: 'Harmony Tử Vi' }],
  alternates: {
    canonical: '/',
    languages: {
      'vi': BASE_URL,
      'vi-VN': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Harmony Tử Vi',
    url: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <StickyCTA />
        </Providers>
      </body>
    </html>
  )
}
