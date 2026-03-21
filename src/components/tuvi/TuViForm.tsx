'use client'

import { useState } from 'react'
import type { TuViChart } from '@/types'
import { TuViChartDisplay } from './TuViChartDisplay'

const HOURS = [
  'Tý (23-1h)', 'Sửu (1-3h)', 'Dần (3-5h)', 'Mão (5-7h)',
  'Thìn (7-9h)', 'Tỵ (9-11h)', 'Ngọ (11-13h)', 'Mùi (13-15h)',
  'Thân (15-17h)', 'Dậu (17-19h)', 'Tuất (19-21h)', 'Hợi (21-23h)',
]

export function TuViForm() {
  const [form, setForm] = useState({
    label: '', gender: 'male', birthYear: '', birthMonth: '', birthDay: '',
    birthHour: '0', isLunar: false,
  })
  const [chart, setChart] = useState<TuViChart | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/tuvi/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: form.label || 'Lá số',
          gender: form.gender,
          birthYear: parseInt(form.birthYear),
          birthMonth: parseInt(form.birthMonth),
          birthDay: parseInt(form.birthDay),
          birthHour: parseInt(form.birthHour),
          isLunar: form.isLunar,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setChart(data.data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tên / nhãn lá số</label>
              <input
                name="label" value={form.label} onChange={handleChange}
                placeholder="Lá số của ..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giới tính *</label>
              <select
                name="gender" value={form.gender} onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox" id="isLunar" name="isLunar"
              checked={form.isLunar} onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="isLunar" className="text-sm text-gray-700">
              Nhập theo âm lịch (mặc định: dương lịch)
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Năm sinh *</label>
              <input
                type="number" name="birthYear" value={form.birthYear} onChange={handleChange}
                placeholder="1990" min={1900} max={2100} required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tháng *</label>
              <input
                type="number" name="birthMonth" value={form.birthMonth} onChange={handleChange}
                placeholder="1" min={1} max={12} required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Ngày *</label>
              <input
                type="number" name="birthDay" value={form.birthDay} onChange={handleChange}
                placeholder="15" min={1} max={31} required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Giờ sinh *</label>
            <select
              name="birthHour" value={form.birthHour} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
            >
              {HOURS.map((h, i) => (
                <option key={i} value={i}>{h}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full rounded-full py-3 font-semibold text-white transition disabled:opacity-60 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? 'Đang tính toán...' : 'Lập Lá Số Tử Vi'}
          </button>
        </form>
      </div>

      {chart && <TuViChartDisplay chart={chart} />}
    </div>
  )
}
