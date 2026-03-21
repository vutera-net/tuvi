/**
 * Cửu Cung Phi Tinh (Nine Palaces Flying Stars)
 * Based on Lạc Thư (Lo Shu) magic square
 */

export interface PhiTinh {
  number: number // 1-9
  name: string
  element: string
  isTot: boolean
  description: string
  effects: string[]
}

export const PHI_TINH: Record<number, PhiTinh> = {
  1: {
    number: 1, name: 'Nhất Bạch', element: 'Thủy',
    isTot: true,
    description: 'Sao Tham Lang - Văn học, quan lộc, tình duyên',
    effects: ['Thăng tiến sự nghiệp', 'Học hành thi cử', 'Tình duyên tốt'],
  },
  2: {
    number: 2, name: 'Nhị Hắc', element: 'Thổ',
    isTot: false,
    description: 'Sao Cự Môn - Bệnh tật, tai ương',
    effects: ['Sức khỏe suy yếu', 'Phụ nữ gặp nạn', 'Bệnh tật liên miên'],
  },
  3: {
    number: 3, name: 'Tam Bích', element: 'Mộc',
    isTot: false,
    description: 'Sao Lộc Tồn - Kiện tụng, thị phi, cãi vã',
    effects: ['Tranh chấp pháp lý', 'Rắc rối gia đình', 'Thị phi khẩu thiệt'],
  },
  4: {
    number: 4, name: 'Tứ Lục', element: 'Mộc',
    isTot: true,
    description: 'Sao Văn Khúc - Văn học nghệ thuật, tình duyên',
    effects: ['Thành công học tập', 'Tình duyên', 'Nghệ thuật sáng tạo'],
  },
  5: {
    number: 5, name: 'Ngũ Hoàng', element: 'Thổ',
    isTot: false,
    description: 'Sao Liêm Trinh - Nguy hiểm nhất, tai họa',
    effects: ['Bệnh nặng', 'Tai nạn', 'Tài sản hao tổn', 'Tử vong'],
  },
  6: {
    number: 6, name: 'Lục Bạch', element: 'Kim',
    isTot: true,
    description: 'Sao Vũ Khúc - Quyền lực, tài lộc',
    effects: ['Thăng quan tiến chức', 'Tài lộc hanh thông', 'Lãnh đạo'],
  },
  7: {
    number: 7, name: 'Thất Xích', element: 'Kim',
    isTot: false,
    description: 'Sao Phá Quân - Trộm cắp, miệng lưỡi, tai nạn',
    effects: ['Hao tổn tài sản', 'Miệng lưỡi thị phi', 'Phẫu thuật'],
  },
  8: {
    number: 8, name: 'Bát Bạch', element: 'Thổ',
    isTot: true,
    description: 'Sao Tả Phụ - Tài lộc, đất đai, bất động sản',
    effects: ['Phát tài', 'Bất động sản thuận lợi', 'Gia đình hòa thuận'],
  },
  9: {
    number: 9, name: 'Cửu Tử', element: 'Hỏa',
    isTot: true, // Trung tính, tốt trong vận Hỏa
    description: 'Sao Hữu Bật - Hỷ sự, lễ khánh',
    effects: ['Hôn nhân', 'Sinh sản', 'Hỷ sự', 'Danh tiếng'],
  },
}

// Lạc Thư standard grid (center=5)
// Position layout: [NW, N, NE, W, C, E, SW, S, SE]
export const LAC_THU_GRID = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
] as const

// Position in 3x3 grid [row][col] -> direction
export const GRID_DIRECTIONS = [
  ['TB', 'B', 'DB'],
  ['T', 'TT', 'D'],
  ['TN', 'N', 'DN'],
] as const

/**
 * Get the center star for a given year
 * Using formula: center star changes per Lạc Thư cycle
 */
export function getYearCenterStar(year: number): number {
  // Base year 2004 had center star 8 (start of Period 8)
  // Stars count down each year
  const base = 8
  const baseYear = 2004
  const diff = year - baseYear
  return ((base - diff % 9 + 9 - 1) % 9) + 1
}

/**
 * Get monthly center star from yearly center star and month
 */
export function getMonthCenterStar(yearlyCenterStar: number, month: number): number {
  // Monthly stars: month 1 has a specific star based on yearly star
  // Formula varies; simplified here
  const monthBase: Record<number, number> = {
    1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 9,
  }
  const offset = monthBase[((yearlyCenterStar - 1) % 9) + 1] ?? 8
  return ((offset - month % 9 + 9 - 1) % 9) + 1
}

/**
 * Generate 3x3 Cửu Cung grid from center star
 * Stars fly in Lạc Thư sequence
 */
export function generateCuuCungGrid(centerStar: number): number[][] {
  // The standard Lạc Thư positions
  const positions = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ]
  // Offset from standard center (5)
  const offset = centerStar - 5
  return positions.map((row) =>
    row.map((val) => ((val - 1 + offset + 9) % 9) + 1)
  )
}
