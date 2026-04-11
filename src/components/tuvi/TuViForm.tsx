'use client'

import { useState, useEffect } from 'react'
import type { TuViChart } from '@/types'
import { TuViChartDisplay } from './TuViChartDisplay'
import { useSessionMemory } from '@/hooks/useSessionMemory'
const HOURS = [
  { name: 'Tý', time: '23–1h' },
  { name: 'Sửu', time: '1–3h' },
  { name: 'Dần', time: '3–5h' },
  { name: 'Mão', time: '5–7h' },
  { name: 'Thìn', time: '7–9h' },
  { name: 'Tỵ', time: '9–11h' },
  { name: 'Ngọ', time: '11–13h' },
  { name: 'Mùi', time: '13–15h' },
  { name: 'Thân', time: '15–17h' },
  { name: 'Dậu', time: '17–19h' },
  { name: 'Tuất', time: '19–21h' },
  { name: 'Hợi', time: '21–23h' },
]

export function TuViForm() {
  const [form, setForm] = useState({
    label: '',
    gender: 'male',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '0',
    isLunar: false,
  })
  const { memory, isLoaded, updateMemory } = useSessionMemory()
  const [chart, setChart] = useState<TuViChart | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoaded && memory) {
      setForm((prev) => ({
        ...prev,
        label: memory.name || prev.label,
        gender: memory.gender || prev.gender,
        birthYear: memory.birthYear?.toString() || prev.birthYear,
        birthMonth: memory.birthMonth?.toString() || prev.birthMonth,
        birthDay: memory.birthDay?.toString() || prev.birthDay,
        birthHour: memory.birthHour?.toString() || prev.birthHour,
      }))
    }
  }, [isLoaded, memory])

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
      updateMemory({
        name: form.label,
        gender: form.gender as 'male' | 'female',
        birthYear: parseInt(form.birthYear) || undefined,
        birthMonth: parseInt(form.birthMonth) || undefined,
        birthDay: parseInt(form.birthDay) || undefined,
        birthHour: parseInt(form.birthHour) || 0,
      })
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tên / nhãn lá số</label>
            <input
              name="label"
              value={form.label}
              onChange={handleChange}
              placeholder="Ví dụ: Lá số Nguyễn Văn A"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          {/* Gender toggle */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Giới tính *</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, gender: g }))}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                    form.gender === g
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl leading-none">{g === 'male' ? '♂' : '♀'}</span>
                  {g === 'male' ? 'Nam' : 'Nữ'}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar type segmented control */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <div>
              <div className="text-sm font-medium text-gray-700">Loại lịch</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {form.isLunar ? 'Nhập ngày sinh theo âm lịch' : 'Nhập ngày sinh theo dương lịch'}
              </div>
            </div>
            <div className="flex rounded-lg bg-gray-200 p-0.5">
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, isLunar: false }))}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  !form.isLunar ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                }`}
              >
                Dương lịch
              </button>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, isLunar: true }))}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  form.isLunar ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                }`}
              >
                Âm lịch
              </button>
            </div>
          </div>

          {/* Date inputs */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Ngày tháng năm sinh *{' '}
              <span className="font-normal text-gray-400">({form.isLunar ? 'âm lịch' : 'dương lịch'})</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  type="number"
                  name="birthDay"
                  value={form.birthDay}
                  onChange={handleChange}
                  placeholder="15"
                  min={1}
                  max={31}
                  required
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-center text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
                <div className="mt-1 text-center text-xs text-gray-400">Ngày</div>
              </div>
              <div>
                <input
                  type="number"
                  name="birthMonth"
                  value={form.birthMonth}
                  onChange={handleChange}
                  placeholder="6"
                  min={1}
                  max={12}
                  required
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-center text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
                <div className="mt-1 text-center text-xs text-gray-400">Tháng</div>
              </div>
              <div>
                <input
                  type="number"
                  name="birthYear"
                  value={form.birthYear}
                  onChange={handleChange}
                  placeholder="1990"
                  min={1900}
                  max={2100}
                  required
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-center text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
                <div className="mt-1 text-center text-xs text-gray-400">Năm</div>
              </div>
            </div>
          </div>

          {/* Hour picker — 12 buttons in a grid */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Giờ sinh *</label>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
              {HOURS.map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, birthHour: String(i) }))}
                  className={`rounded-xl border py-2.5 text-center transition-all ${
                    form.birthHour === String(i)
                      ? 'border-red-400 bg-red-50 text-red-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-semibold leading-tight">{h.name}</div>
                  <div className="text-[10px] text-gray-400 leading-tight mt-0.5">{h.time}</div>
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Chọn giờ địa chi gần với giờ bạn được sinh ra nhất
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3.5 font-semibold text-white transition-all disabled:opacity-60 hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang tính toán lá số...
              </span>
            ) : (
              'Lập Lá Số Tử Vi'
            )}
          </button>
        </form>
      </div>

      {chart && <TuViChartDisplay chart={chart} />}
    </div>
  )
}
