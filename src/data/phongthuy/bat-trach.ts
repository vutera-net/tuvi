import type { CungMenh, HuongInfo, HuongName, MenhNhom } from '@/types'

export interface CungMenhData {
  name: CungMenh
  number: number
  nhom: MenhNhom
  nguHanh: string
  description: string
}

export const CUNG_MENH_DATA: CungMenhData[] = [
  { name: 'Kham', number: 1, nhom: 'dong', nguHanh: 'Thủy', description: 'Cung Khảm - Bắc' },
  { name: 'Khon', number: 2, nhom: 'tay', nguHanh: 'Thổ', description: 'Cung Khôn - Tây Nam' },
  { name: 'Chan', number: 3, nhom: 'dong', nguHanh: 'Mộc', description: 'Cung Chấn - Đông' },
  { name: 'Ton', number: 4, nhom: 'dong', nguHanh: 'Mộc', description: 'Cung Tốn - Đông Nam' },
  // 5 maps to Khôn (nữ) or Cấn (nam) depending on gender
  { name: 'Can', number: 6, nhom: 'tay', nguHanh: 'Kim', description: 'Cung Càn - Tây Bắc' },
  { name: 'Doai', number: 7, nhom: 'tay', nguHanh: 'Kim', description: 'Cung Đoài - Tây' },
  { name: 'Gen', number: 8, nhom: 'tay', nguHanh: 'Thổ', description: 'Cung Cấn - Đông Bắc' },
  { name: 'Ly', number: 9, nhom: 'dong', nguHanh: 'Hỏa', description: 'Cung Ly - Nam' },
]

// Huong (direction) data for each Cung Menh
// Format: [Sinh Khi, Thien Y, Dien Nien, Phuc Vi, Hoa Hai, Luc Sat, Ngu Quy, Tuyet Menh]
type DirectionKey = 'B' | 'N' | 'D' | 'T' | 'DB' | 'DN' | 'TB' | 'TN'

const BAT_TRACH_DIRECTIONS: Record<CungMenh, DirectionKey[]> = {
  Kham: ['DN', 'D', 'N', 'B', 'TB', 'DB', 'TN', 'T'],
  Khon: ['DB', 'T', 'TB', 'TN', 'D', 'N', 'B', 'DN'],
  Chan: ['N', 'DN', 'D', 'D', 'TN', 'TB', 'T', 'DB'],
  Ton: ['B', 'N', 'DN', 'DN', 'T', 'TN', 'DB', 'TB'],
  Can: ['T', 'TB', 'TN', 'TB', 'DN', 'D', 'N', 'B'],
  Doai: ['TB', 'DB', 'TN', 'T', 'D', 'DN', 'N', 'B'],
  Gen: ['TN', 'T', 'TB', 'DB', 'B', 'DN', 'D', 'N'],
  Ly: ['D', 'B', 'N', 'N', 'DB', 'T', 'TB', 'TN'],
}

const DIRECTION_LABELS: Record<DirectionKey, string> = {
  B: 'Bắc', N: 'Nam', D: 'Đông', T: 'Tây',
  DB: 'Đông Bắc', DN: 'Đông Nam', TB: 'Tây Bắc', TN: 'Tây Nam',
}

const HUONG_NAMES: HuongName[] = [
  'Sinh Khi', 'Thien Y', 'Dien Nien', 'Phuc Vi',
  'Hoa Hai', 'Luc Sat', 'Ngu Quy', 'Tuyet Menh',
]

const HUONG_IS_TOT = [true, true, true, true, false, false, false, false]

const HUONG_MEANINGS: Record<HuongName, string> = {
  'Sinh Khi': 'Sinh khí - Tài lộc, may mắn, thịnh vượng',
  'Thien Y': 'Thiên Y - Sức khỏe, chữa bệnh, trường thọ',
  'Dien Nien': 'Diên Niên - Hôn nhân, quan hệ tốt đẹp, trường thọ',
  'Phuc Vi': 'Phục Vị - Bình ổn, an toàn, phù hợp nghỉ ngơi',
  'Hoa Hai': 'Họa Hại - Rắc rối nhỏ, cẩn thận tai nạn',
  'Luc Sat': 'Lục Sát - Kiện tụng, xui xẻo, thị phi',
  'Ngu Quy': 'Ngũ Quỷ - Hỏa hoạn, trộm cắp, bệnh tật',
  'Tuyet Menh': 'Tuyệt Mệnh - Hung hiểm nhất, suy bại, nguy hiểm tính mạng',
}

const HUONG_USAGE: Record<HuongName, string> = {
  'Sinh Khi': 'Đặt bàn làm việc, phòng khách, cửa chính hướng về',
  'Thien Y': 'Đặt phòng ngủ, khu vực nghỉ ngơi, nơi dưỡng bệnh',
  'Dien Nien': 'Phòng ngủ vợ chồng, phòng ăn, nơi gia đình quây quần',
  'Phuc Vi': 'Phòng lưu trữ, kho, không gian ở nhưng ít dùng',
  'Hoa Hai': 'Tránh đặt phòng ngủ, bếp, cửa chính',
  'Luc Sat': 'Tránh cửa chính, phòng ngủ; có thể làm nhà vệ sinh',
  'Ngu Quy': 'Tránh tuyệt đối; nên làm nhà vệ sinh hoặc phòng kho',
  'Tuyet Menh': 'Tránh tuyệt đối; có thể làm nhà vệ sinh hoặc khu vực không ở',
}

export function getBatTrachHuongs(cungMenh: CungMenh): HuongInfo[] {
  const dirs = BAT_TRACH_DIRECTIONS[cungMenh]
  return HUONG_NAMES.map((name, i) => ({
    name,
    direction: DIRECTION_LABELS[dirs[i]],
    isTot: HUONG_IS_TOT[i],
    meaning: HUONG_MEANINGS[name],
    usage: HUONG_USAGE[name],
  }))
}

/**
 * Calculate Cung Menh from birth year and gender
 * - Nam: (100 - lastTwoDigits) / 9, take remainder
 * - Nu: (lastTwoDigits - 4) / 9, take remainder
 */
export function getCungMenhNumber(year: number, gender: 'male' | 'female'): number {
  const lastTwo = year % 100
  let n: number

  if (gender === 'male') {
    n = (100 - lastTwo) % 9
  } else {
    n = (lastTwo - 4 + 90) % 9 // +90 to handle negative
  }

  if (n === 0) n = 9

  // Special case: 5 maps to 2 (Khôn) for female, 8 (Cấn) for male
  if (n === 5) {
    return gender === 'male' ? 8 : 2
  }

  return n
}

export function getCungMenhByNumber(num: number): CungMenh {
  const map: Record<number, CungMenh> = {
    1: 'Kham', 2: 'Khon', 3: 'Chan', 4: 'Ton',
    6: 'Can', 7: 'Doai', 8: 'Gen', 9: 'Ly',
  }
  return map[num] ?? 'Kham'
}

export function getMenhNhom(cungMenh: CungMenh): MenhNhom {
  const dongTuMenh: CungMenh[] = ['Kham', 'Chan', 'Ton', 'Ly']
  return dongTuMenh.includes(cungMenh) ? 'dong' : 'tay'
}
