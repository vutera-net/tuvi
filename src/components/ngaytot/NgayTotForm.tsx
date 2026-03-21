'use client'

import { useState } from 'react'
import type { DateSelectionResult, EventType } from '@/types'
import { DIA_CHI, THIEN_CAN } from '@/data/can-chi'

const EVENT_TYPES: Array<{ value: EventType; label: string; icon: string }> = [
  { value: 'cuoiHoi', label: 'Cưới hỏi', icon: '💒' },
  { value: 'khaiTruong', label: 'Khai trương', icon: '🏪' },
  { value: 'dongTho', label: 'Động thổ', icon: '🏗️' },
  { value: 'nhapTrach', label: 'Nhập trạch', icon: '🏠' },
  { value: 'xuatHanh', label: 'Xuất hành', icon: '✈️' },
  { value: 'kyHopDong', label: 'Ký hợp đồng', icon: '📝' },
  { value: 'general', label: 'Việc chung', icon: '📅' },
]

export function NgayTotForm() {
  const today = new Date()
  const [eventType, setEventType] = useState<EventType>('general')
  const [fromDate, setFromDate] = useState(today.toISOString().split('T')[0])
  const [toDate, setToDate] = useState(
    new Date(today.getTime() + 30 * 24 * 3600000).toISOString().split('T')[0]
  )
  const [results, setResults] = useState<DateSelectionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/ngaytot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromDate, toDate, eventType, minScore: 55 }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.data ?? [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Event type selector */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-800">Chọn loại sự kiện</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EVENT_TYPES.map((et) => (
            <button
              key={et.value}
              onClick={() => setEventType(et.value)}
              className={`rounded-xl border p-3 text-center transition ${
                eventType === et.value
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl">{et.icon}</div>
              <div className="mt-1 text-xs font-medium">{et.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Từ ngày</label>
              <input
                type="date" value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Đến ngày</label>
              <input
                type="date" value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full rounded-full py-3 font-semibold text-white transition disabled:opacity-60 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? 'Đang tìm...' : 'Tìm Ngày Tốt'}
          </button>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">
            Tìm thấy {results.length} ngày tốt ({EVENT_TYPES.find(e => e.value === eventType)?.label})
          </h3>
          {results.slice(0, 20).map((result, i) => (
            <DateResultCard key={i} result={result} />
          ))}
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="rounded-2xl bg-white p-8 text-center text-gray-400 shadow-sm">
          Nhập điều kiện tìm kiếm và nhấn "Tìm Ngày Tốt"
        </div>
      )}
    </div>
  )
}

function DateResultCard({ result }: { result: DateSelectionResult }) {
  const { solar, lunar, score, rating, truc, sao28, hoangDaoHours, advantages, issues } = result
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const ratingColor =
    rating === 'tot' ? 'border-green-300 bg-green-50' :
    rating === 'kha' ? 'border-blue-200 bg-blue-50' :
    'border-yellow-200 bg-yellow-50'
  const scoreColor =
    rating === 'tot' ? 'bg-green-600' : rating === 'kha' ? 'bg-blue-500' : 'bg-yellow-500'

  const canChiDay = `${THIEN_CAN[lunar.canDay]} ${DIA_CHI[lunar.chiDay]}`

  return (
    <div className={`rounded-xl border p-4 ${ratingColor}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-bold text-gray-800">
            {weekdays[solar.dayOfWeek]} {solar.day}/{solar.month}/{solar.year}
          </div>
          <div className="text-sm text-gray-600">
            Âm: {lunar.day}/{lunar.month} • {canChiDay} • Trực: {truc} • Sao: {sao28}
          </div>
        </div>
        <div className={`rounded-full px-3 py-1 text-sm font-bold text-white ${scoreColor}`}>
          {score}/100
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {advantages.map((a) => (
          <span key={a} className="flex items-center gap-1 text-green-700">
            <span>✓</span> {a}
          </span>
        ))}
        {issues.map((iss) => (
          <span key={iss} className="flex items-center gap-1 text-red-600">
            <span>✕</span> {iss}
          </span>
        ))}
      </div>

      {hoangDaoHours.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="text-xs text-gray-500">Giờ tốt:</span>
          {hoangDaoHours.map((h) => (
            <span key={h} className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">{h}</span>
          ))}
        </div>
      )}
    </div>
  )
}
