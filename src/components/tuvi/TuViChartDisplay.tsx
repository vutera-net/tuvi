'use client'

import { useState } from 'react'
import type { TuViChart, Palace, Star, DaiHan } from '@/types'
import { NGU_HANH_COLOR_HEX, NGU_HANH_VI } from '@/data/ngu-hanh'
import { calculateTieuHan, getDaiHanDirection } from '@/lib/engines/tuvi-engine'
import { interpretPalace, getStarInterpretation } from '@/lib/engines/tuvi-interpreter'
import { TuViPdfExportButton } from './TuViPdfExportButton'

const CURRENT_YEAR = new Date().getFullYear()

interface Props {
  chart: TuViChart
  userTier?: string
}

// Fixed DiaChi index → [row, col] in 4×4 grid (outer ring only)
// Traditional Tử Vi layout: Tỵ top-left, clockwise
//   Tỵ(5)  Ngọ(6) Mùi(7)  Thân(8)
//   Thìn(4)  [center 2×2]  Dậu(9)
//   Mão(3)   [center 2×2]  Tuất(10)
//   Dần(2)  Sửu(1) Tý(0)   Hợi(11)
const DIACHI_GRID: Record<number, [number, number]> = {
  5: [0, 0], 6: [0, 1], 7: [0, 2], 8: [0, 3],
  4: [1, 0],                        9: [1, 3],
  3: [2, 0],                        10: [2, 3],
  2: [3, 0], 1: [3, 1], 0: [3, 2], 11: [3, 3],
}

// Minor stars worth showing on the cell (hung tinh + notable helpers)
const NOTABLE_MINOR = new Set([
  'Lộc Tồn', 'Kình Dương', 'Đà La',
  'Văn Xương', 'Văn Khúc', 'Tả Phù', 'Hữu Bật',
  'Thiên Khôi', 'Thiên Việt', 'Thiên Mã',
  'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp',
])

export function TuViChartDisplay({ chart, userTier }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null)
  const [selectedDaiHan, setSelectedDaiHan] = useState<DaiHan | null>(null)
  const elColor = NGU_HANH_COLOR_HEX[chart.menh]
  const forward = getDaiHanDirection(chart.gender, chart.cungMenhIndex)

  // Build DiaChi → palace map and DiaChi → DaiHan age-range map
  const palacesByDiaChi = Object.fromEntries(chart.palaces.map((p) => [p.index, p]))
  const daiHanByPalace = Object.fromEntries(chart.daiHan.map((dh) => [dh.palaceIndex, dh]))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
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
          <TuViPdfExportButton chart={chart} userTier={userTier} />
        </div>
      </div>

      {/* Chart grid */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">Lá Số Tử Vi - 12 Cung</h3>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, auto)' }}
        >
          {chart.palaces.map((palace) => {
            const pos = DIACHI_GRID[palace.index]
            if (!pos) return null
            const [row, col] = pos
            const dh = daiHanByPalace[palace.index]
            return (
              <div key={palace.index} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
                <PalaceCell
                  palace={palace}
                  isSelected={selectedPalace?.index === palace.index}
                  daiHanRange={dh ? `${dh.startAge}–${dh.endAge}` : undefined}
                  onClick={() => setSelectedPalace(palace)}
                />
              </div>
            )
          })}

          {/* Center info */}
          <div
            style={{ gridRow: '2 / 4', gridColumn: '2 / 4' }}
            className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-2 text-center text-xs"
          >
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

      {/* Dai Han + Tieu Han */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-1 font-semibold text-gray-800">Đại Hạn ({chart.cucNumber} năm/vận)</h3>
        <p className="mb-4 text-xs text-gray-400">Bấm vào một vận để xem Tiểu Hạn từng năm</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-2 pr-4">Tuổi</th>
                <th className="py-2 pr-4">Năm bắt đầu</th>
                <th className="py-2 pr-4">Cung</th>
                <th className="py-2 pr-4">Chi</th>
                <th className="py-2 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {chart.daiHan.slice(0, 8).map((dh, i) => {
                const isActive = CURRENT_YEAR >= dh.startYear && CURRENT_YEAR <= dh.startYear + chart.cucNumber - 1
                const isSelected = selectedDaiHan?.startAge === dh.startAge
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedDaiHan(isSelected ? null : dh)}
                    className={`cursor-pointer border-b last:border-0 transition-colors ${
                      isSelected ? 'bg-amber-50' : isActive ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-2 pr-4 font-medium">
                      {dh.startAge}–{dh.endAge}
                      {isActive && <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">hiện tại</span>}
                    </td>
                    <td className="py-2 pr-4 text-gray-500">{dh.startYear}</td>
                    <td className="py-2 pr-4">{dh.palaceName}</td>
                    <td className="py-2 pr-4 text-gray-500">{dh.diaChi}</td>
                    <td className="py-2 text-right text-gray-400 text-xs">
                      {isSelected ? '▲' : '▼'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Tieu Han panel */}
        {selectedDaiHan && (
          <TieuHanPanel
            daiHan={selectedDaiHan}
            forward={forward}
            menhCungChi={chart.cungMenhIndex}
          />
        )}
      </div>
    </div>
  )
}

function PalaceCell({ palace, isSelected, daiHanRange, onClick }: {
  palace: Palace; isSelected: boolean; daiHanRange?: string; onClick: () => void
}) {
  // Notable minor stars to show: NOTABLE_MINOR set + any Tứ Hóa star
  const notableMinor = palace.minorStars.filter(
    (s) => NOTABLE_MINOR.has(s.name) || s.shortMeaning,
  )

  return (
    <button
      onClick={onClick}
      className={`h-full w-full rounded-lg border p-1 text-left transition ${
        palace.isLifePalace ? 'border-red-400 bg-red-50' :
        palace.isSoulPalace ? 'border-purple-400 bg-purple-50' :
        'border-gray-200 bg-white hover:bg-gray-50'
      } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
    >
      {/* Palace header: name + Chi + Mệnh/Thân badge */}
      <div className="flex items-center justify-between gap-0.5">
        <span className="truncate text-[11px] font-bold text-gray-700">{palace.name}</span>
        {palace.isLifePalace && (
          <span className="shrink-0 rounded bg-red-500 px-0.5 text-[9px] font-bold text-white">M</span>
        )}
        {palace.isSoulPalace && (
          <span className="shrink-0 rounded bg-purple-500 px-0.5 text-[9px] font-bold text-white">T</span>
        )}
      </div>

      {/* DiaChi + Đại Hạn age range */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-400">{palace.diaChi}</span>
        {daiHanRange && (
          <span className="text-[9px] text-amber-600">{daiHanRange}</span>
        )}
      </div>

      {/* All main stars */}
      {palace.mainStars.length === 0 ? (
        <div className="mt-0.5 text-[10px] italic text-gray-300">trống</div>
      ) : (
        <div className="mt-0.5 space-y-0.5">
          {palace.mainStars.map((star) => (
            <div key={star.name} className="flex items-center gap-0.5">
              <span
                className={`truncate text-[11px] leading-tight ${
                  star.brightness === 'mieu'
                    ? 'font-bold text-red-700'
                    : star.brightness === 'vuong'
                    ? 'font-semibold text-orange-600'
                    : star.brightness === 'hamDia'
                    ? 'italic text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {star.name}
              </span>
              {star.shortMeaning && (
                <span className="shrink-0 rounded bg-amber-100 px-0.5 text-[8px] font-medium text-amber-700">
                  {star.shortMeaning.replace('Hóa ', '')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notable minor stars */}
      {notableMinor.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-0.5">
          {notableMinor.map((star) => (
            <span
              key={star.name}
              className={`rounded px-0.5 text-[9px] leading-tight ${
                !star.isGood
                  ? 'bg-red-100 text-red-600'
                  : star.shortMeaning
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {star.name}
              {star.shortMeaning ? ` ${star.shortMeaning.replace('Hóa ', '')}` : ''}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}

function TieuHanPanel({
  daiHan, forward, menhCungChi,
}: {
  daiHan: DaiHan
  forward: boolean
  menhCungChi: number
}) {
  const rows = calculateTieuHan(daiHan, forward, menhCungChi)

  return (
    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h4 className="mb-3 font-semibold text-amber-900">
        Tiểu Hạn — Đại Hạn {daiHan.startAge}–{daiHan.endAge} tuổi (cung {daiHan.palaceName})
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-200 text-left text-xs text-amber-700">
              <th className="py-1.5 pr-3">Tuổi</th>
              <th className="py-1.5 pr-3">Năm</th>
              <th className="py-1.5 pr-3">Can Chi</th>
              <th className="py-1.5 pr-3">Cung</th>
              <th className="py-1.5">Chi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((th) => {
              const isCurrent = th.year === CURRENT_YEAR
              return (
                <tr
                  key={th.age}
                  className={`border-b border-amber-100 last:border-0 ${
                    isCurrent ? 'bg-amber-200 font-semibold' : ''
                  }`}
                >
                  <td className="py-1.5 pr-3">
                    {th.age}
                    {isCurrent && (
                      <span className="ml-1.5 rounded-full bg-amber-600 px-1.5 py-0.5 text-xs text-white">
                        nay
                      </span>
                    )}
                  </td>
                  <td className="py-1.5 pr-3 text-amber-800">{th.year}</td>
                  <td className="py-1.5 pr-3 text-amber-800">{th.canChi}</td>
                  <td className="py-1.5 pr-3 font-medium text-gray-800">{th.palaceName}</td>
                  <td className="py-1.5 text-gray-600">{th.diaChi}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const BRIGHTNESS_LABEL: Record<string, string> = {
  mieu: 'Miếu', vuong: 'Vượng', dacDia: 'Đắc Địa', binhHoa: 'Bình Hòa', hamDia: 'Hãm Địa',
}

const RATING_COLOR: Record<string, string> = {
  excellent: 'text-red-600', good: 'text-amber-600', average: 'text-gray-500', bad: 'text-gray-400',
}

const RATING_LABEL: Record<string, string> = {
  excellent: 'Rất tốt', good: 'Tốt', average: 'Trung bình', bad: 'Xấu',
}

function PalaceDetail({ palace }: { palace: Palace }) {
  const interp = interpretPalace(palace)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-800">
            Cung {palace.name} — {palace.diaChi}
            {palace.isLifePalace && <span className="ml-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">Mệnh</span>}
            {palace.isSoulPalace && <span className="ml-1.5 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">Thân</span>}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{interp.overview}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold ${RATING_COLOR[interp.rating]}`}>
          {RATING_LABEL[interp.rating]}
        </span>
      </div>

      {/* Chính tinh */}
      {palace.mainStars.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Cung trống — không có chính tinh</p>
      ) : (
        <div className="space-y-2">
          {palace.mainStars.map((star) => {
            const meaning = getStarInterpretation(star.name, palace.name)
            return (
              <div key={star.name} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <div className="shrink-0 flex flex-col items-center gap-0.5">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      star.brightness === 'mieu' ? 'bg-red-100 text-red-700' :
                      star.brightness === 'vuong' ? 'bg-yellow-100 text-yellow-700' :
                      star.brightness === 'hamDia' ? 'bg-gray-200 text-gray-500' :
                      'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {star.name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {BRIGHTNESS_LABEL[star.brightness] ?? star.brightness}
                  </span>
                  {star.shortMeaning && (
                    <span className="rounded bg-amber-100 px-1 py-0.5 text-[10px] font-medium text-amber-700">
                      {star.shortMeaning}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{meaning}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Phụ tinh đáng chú ý */}
      {palace.minorStars.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-gray-500">Phụ tinh</p>
          <div className="flex flex-wrap gap-1.5">
            {palace.minorStars.slice(0, 8).map((star) => (
              <span
                key={star.name}
                className={`rounded-full px-2 py-0.5 text-xs ${
                  !star.isGood
                    ? 'bg-red-50 text-red-600'
                    : star.shortMeaning
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
                title={star.shortMeaning || (star.isGood ? 'Cát tinh' : 'Hung tinh')}
              >
                {star.name}
                {star.shortMeaning ? ` (${star.shortMeaning})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tóm tắt cung */}
      {interp.summary && (
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          {interp.summary}
        </p>
      )}
    </div>
  )
}
