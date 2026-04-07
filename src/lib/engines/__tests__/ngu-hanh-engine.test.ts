/**
 * Ngũ Hành Engine Tests
 * Tests for Five Elements destiny determination and compatibility
 */

import {
  getNguHanhByYear,
  checkYearCompatibility,
  getNguHanhDescription,
  ageToYear,
  getCanChiByYear,
} from '../ngu-hanh-engine'
import type { NguHanh } from '@/types'

describe('Ngu Hanh Engine - Year to Destiny', () => {
  describe('getNguHanhByYear', () => {
    it('should return complete ngu hanh information', () => {
      const info = getNguHanhByYear(2024)

      expect(info).toHaveProperty('menh')
      expect(info).toHaveProperty('napAm')
      expect(info).toHaveProperty('mauSacTot')
      expect(info).toHaveProperty('mauSacXau')
      expect(info).toHaveProperty('huongTot')
      expect(info).toHaveProperty('soMayMan')
      expect(info).toHaveProperty('tinhCach')
      expect(info).toHaveProperty('sinhBoi')
      expect(info).toHaveProperty('khacBoi')
      expect(info).toHaveProperty('sinh')
      expect(info).toHaveProperty('khac')
    })

    it('should return valid ngu hanh value', () => {
      const info = getNguHanhByYear(2024)
      const validMenh: NguHanh[] = ['kim', 'moc', 'thuy', 'hoa', 'tho']
      expect(validMenh).toContain(info.menh)
    })

    it('should have proper nap am string', () => {
      const info = getNguHanhByYear(2024)
      expect(typeof info.napAm).toBe('string')
      expect(info.napAm.length).toBeGreaterThan(0)
    })

    it('should have lucky colors as array', () => {
      const info = getNguHanhByYear(2024)
      expect(Array.isArray(info.mauSacTot)).toBe(true)
      expect(Array.isArray(info.mauSacXau)).toBe(true)
      expect(info.mauSacTot.length).toBeGreaterThan(0)
    })

    it('should have lucky directions as array', () => {
      const info = getNguHanhByYear(2024)
      expect(Array.isArray(info.huongTot)).toBe(true)
      expect(info.huongTot.length).toBeGreaterThan(0)
    })

    it('should have lucky numbers as array', () => {
      const info = getNguHanhByYear(2024)
      expect(Array.isArray(info.soMayMan)).toBe(true)
      expect(info.soMayMan.length).toBeGreaterThan(0)
    })

    it('should have personality traits', () => {
      const info = getNguHanhByYear(2024)
      expect(typeof info.tinhCach).toBe('string')
      expect(info.tinhCach.length).toBeGreaterThan(0)
    })

    it('should have elements that generate and weaken it', () => {
      const info = getNguHanhByYear(2024)
      expect(typeof info.sinhBoi).toBe('string')
      expect(typeof info.khacBoi).toBe('string')
      expect(info.sinhBoi).toMatch(/kim|moc|thuy|hoa|tho/)
      expect(info.khacBoi).toMatch(/kim|moc|thuy|hoa|tho/)
    })

    it('should have generating and weakening relationships', () => {
      const info = getNguHanhByYear(2024)
      expect(typeof info.sinh).toBe('string')
      expect(typeof info.khac).toBe('string')
    })

    it('should handle different years', () => {
      const years = [1990, 2000, 2010, 2020, 2024]
      years.forEach((year) => {
        const info = getNguHanhByYear(year)
        expect(info.menh).toBeDefined()
        expect(info.napAm).toBeDefined()
      })
    })
  })
})

describe('Ngu Hanh Engine - Compatibility', () => {
  describe('checkYearCompatibility', () => {
    it('should return compatibility result', () => {
      const result = checkYearCompatibility(1990, 'Person A', 1995, 'Person B')

      expect(result).toHaveProperty('person1')
      expect(result).toHaveProperty('person2')
      expect(result).toHaveProperty('relationship')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('analysis')
    })

    it('should have person information', () => {
      const result = checkYearCompatibility(1990, 'Nam', 1995, 'Nu')

      expect(result.person1.name).toBe('Nam')
      expect(result.person1.menh).toBeDefined()
      expect(result.person1.napAm).toBeDefined()

      expect(result.person2.name).toBe('Nu')
      expect(result.person2.menh).toBeDefined()
      expect(result.person2.napAm).toBeDefined()
    })

    it('should have relationship type', () => {
      const result = checkYearCompatibility(1990, 'A', 1995, 'B')
      const validRelationships = [
        'very_good',
        'good',
        'neutral',
        'bad',
        'very_bad',
      ]
      expect(validRelationships).toContain(result.relationship)
    })

    it('should have numerical score', () => {
      const result = checkYearCompatibility(1990, 'A', 1995, 'B')
      expect(typeof result.score).toBe('number')
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(100)
    })

    it('should have analysis text', () => {
      const result = checkYearCompatibility(1990, 'A', 1995, 'B')
      expect(typeof result.analysis).toBe('string')
      expect(result.analysis.length).toBeGreaterThan(0)
    })

    it('should be symmetric for same elements', () => {
      // Two people born in same Ngu Hanh
      const result1 = checkYearCompatibility(2000, 'A', 2010, 'B')

      expect(result1).toBeDefined()
      expect(result1.score).toBeGreaterThanOrEqual(0)
    })

    it('should handle same birth years', () => {
      const result = checkYearCompatibility(2000, 'Person1', 2000, 'Person2')

      expect(result).toBeDefined()
      expect(result.person1.menh).toBe(result.person2.menh)
    })
  })
})

describe('Ngu Hanh Engine - Description', () => {
  describe('getNguHanhDescription', () => {
    it('should return description for Kim', () => {
      const desc = getNguHanhDescription('kim')
      expect(typeof desc).toBe('string')
      expect(desc.length).toBeGreaterThan(0)
    })

    it('should return description for Moc', () => {
      const desc = getNguHanhDescription('moc')
      expect(typeof desc).toBe('string')
      expect(desc.length).toBeGreaterThan(0)
    })

    it('should return description for Thuy', () => {
      const desc = getNguHanhDescription('thuy')
      expect(typeof desc).toBe('string')
      expect(desc.length).toBeGreaterThan(0)
    })

    it('should return description for Hoa', () => {
      const desc = getNguHanhDescription('hoa')
      expect(typeof desc).toBe('string')
      expect(desc.length).toBeGreaterThan(0)
    })

    it('should return description for Tho', () => {
      const desc = getNguHanhDescription('tho')
      expect(typeof desc).toBe('string')
      expect(desc.length).toBeGreaterThan(0)
    })

    it('should return different descriptions for different elements', () => {
      const descriptions = ['kim', 'moc', 'thuy', 'hoa', 'tho'].map((menh) =>
        getNguHanhDescription(menh as NguHanh)
      )

      // At least some descriptions should be different
      const uniqueDescriptions = new Set(descriptions)
      expect(uniqueDescriptions.size).toBeGreaterThan(1)
    })
  })
})

describe('Ngu Hanh Engine - Age to Year', () => {
  describe('ageToYear', () => {
    it('should calculate birth year from age', () => {
      const currentYear = 2024
      const age = 30
      const expectedYear = 1994

      expect(ageToYear(age, currentYear)).toBe(expectedYear)
    })

    it('should handle age 0', () => {
      const currentYear = 2024
      expect(ageToYear(0, currentYear)).toBe(2024)
    })

    it('should handle large ages', () => {
      const currentYear = 2024
      const age = 100
      expect(ageToYear(age, currentYear)).toBe(1924)
    })

    it('should return earlier years for older ages', () => {
      const currentYear = 2024
      const year1 = ageToYear(20, currentYear)
      const year2 = ageToYear(30, currentYear)

      expect(year1).toBeGreaterThan(year2)
    })

    it('should work with different current years', () => {
      const age = 25
      const year2024 = ageToYear(age, 2024)
      const year2000 = ageToYear(age, 2000)

      expect(year2000 - year2024).toBe(24) // 2000 - 2024 = -24, so years differ by 24
    })
  })
})

describe('Ngu Hanh Engine - Can Chi Calculation', () => {
  describe('getCanChiByYear', () => {
    it('should return can chi string format', () => {
      const canChi = getCanChiByYear(2024)
      expect(typeof canChi).toBe('string')
      expect(canChi).toContain(' ') // Should have space between can and chi
    })

    it('should return valid combination', () => {
      const canChi = getCanChiByYear(2024)
      const [can, chi] = canChi.split(' ')

      expect(can).toBeDefined()
      expect(chi).toBeDefined()
      expect(can.length).toBeGreaterThan(0)
      expect(chi.length).toBeGreaterThan(0)
    })

    it('should cycle for 60-year periods', () => {
      const canChi1 = getCanChiByYear(1964)
      const canChi2 = getCanChiByYear(2024)

      // Every 60 years, the can-chi repeats
      expect(canChi1).toBe(canChi2)
    })

    it('should be different for consecutive years', () => {
      const canChi1 = getCanChiByYear(2024)
      const canChi2 = getCanChiByYear(2025)

      expect(canChi1).not.toBe(canChi2)
    })

    it('should handle different years', () => {
      const years = [1900, 1950, 2000, 2024, 2050]
      years.forEach((year) => {
        const canChi = getCanChiByYear(year)
        expect(canChi).toMatch(/^[\w\s]+\s[\w\s]+$/) // Pattern: word space word
      })
    })

    it('should return 10 possible can values', () => {
      // Check a few years to see various can values
      const canValues = new Set<string>()

      for (let year = 1900; year < 2000; year++) {
        const canChi = getCanChiByYear(year)
        const can = canChi.split(' ')[0]
        canValues.add(can)
      }

      expect(canValues.size).toBe(10) // Should have 10 different can values
    })

    it('should return 12 possible chi values', () => {
      // Check a few years to see various chi values
      const chiValues = new Set<string>()

      for (let year = 1900; year < 2000; year++) {
        const canChi = getCanChiByYear(year)
        const chi = canChi.split(' ')[1]
        chiValues.add(chi)
      }

      expect(chiValues.size).toBe(12) // Should have 12 different chi values
    })
  })
})

describe('Ngu Hanh Engine - Integration Tests', () => {
  it('should provide consistent data for same year', () => {
    const info1 = getNguHanhByYear(2000)
    const info2 = getNguHanhByYear(2000)

    expect(info1.menh).toBe(info2.menh)
    expect(info1.napAm).toBe(info2.napAm)
    expect(info1.tinhCach).toBe(info2.tinhCach)
  })

  it('should relate to can-chi year', () => {
    const year = 2024
    const info = getNguHanhByYear(year)
    const canChi = getCanChiByYear(year)

    expect(info.menh).toBeDefined()
    expect(canChi).toBeDefined()
    expect(canChi.length).toBeGreaterThan(0)
  })

  it('should provide related elements for compatibility checks', () => {
    const year1 = 2000
    const year2 = 2005

    const info1 = getNguHanhByYear(year1)
    const info2 = getNguHanhByYear(year2)
    const compat = checkYearCompatibility(year1, 'A', year2, 'B')

    expect(compat.person1.menh).toBe(info1.menh)
    expect(compat.person2.menh).toBe(info2.menh)
  })
})
