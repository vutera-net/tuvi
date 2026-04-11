'use client'

import { useState } from 'react'
import type { ZodiacSign } from '@/types'
import { getDayInfo } from '@/lib/engines/lunar-engine'
import { getYearCenterStar } from '@/data/phongthuy/cuu-cung'
import { DIA_CHI, THIEN_CAN } from '@/data/can-chi'
import { ContentLock } from '@/components/funnel/ContentLock'

const ZODIACS: Array<{ sign: ZodiacSign; name: string; emoji: string; chiIndex: number }> = [
  { sign: 'ty', name: 'Tý', emoji: '🐭', chiIndex: 0 },
  { sign: 'suu', name: 'Sửu', emoji: '🐮', chiIndex: 1 },
  { sign: 'dan', name: 'Dần', emoji: '🐯', chiIndex: 2 },
  { sign: 'mao', name: 'Mão', emoji: '🐰', chiIndex: 3 },
  { sign: 'thin', name: 'Thìn', emoji: '🐉', chiIndex: 4 },
  { sign: 'ti', name: 'Tỵ', emoji: '🐍', chiIndex: 5 },
  { sign: 'ngo', name: 'Ngọ', emoji: '🐴', chiIndex: 6 },
  { sign: 'mui', name: 'Mùi', emoji: '🐑', chiIndex: 7 },
  { sign: 'than', name: 'Thân', emoji: '🐒', chiIndex: 8 },
  { sign: 'dau', name: 'Dậu', emoji: '🐓', chiIndex: 9 },
  { sign: 'tuat', name: 'Tuất', emoji: '🐕', chiIndex: 10 },
  { sign: 'hoi', name: 'Hợi', emoji: '🐗', chiIndex: 11 },
]

const ASPECT_TONG_QUAN = { key: 'tongQuan', label: 'Tổng quan', icon: '⭐' }
const ASPECTS_OTHER = [
  { key: 'suNghiep', label: 'Sự nghiệp', icon: '💼' },
  { key: 'taiChinh', label: 'Tài chính', icon: '💰' },
  { key: 'tinhCam', label: 'Tình cảm', icon: '❤️' },
  { key: 'sucKhoe', label: 'Sức khỏe', icon: '🏃' },
]

function generateHoroscope(zodiac: (typeof ZODIACS)[0]) {
  const today = new Date()
  const dayInfo = getDayInfo(today.getDate(), today.getMonth() + 1, today.getFullYear())
  const centerStar = getYearCenterStar(today.getFullYear())

  // Simple scoring based on day interactions
  const baseScore = 5 + ((zodiac.chiIndex + dayInfo.lunar.chiDay) % 5)
  const dayBonus = dayInfo.rating === 'tot' ? 1 : dayInfo.rating === 'xau' ? -1 : 0

  const scores = {
    tongQuan: Math.min(10, Math.max(3, baseScore + dayBonus)),
    suNghiep: Math.min(10, Math.max(3, baseScore + ((centerStar + zodiac.chiIndex) % 3))),
    taiChinh: Math.min(10, Math.max(3, baseScore - 1 + dayBonus)),
    tinhCam: Math.min(10, Math.max(3, baseScore + (zodiac.chiIndex % 3))),
    sucKhoe: Math.min(10, Math.max(4, baseScore)),
  }

  const canChi = `${THIEN_CAN[dayInfo.lunar.canDay]} ${DIA_CHI[dayInfo.lunar.chiDay]}`

  return {
    scores,
    luckyColor: ['Đỏ', 'Vàng', 'Xanh lá', 'Trắng', 'Tím'][zodiac.chiIndex % 5],
    luckyDirection: ['Đông', 'Nam', 'Tây', 'Bắc'][zodiac.chiIndex % 4],
    luckyHour: DIA_CHI[dayInfo.hoangDaoGio[0] ?? zodiac.chiIndex % 12],
    luckyNumber: (zodiac.chiIndex + 1) * 3 % 9 + 1,
    canChiDay: canChi,
    dayRating: dayInfo.rating,
  }
}

function ScoreBar({ aspect, score }: { aspect: { key: string; label: string; icon: string }; score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 7 ? '#16a34a' : score >= 5 ? '#d97706' : '#dc2626'
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{aspect.icon} {aspect.label}</span>
        <span className="font-bold" style={{ color }}>{score}/10</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function HoroscopeView() {
  const [selected, setSelected] = useState<(typeof ZODIACS)[0]>(ZODIACS[0])
  const horoscope = generateHoroscope(selected)

  const today = new Date()
  const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  // Pick 1 unlocked aspect deterministically (stable per zodiac + day)
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const unlockedIdx = (selected.chiIndex + dayOfYear) % ASPECTS_OTHER.length
  const unlockedAspect = ASPECTS_OTHER[unlockedIdx]
  const lockedAspects = ASPECTS_OTHER.filter((_, i) => i !== unlockedIdx)

  return (
    <div className="space-y-6">
      {/* Date display */}
      <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">
        Tử Vi Hàng Ngày - {dateStr}
      </div>

      {/* Zodiac selector */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-6 gap-2">
          {ZODIACS.map((z) => (
            <button
              key={z.sign}
              onClick={() => setSelected(z)}
              className={`rounded-xl py-2 text-center transition ${
                selected.sign === z.sign
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-xl">{z.emoji}</div>
              <div className="text-xs">{z.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Horoscope */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <div className="text-5xl">{selected.emoji}</div>
          <div className="mt-2 text-2xl font-bold text-gray-800">Năm {selected.name}</div>
          <div className="text-sm text-gray-500">Ngày Can Chi: {horoscope.canChiDay}</div>
        </div>

        {/* Visible scores: Tổng Quan + 1 unlocked */}
        <div className="space-y-4">
          <ScoreBar
            aspect={ASPECT_TONG_QUAN}
            score={horoscope.scores[ASPECT_TONG_QUAN.key as keyof typeof horoscope.scores] as number}
          />
          <ScoreBar
            aspect={unlockedAspect}
            score={horoscope.scores[unlockedAspect.key as keyof typeof horoscope.scores] as number}
          />
        </div>

        {/* Lucky info */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-yellow-50 p-3 text-center">
            <div className="text-xs text-gray-500">Màu may mắn</div>
            <div className="mt-1 font-semibold text-yellow-700">{horoscope.luckyColor}</div>
          </div>
          <div className="rounded-xl bg-blue-50 p-3 text-center">
            <div className="text-xs text-gray-500">Hướng xuất hành</div>
            <div className="mt-1 font-semibold text-blue-700">{horoscope.luckyDirection}</div>
          </div>
          <div className="rounded-xl bg-green-50 p-3 text-center">
            <div className="text-xs text-gray-500">Giờ tốt nhất</div>
            <div className="mt-1 font-semibold text-green-700">Giờ {horoscope.luckyHour}</div>
          </div>
          <div className="rounded-xl bg-purple-50 p-3 text-center">
            <div className="text-xs text-gray-500">Số may mắn</div>
            <div className="mt-1 text-2xl font-bold text-purple-700">{horoscope.luckyNumber}</div>
          </div>
        </div>
      </div>

      {/* Locked aspects */}
      <ContentLock
        items={lockedAspects.map((a) => `${a.icon} ${a.label}: Luận giải chi tiết cho tuổi ${selected.name} hôm nay`)}
        context="horoscope_daily"
        buttonText="Xem đầy đủ tử vi hôm nay"
      />
    </div>
  )
}
