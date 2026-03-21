/**
 * Cửu Cung Phi Tinh Engine
 */

import type { CuuCungResult, CuuCungCell } from '@/types'
import {
  getYearCenterStar,
  getMonthCenterStar,
  generateCuuCungGrid,
  PHI_TINH,
  GRID_DIRECTIONS,
} from '@/data/phongthuy/cuu-cung'

/**
 * Calculate yearly Cuu Cung result
 */
export function calculateYearlyCuuCung(year: number): CuuCungResult {
  const centerStar = getYearCenterStar(year)
  const grid = generateCuuCungGrid(centerStar)

  const cellGrid: CuuCungCell[][] = grid.map((row, r) =>
    row.map((star, c) => {
      const info = PHI_TINH[star]
      return {
        star,
        direction: GRID_DIRECTIONS[r][c],
        isTot: info.isTot,
        meaning: info.description,
      }
    })
  )

  const badStars = cellGrid.flat().filter((c) => !c.isTot)
  const goodStars = cellGrid.flat().filter((c) => c.isTot)
  const analysis = [
    `Năm ${year}: Trung cung sao ${PHI_TINH[centerStar].name}.`,
    `Hướng tốt: ${goodStars.map((c) => `${c.direction} (${PHI_TINH[c.star].name})`).join(', ')}.`,
    `Hướng xấu: ${badStars.map((c) => `${c.direction} (${PHI_TINH[c.star].name})`).join(', ')}.`,
  ].join(' ')

  return {
    year,
    centerStar,
    grid: cellGrid,
    analysis,
  }
}

/**
 * Calculate monthly Cuu Cung result
 */
export function calculateMonthlyCuuCung(year: number, month: number): CuuCungResult {
  const yearlyCenterStar = getYearCenterStar(year)
  const centerStar = getMonthCenterStar(yearlyCenterStar, month)
  const grid = generateCuuCungGrid(centerStar)

  const cellGrid: CuuCungCell[][] = grid.map((row, r) =>
    row.map((star, c) => {
      const info = PHI_TINH[star]
      return {
        star,
        direction: GRID_DIRECTIONS[r][c],
        isTot: info.isTot,
        meaning: info.description,
      }
    })
  )

  const analysis = `Tháng ${month}/${year}: Trung cung sao ${PHI_TINH[centerStar].name}.`

  return {
    year,
    month,
    centerStar,
    grid: cellGrid,
    analysis,
  }
}
