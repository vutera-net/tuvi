'use client'

import { useState } from 'react'
import type { NguHanhInfo } from '@/types'
import { getNguHanhByYear, getCanChiByYear } from '@/lib/engines/ngu-hanh-engine'
import { NGU_HANH_COLOR_HEX, NGU_HANH_VI } from '@/data/ngu-hanh'

export function XemMenhForm() {
  const [year, setYear] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<NguHanhInfo | null>(null)
  const [canChi, setCanChi] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const y = parseInt(year)
    if (isNaN(y) || y < 1900 || y > 2100) {
      setError('Năm sinh không hợp lệ (1900-2100)')
      return
    }
    setError('')
    const info = getNguHanhByYear(y)
    const cc = getCanChiByYear(y)
    setResult(info)
    setCanChi(cc)
  }

  const elColor = result ? NGU_HANH_COLOR_HEX[result.menh] : '#999'
  const elName = result ? NGU_HANH_VI[result.menh] : ''

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Họ và tên (tùy chọn)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Năm sinh dương lịch *
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1990"
                min={1900}
                max={2100}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full py-3 font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Xem Mệnh Ngũ Hành
          </button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
                style={{ backgroundColor: elColor }}
              >
                {elName[0]}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {name ? `${name} • ` : ''}Năm {year} • {canChi}
                </div>
                <div className="text-3xl font-bold" style={{ color: elColor }}>
                  Mệnh {elName}
                </div>
                <div className="text-sm text-gray-600">{result.napAm}</div>
              </div>
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed">{result.tinhCach}</p>
          </div>

          {/* Colors */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-800">Màu sắc may mắn</h3>
            <div className="flex flex-wrap gap-2">
              {result.mauSacTot.map((color) => (
                <span key={color} className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                  ✓ {color}
                </span>
              ))}
            </div>
            <h3 className="mb-3 mt-4 font-semibold text-gray-800">Màu cần tránh</h3>
            <div className="flex flex-wrap gap-2">
              {result.mauSacXau.map((color) => (
                <span key={color} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
                  ✕ {color}
                </span>
              ))}
            </div>
          </div>

          {/* Lucky info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
              <div className="mb-1 text-2xl">🧭</div>
              <div className="text-sm font-medium text-gray-700">Hướng may mắn</div>
              <div className="mt-1 text-sm text-gray-600">{result.huongTot.join(', ')}</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
              <div className="mb-1 text-2xl">🔢</div>
              <div className="text-sm font-medium text-gray-700">Số may mắn</div>
              <div className="mt-1 text-2xl font-bold" style={{ color: elColor }}>
                {result.soMayMan.join(' - ')}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
              <div className="mb-1 text-2xl">⚡</div>
              <div className="text-sm font-medium text-gray-700">Tương sinh</div>
              <div className="mt-1 text-sm text-gray-600">
                {NGU_HANH_VI[result.sinhBoi]} sinh • {NGU_HANH_VI[result.sinh]} được sinh
              </div>
            </div>
          </div>

          {/* Compatibility check */}
          <CompatibilityCheck currentYear={parseInt(year)} currentName={name} currentMenh={result} />
        </div>
      )}
    </div>
  )
}

function CompatibilityCheck({
  currentYear,
  currentName,
  currentMenh,
}: {
  currentYear: number
  currentName: string
  currentMenh: NguHanhInfo
}) {
  const [year2, setYear2] = useState('')
  const [name2, setName2] = useState('')
  const [compat, setCompat] = useState<{
    relationship: string; score: number; analysis: string
  } | null>(null)

  function check(e: React.FormEvent) {
    e.preventDefault()
    const y2 = parseInt(year2)
    if (isNaN(y2)) return
    const { checkCompatibility } = require('@/data/ngu-hanh')
    const info2 = getNguHanhByYear(y2)
    const result = checkCompatibility(currentMenh.menh, info2.menh)
    setCompat(result)
  }

  const compatColor = compat?.relationship === 'tuongSinh'
    ? 'green' : compat?.relationship === 'tuongKhac' ? 'red' : 'yellow'

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-800">Kiểm tra hợp mệnh</h3>
      <form onSubmit={check} className="flex gap-3">
        <input
          type="text"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Tên người kia"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
        />
        <input
          type="number"
          value={year2}
          onChange={(e) => setYear2(e.target.value)}
          placeholder="Năm sinh"
          className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Kiểm tra
        </button>
      </form>
      {compat && (
        <div
          className={`mt-4 rounded-xl p-4 bg-${compatColor}-50 border border-${compatColor}-200`}
        >
          <div className="font-medium" style={{ color: compatColor === 'green' ? '#166534' : compatColor === 'red' ? '#991B1B' : '#92400E' }}>
            Điểm tương hợp: {compat.score}/100
          </div>
          <p className="mt-1 text-sm text-gray-700">{compat.analysis}</p>
        </div>
      )}
    </div>
  )
}
