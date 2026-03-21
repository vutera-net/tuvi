'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/lich', label: 'Lịch Vạn Niên' },
  { href: '/xem-menh', label: 'Xem Mệnh' },
  { href: '/tu-vi', label: 'Tử Vi' },
  { href: '/xem-ngay', label: 'Xem Ngày' },
  { href: '/phong-thuy', label: 'Phong Thủy' },
  { href: '/tu-vi-hang-ngay', label: 'TV Hàng Ngày' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☯</span>
            <div>
              <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                TuVi Ngày Mới
              </div>
              <div className="text-xs text-gray-500">Luận mệnh - Chọn ngày - An tâm</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
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
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/dang-nhap"
              className="text-sm font-medium text-gray-600 hover:text-red-700"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Dùng miễn phí
            </Link>
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
            <div className="mt-3 flex gap-3 border-t pt-3">
              <Link href="/dang-nhap" className="flex-1 text-center text-sm text-gray-600">
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                className="flex-1 rounded-full py-2 text-center text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Dùng miễn phí
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
