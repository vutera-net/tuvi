/**
 * Date Selection Engine (Xem Ngày Tốt Xấu)
 */

import type { DateSelectionResult, EventType, SolarDate } from '@/types'
import { getDayInfo, jdFromDate } from './lunar-engine'
import { TRUC_LIST } from '@/data/truc'
import { SAO_28 } from '@/data/sao28'
import { isTamNuong, isNguyetKy, isSatChu, isThoiDia } from '@/data/ngay-ky'
import { DIA_CHI } from '@/data/can-chi'

// Events that each Truc is good for
const EVENT_TRUC_GOOD: Record<EventType, string[]> = {
  cuoiHoi: ['Kiến', 'Mãn', 'Định', 'Thành', 'Khai'],
  khaiTruong: ['Kiến', 'Mãn', 'Định', 'Thành', 'Khai'],
  dongTho: ['Kiến', 'Mãn', 'Khai', 'Chấp'],
  nhapTrach: ['Kiến', 'Mãn', 'Định', 'Thành', 'Khai'],
  xuatHanh: ['Kiến', 'Mãn', 'Định', 'Thành', 'Khai'],
  kyHopDong: ['Kiến', 'Mãn', 'Định', 'Thành'],
  general: ['Kiến', 'Mãn', 'Định', 'Thành', 'Khai'],
}

const EVENT_TRUC_BAD: Record<EventType, string[]> = {
  cuoiHoi: ['Phá', 'Nguy', 'Bế'],
  khaiTruong: ['Phá', 'Nguy', 'Bế'],
  dongTho: ['Phá', 'Nguy', 'Bế', 'Trừ'],
  nhapTrach: ['Phá', 'Nguy', 'Bế'],
  xuatHanh: ['Phá', 'Nguy'],
  kyHopDong: ['Phá', 'Nguy', 'Bế'],
  general: ['Phá', 'Nguy', 'Bế'],
}

/**
 * Score a single day for a given event type
 */
export function scoreDayForEvent(
  dd: number,
  mm: number,
  yy: number,
  eventType: EventType,
  ownerBirthYear?: number,
  ownerGender?: 'male' | 'female'
): DateSelectionResult {
  const info = getDayInfo(dd, mm, yy)
  const { lunar, truc, sao28, sao28Rating, ngayKy, hoangDaoGio } = info

  let score = 50
  const advantages: string[] = []
  const issues: string[] = []

  // Truc scoring
  const goodTrucs = EVENT_TRUC_GOOD[eventType]
  const badTrucs = EVENT_TRUC_BAD[eventType]
  if (goodTrucs.includes(truc)) {
    score += 15
    advantages.push(`Trực ${truc} tốt cho ${getEventLabel(eventType)}`)
  } else if (badTrucs.includes(truc)) {
    score -= 20
    issues.push(`Trực ${truc} không tốt cho ${getEventLabel(eventType)}`)
  }

  // Sao28 scoring
  if (sao28Rating === 'tot') {
    score += 10
    advantages.push(`Sao ${sao28} tốt`)
  } else if (sao28Rating === 'xau') {
    score -= 15
    issues.push(`Sao ${sao28} xấu`)
  }

  // Ngay ky penalties
  for (const ky of ngayKy) {
    score -= 15
    issues.push(`Ngày ${ky}`)
  }

  // Hoang dao hours bonus
  if (hoangDaoGio.length >= 4) {
    score += 5
    advantages.push(`Có ${hoangDaoGio.length} giờ Hoàng Đạo`)
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score))

  const rating: DateSelectionResult['rating'] =
    score >= 75 ? 'tot' : score >= 55 ? 'kha' : score >= 35 ? 'trung' : 'xau'

  const hoangDaoHours = hoangDaoGio.map((i) => DIA_CHI[i])

  return {
    solar: info.solar,
    lunar,
    score,
    rating,
    truc,
    sao28,
    sao28Rating,
    hoangDaoHours,
    issues,
    advantages,
    suitable: score >= 55 && ngayKy.length === 0,
  }
}

/**
 * Search for good dates in a date range
 */
export function searchGoodDates(
  fromYear: number,
  fromMonth: number,
  fromDay: number,
  toYear: number,
  toMonth: number,
  toDay: number,
  eventType: EventType,
  minScore = 60,
  ownerBirthYear?: number,
  ownerGender?: 'male' | 'female'
): DateSelectionResult[] {
  const results: DateSelectionResult[] = []
  const fromJd = jdFromDate(fromDay, fromMonth, fromYear)
  const toJd = jdFromDate(toDay, toMonth, toYear)

  for (let jd = fromJd; jd <= toJd; jd++) {
    const { day, month, year } = jdToDateSimple(jd)
    const result = scoreDayForEvent(day, month, year, eventType, ownerBirthYear, ownerGender)
    if (result.score >= minScore) {
      results.push(result)
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function jdToDateSimple(jd: number): { day: number; month: number; year: number } {
  const a = jd + 32044
  const b = Math.floor((4 * a + 3) / 146097)
  const c = a - Math.floor((b * 146097) / 4)
  const d = Math.floor((4 * c + 3) / 1461)
  const e = c - Math.floor((1461 * d) / 4)
  const m = Math.floor((5 * e + 2) / 153)
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: b * 100 + d - 4800 + Math.floor(m / 10),
  }
}

function getEventLabel(eventType: EventType): string {
  const labels: Record<EventType, string> = {
    cuoiHoi: 'Cưới hỏi',
    khaiTruong: 'Khai trương',
    dongTho: 'Động thổ',
    nhapTrach: 'Nhập trạch',
    xuatHanh: 'Xuất hành',
    kyHopDong: 'Ký hợp đồng',
    general: 'Việc chung',
  }
  return labels[eventType]
}
