/**
 * Tử Vi Đẩu Số Engine
 * Calculates Tu Vi astrological charts
 */

import type { TuViChart, Palace, Star, StarBrightness, LunarDate, DaiHan, TieuHan } from '@/types'
import { CHINH_TINH, CHINH_TINH_MAP } from '@/data/tuvi/chinh-tinh'
import { CUNG_LIST } from '@/data/tuvi/cung'
import { getCucNumber, getCucInfo } from '@/data/tuvi/cuc'
import { getNapAmByYear } from '@/data/nap-am'
import { DIA_CHI, getCanChiYear } from '@/data/can-chi'

// ============================================================
// MENH CUNG CALCULATION
// ============================================================

/**
 * Calculate Mệnh cung index from birth month and birth hour Chi
 * Formula: Start from Dần (index 2), count up by month, then count back by hour
 */
export function calculateMenhCung(birthMonth: number, birthHourChi: number): number {
  // Tháng 1 -> cung Dần (chi index 2), mỗi tháng tiếp theo +1
  const monthBase = (birthMonth + 1) % 12 // month 1 -> index 2 (Dan)
  // Count back by hour chi from month position
  const menhChi = ((monthBase - birthHourChi + 12) % 12)
  return menhChi
}

/**
 * Calculate Thân cung index
 * Formula: Thân cung is opposite to Mệnh in certain configurations
 * Simplified: (2 + birthMonth + birthHourChi) % 12
 */
export function calculateThanCung(birthMonth: number, birthHourChi: number): number {
  return (2 + birthMonth + birthHourChi) % 12
}

// ============================================================
// TU VI STAR PLACEMENT
// ============================================================

/**
 * Find Tử Vi star position from Cục number and lunar day
 * Returns the DiaChi index (0-11) where Tử Vi resides
 */
export function findTuViPosition(cucNumber: number, lunarDay: number): number {
  // Algorithm: start from Dần (2), find position where (pos - 2) * cucNumber covers lunarDay
  // Simplified lookup table approach
  let pos = 2 // Start from Dan
  let count = cucNumber
  while (count < lunarDay) {
    pos = (pos + 1) % 12
    count += cucNumber
  }
  // Check if exact or need adjustment
  if (count > lunarDay) {
    pos = (pos + lunarDay - (count - cucNumber) - 1) % 12
  }
  return (pos + 12) % 12
}

// Star placement offsets relative to Tu Vi's position
// Positive = clockwise from TuVi, negative = counterclockwise
const TUVI_GROUP_OFFSETS: Record<string, number> = {
  tuVi: 0,
  thienCo: -2,  // 2 before TuVi
  thaiDuong: -4,
  vuKhuc: -5,
  thienDong: -6,
  liemTrinh: -10, // special
}

// Thiên Phủ is at mirror position of Tử Vi relative to Ngọ-Tý axis
// Then other Thien Phu group stars follow
const THIEN_PHU_GROUP_OFFSETS: Record<string, number> = {
  thienPhu: 0,
  thaiAm: 1,
  thamLang: 2,
  cuMon: 3,
  thienTuong: 4,
  thienLuong: 5,
  thatSat: 6,
  phaQuan: 10,
}

/**
 * Calculate Thiên Phủ position from Tử Vi position
 */
function getThienPhuPosition(tuViPos: number): number {
  // Thiên Phủ is symmetric to Tử Vi relative to Ngọ (index 6)
  return (12 - tuViPos + 4) % 12 // Simplified: Tý(0)+TuVi mirrored
}

/**
 * Place all 14 main stars given Tu Vi's position
 */
function placeChinhTinh(tuViPos: number): Record<string, number> {
  const positions: Record<string, number> = {}

  // Tử Vi group
  for (const [id, offset] of Object.entries(TUVI_GROUP_OFFSETS)) {
    positions[id] = ((tuViPos + offset) % 12 + 12) % 12
  }

  // Thiên Phủ group
  const thienPhuPos = getThienPhuPosition(tuViPos)
  for (const [id, offset] of Object.entries(THIEN_PHU_GROUP_OFFSETS)) {
    positions[id] = (thienPhuPos + offset) % 12
  }

  return positions
}

// ============================================================
// MAIN CHART CALCULATION
// ============================================================

/**
 * Generate a complete Tu Vi chart
 */
export function generateTuViChart(
  label: string,
  gender: 'male' | 'female',
  lunarDate: LunarDate,
  birthHourChi: number // 0-11
): TuViChart {
  const { year, month, day } = lunarDate

  // Step 1: Get Nap Am
  const napAmEntry = getNapAmByYear(year)
  const menh = napAmEntry.nguHanh

  // Step 2: Calculate Mệnh cung and Thân cung
  const menhCungChi = calculateMenhCung(month, birthHourChi)
  const thanCungChi = calculateThanCung(month, birthHourChi)

  // Step 3: Get Cục
  const cucNumber = getCucNumber(menhCungChi, menh)
  const cucInfo = getCucInfo(cucNumber)

  // Step 4: Find Tử Vi position
  const tuViPos = findTuViPosition(cucNumber, day)

  // Step 5: Place all 14 main stars
  const starPositions = placeChinhTinh(tuViPos)

  // Step 6: Build 12 palaces
  // Palaces are arranged by DiaChi starting from Tý
  // Mệnh cung is at menhCungChi position
  const palaceNames = [
    'Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức',
    'Tài Bạch', 'Tật Ách', 'Thiên Di', 'Nô Bộc',
    'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu',
  ]

  const palaces: Palace[] = Array.from({ length: 12 }, (_, i) => {
    // Palace i has DiaChi = i
    // Palace name is determined by offset from Mệnh
    const nameOffset = (i - menhCungChi + 12) % 12
    const palaceName = palaceNames[nameOffset]

    const mainStars: Star[] = []
    for (const tinh of CHINH_TINH) {
      const starPos = starPositions[tinh.id]
      if (starPos === i) {
        const diaChi = DIA_CHI[i]
        const brightness = (tinh.brightness[diaChi] ?? 'binhHoa') as StarBrightness
        mainStars.push({
          name: tinh.nameVi,
          brightness,
          isGood: tinh.isGood,
          shortMeaning: tinh.description.split(',')[0],
        })
      }
    }

    return {
      index: i,
      name: palaceName,
      diaChi: DIA_CHI[i],
      isLifePalace: i === menhCungChi,
      isSoulPalace: i === thanCungChi,
      mainStars,
      minorStars: [], // Minor stars calculation omitted for brevity
    }
  })

  // Step 7: Calculate Đại Hạn
  const daiHan = calculateDaiHan(gender, menhCungChi, cucNumber, year)

  return {
    label,
    gender,
    birthDate: lunarDate,
    birthHourIndex: birthHourChi,
    birthHourName: DIA_CHI[birthHourChi],
    cuc: cucInfo.name,
    cucNumber,
    menh,
    napAm: napAmEntry.napAm,
    cungMenhIndex: menhCungChi,
    cungThanIndex: thanCungChi,
    palaces,
    daiHan,
  }
}

// ============================================================
// ĐẠI HẠN CALCULATION
// ============================================================

/**
 * Calculate Đại Hạn (10-year periods)
 */
function calculateDaiHan(
  gender: 'male' | 'female',
  menhCungChi: number,
  cucNumber: number,
  birthYear: number
): DaiHan[] {
  const daiHan: DaiHan[] = []
  const isYangGender = gender === 'male'
  const isYangChi = menhCungChi % 2 === 0 // Even chi = Yang

  // Direction: if gender and chi both Yang or both Yin -> forward, else reverse
  const forward = (isYangGender && isYangChi) || (!isYangGender && !isYangChi)
  const step = forward ? 1 : -1

  const palaceNames = [
    'Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức',
    'Tài Bạch', 'Tật Ách', 'Thiên Di', 'Nô Bộc',
    'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu',
  ]

  for (let i = 0; i < 12; i++) {
    const palaceIndex = ((menhCungChi + (forward ? 1 : -1) * (i + 1)) % 12 + 12) % 12
    const startAge = cucNumber * (i + 1)
    const endAge = startAge + cucNumber - 1
    const startYear = birthYear + startAge

    daiHan.push({
      startAge,
      endAge,
      startYear,
      palaceIndex,
      palaceName: palaceNames[(palaceIndex - menhCungChi + 12) % 12] ?? 'Mệnh',
      diaChi: DIA_CHI[palaceIndex],
    })
  }

  return daiHan
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
 * Dương Nam / Âm Nữ: thuận (forward)
 * Âm Nam / Dương Nữ: nghịch (backward)
 */
export function getDaiHanDirection(gender: 'male' | 'female', menhCungChi: number): boolean {
  const isYangGender = gender === 'male'
  const isYangChi = menhCungChi % 2 === 0
  return (isYangGender && isYangChi) || (!isYangGender && !isYangChi)
}

/**
 * Calculate Tiểu Hạn (yearly sub-periods) for a given Đại Hạn
 * Each year within the Đại Hạn advances one palace in the same direction
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
