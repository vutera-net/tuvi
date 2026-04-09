/**
 * iztro Adapter
 * Full integration of the iztro library (Zi Wei Dou Shu engine) using vi-VN locale.
 *
 * Provides:
 *  - Full chart data: 14 chính tinh, Mệnh/Thân cung, Cục, Đại Hạn
 *  - Minor stars: Lộc Tồn, Kình Dương, Đà La, Văn Xương, Văn Khúc, Tả Phù, Hữu Bật,
 *    Thiên Khôi, Thiên Việt, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp, Thiên Mã,
 *    Hồng Loan, Thiên Hỷ, Đào Hoa, và các tạp diệu khác
 *  - Tiểu Hạn: ages per palace
 *
 * Nạp Âm (menh) is NOT provided by iztro — still computed from our custom data.
 */

import { astro } from 'iztro'
import type { LunarDate, Palace, Star, StarBrightness, DaiHan } from '@/types'
import { DIA_CHI } from '@/data/can-chi'

// ============================================================
// CONSTANTS & MAPPINGS
// ============================================================

// iztro fiveElementsClass (vi-VN) → cucNumber
const CUC_NUMBER_MAP: Record<string, number> = {
  'Thủy Nhị Cục': 2,
  'Mộc Tam Cục': 3,
  'Kim Tứ Cục': 4,
  'Thổ Ngũ Cục': 5,
  'Hỏa Lục Cục': 6,
}

// iztro brightness (vi-VN) → our StarBrightness key
const BRIGHTNESS_MAP: Record<string, StarBrightness> = {
  'Miếu': 'mieu',
  'Vượng': 'vuong',
  'Đắc': 'dacDia',
  'Lợi': 'dacDia',
  'Bình': 'binhHoa',
  'Bất': 'hamDia',
  'Hạn': 'hamDia',
}

// iztro palace name (vi-VN) → our palace name
// Only difference: iztro uses 'Tử Nữ', we use 'Tử Tức'
const PALACE_NAME_MAP: Record<string, string> = {
  'Mệnh': 'Mệnh',
  'Huynh Đệ': 'Huynh Đệ',
  'Phu Thê': 'Phu Thê',
  'Tử Nữ': 'Tử Tức',
  'Tài Bạch': 'Tài Bạch',
  'Tật Ách': 'Tật Ách',
  'Thiên Di': 'Thiên Di',
  'Nô Bộc': 'Nô Bộc',
  'Quan Lộc': 'Quan Lộc',
  'Điền Trạch': 'Điền Trạch',
  'Phúc Đức': 'Phúc Đức',
  'Phụ Mẫu': 'Phụ Mẫu',
}

// StarType → isGood
// 'tough' = 凶星 (inauspicious)
const TOUGH_TYPES = new Set(['tough'])

// ============================================================
// PUBLIC TYPES
// ============================================================

export interface IztroChartData {
  cucNumber: number           // 2|3|4|5|6
  cucName: string             // 'Thổ Ngũ Cục' etc.
  cungMenhIndex: number       // 0-11 (Tý=0)
  cungThanIndex: number       // 0-11
  palaces: Palace[]           // 12 cung đã map sang format của mình
  daiHan: DaiHan[]            // Đại Hạn từ iztro decadal, sort theo startAge
  ageToPalace: Map<number, number>  // age → palace index (cho Tiểu Hạn)
}

// ============================================================
// MAIN FUNCTION
// ============================================================

/**
 * Generate full chart data using iztro as the calculation engine.
 * Returns null if iztro throws (invalid date etc.) so callers can fall back.
 */
export function getIztroChartData(
  lunarDate: LunarDate,
  birthHourIndex: number,  // 0-11 (Tý=0 … Hợi=11)
  gender: 'male' | 'female',
  birthYear: number,       // lunar birth year, used for DaiHan startYear
): IztroChartData | null {
  try {
    const genderName = gender === 'male' ? 'Nam' : 'Nữ'
    const dateStr = `${lunarDate.year}-${lunarDate.month}-${lunarDate.day}`

    const chart = astro.byLunar(
      dateStr,
      birthHourIndex,
      genderName as Parameters<typeof astro.byLunar>[2],
      lunarDate.isLeapMonth ?? false,
      true,     // fixLeap
      'vi-VN',
    )

    // --- Cục ---
    const cucNumber = CUC_NUMBER_MAP[chart.fiveElementsClass as string] ?? 5
    const cucName = chart.fiveElementsClass as string

    // --- Mệnh / Thân cung ---
    // iztro palace index starts from Dần; convert: ourIndex = (iztroIndex + 2) % 12
    const menhPalace = chart.palaces.find((p) => (p.name as string) === 'Mệnh')
    const thanPalace = chart.palaces.find((p) => p.isBodyPalace)
    const cungMenhIndex = menhPalace ? (menhPalace.index + 2) % 12 : 0
    const cungThanIndex = thanPalace ? (thanPalace.index + 2) % 12 : 0

    // --- 12 Cung ---
    const palaces: Palace[] = chart.palaces.map((p) => {
      const ourIndex = (p.index + 2) % 12

      // 14 Chính tinh
      const mainStars: Star[] = (p.majorStars as { name: string; brightness?: string; mutagen?: string }[]).map((s) => ({
        name: s.name,
        brightness: BRIGHTNESS_MAP[s.brightness ?? ''] ?? 'binhHoa',
        isGood: true,  // All 14 main stars are "good" — context determines outcome
        shortMeaning: s.mutagen ? `Hóa ${s.mutagen}` : '',
      }))

      // Phụ tinh + tạp diệu
      const allMinor = [
        ...(p.minorStars as { name: string; type: string; brightness?: string; mutagen?: string }[]),
        ...(p.adjectiveStars as { name: string; type: string; brightness?: string; mutagen?: string }[]),
      ]
      const minorStars: Star[] = allMinor.map((s) => ({
        name: s.name,
        brightness: 'binhHoa',
        isGood: !TOUGH_TYPES.has(s.type),
        shortMeaning: s.mutagen ? `Hóa ${s.mutagen}` : '',
      }))

      return {
        index: ourIndex,
        name: PALACE_NAME_MAP[p.name as string] ?? (p.name as string),
        diaChi: DIA_CHI[ourIndex],
        isLifePalace: ourIndex === cungMenhIndex,
        isSoulPalace: ourIndex === cungThanIndex,
        mainStars,
        minorStars,
      }
    })

    // Sort palaces by index (0-11) for predictable output
    palaces.sort((a, b) => a.index - b.index)

    // --- Đại Hạn ---
    // Each iztro palace has decadal: { range: [startAge, endAge], heavenlyStem, earthlyBranch }
    const daiHan: DaiHan[] = chart.palaces
      .map((p) => {
        const ourIndex = (p.index + 2) % 12
        const d = p.decadal as { range: [number, number]; heavenlyStem: string; earthlyBranch: string }
        return {
          startAge: d.range[0],
          endAge: d.range[1],
          startYear: birthYear + d.range[0],
          palaceIndex: ourIndex,
          palaceName: PALACE_NAME_MAP[p.name as string] ?? (p.name as string),
          diaChi: DIA_CHI[ourIndex],
        }
      })
      .sort((a, b) => a.startAge - b.startAge)

    // --- Age → Palace map (Tiểu Hạn) ---
    const ageToPalace = new Map<number, number>()
    for (const p of chart.palaces) {
      const ourIndex = (p.index + 2) % 12
      for (const age of p.ages as number[]) {
        ageToPalace.set(age, ourIndex)
      }
    }

    return { cucNumber, cucName, cungMenhIndex, cungThanIndex, palaces, daiHan, ageToPalace }
  } catch {
    return null
  }
}
