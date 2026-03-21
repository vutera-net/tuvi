/**
 * Bát Trạch Feng Shui Engine
 */

import type { BatTrachResult, CungMenh } from '@/types'
import {
  getCungMenhNumber,
  getCungMenhByNumber,
  getMenhNhom,
  getBatTrachHuongs,
  CUNG_MENH_DATA,
} from '@/data/phongthuy/bat-trach'

/**
 * Calculate full Bát Trạch analysis for a person
 */
export function calculateBatTrach(
  birthYear: number,
  gender: 'male' | 'female'
): BatTrachResult {
  const cungNumber = getCungMenhNumber(birthYear, gender)
  const cungMenh = getCungMenhByNumber(cungNumber)
  const nhomMenh = getMenhNhom(cungMenh)
  const huongs = getBatTrachHuongs(cungMenh)

  return {
    cungMenh,
    cungNumber,
    nhomMenh,
    huongs,
    huongNhaTot: huongs.filter((h) => h.isTot),
    huongNhaXau: huongs.filter((h) => !h.isTot),
  }
}

/**
 * Get Cung Menh info text
 */
export function getCungMenhInfo(cungMenh: CungMenh): string {
  const data = CUNG_MENH_DATA.find((d) => d.name === cungMenh)
  return data?.description ?? ''
}

/**
 * Check if a direction is good for a given cung menh
 */
export function isGoodDirection(
  birthYear: number,
  gender: 'male' | 'female',
  direction: string
): boolean {
  const result = calculateBatTrach(birthYear, gender)
  return result.huongNhaTot.some((h) => h.direction === direction)
}
