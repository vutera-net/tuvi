/**
 * Cửu Cung Phi Tinh Engine Tests
 * Tests for flying star grid generation, year/month center stars, and analysis
 */

import { calculateYearlyCuuCung, calculateMonthlyCuuCung } from '../cuu-cung-engine'
import {
  getYearCenterStar,
  getMonthCenterStar,
  generateCuuCungGrid,
  PHI_TINH,
} from '@/data/phongthuy/cuu-cung'

// Key formulas:
// getYearCenterStar: base=8, baseYear=2004
//   centerStar = ((8 - (year-2004)%9 + 9 - 1) % 9) + 1
// 2004 → 8, 2005 → 7, 2006 → 6, ..., 2012 → 9, 2013 → 8
// 2024 → diff=20, 20%9=2, (8-2+9-1)%9+1 = 14%9+1 = 5+1 = 6
// 2025 → diff=21, 21%9=3, (8-3+9-1)%9+1 = 13%9+1 = 4+1 = 5

describe('Cửu Cung - PHI_TINH data', () => {
  it('should define all 9 stars', () => {
    for (let i = 1; i <= 9; i++) {
      expect(PHI_TINH[i]).toBeDefined()
      expect(PHI_TINH[i].number).toBe(i)
    }
  })

  it('each star should have required fields', () => {
    for (let i = 1; i <= 9; i++) {
      const star = PHI_TINH[i]
      expect(star).toHaveProperty('name')
      expect(star).toHaveProperty('element')
      expect(star).toHaveProperty('isTot')
      expect(star).toHaveProperty('description')
      expect(star).toHaveProperty('effects')
      expect(Array.isArray(star.effects)).toBe(true)
    }
  })

  it('good stars should be 1, 4, 6, 8, 9', () => {
    const goodStars = [1, 4, 6, 8, 9]
    const badStars = [2, 3, 5, 7]
    for (const s of goodStars) {
      expect(PHI_TINH[s].isTot).toBe(true)
    }
    for (const s of badStars) {
      expect(PHI_TINH[s].isTot).toBe(false)
    }
  })
})

describe('Cửu Cung - getYearCenterStar', () => {
  it('2004 should have center star 8 (base year)', () => {
    expect(getYearCenterStar(2004)).toBe(8)
  })

  it('2024 should have center star 6', () => {
    // diff=20, 20%9=2, (8-2+8)%9+1 = 14%9+1 = 6
    expect(getYearCenterStar(2024)).toBe(6)
  })

  it('2025 should have center star 5', () => {
    // diff=21, 21%9=3, (8-3+8)%9+1 = 13%9+1 = 5
    expect(getYearCenterStar(2025)).toBe(5)
  })

  it('2005 should have center star 7', () => {
    // diff=1, 1%9=1, (8-1+8)%9+1 = 15%9+1 = 7
    expect(getYearCenterStar(2005)).toBe(7)
  })

  it('should return values in range [1-9] for any year', () => {
    for (let y = 2000; y <= 2030; y++) {
      const star = getYearCenterStar(y)
      expect(star).toBeGreaterThanOrEqual(1)
      expect(star).toBeLessThanOrEqual(9)
    }
  })

  it('should cycle with period 9', () => {
    // Stars should cycle every 9 years
    for (let y = 2004; y < 2013; y++) {
      expect(getYearCenterStar(y)).toBe(getYearCenterStar(y + 9))
    }
  })
})

describe('Cửu Cung - generateCuuCungGrid', () => {
  it('should return 3x3 grid', () => {
    const grid = generateCuuCungGrid(5)
    expect(grid).toHaveLength(3)
    for (const row of grid) {
      expect(row).toHaveLength(3)
    }
  })

  it('standard center=5 should produce Lạc Thư grid', () => {
    // Lạc Thư: [[4,9,2],[3,5,7],[8,1,6]]
    const grid = generateCuuCungGrid(5)
    expect(grid[0]).toEqual([4, 9, 2])
    expect(grid[1]).toEqual([3, 5, 7])
    expect(grid[2]).toEqual([8, 1, 6])
  })

  it('each star 1-9 should appear exactly once', () => {
    for (let center = 1; center <= 9; center++) {
      const grid = generateCuuCungGrid(center)
      const flat = grid.flat()
      expect(flat.sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
  })

  it('center position [1][1] should match center star', () => {
    for (let center = 1; center <= 9; center++) {
      const grid = generateCuuCungGrid(center)
      expect(grid[1][1]).toBe(center)
    }
  })

  it('center=6 (2024) should have 6 in center', () => {
    const grid = generateCuuCungGrid(6)
    expect(grid[1][1]).toBe(6)
  })
})

describe('Cửu Cung - getMonthCenterStar', () => {
  it('should return value in range [1-9]', () => {
    for (let month = 1; month <= 12; month++) {
      const star = getMonthCenterStar(8, month)
      expect(star).toBeGreaterThanOrEqual(1)
      expect(star).toBeLessThanOrEqual(9)
    }
  })

  it('different months should generally have different center stars', () => {
    const stars = Array.from({ length: 9 }, (_, i) => getMonthCenterStar(8, i + 1))
    const unique = new Set(stars)
    expect(unique.size).toBeGreaterThan(1)
  })
})

describe('Cửu Cung - calculateYearlyCuuCung', () => {
  it('should return all required fields', () => {
    const result = calculateYearlyCuuCung(2024)
    expect(result).toHaveProperty('year')
    expect(result).toHaveProperty('centerStar')
    expect(result).toHaveProperty('grid')
    expect(result).toHaveProperty('analysis')
  })

  it('year field should match input', () => {
    expect(calculateYearlyCuuCung(2024).year).toBe(2024)
    expect(calculateYearlyCuuCung(2025).year).toBe(2025)
  })

  it('2024 → centerStar 6', () => {
    expect(calculateYearlyCuuCung(2024).centerStar).toBe(6)
  })

  it('2025 → centerStar 5', () => {
    expect(calculateYearlyCuuCung(2025).centerStar).toBe(5)
  })

  it('grid should be 3x3 of CuuCungCell objects', () => {
    const { grid } = calculateYearlyCuuCung(2024)
    expect(grid).toHaveLength(3)
    for (const row of grid) {
      expect(row).toHaveLength(3)
      for (const cell of row) {
        expect(cell).toHaveProperty('star')
        expect(cell).toHaveProperty('direction')
        expect(cell).toHaveProperty('isTot')
        expect(cell).toHaveProperty('meaning')
      }
    }
  })

  it('each star 1-9 should appear exactly once in grid', () => {
    const { grid } = calculateYearlyCuuCung(2024)
    const stars = grid.flat().map((c) => c.star).sort((a, b) => a - b)
    expect(stars).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('isTot of each cell should match PHI_TINH definition', () => {
    const { grid } = calculateYearlyCuuCung(2024)
    for (const row of grid) {
      for (const cell of row) {
        expect(cell.isTot).toBe(PHI_TINH[cell.star].isTot)
      }
    }
  })

  it('analysis should be non-empty string', () => {
    const { analysis } = calculateYearlyCuuCung(2024)
    expect(typeof analysis).toBe('string')
    expect(analysis.length).toBeGreaterThan(0)
  })

  it('analysis should mention the year', () => {
    const { analysis } = calculateYearlyCuuCung(2024)
    expect(analysis).toContain('2024')
  })
})

describe('Cửu Cung - calculateMonthlyCuuCung', () => {
  it('should return all required fields', () => {
    const result = calculateMonthlyCuuCung(2024, 6)
    expect(result).toHaveProperty('year')
    expect(result).toHaveProperty('month')
    expect(result).toHaveProperty('centerStar')
    expect(result).toHaveProperty('grid')
    expect(result).toHaveProperty('analysis')
  })

  it('year and month should match input', () => {
    const result = calculateMonthlyCuuCung(2024, 6)
    expect(result.year).toBe(2024)
    expect(result.month).toBe(6)
  })

  it('centerStar should be in [1-9]', () => {
    for (let m = 1; m <= 12; m++) {
      const result = calculateMonthlyCuuCung(2024, m)
      expect(result.centerStar).toBeGreaterThanOrEqual(1)
      expect(result.centerStar).toBeLessThanOrEqual(9)
    }
  })

  it('grid should contain all 9 stars exactly once', () => {
    const { grid } = calculateMonthlyCuuCung(2024, 3)
    const stars = grid.flat().map((c) => c.star).sort((a, b) => a - b)
    expect(stars).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('different months should produce different center stars', () => {
    const stars = Array.from({ length: 6 }, (_, i) =>
      calculateMonthlyCuuCung(2024, i + 1).centerStar
    )
    const unique = new Set(stars)
    expect(unique.size).toBeGreaterThan(1)
  })
})
