import { type NextRequest } from 'next/server'
import { generateTuViChart } from '@/lib/engines/tuvi-engine'
import { solarToLunar } from '@/lib/engines/lunar-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { label, gender, birthYear, birthMonth, birthDay, birthHour, isLunar } = body

    if (!gender || !birthYear || !birthMonth || !birthDay || birthHour == null) {
      return errorResponse('Missing required fields: gender, birthYear, birthMonth, birthDay, birthHour')
    }

    if (!['male', 'female'].includes(gender)) {
      return errorResponse('gender must be male or female')
    }

    // Convert to lunar if solar date provided
    let lunarDate
    if (isLunar) {
      const canYear = ((birthYear - 4) % 10 + 10) % 10
      const chiYear = ((birthYear - 4) % 12 + 12) % 12
      const canDay = 0 // Simplified - would need full calculation
      const chiDay = 0
      lunarDate = {
        day: birthDay,
        month: birthMonth,
        year: birthYear,
        isLeapMonth: false,
        canDay, chiDay,
        canMonth: 0, chiMonth: (birthMonth + 1) % 12,
        canYear, chiYear,
        jd: 0,
      }
    } else {
      lunarDate = solarToLunar(birthDay, birthMonth, birthYear)
    }

    const cacheKey = cacheKeys.tuViChart(
      lunarDate.year, lunarDate.month, lunarDate.day, birthHour, gender
    )
    const cached = await cacheGet(cacheKey)
    if (cached) return successResponse(cached)

    const chart = generateTuViChart(label ?? 'Lá số', gender, lunarDate, birthHour)

    await cacheSet(cacheKey, chart, TTL.MONTH)
    return successResponse(chart)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
