'use client'

import { useState } from 'react'

interface TuoiFilterProps {
  onFilterChange: (tuoi: number | null) => void
}

export function TuoiFilter({ onFilterChange }: TuoiFilterProps) {
  const [showTuoi, setShowTuoi] = useState(false)
  const [birthYear, setBirthYear] = useState<string>('')

  function handleBirthYearChange(value: string) {
    setBirthYear(value)
    if (value) {
      const tuoi = new Date().getFullYear() - parseInt(value)
      onFilterChange(tuoi)
    } else {
      onFilterChange(null)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <button
        onClick={() => setShowTuoi(!showTuoi)}
        className="flex w-full items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span>Lọc theo tuổi</span>
        <span className="text-gray-500">{showTuoi ? '▼' : '▶'}</span>
      </button>

      {showTuoi && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-gray-600">Nhập năm sinh để lọc các ngày tốt phù hợp với tuổi bạn</p>

          <input
            type="number"
            min={1900}
            max={new Date().getFullYear()}
            placeholder="Nhập năm sinh (ví dụ: 1990)"
            value={birthYear}
            onChange={(e) => handleBirthYearChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          />

          {birthYear && (
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              Tuổi của bạn: <span className="font-semibold">{new Date().getFullYear() - parseInt(birthYear)}</span> tuổi
            </div>
          )}

          {birthYear && (
            <button
              onClick={() => {
                setBirthYear('')
                onFilterChange(null)
              }}
              className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Xóa lọc
            </button>
          )}
        </div>
      )}
    </div>
  )
}
