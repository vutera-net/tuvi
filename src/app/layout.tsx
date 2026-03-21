import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'TuVi Ngày Mới - Phong Thủy, Tử Vi & Xem Ngày',
    template: '%s | TuVi Ngày Mới',
  },
  description:
    'Nền tảng phong thủy, tử vi và xem ngày tốt xấu toàn diện nhất cho người Việt. Luận mệnh Ngũ Hành, lá số Tử Vi, chọn ngày đẹp, phong thủy nhà ở.',
  keywords: ['phong thủy', 'tử vi', 'xem ngày tốt xấu', 'lịch vạn niên', 'luận mệnh', 'ngũ hành'],
  authors: [{ name: 'TuVi Ngày Mới' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'TuVi Ngày Mới',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
