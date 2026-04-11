/**
 * POST /api/tuvi/tieu-han
 *
 * Calculate Tiểu Hạn (yearly sub-periods) for a Tu Vi chart.
 *
 * Body:
 *   gender       'male' | 'female'
 *   birthYear    number  (lunar or solar depending on isLunar)
 *   birthMonth   number
 *   birthDay     number
 *   birthHour    number  (0-11, Địa Chi index)
 *   isLunar      boolean (default false → solar input)
 *   targetYear?  number  (solar year to query; if omitted returns all Tiểu Hạn)
 *
 * Response (targetYear provided):
 *   { daiHan, tieuHan: TieuHan }
 *
 * Response (no targetYear):
 *   { daiHanList: Array<{ daiHan, tieuHanList: TieuHan[] }> }
 */

import { type NextRequest } from 'next/server'
import { generateTuViChart, calculateTieuHan, getDaiHanDirection } from '@/lib/engines/tuvi-engine'
import { solarToLunar } from '@/lib/engines/lunar-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { label, gender, birthYear, birthMonth, birthDay, birthHour, isLunar, targetYear } = body

    if (!gender || !birthYear || !birthMonth || !birthDay || birthHour == null) {
      return errorResponse('Missing required fields: gender, birthYear, birthMonth, birthDay, birthHour')
    }
    if (!['male', 'female'].includes(gender)) {
      return errorResponse('gender must be male or female')
    }

    // Convert to lunar date
    let lunarDate
    if (isLunar) {
      const canYear = ((birthYear - 4) % 10 + 10) % 10
      const chiYear = ((birthYear - 4) % 12 + 12) % 12
      lunarDate = {
        day: birthDay,
        month: birthMonth,
        year: birthYear,
        isLeapMonth: false,
        canDay: 0, chiDay: 0,
        canMonth: 0, chiMonth: (birthMonth + 1) % 12,
        canYear, chiYear,
        jd: 0,
      }
    } else {
      lunarDate = solarToLunar(birthDay, birthMonth, birthYear)
    }

    // Generate chart to get daiHan list and direction
    const chart = generateTuViChart(label ?? 'Lá số', gender, lunarDate, birthHour)
    const forward = getDaiHanDirection(gender, chart.cungMenhIndex)

    if (targetYear != null) {
      // Find which Đại Hạn covers the targetYear
      const age = targetYear - lunarDate.year
      const daiHan = chart.daiHan.find(
        (dh) => age >= dh.startAge && age <= dh.endAge,
      )
      if (!daiHan) {
        return errorResponse(`Năm ${targetYear} nằm ngoài phạm vi Đại Vận`)
      }
      const tieuHanList = calculateTieuHan(daiHan, forward, chart.cungMenhIndex)
      const tieuHan = tieuHanList.find((t) => t.year === targetYear)
      return successResponse({ daiHan, tieuHan, tieuHanList })
    }

    // Return all Tiểu Hạn grouped by Đại Hạn
    const daiHanList = chart.daiHan.map((daiHan) => ({
      daiHan,
      tieuHanList: calculateTieuHan(daiHan, forward, chart.cungMenhIndex),
    }))

    return successResponse({ daiHanList })
  } catch (err) {
    return serverErrorResponse(err)
  }
}
