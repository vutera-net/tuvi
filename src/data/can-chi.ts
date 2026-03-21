// Thien Can (Heavenly Stems) - 10 can
export const THIEN_CAN = [
  'Giáp', // 0
  'Ất', // 1
  'Bính', // 2
  'Đinh', // 3
  'Mậu', // 4
  'Kỷ', // 5
  'Canh', // 6
  'Tân', // 7
  'Nhâm', // 8
  'Quý', // 9
] as const

// Thien Can không dấu (for lookup keys)
export const THIEN_CAN_KHONG_DAU = [
  'Giap', 'At', 'Binh', 'Dinh', 'Mau', 'Ky', 'Canh', 'Tan', 'Nham', 'Quy',
] as const

// Dia Chi (Earthly Branches) - 12 chi
export const DIA_CHI = [
  'Tý', // 0
  'Sửu', // 1
  'Dần', // 2
  'Mão', // 3
  'Thìn', // 4
  'Tỵ', // 5
  'Ngọ', // 6
  'Mùi', // 7
  'Thân', // 8
  'Dậu', // 9
  'Tuất', // 10
  'Hợi', // 11
] as const

export const DIA_CHI_KHONG_DAU = [
  'Ty', 'Suu', 'Dan', 'Mao', 'Thin', 'Ti', 'Ngo', 'Mui', 'Than', 'Dau', 'Tuat', 'Hoi',
] as const

// 12 Con Giap (Zodiac animals)
export const CON_GIAP = [
  'Chuột', // Tý
  'Trâu', // Sửu
  'Hổ', // Dần
  'Mèo', // Mão
  'Rồng', // Thìn
  'Rắn', // Tỵ
  'Ngựa', // Ngọ
  'Dê', // Mùi
  'Khỉ', // Thân
  'Gà', // Dậu
  'Chó', // Tuất
  'Heo', // Hợi
] as const

// Can Ngu Hanh: 0=Kim, 1=Moc, 2=Thuy, 3=Hoa, 4=Tho
export const CAN_NGU_HANH: Record<number, string> = {
  0: 'Mộc', // Giáp
  1: 'Mộc', // Ất
  2: 'Hỏa', // Bính
  3: 'Hỏa', // Đinh
  4: 'Thổ', // Mậu
  5: 'Thổ', // Kỷ
  6: 'Kim', // Canh
  7: 'Kim', // Tân
  8: 'Thủy', // Nhâm
  9: 'Thủy', // Quý
}

// Chi Ngu Hanh
export const CHI_NGU_HANH: Record<number, string> = {
  0: 'Thủy', // Tý
  1: 'Thổ', // Sửu
  2: 'Mộc', // Dần
  3: 'Mộc', // Mão
  4: 'Thổ', // Thìn
  5: 'Hỏa', // Tỵ
  6: 'Hỏa', // Ngọ
  7: 'Thổ', // Mùi
  8: 'Kim', // Thân
  9: 'Kim', // Dậu
  10: 'Thổ', // Tuất
  11: 'Thủy', // Hợi
}

// Chi Am Duong (0=Am, 1=Duong)
export const CHI_AM_DUONG: Record<number, number> = {
  0: 1, // Tý - Dương
  1: 0, // Sửu - Âm
  2: 1, // Dần - Dương
  3: 0, // Mão - Âm
  4: 1, // Thìn - Dương
  5: 0, // Tỵ - Âm
  6: 1, // Ngọ - Dương
  7: 0, // Mùi - Âm
  8: 1, // Thân - Dương
  9: 0, // Dậu - Âm
  10: 1, // Tuất - Dương
  11: 0, // Hợi - Âm
}

// Can Am Duong
export const CAN_AM_DUONG: Record<number, number> = {
  0: 1, // Giáp - Dương
  1: 0, // Ất - Âm
  2: 1, // Bính - Dương
  3: 0, // Đinh - Âm
  4: 1, // Mậu - Dương
  5: 0, // Kỷ - Âm
  6: 1, // Canh - Dương
  7: 0, // Tân - Âm
  8: 1, // Nhâm - Dương
  9: 0, // Quý - Âm
}

// 12 Gio tuong ung Dia Chi
// Gio Ty: 23-1h, Gio Suu: 1-3h, ...
export const GIO_DIA_CHI = [
  { name: 'Tý', start: 23, end: 1, index: 0 },
  { name: 'Sửu', start: 1, end: 3, index: 1 },
  { name: 'Dần', start: 3, end: 5, index: 2 },
  { name: 'Mão', start: 5, end: 7, index: 3 },
  { name: 'Thìn', start: 7, end: 9, index: 4 },
  { name: 'Tỵ', start: 9, end: 11, index: 5 },
  { name: 'Ngọ', start: 11, end: 13, index: 6 },
  { name: 'Mùi', start: 13, end: 15, index: 7 },
  { name: 'Thân', start: 15, end: 17, index: 8 },
  { name: 'Dậu', start: 17, end: 19, index: 9 },
  { name: 'Tuất', start: 19, end: 21, index: 10 },
  { name: 'Hợi', start: 21, end: 23, index: 11 },
] as const

/**
 * Get Can Chi string for a year (e.g., 2024 -> "Giáp Thìn")
 */
export function getCanChiYear(year: number): { can: string; chi: string; full: string } {
  const canIndex = (year - 4) % 10
  const chiIndex = (year - 4) % 12
  const can = THIEN_CAN[(canIndex + 10) % 10]
  const chi = DIA_CHI[(chiIndex + 12) % 12]
  return { can, chi, full: `${can} ${chi}` }
}

/**
 * Get Can Chi for a day from its Can/Chi indices
 */
export function getCanChiDay(canIndex: number, chiIndex: number): string {
  return `${THIEN_CAN[canIndex]} ${DIA_CHI[chiIndex]}`
}

/**
 * Get Gio Can from Can of the day and Gio Chi index
 * Cong thuc: Can gio Ty = Can ngay * 2 (mod 10)
 */
export function getGioCanIndex(canNgayIndex: number, gioChiIndex: number): number {
  return ((canNgayIndex % 5) * 2 + gioChiIndex) % 10
}
