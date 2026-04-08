'use client'

import { useState } from 'react'
import type { TuViChart } from '@/types'

interface Props {
  chart: TuViChart
  userTier?: string // pass from server component for initial state
}

/**
 * VIP-gated button — exports the Tu Vi chart as a PDF.
 * Shows an upgrade prompt if the user is not VIP.
 */
export function TuViPdfExportButton({ chart, userTier }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleExport() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tuvi/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart }),
      })

      if (res.status === 403) {
        setError('Tính năng xuất PDF dành cho thành viên VIP.')
        return
      }
      if (!res.ok) {
        setError('Có lỗi xảy ra. Vui lòng thử lại.')
        return
      }

      // Trigger download
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `la-so-tu-vi-${chart.label.replace(/\s+/g, '-').toLowerCase()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const isVip = userTier === 'vip'

  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-red-50 disabled:opacity-60"
        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        title={isVip ? 'Xuất PDF lá số Tử Vi' : 'Tính năng VIP — nhấn để nâng cấp'}
      >
        <span>{loading ? '⏳' : '⬇'}</span>
        {loading ? 'Đang tạo PDF...' : 'Xuất PDF'}
        {!isVip && (
          <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700">
            VIP
          </span>
        )}
      </button>

      {error && (
        <p className="text-xs text-red-600">
          {error}{' '}
          {error.includes('VIP') && (
            <a href="/pricing" className="underline font-medium">
              Nâng cấp ngay →
            </a>
          )}
        </p>
      )}
    </div>
  )
}
