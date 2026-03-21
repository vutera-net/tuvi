'use client'

import { useState } from 'react'
import type { TuViChart, Palace, Star } from '@/types'
import { NGU_HANH_COLOR_HEX, NGU_HANH_VI } from '@/data/ngu-hanh'

interface Props {
  chart: TuViChart
}

// Layout of 12 palaces in a 4x4 grid (outer ring, center is empty)
// Palace indices arranged clockwise from top-left
const PALACE_GRID_POSITIONS: Array<{ row: number; col: number; palaceOffset: number }> = [
  // Top row (left to right): palaces at DiaChi index 10,11,0,1
  { row: 0, col: 0, palaceOffset: 10 },
  { row: 0, col: 1, palaceOffset: 11 },
  { row: 0, col: 2, palaceOffset: 0 },
  { row: 0, col: 3, palaceOffset: 1 },
  // Right column (top to bottom): 2,3
  { row: 1, col: 3, palaceOffset: 2 },
  { row: 2, col: 3, palaceOffset: 3 },
  // Bottom row (right to left): 4,5,6,7
  { row: 3, col: 3, palaceOffset: 4 },
  { row: 3, col: 2, palaceOffset: 5 },
  { row: 3, col: 1, palaceOffset: 6 },
  { row: 3, col: 0, palaceOffset: 7 },
  // Left column (bottom to top): 8,9
  { row: 2, col: 0, palaceOffset: 8 },
  { row: 1, col: 0, palaceOffset: 9 },
]

export function TuViChartDisplay({ chart }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null)
  const elColor = NGU_HANH_COLOR_HEX[chart.menh]

  // Build grid: position -> palace
  const palacesByDiaChi = Object.fromEntries(chart.palaces.map((p) => [p.index, p]))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: elColor }}
          >
            {NGU_HANH_VI[chart.menh][0]}
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">{chart.label}</div>
            <div className="text-sm text-gray-600">
              {chart.gender === 'male' ? 'Nam' : 'Nữ'} • Năm {chart.birthDate.year} •{' '}
              Giờ {chart.birthHourName}
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs">
                Mệnh: <strong>{NGU_HANH_VI[chart.menh]}</strong> ({chart.napAm})
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs">
                Cục: <strong>{chart.cuc}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart grid */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">Lá Số Tử Vi - 12 Cung</h3>
        <div className="relative grid grid-cols-4 gap-1">
          {PALACE_GRID_POSITIONS.map(({ row, col, palaceOffset }) => {
            const chiIdx = (chart.cungMenhIndex + palaceOffset) % 12
            const palace = palacesByDiaChi[chiIdx]
            if (!palace) return null
            return (
              <PalaceCell
                key={chiIdx}
                palace={palace}
                isSelected={selectedPalace?.index === palace.index}
                onClick={() => setSelectedPalace(palace)}
              />
            )
          })}

          {/* Center info */}
          <div className="col-start-2 row-start-2 col-span-2 row-span-2 flex flex-col items-center justify-center rounded-lg bg-red-50 p-2 text-center text-xs">
            <div className="font-bold text-red-800">{chart.label}</div>
            <div className="text-gray-600">
              {chart.birthDate.day}/{chart.birthDate.month}/{chart.birthDate.year}
            </div>
            <div style={{ color: elColor }} className="font-semibold">
              Mệnh {NGU_HANH_VI[chart.menh]}
            </div>
            <div className="text-gray-500">{chart.cuc}</div>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          * Click vào cung để xem chi tiết
        </p>
      </div>

      {/* Palace detail */}
      {selectedPalace && (
        <PalaceDetail palace={selectedPalace} />
      )}

      {/* Dai Han */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">Đại Hạn ({chart.cucNumber} năm/vận)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-2 pr-4">Tuổi</th>
                <th className="py-2 pr-4">Năm</th>
                <th className="py-2 pr-4">Cung</th>
                <th className="py-2">Chi</th>
              </tr>
            </thead>
            <tbody>
              {chart.daiHan.slice(0, 8).map((dh, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-1.5 pr-4 font-medium">{dh.startAge}-{dh.endAge}</td>
                  <td className="py-1.5 pr-4 text-gray-500">{dh.startYear}</td>
                  <td className="py-1.5 pr-4">{dh.palaceName}</td>
                  <td className="py-1.5 text-gray-500">{dh.diaChi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PalaceCell({ palace, isSelected, onClick }: {
  palace: Palace; isSelected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border p-1.5 text-left transition ${
        palace.isLifePalace ? 'border-red-400 bg-red-50' :
        palace.isSoulPalace ? 'border-purple-400 bg-purple-50' :
        'border-gray-200 bg-white hover:bg-gray-50'
      } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
    >
      <div className="mb-0.5 text-xs font-bold text-gray-700">
        {palace.name} {palace.isLifePalace ? '(M)' : palace.isSoulPalace ? '(T)' : ''}
      </div>
      <div className="text-xs text-gray-400">{palace.diaChi}</div>
      {palace.mainStars.slice(0, 2).map((star) => (
        <div
          key={star.name}
          className={`truncate text-xs ${
            star.brightness === 'mieu' || star.brightness === 'vuong'
              ? 'font-semibold text-red-700'
              : star.brightness === 'hamDia'
              ? 'italic text-gray-400'
              : 'text-gray-600'
          }`}
        >
          {star.name}
        </div>
      ))}
      {palace.mainStars.length > 2 && (
        <div className="text-xs text-gray-400">+{palace.mainStars.length - 2}</div>
      )}
    </button>
  )
}

function PalaceDetail({ palace }: { palace: Palace }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-800">
        Cung {palace.name} - {palace.diaChi}
        {palace.isLifePalace && ' (Mệnh)'}
        {palace.isSoulPalace && ' (Thân)'}
      </h3>
      {palace.mainStars.length === 0 ? (
        <p className="text-sm text-gray-500">Cung trống - không có chính tinh</p>
      ) : (
        <div className="space-y-3">
          {palace.mainStars.map((star) => (
            <div key={star.name} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <div
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  star.brightness === 'mieu' ? 'star-mieu bg-red-50' :
                  star.brightness === 'vuong' ? 'star-vuong bg-yellow-50' :
                  star.brightness === 'hamDia' ? 'star-hamDia bg-gray-100' :
                  'bg-blue-50 text-blue-700'
                }`}
              >
                {star.name}
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  {star.brightness === 'mieu' ? 'Miếu' :
                   star.brightness === 'vuong' ? 'Vượng' :
                   star.brightness === 'dacDia' ? 'Đắc Địa' :
                   star.brightness === 'binhHoa' ? 'Bình Hòa' : 'Hãm Địa'}
                </div>
                <div className="text-sm text-gray-700">{star.shortMeaning}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
