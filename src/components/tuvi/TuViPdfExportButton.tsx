'use client'

import { useState } from 'react'
import type { TuViChart } from '@/types'

interface Props {
  chart: TuViChart
}

export function TuViPdfExportButton({ chart }: Props) {
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

      if (!res.ok) {
        setError('Có lỗi xảy ra. Vui lòng thử lại.')
        return
      }

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

  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-red-50 disabled:opacity-60"
        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
      >
        <span>{loading ? '⏳' : '⬇'}</span>
        {loading ? 'Đang tạo PDF...' : 'Xuất PDF'}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
