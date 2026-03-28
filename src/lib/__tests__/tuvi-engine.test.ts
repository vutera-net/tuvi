/**
 * Tu Vi Engine Tests
 * Tests for Tu Vi Dau So chart calculation and interpretation
 */

import { createTuViChart, getChartInterpretation } from '@/lib/engines/tuvi-engine'
import { getStarMeaning, getMeaningsForStar, getMeaningsForPalace } from '@/data/tuvi/star-meanings'

describe('Tu Vi Engine', () => {
  describe('Star Meanings', () => {
    it('should have meanings for all 14 main stars', () => {
      const stars = ['Tu Vi', 'Thien Co', 'Thai Duong', 'Vu Khuc', 'Thien Dong', 'Liem Trinh', 'Thien Phu', 'Thai Am', 'Tham Lang', 'Cu Mon', 'Thien Tuong', 'Thien Luong', 'That Sat', 'Pha Quan']

      stars.forEach((star) => {
        const meanings = getMeaningsForStar(star)
        expect(meanings.length).toBe(12) // 12 palaces
        expect(meanings[0].starName).toBe(star)
      })
    })

    it('should have all 12 palaces covered', () => {
      const palaces = ['Menh', 'Huong De', 'Phu The', 'Tu Tuc', 'Tai Bach', 'Tat Ach', 'Thien Di', 'No Boc', 'Quan Loc', 'Dien Trach', 'Phuc Duc', 'Phu Mau']

      palaces.forEach((palace) => {
        const meanings = getMeaningsForPalace(palace)
        expect(meanings.length).toBeGreaterThan(0) // Should have meanings in each palace
        expect(meanings[0].palaceName).toBe(palace)
      })
    })

    it('should have meaning structure with positive, negative, summary', () => {
      const meaning = getStarMeaning('Tu Vi', 'Menh')
      expect(meaning).toBeDefined()
      expect(meaning?.positive).toBeDefined()
      expect(meaning?.negative).toBeDefined()
      expect(meaning?.summary).toBeDefined()
      expect(meaning?.positive.length).toBeGreaterThan(0)
      expect(meaning?.negative.length).toBeGreaterThan(0)
      expect(meaning?.summary.length).toBeGreaterThan(0)
    })

    it('should provide meaningful interpretations', () => {
      const meaning = getStarMeaning('Thien Co', 'Quan Loc')
      expect(meaning?.summary).toContain('career') // Should mention career for Quan Loc (career palace)
    })
  })

  describe('Chart Creation', () => {
    it('should create chart with valid birth data', () => {
      const chart = createTuViChart({
        name: 'Test Person',
        gender: 'male',
        birthDate: { day: 15, month: 5, year: 1990, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 7,
      })

      expect(chart).toBeDefined()
      expect(chart.userInfo.name).toBe('Test Person')
      expect(chart.userInfo.gender).toBe('male')
      expect(chart.palaces.length).toBe(12)
    })

    it('should have all 12 palaces in chart', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'female',
        birthDate: { day: 1, month: 1, year: 2000, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 0,
      })

      const palaceNames = chart.palaces.map((p) => p.name)
      expect(palaceNames).toContain('Menh')
      expect(palaceNames).toContain('Huong De')
      expect(palaceNames).toContain('Phu The')
      expect(palaceNames).toContain('Quan Loc')
      expect(palaceNames.length).toBe(12)
    })

    it('should assign main stars to palaces', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'male',
        birthDate: { day: 10, month: 6, year: 1985, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 4,
      })

      // Menh palace should have main stars
      const menhPalace = chart.palaces.find((p) => p.name === 'Menh')
      expect(menhPalace?.mainStars.length).toBeGreaterThan(0)
    })

    it('should have star brightness information', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'female',
        birthDate: { day: 20, month: 3, year: 1992, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 10,
      })

      const palace = chart.palaces[0]
      palace.mainStars.forEach((star) => {
        expect(star.brightness).toMatch(/mieu|vuong|dacDia|binhHoa|hamDia/)
        expect(typeof star.isGood).toBe('boolean')
      })
    })
  })

  describe('Chart Interpretation', () => {
    it('should provide interpretation for chart', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'male',
        birthDate: { day: 5, month: 5, year: 1990, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 6,
      })

      const interpretation = getChartInterpretation(chart)
      expect(interpretation).toBeDefined()
      expect(interpretation.overallSummary).toBeDefined()
      expect(interpretation.overallSummary.length).toBeGreaterThan(0)
    })

    it('should provide palace interpretations', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'female',
        birthDate: { day: 12, month: 8, year: 1995, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 2,
      })

      const interpretation = getChartInterpretation(chart)
      expect(interpretation.palaceInterpretations.length).toBe(12)
      interpretation.palaceInterpretations.forEach((pi) => {
        expect(pi.palace).toBeDefined()
        expect(pi.interpretation).toBeDefined()
        expect(pi.interpretation.length).toBeGreaterThan(0)
      })
    })

    it('should identify auspicious palaces', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'male',
        birthDate: { day: 1, month: 12, year: 2000, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 8,
      })

      const interpretation = getChartInterpretation(chart)
      expect(interpretation.auspiciousPalaces).toBeDefined()
      expect(Array.isArray(interpretation.auspiciousPalaces)).toBe(true)
    })
  })

  describe('Gender Differences', () => {
    it('should handle male and female charts', () => {
      const maleChart = createTuViChart({
        name: 'Male',
        gender: 'male',
        birthDate: { day: 15, month: 5, year: 1990, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 7,
      })

      const femaleChart = createTuViChart({
        name: 'Female',
        gender: 'female',
        birthDate: { day: 15, month: 5, year: 1990, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 7,
      })

      expect(maleChart).toBeDefined()
      expect(femaleChart).toBeDefined()
      expect(maleChart.palaces.length).toBe(12)
      expect(femaleChart.palaces.length).toBe(12)
    })
  })

  describe('Birth Hour Validation', () => {
    it('should handle all 12 birth hours', () => {
      for (let hour = 0; hour < 12; hour++) {
        const chart = createTuViChart({
          name: 'Test',
          gender: 'male',
          birthDate: { day: 10, month: 10, year: 2000, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
          birthHour: hour,
        })

        expect(chart).toBeDefined()
        expect(chart.userInfo.birthHour).toBe(hour)
      }
    })
  })

  describe('10-Year Period (Dai Han)', () => {
    it('should calculate Dai Han periods', () => {
      const chart = createTuViChart({
        name: 'Test',
        gender: 'male',
        birthDate: { day: 1, month: 1, year: 1985, isLeapMonth: false, canDay: 0, chiDay: 0, canMonth: 0, chiMonth: 0, canYear: 0, chiYear: 0, canHour: [], chiHour: [] },
        birthHour: 0,
      })

      expect(chart.daiHan).toBeDefined()
      expect(chart.daiHan.length).toBeGreaterThan(0)
    })
  })
})
