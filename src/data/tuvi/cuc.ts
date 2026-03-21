/**
 * Ngũ Cục (Five Constitutions) in Tu Vi Dau So
 * Determines the calculation base for star placement
 */

import type { NguHanh } from '@/types'

export interface CucInfo {
  name: string
  cucNumber: number // 2, 3, 4, 5, 6
  nguHanh: NguHanh
  description: string
}

export const CUC_LIST: CucInfo[] = [
  { name: 'Thủy Nhị Cục', cucNumber: 2, nguHanh: 'Thuy', description: 'Thủy Nhị Cục - Số 2' },
  { name: 'Mộc Tam Cục', cucNumber: 3, nguHanh: 'Moc', description: 'Mộc Tam Cục - Số 3' },
  { name: 'Kim Tứ Cục', cucNumber: 4, nguHanh: 'Kim', description: 'Kim Tứ Cục - Số 4' },
  { name: 'Thổ Ngũ Cục', cucNumber: 5, nguHanh: 'Tho', description: 'Thổ Ngũ Cục - Số 5' },
  { name: 'Hỏa Lục Cục', cucNumber: 6, nguHanh: 'Hoa', description: 'Hỏa Lục Cục - Số 6' },
]

/**
 * Cục determination table based on Mệnh cung DiaChi and Nạp Âm Ngũ Hành
 * Row = DiaChi of Menh cung (0-11)
 * Column = Nap Am Ngu Hanh (Kim=0, Moc=1, Thuy=2, Hoa=3, Tho=4)
 */
const CUC_TABLE: number[][] = [
  // Tý   Sửu  Dần  Mão  Thìn  Tỵ  Ngọ  Mùi  Thân  Dậu  Tuất  Hợi
  [2,    3,   4,   5,   6,   2,   3,   4,   5,   6,    2,   3],  // Kim
  [3,    4,   5,   6,   2,   3,   4,   5,   6,   2,    3,   4],  // Mộc
  [4,    5,   6,   2,   3,   4,   5,   6,   2,   3,    4,   5],  // Thủy
  [5,    6,   2,   3,   4,   5,   6,   2,   3,   4,    5,   6],  // Hỏa
  [6,    2,   3,   4,   5,   6,   2,   3,   4,   5,    6,   2],  // Thổ
]

const NGU_HANH_INDEX: Record<NguHanh, number> = {
  Kim: 0, Moc: 1, Thuy: 2, Hoa: 3, Tho: 4,
}

export function getCucNumber(menhCungChiIndex: number, napAmNguHanh: NguHanh): number {
  const nghIdx = NGU_HANH_INDEX[napAmNguHanh]
  return CUC_TABLE[nghIdx][menhCungChiIndex]
}

export function getCucInfo(cucNumber: number): CucInfo {
  return CUC_LIST.find((c) => c.cucNumber === cucNumber) ?? CUC_LIST[0]
}
