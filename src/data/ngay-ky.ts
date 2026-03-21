/**
 * Ngày Kỵ - Auspicious avoidance days
 */

/**
 * Tam Nương: Ngày 3, 7, 13, 14, 18, 22, 23, 27 âm lịch
 * Cần tránh các việc trọng đại vào những ngày này
 */
export const TAM_NUONG_DAYS = [3, 7, 13, 14, 18, 22, 23, 27]

/**
 * Nguyệt Kỵ: Ngày 5, 14, 23 âm lịch mỗi tháng
 */
export const NGUYET_KY_DAYS = [5, 14, 23]

/**
 * Sát Chủ - based on month (lunar)
 * Key = lunar month, Value = Chi of day to avoid
 */
export const SAT_CHU: Record<number, number> = {
  1: 3,  // Tháng 1 kỵ ngày Dần (2)
  2: 4,  // Tháng 2 kỵ ngày Thìn (4)
  3: 5,  // Tháng 3 kỵ ngày Tỵ (5)
  4: 6,  // Tháng 4 kỵ ngày Ngọ (6)
  5: 7,  // Tháng 5 kỵ ngày Mùi (7)
  6: 8,  // Tháng 6 kỵ ngày Thân (8)
  7: 9,  // Tháng 7 kỵ ngày Dậu (9)
  8: 10, // Tháng 8 kỵ ngày Tuất (10)
  9: 11, // Tháng 9 kỵ ngày Hợi (11)
  10: 0, // Tháng 10 kỵ ngày Tý (0)
  11: 1, // Tháng 11 kỵ ngày Sửu (1)
  12: 2, // Tháng 12 kỵ ngày Dần (2) [corrected]
}

/**
 * Thời Địa - seasonal taboo days
 * Season -> Can of day to avoid
 */
export const THOI_DIA: Array<{ season: string; months: number[]; canAvoid: number[] }> = [
  { season: 'Xuân', months: [1, 2, 3], canAvoid: [2, 3] }, // Bính, Đinh
  { season: 'Hạ', months: [4, 5, 6], canAvoid: [8, 9] },   // Nhâm, Quý
  { season: 'Thu', months: [7, 8, 9], canAvoid: [0, 1] },   // Giáp, Ất
  { season: 'Đông', months: [10, 11, 12], canAvoid: [4, 5] }, // Mậu, Kỷ
]

export function isTamNuong(lunarDay: number): boolean {
  return TAM_NUONG_DAYS.includes(lunarDay)
}

export function isNguyetKy(lunarDay: number): boolean {
  return NGUYET_KY_DAYS.includes(lunarDay)
}

export function isSatChu(lunarMonth: number, dayChiIndex: number): boolean {
  return SAT_CHU[lunarMonth] === dayChiIndex
}

export function isThoiDia(lunarMonth: number, dayCanIndex: number): boolean {
  const entry = THOI_DIA.find((t) => t.months.includes(lunarMonth))
  return entry ? entry.canAvoid.includes(dayCanIndex) : false
}

/**
 * Get all applicable kỵ names for a day
 */
export function getNgayKy(
  lunarDay: number,
  lunarMonth: number,
  dayCanIndex: number,
  dayChiIndex: number
): string[] {
  const ky: string[] = []
  if (isTamNuong(lunarDay)) ky.push('Tam Nương')
  if (isNguyetKy(lunarDay)) ky.push('Nguyệt Kỵ')
  if (isSatChu(lunarMonth, dayChiIndex)) ky.push('Sát Chủ')
  if (isThoiDia(lunarMonth, dayCanIndex)) ky.push('Thời Địa')
  return ky
}
