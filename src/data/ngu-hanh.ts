import type { NguHanh, NguHanhInfo } from '@/types'

// Tương Sinh cycle: Mộc -> Hỏa -> Thổ -> Kim -> Thủy -> Mộc
export const TUONG_SINH: Record<NguHanh, NguHanh> = {
  Moc: 'Hoa',
  Hoa: 'Tho',
  Tho: 'Kim',
  Kim: 'Thuy',
  Thuy: 'Moc',
}

// Tương Khắc cycle: Mộc -> Thổ -> Thủy -> Hỏa -> Kim -> Mộc
export const TUONG_KHAC: Record<NguHanh, NguHanh> = {
  Moc: 'Tho',
  Hoa: 'Kim',
  Tho: 'Thuy',
  Kim: 'Moc',
  Thuy: 'Hoa',
}

// Who gives birth to (sinh) this element
export const SINH_BOI: Record<NguHanh, NguHanh> = {
  Moc: 'Thuy',
  Hoa: 'Moc',
  Tho: 'Hoa',
  Kim: 'Tho',
  Thuy: 'Kim',
}

// Who dominates (khắc) this element
export const KHAC_BOI: Record<NguHanh, NguHanh> = {
  Moc: 'Kim',
  Hoa: 'Thuy',
  Tho: 'Moc',
  Kim: 'Hoa',
  Thuy: 'Tho',
}

// Vietnamese names with diacritics
export const NGU_HANH_VI: Record<NguHanh, string> = {
  Kim: 'Kim',
  Moc: 'Mộc',
  Thuy: 'Thủy',
  Hoa: 'Hỏa',
  Tho: 'Thổ',
}

// Colors associated with each element
export const NGU_HANH_MAU_TOT: Record<NguHanh, string[]> = {
  Kim: ['Trắng', 'Bạc', 'Xám', 'Vàng đồng'],
  Moc: ['Xanh lá', 'Xanh lục', 'Nâu'],
  Thuy: ['Đen', 'Xanh dương', 'Tím nhạt'],
  Hoa: ['Đỏ', 'Cam', 'Hồng', 'Tím'],
  Tho: ['Vàng', 'Nâu đất', 'Be'],
}

export const NGU_HANH_MAU_XAU: Record<NguHanh, string[]> = {
  Kim: ['Đỏ', 'Cam'], // Hỏa khắc Kim
  Moc: ['Trắng', 'Xám'], // Kim khắc Mộc
  Thuy: ['Vàng', 'Nâu'], // Thổ khắc Thủy
  Hoa: ['Đen', 'Xanh dương'], // Thủy khắc Hỏa
  Tho: ['Xanh lá', 'Xanh lục'], // Mộc khắc Thổ
}

// Lucky directions
export const NGU_HANH_HUONG_TOT: Record<NguHanh, string[]> = {
  Kim: ['Tây', 'Tây Bắc'],
  Moc: ['Đông', 'Đông Nam'],
  Thuy: ['Bắc'],
  Hoa: ['Nam'],
  Tho: ['Đông Bắc', 'Tây Nam', 'Trung Tâm'],
}

// Lucky numbers
export const NGU_HANH_SO_MAY_MAN: Record<NguHanh, number[]> = {
  Kim: [4, 9],
  Moc: [3, 8],
  Thuy: [1, 6],
  Hoa: [2, 7],
  Tho: [5, 10],
}

// Personality traits
export const NGU_HANH_TINH_CACH: Record<NguHanh, string> = {
  Kim: 'Cứng rắn, quyết đoán, công bằng, nghĩa khí. Có chí hướng cao, thích thẩm mỹ và cái đẹp.',
  Moc: 'Nhân từ, khéo léo, sáng tạo, có lòng trắc ẩn. Yêu thiên nhiên, thích học hỏi và phát triển bản thân.',
  Thuy: 'Thông minh, linh hoạt, ngoại giao giỏi. Tư duy sâu sắc, thích khám phá và có trí nhớ tốt.',
  Hoa: 'Nhiệt tình, lạc quan, lãng mạn. Có sức hút tự nhiên, thích giao tiếp và làm việc sáng tạo.',
  Tho: 'Thực tế, trung thực, kiên nhẫn, đáng tin cậy. Ổn định, thích sự ổn định và bền vững.',
}

// CSS hex colors for UI display
export const NGU_HANH_COLOR_HEX: Record<NguHanh, string> = {
  Kim: '#C0C0C0',
  Moc: '#228B22',
  Thuy: '#1E90FF',
  Hoa: '#DC143C',
  Tho: '#DAA520',
}

/**
 * Check compatibility between two Ngu Hanh elements
 */
export function checkCompatibility(
  menh1: NguHanh,
  menh2: NguHanh
): { relationship: 'tuongSinh' | 'tuongKhac' | 'hoa'; score: number; description: string } {
  if (TUONG_SINH[menh1] === menh2 || TUONG_SINH[menh2] === menh1) {
    return {
      relationship: 'tuongSinh',
      score: 85,
      description: `${NGU_HANH_VI[menh1]} và ${NGU_HANH_VI[menh2]} tương sinh - rất hợp nhau`,
    }
  }
  if (TUONG_KHAC[menh1] === menh2 || TUONG_KHAC[menh2] === menh1) {
    return {
      relationship: 'tuongKhac',
      score: 40,
      description: `${NGU_HANH_VI[menh1]} và ${NGU_HANH_VI[menh2]} tương khắc - cần thêm sự thấu hiểu`,
    }
  }
  return {
    relationship: 'hoa',
    score: 65,
    description: `${NGU_HANH_VI[menh1]} và ${NGU_HANH_VI[menh2]} bình hòa - tương đối hợp`,
  }
}
