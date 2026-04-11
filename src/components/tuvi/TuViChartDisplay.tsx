'use client'

import { useState } from 'react'
import type { TuViChart, Palace, DaiHan } from '@/types'
import { NGU_HANH_COLOR_HEX, NGU_HANH_VI } from '@/data/ngu-hanh'
import { TuViPdfExportButton } from './TuViPdfExportButton'
import { ContentLock } from '@/components/funnel/ContentLock'

const CURRENT_YEAR = new Date().getFullYear()

interface Props {
  chart: TuViChart
}

// Fixed DiaChi index → [row, col] in 4×4 grid (outer ring only)
// Traditional Tử Vi layout:
//   Tỵ(5)   Ngọ(6)  Mùi(7)  Thân(8)
//   Thìn(4)  [center 2×2]    Dậu(9)
//   Mão(3)   [center 2×2]    Tuất(10)
//   Dần(2)  Sửu(1)  Tý(0)   Hợi(11)
const DIACHI_GRID: Record<number, [number, number]> = {
  5: [0, 0], 6: [0, 1], 7: [0, 2], 8: [0, 3],
  4: [1, 0],                        9: [1, 3],
  3: [2, 0],                        10: [2, 3],
  2: [3, 0], 1: [3, 1], 0: [3, 2], 11: [3, 3],
}

// Notable minor stars to always show on palace cells
const NOTABLE_MINOR = new Set([
  'Lộc Tồn', 'Kình Dương', 'Đà La',
  'Văn Xương', 'Văn Khúc', 'Tả Phù', 'Hữu Bật',
  'Thiên Khôi', 'Thiên Việt', 'Thiên Mã',
  'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp',
])

const DAI_VAN_NOTES: Record<string, string> = {
  'Mệnh': 'Vận bản mệnh — định hình lại tính cách và hướng đi cuộc đời, cơ hội khởi đầu lớn.',
  'Huynh Đệ': 'Vận huynh đệ — mối quan hệ xã hội đóng vai trò quan trọng, dễ được quý nhân hỗ trợ.',
  'Phu Thê': 'Vận hôn nhân — tình duyên và hôn nhân nổi bật, cần chú ý quan hệ đôi lứa.',
  'Tử Tức': 'Vận tử tức — con cái mang lại niềm vui hoặc lo lắng, phúc lộc qua gia đình.',
  'Tài Bạch': 'Vận tài lộc — tài chính biến động mạnh, cơ hội làm giàu hoặc thất thoát đáng kể.',
  'Tật Ách': 'Vận tật ách — cần chú ý sức khỏe thể chất và tinh thần, tránh các rủi ro không đáng.',
  'Thiên Di': 'Vận thiên di — thích hợp di chuyển, thay đổi môi trường hoặc hợp tác với người xa.',
  'Nô Bộc': 'Vận nô bộc — quan hệ đồng nghiệp và cấp dưới nổi bật, thận trọng với kẻ tiểu nhân.',
  'Quan Lộc': 'Vận quan lộc — thăng tiến công danh, phù hợp phát triển sự nghiệp và địa vị xã hội.',
  'Điền Trạch': 'Vận điền trạch — bất động sản và ổn định gia đình nổi bật, phù hợp an cư lạc nghiệp.',
  'Phúc Đức': 'Vận phúc đức — hưởng thụ và tinh thần thịnh vượng, phúc lộc đến từ căn phần.',
  'Phụ Mẫu': 'Vận phụ mẫu — cha mẹ và bề trên ảnh hưởng lớn, nhận được sự hỗ trợ hoặc gánh nặng từ gia đình.',
}

export function TuViChartDisplay({ chart }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null)
  const [selectedDaiHan, setSelectedDaiHan] = useState<DaiHan | null>(() =>
    chart.daiHan.find(
      (dh) => CURRENT_YEAR >= dh.startYear && CURRENT_YEAR <= dh.startYear + chart.cucNumber - 1,
    ) ?? null,
  )
  const elColor = NGU_HANH_COLOR_HEX[chart.menh]

  const daiHanByPalace = Object.fromEntries(chart.daiHan.map((dh) => [dh.palaceIndex, dh]))

  const currentDaiHan = chart.daiHan.find(
    (dh) => CURRENT_YEAR >= dh.startYear && CURRENT_YEAR <= dh.startYear + chart.cucNumber - 1,
  )

  function togglePalace(palace: Palace) {
    setSelectedPalace((prev) => (prev?.index === palace.index ? null : palace))
  }

  return (
    <div className="space-y-5">
      {/* ── Header Card ── */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C41E3A 60%, #A0001A 100%)' }}
      >
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/10" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Element badge */}
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 text-2xl font-bold shadow-inner"
              style={{ backgroundColor: elColor + '30', borderColor: elColor }}
            >
              <span style={{ color: elColor }}>{NGU_HANH_VI[chart.menh][0]}</span>
            </div>
            <div>
              <div className="text-xl font-bold leading-tight">{chart.label}</div>
              <div className="mt-0.5 text-sm text-red-200">
                {chart.gender === 'male' ? '♂ Nam' : '♀ Nữ'} · {chart.birthDate.day}/{chart.birthDate.month}/{chart.birthDate.year} âm lịch · Giờ {chart.birthHourName}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  Mệnh <strong style={{ color: elColor }}>{NGU_HANH_VI[chart.menh]}</strong>
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {chart.napAm}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {chart.cuc}
                </span>
              </div>
            </div>
          </div>
          <TuViPdfExportButton chart={chart} />
        </div>

        {currentDaiHan && (() => {
          const elapsed = CURRENT_YEAR - currentDaiHan.startYear + 1
          const pct = Math.min(100, Math.round((elapsed / chart.cucNumber) * 100))
          return (
            <div className="relative mt-4 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber-400" />
                <span className="text-red-200">Đại Vận hiện tại:</span>{' '}
                <strong className="text-white">{currentDaiHan.palaceName}</strong>
                <span className="text-red-200">({currentDaiHan.diaChi})</span>
                <span className="ml-auto shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                  Năm {elapsed}/{chart.cucNumber}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-red-200/80">
                {currentDaiHan.startAge}–{currentDaiHan.endAge} tuổi · {currentDaiHan.startYear}–{currentDaiHan.startYear + chart.cucNumber - 1}
              </div>
            </div>
          )
        })()}
      </div>

      {/* ── Chart Grid ── */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">12 Cung Tử Vi</h3>
          <p className="text-xs text-gray-400">Bấm vào cung để xem chi tiết</p>
        </div>

        <div
          className="grid gap-1.5"
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
                  isCurrentDaiHan={currentDaiHan?.palaceIndex === palace.index}
                  onClick={() => togglePalace(palace)}
                />
              </div>
            )
          })}

          {/* Center info panel */}
          <div
            style={{ gridRow: '2 / 4', gridColumn: '2 / 4' }}
            className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-amber-50 p-3 text-center"
          >
            <div
              className="mb-2 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white shadow-sm"
              style={{ backgroundColor: elColor }}
            >
              {NGU_HANH_VI[chart.menh][0]}
            </div>
            <div className="text-xs font-bold text-gray-800 leading-snug line-clamp-2">{chart.label}</div>
            <div className="mt-1 text-[10px] text-gray-500">
              {chart.birthDate.day}/{chart.birthDate.month}/{chart.birthDate.year}
            </div>
            <div className="mt-1 text-[11px] font-semibold" style={{ color: elColor }}>
              {NGU_HANH_VI[chart.menh]}
            </div>
            <div className="text-[10px] text-gray-400">{chart.napAm}</div>
            <div className="mt-1.5 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
              {chart.cuc}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-100 ring-1 ring-red-300" />
            Cung Mệnh
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-purple-100 ring-1 ring-purple-300" />
            Cung Thân
          </span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-red-700">●</span> Miếu (tốt nhất)
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-orange-600">●</span> Vượng
          </span>
          <span className="flex items-center gap-1">
            <span className="text-gray-400">●</span> Hãm
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Đại Vận hiện tại
          </span>
        </div>
      </div>

      {/* ── Palace Detail (locked) ── */}
      {selectedPalace && (
        <ContentLock
          items={[
            `Giải nghĩa cung ${selectedPalace.name} (${selectedPalace.diaChi}): ${
              selectedPalace.mainStars.length > 0
                ? selectedPalace.mainStars.map((s) => s.name).join(', ')
                : 'cung trống'
            }`,
            'Ý nghĩa từng chính tinh theo vị trí cụ thể trong lá số',
            'Phân tích phụ tinh và tổ hợp sao ảnh hưởng lên cung',
            'Đánh giá tổng quan và lời khuyên chi tiết',
          ]}
          context="tuvi_palace_detail"
          buttonText="Xem giải nghĩa chi tiết"
        />
      )}

      {/* ── Đại Vận section ── */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Đại Vận</h3>
            <p className="mt-0.5 text-xs text-gray-400">
              Mỗi vận {chart.cucNumber} năm · Bấm vào vận để xem Tiểu Vận từng năm
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {chart.daiHan.slice(0, 8).map((dh, i) => {
            const isActive =
              CURRENT_YEAR >= dh.startYear &&
              CURRENT_YEAR <= dh.startYear + chart.cucNumber - 1
            const isSelected = selectedDaiHan?.startAge === dh.startAge
            const note = DAI_VAN_NOTES[dh.palaceName]
            const elapsed = CURRENT_YEAR - dh.startYear + 1
            const pct = Math.min(100, Math.round((elapsed / chart.cucNumber) * 100))

            return (
              <div key={i}>
                <button
                  onClick={() => setSelectedDaiHan(isSelected ? null : dh)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                    isSelected
                      ? 'border-amber-300 bg-amber-50'
                      : isActive
                        ? 'border-red-200 bg-red-50 hover:bg-red-100'
                        : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Age badge */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 ${
                          isActive ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {dh.startAge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-sm font-semibold text-gray-800">{dh.palaceName}</span>
                          <span className="text-xs text-gray-500">{dh.diaChi}</span>
                          {isActive && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                              Đang vận
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-xs text-gray-400">
                          {dh.startAge}–{dh.endAge} tuổi · {dh.startYear}–{dh.startYear + chart.cucNumber - 1}
                        </div>
                        {note && (
                          <div className="mt-1.5 text-xs leading-snug text-gray-500 line-clamp-2">
                            {note}
                          </div>
                        )}
                        {isActive && (
                          <div className="mt-2">
                            <div className="mb-0.5 flex justify-between text-[10px] text-red-400">
                              <span>Năm {elapsed}/{chart.cucNumber} trong đại vận</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-red-100">
                              <div
                                className="h-full rounded-full bg-red-400 transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400 mt-1">{isSelected ? '▲' : '▼'}</span>
                  </div>
                </button>

                {isSelected && (
                  <ContentLock
                    items={[
                      `Tiểu Vận từng năm trong Đại Vận ${dh.palaceName} (${dh.startAge}–${dh.endAge} tuổi)`,
                      'Can Chi và cung tiểu vận chi tiết theo từng năm',
                      'Phân tích vận khí và lời khuyên theo từng tuổi',
                    ]}
                    context="tuvi_tieu_van"
                    buttonText="Xem Tiểu Vận chi tiết"
                    className="ml-12 mt-1.5"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── PalaceCell ───────────────────────────────────────────────

function PalaceCell({
  palace,
  isSelected,
  daiHanRange,
  isCurrentDaiHan,
  onClick,
}: {
  palace: Palace
  isSelected: boolean
  daiHanRange?: string
  isCurrentDaiHan?: boolean
  onClick: () => void
}) {
  const notableMinor = palace.minorStars.filter(
    (s) => NOTABLE_MINOR.has(s.name) || s.shortMeaning,
  )

  return (
    <button
      onClick={onClick}
      className={`relative h-full w-full rounded-xl border-2 p-2 text-left transition-all ${
        palace.isLifePalace
          ? 'border-red-300 bg-red-50 hover:bg-red-100'
          : palace.isSoulPalace
            ? 'border-purple-300 bg-purple-50 hover:bg-purple-100'
            : 'border-gray-200 bg-white hover:bg-gray-50'
      } ${isSelected ? 'ring-2 ring-amber-400 ring-offset-1 shadow-md' : ''}`}
    >
      {/* Current Đại Vận dot */}
      {isCurrentDaiHan && (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      )}

      {/* Palace name + badges */}
      <div className="flex items-start justify-between gap-0.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-0.5 flex-wrap">
            <span className="text-[11px] font-bold leading-tight text-gray-700 truncate">
              {palace.name}
            </span>
            {palace.isLifePalace && (
              <span className="rounded bg-red-500 px-0.5 py-px text-[8px] font-bold leading-tight text-white shrink-0">
                M
              </span>
            )}
            {palace.isSoulPalace && (
              <span className="rounded bg-purple-500 px-0.5 py-px text-[8px] font-bold leading-tight text-white shrink-0">
                T
              </span>
            )}
          </div>
          <div className="text-[9px] leading-tight text-gray-400">{palace.diaChi}</div>
        </div>
        {daiHanRange && (
          <span className="shrink-0 rounded bg-amber-100 px-0.5 text-[9px] font-medium leading-tight text-amber-700">
            {daiHanRange}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        className={`my-1 h-px ${
          palace.isLifePalace
            ? 'bg-red-200'
            : palace.isSoulPalace
              ? 'bg-purple-200'
              : 'bg-gray-100'
        }`}
      />

      {/* Main stars */}
      {palace.mainStars.length === 0 ? (
        <div className="text-[10px] italic text-gray-300">trống</div>
      ) : (
        <div className="space-y-0.5">
          {palace.mainStars.map((star) => (
            <div key={star.name} className="flex items-center gap-0.5">
              <span
                className={`truncate text-[11px] leading-tight font-medium ${
                  star.brightness === 'mieu'
                    ? 'text-red-700'
                    : star.brightness === 'vuong'
                      ? 'text-orange-600'
                      : star.brightness === 'hamDia'
                        ? 'text-gray-400'
                        : 'text-gray-600'
                }`}
              >
                {star.brightness === 'mieu' ? '● ' : star.brightness === 'vuong' ? '◉ ' : ''}
                {star.name}
              </span>
              {star.shortMeaning && (
                <span className="shrink-0 rounded bg-amber-100 px-0.5 text-[8px] font-bold text-amber-700">
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

