'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Error caught:', error)
  }, [error])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md">
        <div className="mb-6 text-8xl">⚠️</div>
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Có lỗi xảy ra</h1>
        <p className="mb-2 text-gray-600">Rất tiếc, đã xảy ra lỗi không mong muốn.</p>
        <p className="mb-8 text-sm text-gray-500">Error ID: {error.digest || 'unknown'}</p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 rounded-lg bg-red-50 p-4 text-left">
            <summary className="cursor-pointer font-semibold text-red-700">Chi tiết lỗi</summary>
            <pre className="mt-3 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-700">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full rounded-lg py-3 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="rounded-lg border-2 border-gray-300 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Về trang chủ
          </Link>
        </div>

        <div className="mt-12 text-6xl text-gray-200">☯</div>
      </div>
    </div>
  )
}
