/**
 * Bát Trạch Feng Shui Engine Tests
 * Tests for Cung Mệnh calculation, Đông/Tây grouping, and 8-direction analysis
 */

import { calculateBatTrach, getCungMenhInfo, isGoodDirection } from '../bat-trach-engine'
import {
  getCungMenhNumber,
  getCungMenhByNumber,
  getMenhNhom,
  getBatTrachHuongs,
} from '@/data/phongthuy/bat-trach'

// Key test data (verified by formula):
// Male: n = (100 - lastTwo) % 9; 0→9, 5→8(Gen)
// Female: n = (lastTwo - 4 + 90) % 9; 0→9, 5→2(Khon)
//
// 1984 male:   (100 - 84) % 9 = 16 % 9 = 7  → Doai → 'tay'
// 1984 female: (84 - 4 + 90) % 9 = 170 % 9 = 8 → Gen → 'tay'
// 1990 male:   (100 - 90) % 9 = 10 % 9 = 1  → Kham → 'dong'
// 1990 female: (90 - 4 + 90) % 9 = 176 % 9 = 5 → 2 (Khon) → 'tay'
// 1981 male:   (100 - 81) % 9 = 19 % 9 = 1  → Kham → 'dong'
// 1977 male:   (100 - 77) % 9 = 23 % 9 = 5  → 8 (Gen) → 'tay'
// 2000 male:   (100 - 0) % 9 = 100 % 9 = 1  → Kham → 'dong'
// 1995 male:   (100 - 95) % 9 = 5 % 9 = 5   → 8 (Gen) → 'tay'

describe('Bát Trạch Engine - getCungMenhNumber', () => {
  it('should return 7 (Doai) for 1984 male', () => {
    expect(getCungMenhNumber(1984, 'male')).toBe(7)
  })

  it('should return 8 (Gen) for 1984 female', () => {
    expect(getCungMenhNumber(1984, 'female')).toBe(8)
  })

  it('should return 1 (Kham) for 1990 male', () => {
    expect(getCungMenhNumber(1990, 'male')).toBe(1)
  })

  it('should return 2 (Khon) for 1990 female (special case n=5)', () => {
    // (90-4+90)%9 = 176%9 = 5 → female special case → 2
    expect(getCungMenhNumber(1990, 'female')).toBe(2)
  })

  it('should map n=0 to 9 for male', () => {
    // Need a year where (100 - lastTwo) % 9 == 0 → lastTwo = 1, 10, 19, 28, ...
    // 1981 male: (100-81)%9 = 19%9 = 1 → not 0
    // 1909: lastTwo=9, (100-9)%9 = 91%9 = 1 → not 0
    // To get 0: 100-lastTwo divisible by 9 → lastTwo=1,10,19,28,37,46,55,64,73,82,91,100
    // 1991 male: (100-91)%9 = 9%9 = 0 → should map to 9
    expect(getCungMenhNumber(1991, 'male')).toBe(9)
  })

  it('should map n=5 to 8 (Gen) for male (special case)', () => {
    // 1995 male: (100-95)%9 = 5%9 = 5 → maps to 8
    expect(getCungMenhNumber(1995, 'male')).toBe(8)
  })

  it('should map n=5 to 2 (Khon) for female (special case)', () => {
    expect(getCungMenhNumber(1990, 'female')).toBe(2)
  })

  it('should return number in valid range [1-9] excluding 5', () => {
    const years = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]
    const genders: Array<'male' | 'female'> = ['male', 'female']
    for (const y of years) {
      for (const g of genders) {
        const n = getCungMenhNumber(y, g)
        expect(n).toBeGreaterThanOrEqual(1)
        expect(n).toBeLessThanOrEqual(9)
        expect(n).not.toBe(5)
      }
    }
  })
})

describe('Bát Trạch Engine - getCungMenhByNumber', () => {
  const expected: Record<number, string> = {
    1: 'Kham', 2: 'Khon', 3: 'Chan', 4: 'Ton',
    6: 'Can', 7: 'Doai', 8: 'Gen', 9: 'Ly',
  }

  for (const [num, name] of Object.entries(expected)) {
    it(`should return ${name} for number ${num}`, () => {
      expect(getCungMenhByNumber(Number(num))).toBe(name)
    })
  }
})

describe('Bát Trạch Engine - getMenhNhom', () => {
  it('should classify Kham as dong', () => {
    expect(getMenhNhom('Kham')).toBe('dong')
  })

  it('should classify Chan as dong', () => {
    expect(getMenhNhom('Chan')).toBe('dong')
  })

  it('should classify Ton as dong', () => {
    expect(getMenhNhom('Ton')).toBe('dong')
  })

  it('should classify Ly as dong', () => {
    expect(getMenhNhom('Ly')).toBe('dong')
  })

  it('should classify Khon as tay', () => {
    expect(getMenhNhom('Khon')).toBe('tay')
  })

  it('should classify Can as tay', () => {
    expect(getMenhNhom('Can')).toBe('tay')
  })

  it('should classify Doai as tay', () => {
    expect(getMenhNhom('Doai')).toBe('tay')
  })

  it('should classify Gen as tay', () => {
    expect(getMenhNhom('Gen')).toBe('tay')
  })
})

describe('Bát Trạch Engine - getBatTrachHuongs', () => {
  it('should return exactly 8 directions for Kham', () => {
    const huongs = getBatTrachHuongs('Kham')
    expect(huongs).toHaveLength(8)
  })

  it('should have 4 good (isTot=true) and 4 bad (isTot=false) directions', () => {
    const cungList = ['Kham', 'Khon', 'Chan', 'Ton', 'Can', 'Doai', 'Gen', 'Ly'] as const
    for (const cung of cungList) {
      const huongs = getBatTrachHuongs(cung)
      const tot = huongs.filter((h) => h.isTot)
      const xau = huongs.filter((h) => !h.isTot)
      expect(tot).toHaveLength(4)
      expect(xau).toHaveLength(4)
    }
  })

  it('should include all 8 huong names', () => {
    const expectedNames = [
      'Sinh Khi', 'Thien Y', 'Dien Nien', 'Phuc Vi',
      'Hoa Hai', 'Luc Sat', 'Ngu Quy', 'Tuyet Menh',
    ]
    const huongs = getBatTrachHuongs('Kham')
    const names = huongs.map((h) => h.name)
    for (const n of expectedNames) {
      expect(names).toContain(n)
    }
  })

  it('Kham - Sinh Khi should be DN (Đông Nam)', () => {
    const huongs = getBatTrachHuongs('Kham')
    const sinhKhi = huongs.find((h) => h.name === 'Sinh Khi')
    expect(sinhKhi?.direction).toBe('Đông Nam')
  })

  it('each huong should have required fields', () => {
    const huongs = getBatTrachHuongs('Ly')
    for (const h of huongs) {
      expect(h).toHaveProperty('name')
      expect(h).toHaveProperty('direction')
      expect(h).toHaveProperty('isTot')
      expect(h).toHaveProperty('meaning')
      expect(h).toHaveProperty('usage')
    }
  })
})

describe('Bát Trạch Engine - calculateBatTrach', () => {
  it('should return all required fields', () => {
    const result = calculateBatTrach(1984, 'male')
    expect(result).toHaveProperty('cungMenh')
    expect(result).toHaveProperty('cungNumber')
    expect(result).toHaveProperty('nhomMenh')
    expect(result).toHaveProperty('huongs')
    expect(result).toHaveProperty('huongNhaTot')
    expect(result).toHaveProperty('huongNhaXau')
  })

  it('1984 male → Doai, tay', () => {
    const result = calculateBatTrach(1984, 'male')
    expect(result.cungMenh).toBe('Doai')
    expect(result.cungNumber).toBe(7)
    expect(result.nhomMenh).toBe('tay')
  })

  it('1984 female → Gen, tay', () => {
    const result = calculateBatTrach(1984, 'female')
    expect(result.cungMenh).toBe('Gen')
    expect(result.cungNumber).toBe(8)
    expect(result.nhomMenh).toBe('tay')
  })

  it('1990 male → Kham, dong', () => {
    const result = calculateBatTrach(1990, 'male')
    expect(result.cungMenh).toBe('Kham')
    expect(result.cungNumber).toBe(1)
    expect(result.nhomMenh).toBe('dong')
  })

  it('should have 4 good and 4 bad directions', () => {
    const result = calculateBatTrach(1990, 'male')
    expect(result.huongNhaTot).toHaveLength(4)
    expect(result.huongNhaXau).toHaveLength(4)
    expect(result.huongs).toHaveLength(8)
  })

  it('huongNhaTot should all have isTot=true', () => {
    const result = calculateBatTrach(1984, 'female')
    for (const h of result.huongNhaTot) {
      expect(h.isTot).toBe(true)
    }
  })

  it('huongNhaXau should all have isTot=false', () => {
    const result = calculateBatTrach(1984, 'female')
    for (const h of result.huongNhaXau) {
      expect(h.isTot).toBe(false)
    }
  })
})

describe('Bát Trạch Engine - getCungMenhInfo', () => {
  it('should return description for Kham', () => {
    const info = getCungMenhInfo('Kham')
    expect(typeof info).toBe('string')
    expect(info.length).toBeGreaterThan(0)
  })

  it('should return description for all cung', () => {
    const cungs = ['Kham', 'Khon', 'Chan', 'Ton', 'Can', 'Doai', 'Gen', 'Ly'] as const
    for (const c of cungs) {
      expect(getCungMenhInfo(c).length).toBeGreaterThan(0)
    }
  })
})

describe('Bát Trạch Engine - isGoodDirection', () => {
  it('should return boolean', () => {
    const result = isGoodDirection(1990, 'male', 'Đông Nam')
    expect(typeof result).toBe('boolean')
  })

  it('Kham cung (1990 male) - Đông Nam (Sinh Khi) should be good', () => {
    // Kham: Sinh Khi = DN = Đông Nam
    expect(isGoodDirection(1990, 'male', 'Đông Nam')).toBe(true)
  })

  it('Kham cung (1990 male) - Tây (Tuyệt Mệnh) should be bad', () => {
    // Kham: Tuyet Menh = T = Tây
    expect(isGoodDirection(1990, 'male', 'Tây')).toBe(false)
  })
})
