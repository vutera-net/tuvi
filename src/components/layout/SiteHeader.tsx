'use client'

import Link from 'next/link'
import { useState } from 'react'

const ANMENH_URL = 'https://anmenh.vutera.net'

const NAV_LINKS = [
  { href: '/lich', label: 'Lịch Vạn Niên' },
  { href: '/xem-menh', label: 'Xem Mệnh' },
  { href: '/tu-vi', label: 'Tử Vi' },
  { href: '/xem-ngay', label: 'Xem Ngày' },
  { href: '/phong-thuy', label: 'Phong Thủy' },
  { href: '/tu-vi-hang-ngay', label: 'TV Hàng Ngày' },
  { href: '/blog', label: 'Blog' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white shadow-sm">
      {/* Ecosystem banner */}
      <div className="border-b border-amber-100 bg-amber-50 py-1.5 text-center text-xs text-amber-800">
        TuVi là một phần của hệ{' '}
        <a href="https://www.vutera.net/harmony" className="font-semibold underline hover:text-amber-900">
          Harmony
        </a>
        {' '}—{' '}
        <a href={ANMENH_URL} className="font-semibold underline hover:text-amber-900">
          Trải nghiệm sâu hơn tại AnMenh →
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☯</span>
            <div>
              <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                Harmony Tử Vi
              </div>
              <div className="text-xs text-gray-500">Luận mệnh - Chọn ngày - An tâm</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-red-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={ANMENH_URL}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
            >
              AnMenh →
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 space-y-2 border-t pt-3">
              <a
                href={ANMENH_URL}
                className="block w-full rounded-full py-2.5 text-center text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
              >
                🔮 Trải nghiệm cá nhân hóa tại AnMenh →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
