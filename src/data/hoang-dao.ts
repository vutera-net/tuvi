/**
 * Hoàng Đạo / Hắc Đạo hours
 * Based on the day's Chi (Earthly Branch), different hours are auspicious or inauspicious
 */

// The 12 "spirits" of the hours in order
export const GIO_SPIRITS = [
  'Thanh Long',  // 0 - Tốt
  'Minh Đường',  // 1 - Tốt
  'Thiên Hình',  // 2 - Xấu
  'Chu Tước',    // 3 - Xấu
  'Kim Quỹ',     // 4 - Tốt
  'Bảo Quang',   // 5 - Tốt
  'Bạch Hổ',     // 6 - Xấu
  'Thiên Lao',   // 7 - Xấu
  'Ngọc Đường',  // 8 - Tốt
  'Huyền Vũ',    // 9 - Xấu
  'Tư Mệnh',     // 10 - Tốt
  'Câu Trận',    // 11 - Xấu
] as const

export const HOANG_DAO_INDICES = new Set([0, 1, 4, 5, 8, 10]) // Indices in GIO_SPIRITS that are Hoàng Đạo

/**
 * Mapping from day Chi index to the starting spirit index for hour Tý
 * chiDayIndex -> spiritStartIndex
 */
export const CHI_TO_SPIRIT_START: Record<number, number> = {
  0: 0,  // Tý -> Thanh Long (Tý)
  1: 8,  // Sửu -> Ngọc Đường (Tý)
  2: 4,  // Dần -> Kim Quỹ (Tý)
  3: 0,  // Mão -> Thanh Long (Tý)
  4: 8,  // Thìn -> Ngọc Đường (Tý)
  5: 4,  // Tỵ -> Kim Quỹ (Tý)
  6: 0,  // Ngọ -> Thanh Long (Tý)
  7: 8,  // Mùi -> Ngọc Đường (Tý)
  8: 4,  // Thân -> Kim Quỹ (Tý)
  9: 0,  // Dậu -> Thanh Long (Tý)
  10: 8, // Tuất -> Ngọc Đường (Tý)
  11: 4, // Hợi -> Kim Quỹ (Tý)
}

/**
 * Get hour spirits for a given day Chi
 * Returns array of 12 spirit names (index 0 = Tý, 1 = Sửu, etc.)
 */
export function getHourSpirits(chiDayIndex: number): string[] {
  const start = CHI_TO_SPIRIT_START[chiDayIndex] ?? 0
  const spirits: string[] = []
  for (let i = 0; i < 12; i++) {
    spirits.push(GIO_SPIRITS[(start + i) % 12])
  }
  return spirits
}

/**
 * Get Hoàng Đạo hour indices for a day
 */
export function getHoangDaoGio(chiDayIndex: number): number[] {
  const start = CHI_TO_SPIRIT_START[chiDayIndex] ?? 0
  const hoangDao: number[] = []
  for (let i = 0; i < 12; i++) {
    const spiritIdx = (start + i) % 12
    if (HOANG_DAO_INDICES.has(spiritIdx)) {
      hoangDao.push(i)
    }
  }
  return hoangDao
}

/**
 * Get Hắc Đạo hour indices for a day
 */
export function getHacDaoGio(chiDayIndex: number): number[] {
  const start = CHI_TO_SPIRIT_START[chiDayIndex] ?? 0
  const hacDao: number[] = []
  for (let i = 0; i < 12; i++) {
    const spiritIdx = (start + i) % 12
    if (!HOANG_DAO_INDICES.has(spiritIdx)) {
      hacDao.push(i)
    }
  }
  return hacDao
}
