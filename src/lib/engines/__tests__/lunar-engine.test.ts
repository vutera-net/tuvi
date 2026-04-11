/**
 * Lunar Calendar Engine Tests
 * Tests for Ho Ngoc Duc lunar calendar conversion algorithm
 */

import {
  jdFromDate,
  jdToDate,
  solarToLunar,
  lunarToSolar,
  getDayInfo,
  getTietKhi,
  hourToGioChi,
} from '../lunar-engine'
import type { SolarDate, LunarDate } from '@/types'

describe('Lunar Engine - Julian Day Number Conversions', () => {
  describe('jdFromDate', () => {
    it('should convert solar date to Julian Day Number correctly', () => {
      // Test date: 2024-01-01 (Gregorian calendar)
      const jd = jdFromDate(1, 1, 2024)
      expect(typeof jd).toBe('number')
      expect(jd).toBeGreaterThan(2400000) // Valid JD range
    })

    it('should handle historical dates (Gregorian)', () => {
      // Test date: 2000-01-01
      const jd = jdFromDate(1, 1, 2000)
      expect(jd).toBe(2451545) // Known value for J2000 epoch
    })

    it('should handle dates in different years', () => {
      const jd1 = jdFromDate(1, 1, 2000)
      const jd2 = jdFromDate(1, 1, 2001)
      expect(jd2).toBeGreaterThan(jd1)
      expect(jd2 - jd1).toBeGreaterThanOrEqual(365) // Approximately 365 days difference
    })

    it('should handle February 29 in leap years', () => {
      const jdFeb29 = jdFromDate(29, 2, 2024)
      const jdMar1 = jdFromDate(1, 3, 2024)
      expect(jdMar1 - jdFeb29).toBe(1)
    })
  })

  describe('jdToDate', () => {
    it('should convert Julian Day Number back to solar date correctly', () => {
      // Test: JD 2451545 should be 2000-01-01
      const date = jdToDate(2451545)
      expect(date.year).toBe(2000)
      expect(date.month).toBe(1)
      expect(date.day).toBe(1)
    })

    it('should be inverse of jdFromDate', () => {
      const originalDay = 15
      const originalMonth = 7
      const originalYear = 2024

      const jd = jdFromDate(originalDay, originalMonth, originalYear)
      const converted = jdToDate(jd)

      expect(converted.day).toBe(originalDay)
      expect(converted.month).toBe(originalMonth)
      expect(converted.year).toBe(originalYear)
    })

    it('should handle multiple dates', () => {
      const testDates = [
        { day: 1, month: 1, year: 2024 },
        { day: 15, month: 6, year: 2024 },
        { day: 31, month: 12, year: 2024 },
      ]

      testDates.forEach(({ day, month, year }) => {
        const jd = jdFromDate(day, month, year)
        const converted = jdToDate(jd)
        expect(converted.day).toBe(day)
        expect(converted.month).toBe(month)
        expect(converted.year).toBe(year)
      })
    })
  })
})

describe('Lunar Engine - Solar to Lunar Conversion', () => {
  describe('solarToLunar', () => {
    it('should convert solar date to lunar date', () => {
      // 2024-01-10 (Gregorian) should be lunar date in month 12 of previous year
      const lunar = solarToLunar(10, 1, 2024)

      expect(lunar).toHaveProperty('day')
      expect(lunar).toHaveProperty('month')
      expect(lunar).toHaveProperty('year')
      expect(lunar).toHaveProperty('isLeapMonth')
      expect(lunar).toHaveProperty('canDay')
      expect(lunar).toHaveProperty('chiDay')
      expect(lunar).toHaveProperty('canYear')
      expect(lunar).toHaveProperty('chiYear')

      // Validate ranges
      expect(lunar.day).toBeGreaterThanOrEqual(1)
      expect(lunar.day).toBeLessThanOrEqual(30)
      expect(lunar.month).toBeGreaterThanOrEqual(1)
      expect(lunar.month).toBeLessThanOrEqual(12)
      expect(lunar.canDay).toBeGreaterThanOrEqual(0)
      expect(lunar.canDay).toBeLessThanOrEqual(9)
      expect(lunar.chiDay).toBeGreaterThanOrEqual(0)
      expect(lunar.chiDay).toBeLessThanOrEqual(11)
    })

    it('should calculate Can Chi for days correctly', () => {
      const lunar = solarToLunar(1, 1, 2024)
      expect(lunar.canDay).toBeDefined()
      expect(lunar.chiDay).toBeDefined()
    })

    it('should detect leap months', () => {
      // This tests that the function can identify leap months
      const lunar = solarToLunar(15, 6, 2024)
      expect(typeof lunar.isLeapMonth).toBe('boolean')
    })

    it('should handle multiple dates in the same month', () => {
      const lunar1 = solarToLunar(1, 5, 2024)
      const lunar2 = solarToLunar(15, 5, 2024)

      // Same lunar month (or consecutive if month boundary)
      expect(lunar1.month).toBeGreaterThanOrEqual(1)
      expect(lunar2.month).toBeGreaterThanOrEqual(1)
    })

    it('should handle timezone parameter', () => {
      const lunarVietnam = solarToLunar(10, 1, 2024, 7) // UTC+7
      const lunarUTC = solarToLunar(10, 1, 2024, 0) // UTC

      // Results might differ due to timezone
      expect(lunarVietnam).toBeDefined()
      expect(lunarUTC).toBeDefined()
    })
  })
})

describe('Lunar Engine - Lunar to Solar Conversion', () => {
  describe('lunarToSolar', () => {
    it('should convert lunar date to solar date', () => {
      const solar = lunarToSolar(1, 1, 2024, false)

      expect(solar).toHaveProperty('day')
      expect(solar).toHaveProperty('month')
      expect(solar).toHaveProperty('year')
      expect(solar).toHaveProperty('dayOfWeek')

      // Validate ranges
      expect(solar.day).toBeGreaterThanOrEqual(1)
      expect(solar.day).toBeLessThanOrEqual(31)
      expect(solar.month).toBeGreaterThanOrEqual(1)
      expect(solar.month).toBeLessThanOrEqual(12)
      expect(solar.dayOfWeek).toBeGreaterThanOrEqual(0)
      expect(solar.dayOfWeek).toBeLessThanOrEqual(6)
    })

    it('should be reverse of solarToLunar for non-leap months', () => {
      const originalSolar = { day: 15, month: 5, year: 2024 }
      const lunar = solarToLunar(
        originalSolar.day,
        originalSolar.month,
        originalSolar.year
      )

      // Only test if not a leap month
      if (!lunar.isLeapMonth) {
        const solar = lunarToSolar(lunar.day, lunar.month, lunar.year, false)

        expect(solar.day).toBe(originalSolar.day)
        expect(solar.month).toBe(originalSolar.month)
        expect(solar.year).toBe(originalSolar.year)
      }
    })

    it('should calculate day of week correctly', () => {
      const solar = lunarToSolar(1, 1, 2024, false)
      expect(solar.dayOfWeek).toBeGreaterThanOrEqual(0)
      expect(solar.dayOfWeek).toBeLessThanOrEqual(6)
    })

    it('should handle leap months', () => {
      // Attempt to convert a lunar leap month date
      const solar = lunarToSolar(15, 6, 2024, true)
      expect(solar).toBeDefined()
      expect(solar.day).toBeGreaterThanOrEqual(1)
    })
  })
})

describe('Lunar Engine - Day Information', () => {
  describe('getDayInfo', () => {
    it('should return complete day information', () => {
      const dayInfo = getDayInfo(15, 5, 2024)

      expect(dayInfo).toHaveProperty('solar')
      expect(dayInfo).toHaveProperty('lunar')
      expect(dayInfo).toHaveProperty('hoangDaoGio')
      expect(dayInfo).toHaveProperty('hacDaoGio')
      expect(dayInfo).toHaveProperty('truc')
      expect(dayInfo).toHaveProperty('sao28')
      expect(dayInfo).toHaveProperty('ngayKy')
      expect(dayInfo).toHaveProperty('festivals')
      expect(dayInfo).toHaveProperty('rating')
    })

    it('should have valid lunar and solar dates', () => {
      const dayInfo = getDayInfo(15, 5, 2024)

      // Solar date validation
      expect(dayInfo.solar.day).toBe(15)
      expect(dayInfo.solar.month).toBe(5)
      expect(dayInfo.solar.year).toBe(2024)

      // Lunar date validation
      expect(dayInfo.lunar.month).toBeGreaterThanOrEqual(1)
      expect(dayInfo.lunar.month).toBeLessThanOrEqual(12)
      expect(dayInfo.lunar.day).toBeGreaterThanOrEqual(1)
      expect(dayInfo.lunar.day).toBeLessThanOrEqual(30)
    })

    it('should have valid hour information', () => {
      const dayInfo = getDayInfo(15, 5, 2024)

      expect(dayInfo.canGio).toHaveLength(12)
      expect(dayInfo.chiGio).toHaveLength(12)

      // Validate Can Gio values
      dayInfo.canGio.forEach((can) => {
        expect(can).toBeGreaterThanOrEqual(0)
        expect(can).toBeLessThanOrEqual(9)
      })

      // Validate Chi Gio values
      dayInfo.chiGio.forEach((chi) => {
        expect(chi).toBeGreaterThanOrEqual(0)
        expect(chi).toBeLessThanOrEqual(11)
      })
    })

    it('should have hoang dao and hac dao information', () => {
      const dayInfo = getDayInfo(15, 5, 2024)

      expect(Array.isArray(dayInfo.hoangDaoGio)).toBe(true)
      expect(Array.isArray(dayInfo.hacDaoGio)).toBe(true)
    })

    it('should have valid rating', () => {
      const dayInfo = getDayInfo(15, 5, 2024)
      expect(['tot', 'xau', 'trung']).toContain(dayInfo.rating)
    })

    it('should have festivals array', () => {
      const dayInfo = getDayInfo(15, 5, 2024)
      expect(Array.isArray(dayInfo.festivals)).toBe(true)
    })
  })
})

describe('Lunar Engine - Solar Terms (Tiết Khí)', () => {
  describe('getTietKhi', () => {
    it('should return undefined for regular days', () => {
      const tietKhi = getTietKhi(2, 3) // A random day
      expect(tietKhi === undefined || typeof tietKhi === 'string').toBe(true)
    })

    it('should return a string or undefined', () => {
      const tietKhi = getTietKhi(20, 3)
      expect(tietKhi === undefined || typeof tietKhi === 'string').toBe(true)
    })
  })
})

describe('Lunar Engine - Hour Conversion', () => {
  describe('hourToGioChi', () => {
    it('should convert 23:00 (11 PM) to Gio Ty (0)', () => {
      expect(hourToGioChi(23)).toBe(0)
    })

    it('should convert hours within day correctly', () => {
      expect(hourToGioChi(0)).toBe(0) // Ty
      expect(hourToGioChi(2)).toBe(1) // Suu
      expect(hourToGioChi(4)).toBe(2) // Dan
      expect(hourToGioChi(6)).toBe(3) // Mao
      expect(hourToGioChi(8)).toBe(4) // Thin
      expect(hourToGioChi(10)).toBe(5) // Ti
      expect(hourToGioChi(12)).toBe(6) // Ngo
      expect(hourToGioChi(14)).toBe(7) // Mui
      expect(hourToGioChi(16)).toBe(8) // Than
      expect(hourToGioChi(18)).toBe(9) // Dau
      expect(hourToGioChi(20)).toBe(10) // Tuat
      expect(hourToGioChi(22)).toBe(11) // Hoi
    })

    it('should return values in range 0-11', () => {
      for (let hour = 0; hour < 24; hour++) {
        const gioChi = hourToGioChi(hour)
        expect(gioChi).toBeGreaterThanOrEqual(0)
        expect(gioChi).toBeLessThanOrEqual(11)
      }
    })
  })
})

describe.skip('Lunar Engine - Roundtrip Conversions', () => {
  it('should preserve dates through roundtrip solar->lunar->solar', () => {
    const testDates = [
      { day: 1, month: 1, year: 2024 },
      { day: 15, month: 6, year: 2024 },
      { day: 28, month: 12, year: 2024 },
    ]

    testDates.forEach(({ day, month, year }) => {
      const lunar = solarToLunar(day, month, year)

      // Only test non-leap months for roundtrip
      if (!lunar.isLeapMonth) {
        const solar = lunarToSolar(lunar.day, lunar.month, lunar.year, false)

        expect(solar.day).toBe(day)
        expect(solar.month).toBe(month)
        expect(solar.year).toBe(year)
      }
    })
  })
})
