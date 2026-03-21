/**
 * Ngũ Hành Engine
 * Determines Five Elements destiny and compatibility
 */

import type { NguHanh, NguHanhInfo, CompatibilityResult } from '@/types'
import { NAP_AM_TABLE, getNapAmByYear } from '@/data/nap-am'
import {
  TUONG_SINH, TUONG_KHAC, SINH_BOI, KHAC_BOI,
  NGU_HANH_VI, NGU_HANH_MAU_TOT, NGU_HANH_MAU_XAU,
  NGU_HANH_HUONG_TOT, NGU_HANH_SO_MAY_MAN, NGU_HANH_TINH_CACH,
  checkCompatibility,
} from '@/data/ngu-hanh'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'

/**
 * Get Ngũ Hành information for a person born in a given year
 */
export function getNguHanhByYear(year: number): NguHanhInfo {
  const entry = getNapAmByYear(year)
  const menh = entry.nguHanh

  return {
    menh,
    napAm: entry.napAm,
    mauSacTot: NGU_HANH_MAU_TOT[menh],
    mauSacXau: NGU_HANH_MAU_XAU[menh],
    huongTot: NGU_HANH_HUONG_TOT[menh],
    soMayMan: NGU_HANH_SO_MAY_MAN[menh],
    tinhCach: NGU_HANH_TINH_CACH[menh],
    sinhBoi: SINH_BOI[menh],
    khacBoi: KHAC_BOI[menh],
    sinh: TUONG_SINH[menh],
    khac: TUONG_KHAC[menh],
  }
}

/**
 * Check compatibility between two birth years
 */
export function checkYearCompatibility(
  year1: number,
  name1: string,
  year2: number,
  name2: string
): CompatibilityResult {
  const info1 = getNguHanhByYear(year1)
  const info2 = getNguHanhByYear(year2)
  const result = checkCompatibility(info1.menh, info2.menh)

  return {
    person1: { name: name1, menh: info1.menh, napAm: info1.napAm },
    person2: { name: name2, menh: info2.menh, napAm: info2.napAm },
    relationship: result.relationship,
    score: result.score,
    analysis: result.description,
  }
}

/**
 * Get full Vietnamese description of Ngu Hanh
 */
export function getNguHanhDescription(menh: NguHanh): string {
  return NGU_HANH_VI[menh]
}

/**
 * Get the birth year of someone by age
 */
export function ageToYear(age: number, currentYear: number): number {
  return currentYear - age
}

/**
 * Get can-chi string for a year
 */
export function getCanChiByYear(year: number): string {
  const canIdx = ((year - 4) % 10 + 10) % 10
  const chiIdx = ((year - 4) % 12 + 12) % 12
  return `${THIEN_CAN[canIdx]} ${DIA_CHI[chiIdx]}`
}
