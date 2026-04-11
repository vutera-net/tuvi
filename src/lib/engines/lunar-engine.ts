/**
 * Lunar Calendar Engine
 * Based on Ho Ngoc Duc algorithm for Vietnamese lunar calendar
 * Reference: http://www.informatik.uni-leipzig.de/~duc/amlich/
 */

import type { LunarDate, SolarDate, DayInfo } from '@/types'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'
import { getHoangDaoGio, getHacDaoGio } from '@/data/hoang-dao'
import { getTruc } from '@/data/truc'
import { getSao28 } from '@/data/sao28'
import { getNgayKy } from '@/data/ngay-ky'
import { getLunarFestivals, getSolarFestivals } from '@/data/festivals'
import { TIET_KHI, TIET_KHI_APPROX_DAYS } from '@/data/tiet-khi'

// ============================================================
// CORE LUNAR CALCULATION (Ho Ngoc Duc algorithm)
// ============================================================

function INT(d: number): number {
  return Math.floor(d)
}

/**
 * Compute Julian Day Number from Solar date
 */
export function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12)
  const y = yy + 4800 - a
  const m = mm + 12 * a - 3
  let jd =
    dd +
    INT((153 * m + 2) / 5) +
    365 * y +
    INT(y / 4) -
    INT(y / 100) +
    INT(y / 400) -
    32045
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083
  }
  return jd
}

/**
 * Convert Julian Day Number to Solar date
 */
export function jdToDate(jd: number): { day: number; month: number; year: number } {
  let a: number, b: number, c: number
  if (jd > 2299160) {
    a = jd + 32044
    b = INT((4 * a + 3) / 146097)
    c = a - INT((b * 146097) / 4)
  } else {
    b = 0
    c = jd + 32082
  }
  const d = INT((4 * c + 3) / 1461)
  const e = c - INT((1461 * d) / 4)
  const m = INT((5 * e + 2) / 153)
  const day = e - INT((153 * m + 2) / 5) + 1
  const month = m + 3 - 12 * INT(m / 10)
  const year = b * 100 + d - 4800 + INT(m / 10)
  return { day, month, year }
}

/**
 * Compute raw Julian Day of new moon k (Ho Ngoc Duc algorithm)
 */
function newMoon(k: number): number {
  const T = k / 1236.85
  const T2 = T * T
  const T3 = T2 * T
  const dr = Math.PI / 180
  let Jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr)
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3
  const Mpr =
    306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M)
  C1 -= 0.4068 * Math.sin(Mpr * dr)
  C1 += 0.0161 * Math.sin(2 * dr * Mpr)
  C1 -= 0.0004 * Math.sin(3 * dr * Mpr)
  C1 += 0.0104 * Math.sin(2 * dr * F)
  C1 -= 0.0051 * Math.sin((M + Mpr) * dr)
  C1 -= 0.0074 * Math.sin((M - Mpr) * dr)
  C1 += 0.0004 * Math.sin((2 * F + M) * dr)
  C1 -= 0.0004 * Math.sin((2 * F - M) * dr)
  C1 -= 0.0006 * Math.sin((2 * F + Mpr) * dr)
  C1 += 0.001 * Math.sin((2 * F - Mpr) * dr)
  C1 += 0.0005 * Math.sin((M + 2 * Mpr) * dr)
  // deltaT in days (Ho Ngoc Duc formula)
  let deltat: number
  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2
  }
  return Jd1 + C1 - deltat
}

/**
 * Get the Julian Day Number of new moon day k
 */
function getNewMoonDay(k: number, timeZone: number): number {
  return INT(newMoon(k) + 0.5 + timeZone / 24)
}

/**
 * Get Sun's longitude sector (0-11) for a Julian Day Number
 * Includes nutation & aberration correction for accurate solar term detection
 */
function getSunLongitude(jdn: number, timeZone: number): number {
  const T = (jdn - 0.5 - timeZone / 24 - 2451545.0) / 36525
  const T2 = T * T
  const dr = Math.PI / 180
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2
  const DL =
    (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(M * dr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M * dr) +
    0.00029 * Math.sin(3 * M * dr)
  const L = L0 + DL
  // Nutation & aberration correction
  const theta = L - 0.00569 - 0.00478 * Math.sin(dr * (125.04 - 1934.136 * T))
  let omega = theta - 360 * INT(theta / 360)
  if (omega < 0) omega += 360
  return INT(omega / 30)
}

/**
 * Get the lunar month 11 new moon day for a given year
 */
function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021
  const k = INT(off / 29.530588853)
  let nm = getNewMoonDay(k, timeZone)
  const sunLong = getSunLongitude(nm, timeZone)
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone)
  }
  return nm
}

/**
 * Get leap month offset for year (0 = no leap)
 */
function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5)
  let last = 0
  let i = 1
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
  do {
    last = arc
    i++
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
  } while (arc !== last && i < 14)
  return i - 1
}

/**
 * Convert Solar date to Lunar date (Ho Ngoc Duc algorithm)
 */
export function solarToLunar(
  dd: number,
  mm: number,
  yy: number,
  timeZone = 7
): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy)
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853)
  let monthStart = getNewMoonDay(k + 1, timeZone)
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone)
  }

  // a11 = tháng 11 của năm hiện tại, b11 = tháng 11 của năm kế tiếp/trước
  const a11Initial = getLunarMonth11(yy, timeZone)
  let a11 = a11Initial
  let b11 = a11Initial
  const a11FromPrevYear = a11Initial >= monthStart
  if (a11FromPrevYear) {
    a11 = getLunarMonth11(yy - 1, timeZone)
  } else {
    b11 = getLunarMonth11(yy + 1, timeZone)
  }

  const lunarDay = dayNumber - monthStart + 1
  const diff = INT((monthStart - a11) / 29)
  let isLeapMonth = false
  let lunarMonth = diff + 11

  // Kiểm tra tháng nhuận: năm có 13 tháng khi b11 - a11 > 365
  if (b11 - a11 > 365) {
    const leapMonthOffset = getLeapMonthOffset(a11, timeZone)
    if (diff >= leapMonthOffset) {
      lunarMonth = diff + 10
      if (diff === leapMonthOffset) isLeapMonth = true
    }
  }

  if (lunarMonth > 12) lunarMonth -= 12
  const lunarYear = lunarMonth >= 11 && a11FromPrevYear ? yy - 1 : yy

  // Can Chi calculations
  const canYear = ((lunarYear - 4) % 10 + 10) % 10
  const chiYear = ((lunarYear - 4) % 12 + 12) % 12
  const canMonth = ((lunarMonth + lunarYear * 12) % 10 + 10) % 10
  const chiMonth = (lunarMonth + 1) % 12
  const canDay = ((dayNumber + 9) % 10 + 10) % 10
  const chiDay = ((dayNumber + 1) % 12 + 12) % 12

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeapMonth,
    canDay,
    chiDay,
    canMonth,
    chiMonth,
    canYear,
    chiYear,
    jd: dayNumber,
  }
}

/**
 * Convert Lunar date to Solar date
 */
export function lunarToSolar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  isLeapMonth: boolean,
  timeZone = 7
): SolarDate {
  let a11: number, b11: number
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone)
    b11 = getLunarMonth11(lunarYear, timeZone)
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone)
    b11 = getLunarMonth11(lunarYear + 1, timeZone)
  }
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853)
  const leapOff = getLeapMonthOffset(a11, timeZone)
  let leapMonth = leapOff - 2
  if (leapMonth < 1) leapMonth += 12
  let offset: number
  if (isLeapMonth && lunarMonth !== leapMonth) {
    // error fallback
    offset = 0
  }
  let off: number
  if (lunarMonth < 11) {
    off = lunarMonth - 11
    if (off < 0) off += 12
  } else {
    off = lunarMonth - 11
  }
  let monthStart: number
  if (leapOff >= 0 && off >= leapOff) {
    monthStart = getNewMoonDay(k + off + 1, timeZone)
  } else {
    monthStart = getNewMoonDay(k + off, timeZone)
  }
  const jd = monthStart + lunarDay - 1
  const solar = jdToDate(jd)
  return {
    day: solar.day,
    month: solar.month,
    year: solar.year,
    dayOfWeek: (jd + 1) % 7,
  }
}

// Simple in-memory cache for getDayInfo to prevent duplicate math within similar periods
const dayInfoCache = new Map<string, DayInfo>();

/**
 * Get full day information for a solar date
 */
export function getDayInfo(dd: number, mm: number, yy: number): DayInfo {
  const cacheKey = `${dd}-${mm}-${yy}`;
  if (dayInfoCache.has(cacheKey)) return dayInfoCache.get(cacheKey)!;

  const jd = jdFromDate(dd, mm, yy)
  const lunar = solarToLunar(dd, mm, yy)
  const solar: SolarDate = {
    day: dd, month: mm, year: yy,
    dayOfWeek: (jd + 1) % 7,
  }

  // Can Gio for 12 hours: starting Chi can = (canDay % 5) * 2
  const gioCanStart = (lunar.canDay % 5) * 2
  const canGio = Array.from({ length: 12 }, (_, i) => (gioCanStart + i) % 10)
  const chiGio = Array.from({ length: 12 }, (_, i) => i) // Ty=0, Suu=1...

  const hoangDaoGio = getHoangDaoGio(lunar.chiDay)
  const hacDaoGio = getHacDaoGio(lunar.chiDay)
  const truc = getTruc(lunar.chiMonth, lunar.chiDay)
  const sao28Obj = getSao28(jd)
  const ngayKy = getNgayKy(lunar.day, lunar.month, lunar.canDay, lunar.chiDay)
  const solarTerm = getTietKhi(dd, mm)

  const lunarFests = getLunarFestivals(lunar.month, lunar.day)
  const solarFests = getSolarFestivals(mm, dd)
  const festivals = [...lunarFests, ...solarFests]

  // Overall rating
  let rating: 'tot' | 'xau' | 'trung' = 'trung'
  if (truc.rating === 'tot' && sao28Obj.rating === 'tot' && ngayKy.length === 0) {
    rating = 'tot'
  } else if (truc.rating === 'xau' || ngayKy.length >= 2) {
    rating = 'xau'
  }

  const result: DayInfo = {
    solar,
    lunar,
    canGio,
    chiGio,
    hoangDaoGio,
    hacDaoGio,
    truc: truc.nameVi,
    sao28: sao28Obj.nameVi,
    sao28Rating: sao28Obj.rating,
    solarTerm,
    ngayKy,
    festivals,
    rating,
  }

  // Limited cache size management
  if (dayInfoCache.size > 1000) dayInfoCache.clear();
  dayInfoCache.set(cacheKey, result);

  return result
}

/**
 * Get Tiết Khí (solar term) for a solar date
 * Returns the solar term if the date falls within the solar term's range (±1.5 days)
 */
export function getTietKhi(dd: number, mm: number): string | undefined {
  // Each month has 2 tiet khi
  const monthIndex = mm - 1
  const tietKhiForMonth = TIET_KHI.filter((tk) => tk.month === mm)

  for (const tietKhi of tietKhiForMonth) {
    // Find approximate date for this tiet khi
    const tietIndex = TIET_KHI.indexOf(tietKhi)
    const approxDay = TIET_KHI_APPROX_DAYS[tietIndex]

    // Check if current day is within ±1 days of tiet khi
    if (Math.abs(dd - approxDay) <= 1) {
      return tietKhi.nameVi
    }
  }

  return undefined
}

/**
 * Get all days in a solar month
 */
export function getMonthDays(year: number, month: number): DayInfo[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const days: DayInfo[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(getDayInfo(d, month, year))
  }
  return days
}

/**
 * Convert solar hour to Gio Chi index (0=Ty, 1=Suu...)
 * Gio Ty: 23:00 - 01:00
 */
export function hourToGioChi(hour: number): number {
  if (hour === 23) return 0
  return Math.floor((hour + 1) / 2) % 12
}
