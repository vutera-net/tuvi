/**
 * Vietnamese Festivals - Lunar and Solar
 */

export interface Festival {
  name: string
  type: 'lunar' | 'solar'
  month: number
  day: number
  isHoliday: boolean // Public holiday
}

export const FESTIVALS: Festival[] = [
  // Lunar festivals
  { name: 'Tết Nguyên Đán', type: 'lunar', month: 1, day: 1, isHoliday: true },
  { name: 'Mùng 2 Tết', type: 'lunar', month: 1, day: 2, isHoliday: true },
  { name: 'Mùng 3 Tết', type: 'lunar', month: 1, day: 3, isHoliday: true },
  { name: 'Rằm Tháng Giêng (Tết Nguyên Tiêu)', type: 'lunar', month: 1, day: 15, isHoliday: false },
  { name: 'Lễ Hội Đền Hùng', type: 'lunar', month: 3, day: 10, isHoliday: true },
  { name: 'Tết Đoan Ngọ', type: 'lunar', month: 5, day: 5, isHoliday: false },
  { name: 'Lễ Vu Lan', type: 'lunar', month: 7, day: 15, isHoliday: false },
  { name: 'Tết Trung Thu', type: 'lunar', month: 8, day: 15, isHoliday: false },
  { name: 'Tết Táo Quân', type: 'lunar', month: 12, day: 23, isHoliday: false },
  { name: 'Tất Niên', type: 'lunar', month: 12, day: 30, isHoliday: false },

  // Solar holidays
  { name: 'Tết Dương Lịch', type: 'solar', month: 1, day: 1, isHoliday: true },
  { name: 'Ngày Thành Lập ĐẢNG', type: 'solar', month: 2, day: 3, isHoliday: false },
  { name: 'Ngày Quốc Tế Phụ Nữ', type: 'solar', month: 3, day: 8, isHoliday: false },
  { name: 'Ngày Giải Phóng Miền Nam', type: 'solar', month: 4, day: 30, isHoliday: true },
  { name: 'Ngày Quốc Tế Lao Động', type: 'solar', month: 5, day: 1, isHoliday: true },
  { name: 'Ngày Quốc Khánh', type: 'solar', month: 9, day: 2, isHoliday: true },
  { name: 'Ngày Phụ Nữ Việt Nam', type: 'solar', month: 10, day: 20, isHoliday: false },
  { name: 'Ngày Nhà Giáo Việt Nam', type: 'solar', month: 11, day: 20, isHoliday: false },
]

export function getLunarFestivals(lunarMonth: number, lunarDay: number): string[] {
  return FESTIVALS.filter(
    (f) => f.type === 'lunar' && f.month === lunarMonth && f.day === lunarDay
  ).map((f) => f.name)
}

export function getSolarFestivals(solarMonth: number, solarDay: number): string[] {
  return FESTIVALS.filter(
    (f) => f.type === 'solar' && f.month === solarMonth && f.day === solarDay
  ).map((f) => f.name)
}
