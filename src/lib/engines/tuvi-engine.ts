/**
 * Tử Vi Đẩu Số Engine
 *
 * Chart generation is delegated entirely to iztro (proven Zi Wei Dou Shu library).
 * Only Nạp Âm (menh) uses our custom lookup table since iztro does not provide it.
 *
 * Functions kept for public API / tests:
 *  - generateTuViChart()
 *  - calculateTieuHan()
 *  - getDaiHanDirection()
 */

import type { TuViChart, LunarDate, DaiHan, TieuHan } from '@/types'
import { getNapAmByYear } from '@/data/nap-am'
import { DIA_CHI, getCanChiYear } from '@/data/can-chi'
import { getCucInfo } from '@/data/tuvi/cuc'
import { getIztroChartData } from './iztro-adapter'

// ============================================================
// MAIN CHART CALCULATION
// ============================================================

/**
 * Generate a complete Tu Vi chart.
 * Uses iztro as the core engine for all astrological calculations.
 * Falls back to a minimal skeleton if iztro fails (invalid date, edge cases).
 */
export function generateTuViChart(
  label: string,
  gender: 'male' | 'female',
  lunarDate: LunarDate,
  birthHourChi: number, // 0-11 (Tý=0 … Hợi=11)
): TuViChart {
  // Nạp Âm & Mệnh — iztro does not expose this
  const napAmEntry = getNapAmByYear(lunarDate.year)
  const menh = napAmEntry.nguHanh

  // Full chart from iztro (chính tinh, phụ tinh, cung, Cục, Đại Hạn)
  const iztro = getIztroChartData(lunarDate, birthHourChi, gender, lunarDate.year)

  if (!iztro) {
    // Fallback: empty skeleton (prevents crash on unusual dates)
    const cucInfo = getCucInfo(5)
    return {
      label,
      gender,
      birthDate: lunarDate,
      birthHourIndex: birthHourChi,
      birthHourName: DIA_CHI[birthHourChi],
      cuc: cucInfo.name,
      cucNumber: cucInfo.cucNumber,
      menh,
      napAm: napAmEntry.napAm,
      cungMenhIndex: 0,
      cungThanIndex: 0,
      palaces: [],
      daiHan: [],
    }
  }

  const cucInfo = getCucInfo(iztro.cucNumber)

  return {
    label,
    gender,
    birthDate: lunarDate,
    birthHourIndex: birthHourChi,
    birthHourName: DIA_CHI[birthHourChi],
    cuc: cucInfo.name,
    cucNumber: iztro.cucNumber,
    menh,
    napAm: napAmEntry.napAm,
    cungMenhIndex: iztro.cungMenhIndex,
    cungThanIndex: iztro.cungThanIndex,
    palaces: iztro.palaces,
    daiHan: iztro.daiHan,
  }
}

// ============================================================
// TIỂU HẠN CALCULATION
// ============================================================

const PALACE_NAMES = [
  'Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức',
  'Tài Bạch', 'Tật Ách', 'Thiên Di', 'Nô Bộc',
  'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu',
]

/**
 * Determine Đại Hạn / Tiểu Hạn direction (forward = true)
 * Dương Nam / Âm Nữ → thuận; Âm Nam / Dương Nữ → nghịch
 */
export function getDaiHanDirection(gender: 'male' | 'female', menhCungChi: number): boolean {
  const isYangGender = gender === 'male'
  const isYangChi = menhCungChi % 2 === 0
  return (isYangGender && isYangChi) || (!isYangGender && !isYangChi)
}

/**
 * Calculate Tiểu Hạn (yearly sub-periods) for a given Đại Hạn.
 * Each year within the Đại Hạn advances one palace in the same direction as Đại Hạn.
 */
export function calculateTieuHan(
  daiHan: DaiHan,
  forward: boolean,
  menhCungChi: number,
): TieuHan[] {
  const step = forward ? 1 : -1
  const count = daiHan.endAge - daiHan.startAge + 1

  return Array.from({ length: count }, (_, offset) => {
    const palaceIndex = ((daiHan.palaceIndex + offset * step) % 12 + 12) % 12
    return {
      age: daiHan.startAge + offset,
      year: daiHan.startYear + offset,
      canChi: getCanChiYear(daiHan.startYear + offset).full,
      palaceIndex,
      palaceName: PALACE_NAMES[(palaceIndex - menhCungChi + 12) % 12] ?? 'Mệnh',
      diaChi: DIA_CHI[palaceIndex],
    }
  })
}
