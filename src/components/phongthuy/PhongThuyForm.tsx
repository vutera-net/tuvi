'use client'

import { useState } from 'react'
import type { BatTrachResult } from '@/types'
import { ContentLock } from '@/components/funnel/ContentLock'

export function PhongThuyForm() {
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [batTrach, setBatTrach] = useState<BatTrachResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const year = parseInt(birthYear)
    if (isNaN(year) || year < 1900 || year > 2100) {
      setError('Năm sinh không hợp lệ')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/phongthuy/battrach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthYear: year, gender }),
      }).then((r) => r.json())

      if (res.error) throw new Error(res.error)
      setBatTrach(res.data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Năm sinh *</label>
              <input
                type="number" value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="1990" min={1900} max={2100} required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giới tính *</label>
              <select
                value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full rounded-full py-3 font-semibold text-white transition disabled:opacity-60 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? 'Đang tính...' : 'Xem Phong Thủy'}
          </button>
        </form>
      </div>

      {/* Bat Trach Result */}
      {batTrach && (
        <>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {batTrach.cungNumber}
              </div>
              <div>
                <div className="font-bold text-gray-800">Cung Mệnh: {batTrach.cungMenh}</div>
                <div className="text-sm text-gray-500">
                  {batTrach.nhomMenh === 'dong' ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh'}
                </div>
              </div>
            </div>

            <h3 className="mb-3 font-semibold text-green-700">Hướng Tốt (4 hướng nên dùng)</h3>
            <div className="space-y-2">
              {batTrach.huongNhaTot.map((h) => (
                <div key={h.name} className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                  <span className="text-lg font-bold text-green-600 w-8">{h.direction}</span>
                  <div>
                    <div className="font-medium text-green-800">{h.name}</div>
                    <div className="text-xs text-gray-600">{h.usage}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 mt-4 font-semibold text-red-700">Hướng Xấu (4 hướng cần tránh)</h3>
            <div className="space-y-2">
              {batTrach.huongNhaXau.map((h) => (
                <div key={h.name} className="flex items-start gap-3 rounded-lg bg-red-50 p-3">
                  <span className="text-lg font-bold text-red-600 w-8">{h.direction}</span>
                  <div>
                    <div className="font-medium text-red-800">{h.name}</div>
                    <div className="text-xs text-gray-600">{h.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ContentLock
            context="phongthuy_cuucung"
            buttonText="Xem phân tích chi tiết"
            items={[
              `Cửu Cung Phi Tinh năm ${new Date().getFullYear()} — sao nào bay vào hướng nhà bạn`,
              'Bố trí phòng ngủ, phòng khách, bếp theo hướng cung mệnh',
              'Vị trí đặt bàn làm việc, giường ngủ tốt nhất',
              'Màu sắc & vật phẩm phong thủy phù hợp từng khu vực',
            ]}
          />
        </>
      )}
    </div>
  )
}
