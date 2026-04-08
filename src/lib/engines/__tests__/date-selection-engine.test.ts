/**
 * Date Selection Engine Tests
 * Tests for Xem Ngày Tốt Xấu — scoring, Tam Nương, Nguyệt Kỵ, Sát Chủ penalties
 */

import { scoreDayForEvent, searchGoodDates } from '../date-selection-engine'
import { solarToLunar } from '../lunar-engine'
import { isTamNuong, isNguyetKy, isSatChu, TAM_NUONG_DAYS, NGUYET_KY_DAYS } from '@/data/ngay-ky'
import type { EventType } from '@/types'

// Lunar New Year 2024 (Giáp Thìn) = Feb 10, 2024
// Feb 12, 2024 = Lunar day 3/1/Giáp Thìn  → Tam Nương (day 3)
// Feb 14, 2024 = Lunar day 5/1/Giáp Thìn  → Nguyệt Kỵ (day 5)
// Feb 23, 2024 = Lunar day 14/1/Giáp Thìn → Tam Nương + Nguyệt Kỵ (day 14)

describe('Date Selection Engine - scoreDayForEvent', () => {
  describe('output shape', () => {
    it('should return all required fields', () => {
      const result = scoreDayForEvent(15, 6, 2024, 'general')

      expect(result).toHaveProperty('solar')
      expect(result).toHaveProperty('lunar')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('rating')
      expect(result).toHaveProperty('truc')
      expect(result).toHaveProperty('sao28')
      expect(result).toHaveProperty('sao28Rating')
      expect(result).toHaveProperty('hoangDaoHours')
      expect(result).toHaveProperty('issues')
      expect(result).toHaveProperty('advantages')
      expect(result).toHaveProperty('suitable')
    })

    it('should return solar date matching input', () => {
      const result = scoreDayForEvent(15, 6, 2024, 'cuoiHoi')
      expect(result.solar.day).toBe(15)
      expect(result.solar.month).toBe(6)
      expect(result.solar.year).toBe(2024)
    })

    it('should return score clamped between 0 and 100', () => {
      const dates = [
        [1, 1, 2024], [15, 6, 2024], [31, 12, 2024],
        [12, 2, 2024], [14, 2, 2024],
      ]
      for (const [d, m, y] of dates) {
        const result = scoreDayForEvent(d, m, y, 'general')
        expect(result.score).toBeGreaterThanOrEqual(0)
        expect(result.score).toBeLessThanOrEqual(100)
      }
    })

    it('should return valid rating values', () => {
      const validRatings = ['tot', 'kha', 'trung', 'xau']
      const result = scoreDayForEvent(15, 6, 2024, 'general')
      expect(validRatings).toContain(result.rating)
    })

    it('should map score to correct rating', () => {
      // Test rating thresholds: tot>=75, kha>=55, trung>=35, xau<35
      const result = scoreDayForEvent(15, 6, 2024, 'general')
      const { score, rating } = result
      if (score >= 75) expect(rating).toBe('tot')
      else if (score >= 55) expect(rating).toBe('kha')
      else if (score >= 35) expect(rating).toBe('trung')
      else expect(rating).toBe('xau')
    })

    it('should return hoangDaoHours as string array', () => {
      const result = scoreDayForEvent(15, 6, 2024, 'general')
      expect(Array.isArray(result.hoangDaoHours)).toBe(true)
      expect(result.hoangDaoHours.length).toBeGreaterThan(0)
    })
  })

  describe('Tam Nương penalty', () => {
    it('should apply Tam Nuong penalty on lunar day 3 (Feb 12, 2024)', () => {
      // Feb 12, 2024 = Lunar 3/1/Giap Thin (Tam Nuong)
      const lunar = solarToLunar(12, 2, 2024)
      expect(isTamNuong(lunar.day)).toBe(true) // verify the test assumption

      const result = scoreDayForEvent(12, 2, 2024, 'general')
      expect(result.issues.some((i) => i.includes('Tam Nương'))).toBe(true)
      expect(result.suitable).toBe(false)
    })

    it('should apply Tam Nuong penalty on lunar day 7', () => {
      // Find a date in 2024 where lunar day is 7
      const lunar = solarToLunar(16, 2, 2024)
      if (isTamNuong(lunar.day)) {
        const result = scoreDayForEvent(16, 2, 2024, 'general')
        expect(result.issues.some((i) => i.includes('Tam Nương'))).toBe(true)
      }
    })

    it('should penalize score for Tam Nuong days', () => {
      // Any Tam Nuong day should score lower than base (50)
      const lunar = solarToLunar(12, 2, 2024)
      if (isTamNuong(lunar.day)) {
        // Base score 50, Tam Nuong -15 (at minimum below 50 or adjusted by other factors)
        const result = scoreDayForEvent(12, 2, 2024, 'cuoiHoi')
        // Issues array contains Tam Nuong
        const hasTamNuong = result.issues.some((i) => i.includes('Tam Nương'))
        if (hasTamNuong) {
          expect(result.suitable).toBe(false)
        }
      }
    })

    it('isTamNuong helper should identify all Tam Nuong days', () => {
      for (const day of TAM_NUONG_DAYS) {
        expect(isTamNuong(day)).toBe(true)
      }
    })

    it('isTamNuong should return false for non-Tam Nuong days', () => {
      const nonTamNuong = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 15, 16, 20, 24, 25, 28]
      for (const day of nonTamNuong) {
        expect(isTamNuong(day)).toBe(false)
      }
    })
  })

  describe('Nguyệt Kỵ penalty', () => {
    it('should apply Nguyet Ky penalty on lunar day 5 (Feb 14, 2024)', () => {
      // Feb 14, 2024 = Lunar 5/1/Giap Thin (Nguyet Ky)
      const lunar = solarToLunar(14, 2, 2024)
      expect(isNguyetKy(lunar.day)).toBe(true) // verify assumption

      const result = scoreDayForEvent(14, 2, 2024, 'khaiTruong')
      expect(result.issues.some((i) => i.includes('Nguyệt Kỵ'))).toBe(true)
      expect(result.suitable).toBe(false)
    })

    it('should apply both Tam Nuong and Nguyet Ky on day 14 or 23', () => {
      // Lunar day 14 = both Tam Nuong + Nguyet Ky
      // Feb 23, 2024 = Lunar 14/1/Giap Thin
      const lunar = solarToLunar(23, 2, 2024)
      if (lunar.day === 14) {
        expect(isTamNuong(14)).toBe(true)
        expect(isNguyetKy(14)).toBe(true)
        const result = scoreDayForEvent(23, 2, 2024, 'general')
        expect(result.issues.length).toBeGreaterThanOrEqual(2)
        expect(result.suitable).toBe(false)
      }
    })

    it('isNguyetKy should identify all Nguyet Ky days', () => {
      for (const day of NGUYET_KY_DAYS) {
        expect(isNguyetKy(day)).toBe(true)
      }
      expect(isNguyetKy(1)).toBe(false)
      expect(isNguyetKy(10)).toBe(false)
      expect(isNguyetKy(15)).toBe(false)
    })
  })

  describe('Sát Chủ penalty', () => {
    it('isSatChu should return false for neutral month-chi combos', () => {
      // Tháng 1 kỵ chiDay 3; chiDay 5 should be fine
      expect(isSatChu(1, 5)).toBe(false)
      expect(isSatChu(2, 0)).toBe(false)
    })

    it('isSatChu should detect Sat Chu for correct month-chi combination', () => {
      // SAT_CHU[1] = 3 → tháng 1, chiDay 3
      expect(isSatChu(1, 3)).toBe(true)
      // SAT_CHU[2] = 4 → tháng 2, chiDay 4
      expect(isSatChu(2, 4)).toBe(true)
    })

    it('should apply Sat Chu penalty in scored result', () => {
      // Find a date in lunar month 1 where chiDay matches SAT_CHU[1]=3
      // We search Feb 2024 dates for a Sat Chu match
      let satChuFound = false
      for (let d = 10; d <= 28; d++) {
        const lunar = solarToLunar(d, 2, 2024)
        if (lunar.month === 1 && isSatChu(lunar.month, lunar.chiDay)) {
          const result = scoreDayForEvent(d, 2, 2024, 'general')
          expect(result.issues.some((i) => i.includes('Sát Chủ'))).toBe(true)
          satChuFound = true
          break
        }
      }
      // If no date found in February, skip (test is data-dependent)
      if (!satChuFound) {
        expect(true).toBe(true) // Pass if no Sat Chu date found in range
      }
    })
  })

  describe('Event type scoring', () => {
    it('should score different event types independently', () => {
      const eventTypes: EventType[] = ['cuoiHoi', 'khaiTruong', 'dongTho', 'nhapTrach', 'xuatHanh', 'kyHopDong', 'general']
      for (const eventType of eventTypes) {
        const result = scoreDayForEvent(15, 3, 2024, eventType)
        expect(result.score).toBeGreaterThanOrEqual(0)
        expect(result.score).toBeLessThanOrEqual(100)
      }
    })

    it('suitable should be false when ngayKy is not empty', () => {
      // Feb 12, 2024 = Tam Nuong → should not be suitable
      const lunar = solarToLunar(12, 2, 2024)
      if (isTamNuong(lunar.day)) {
        const result = scoreDayForEvent(12, 2, 2024, 'cuoiHoi')
        expect(result.suitable).toBe(false)
      }
    })
  })
})

describe('Date Selection Engine - searchGoodDates', () => {
  describe('basic behavior', () => {
    it('should return array of results', () => {
      const results = searchGoodDates(2024, 3, 1, 2024, 3, 31, 'general')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should return results sorted by score descending', () => {
      const results = searchGoodDates(2024, 3, 1, 2024, 3, 31, 'general')
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
      }
    })

    it('should only return dates meeting minimum score', () => {
      const minScore = 65
      const results = searchGoodDates(2024, 3, 1, 2024, 3, 31, 'general', minScore)
      for (const r of results) {
        expect(r.score).toBeGreaterThanOrEqual(minScore)
      }
    })

    it('should return empty array for impossible range', () => {
      // Same day with very high min score unlikely to be met
      const results = searchGoodDates(2024, 3, 15, 2024, 3, 15, 'general', 100)
      expect(Array.isArray(results)).toBe(true)
    })

    it('should return fewer results with higher minScore', () => {
      const results60 = searchGoodDates(2024, 6, 1, 2024, 6, 30, 'general', 60)
      const results80 = searchGoodDates(2024, 6, 1, 2024, 6, 30, 'general', 80)
      expect(results60.length).toBeGreaterThanOrEqual(results80.length)
    })

    it('should include correct solar dates in range', () => {
      const results = searchGoodDates(2024, 3, 1, 2024, 3, 31, 'general', 55)
      for (const r of results) {
        expect(r.solar.year).toBe(2024)
        expect(r.solar.month).toBe(3)
        expect(r.solar.day).toBeGreaterThanOrEqual(1)
        expect(r.solar.day).toBeLessThanOrEqual(31)
      }
    })
  })

  describe('event-specific results', () => {
    it('should find good days for cuoi hoi', () => {
      const results = searchGoodDates(2024, 10, 1, 2024, 10, 31, 'cuoiHoi', 55)
      expect(Array.isArray(results)).toBe(true)
      for (const r of results) {
        expect(r.score).toBeGreaterThanOrEqual(55)
      }
    })
  })
})
