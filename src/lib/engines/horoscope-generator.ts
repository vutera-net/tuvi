/**
 * Daily Horoscope Generator
 * Combines Cuu Cung Phi Tinh, 28 Sao, Truc, and Can Chi
 */

import type { LunarDate } from '@/types'
import { getDayInfo } from './lunar-engine'
import { calculateMonthlyCuuCung } from './cuu-cung-engine'
import { DIA_CHI } from '@/data/can-chi'

export interface HoroscopeScore {
  overall: number       // 1-10
  love: number         // 1-10
  career: number       // 1-10
  finance: number      // 1-10
  health: number       // 1-10
}

export interface DailyHoroscope {
  date: Date
  zodiac: string       // Con giáp (Tý, Sửu, ...)
  title: string
  overview: string
  loveForecast: string
  careerForecast: string
  financeForecast: string
  healthForecast: string
  luckyColor: string
  luckyDirection: string
  luckyHour: string
  scores: HoroscopeScore
  rating: 'excellent' | 'good' | 'average' | 'bad'
}

const ZODIAC_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

const HOROSCOPE_TEMPLATES = {
  excellent: {
    overview: 'Hôm nay là một ngày rất tốt lành với nhiều cơ hội thuận lợi cho bạn.',
    love: 'Tình cảm thăng hoa, là lúc tốt để thể hiện tình yêu với người thân yêu.',
    career: 'Công việc suôn sẻ, có cơ hội thăng tiến hoặc hoàn thành dự án quan trọng.',
    finance: 'Tài lộc ổn định, có khả năng thu được nguồn thu nhập bổ sung.',
    health: 'Sức khỏe dồi dào năng lượng, là lúc tốt để tập luyện và chăm sóc bản thân.',
  },
  good: {
    overview: 'Hôm nay là một ngày tốt với nhiều điều tích cực xảy ra.',
    love: 'Mối quan hệ tình cảm ổn định và hài hòa.',
    career: 'Công việc tiến triển tốt, hãy tận dụng cơ hội.',
    finance: 'Tài chính ổn định, có thể có chi tiêu nhỏ.',
    health: 'Sức khỏe bình thường, hãy giữ gìn lối sống lành mạnh.',
  },
  average: {
    overview: 'Hôm nay là một ngày bình thường với những ups and downs.',
    love: 'Tình cảm ổn định nhưng cần thêm sự chăm sóc.',
    career: 'Công việc cần kiên nhẫn, có những thách thức nhỏ.',
    finance: 'Tài chính ổn định, tránh chi tiêu quá nhiều.',
    health: 'Sức khỏe bình thường, chú ý phòng ngừa bệnh tật.',
  },
  bad: {
    overview: 'Hôm nay cần cẩn trọng và tập trung hơn để vượt qua những thách thức.',
    love: 'Tình cảm có thể có một số hiểu lầm, cần giao tiếp tốt hơn.',
    career: 'Công việc gặp một số trở ngại, cần kiên trì và chiến lược.',
    finance: 'Tài chính cần thận trọng, tránh đầu tư rủi ro.',
    health: 'Sức khỏe cần chú ý, hạn chế hoạt động quá sức.',
  },
}

/**
 * Calculate horoscope score for a zodiac sign on a given date
 */
function calculateScores(
  zodiacIndex: number,
  dayInfo: ReturnType<typeof getDayInfo>,
  cuuCung: ReturnType<typeof calculateMonthlyCuuCung>
): HoroscopeScore {
  // Use center star value as base luck (1-9, converted to 0-1 scale)
  const baseLuck = (cuuCung.centerStar / 9) * 2

  // Sao28 rating affects scores
  const sao28Bonus = dayInfo.sao28Rating === 'tot' ? 1 : dayInfo.sao28Rating === 'xau' ? -1 : 0

  // Truc rating
  const trucBonus = dayInfo.truc.includes('Kiến') || dayInfo.truc.includes('Mãn') ? 0.5 : -0.3

  // Base score calculation
  const baseScore = 5 + baseLuck + sao28Bonus + trucBonus

  return {
    overall: Math.max(1, Math.min(10, Math.round(baseScore))),
    love: Math.max(1, Math.min(10, Math.round(baseScore + (zodiacIndex % 3) - 1))),
    career: Math.max(1, Math.min(10, Math.round(baseScore + ((zodiacIndex + 1) % 3) - 1))),
    finance: Math.max(1, Math.min(10, Math.round(baseScore + ((zodiacIndex + 2) % 3) - 1))),
    health: Math.max(1, Math.min(10, Math.round(baseScore - 0.5))),
  }
}

/**
 * Generate horoscope for a zodiac sign on a given date
 */
export function generateDailyHoroscope(date: Date, zodiac: string): DailyHoroscope {
  const zodiacIndex = ZODIAC_NAMES.indexOf(zodiac)
  if (zodiacIndex === -1) throw new Error(`Invalid zodiac: ${zodiac}`)

  const dd = date.getDate()
  const mm = date.getMonth() + 1
  const yy = date.getFullYear()

  const dayInfo = getDayInfo(dd, mm, yy)
  const cuuCung = calculateMonthlyCuuCung(yy, mm)
  const scores = calculateScores(zodiacIndex, dayInfo, cuuCung)

  // Determine rating
  const avgScore = (scores.overall + scores.love + scores.career + scores.finance + scores.health) / 5
  let rating: 'excellent' | 'good' | 'average' | 'bad'
  if (avgScore >= 8) rating = 'excellent'
  else if (avgScore >= 6.5) rating = 'good'
  else if (avgScore >= 4.5) rating = 'average'
  else rating = 'bad'

  const template = HOROSCOPE_TEMPLATES[rating]

  // Lucky color - based on Ngu Hanh
  const nguHanhIndex = zodiacIndex % 5
  const luckyColors = ['Đỏ', 'Xanh lá', 'Xanh dương', 'Vàng', 'Trắng']
  const luckyColor = luckyColors[nguHanhIndex]

  // Lucky direction
  const luckyDirections = ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam']
  const luckyDirection = luckyDirections[zodiacIndex % 5]

  // Lucky hour
  const luckyHourIndex = zodiacIndex % 12
  const luckyHour = DIA_CHI[luckyHourIndex] + ' (7-9 giờ)'

  const title = `${ZODIAC_NAMES[zodiacIndex]} - ${date.toLocaleDateString('vi-VN')}`

  return {
    date,
    zodiac,
    title,
    overview: template.overview,
    loveForecast: template.love,
    careerForecast: template.career,
    financeForecast: template.finance,
    healthForecast: template.health,
    luckyColor,
    luckyDirection,
    luckyHour,
    scores,
    rating,
  }
}

/**
 * Generate horoscopes for all 12 zodiacs on a given date
 */
export function generateDailyHoroscopes(date: Date): Record<string, DailyHoroscope> {
  const horoscopes: Record<string, DailyHoroscope> = {}
  for (const zodiac of ZODIAC_NAMES) {
    horoscopes[zodiac] = generateDailyHoroscope(date, zodiac)
  }
  return horoscopes
}
