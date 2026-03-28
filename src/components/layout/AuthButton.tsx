'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export function AuthButton() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

  if (status === 'loading') {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-gray-100" />
  }

  if (!session) {
    return (
      <>
        <Link href="/dang-nhap" className="text-sm font-medium text-gray-600 hover:text-red-700">
          Đăng nhập
        </Link>
        <Link
          href="/dang-ky"
          className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Dùng miễn phí
        </Link>
      </>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:border-red-200 hover:bg-red-50"
      >
        <span className="text-base">👤</span>
        <span className="max-w-[120px] truncate font-medium text-gray-700">
          {session.user?.name || session.user?.email}
        </span>
        <span className="text-gray-400">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
            <div className="border-b px-4 py-2">
              <p className="text-xs text-gray-500">Đăng nhập với</p>
              <p className="truncate text-sm font-medium text-gray-800">{session.user?.email}</p>
            </div>
            <Link
              href="/tai-khoan"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
              onClick={() => setOpen(false)}
            >
              Tài khoản của tôi
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Đăng xuất
            </button>
          </div>
        </>
      )}
    </div>
  )
}
