import { type NextRequest } from 'next/server'
import { getMonthDays } from '@/lib/engines/lunar-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const year = Number(searchParams.get('year'))
    const month = Number(searchParams.get('month'))

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return errorResponse('Invalid year or month')
    }

    const cacheKey = cacheKeys.monthCalendar(year, month)
    const cached = await cacheGet(cacheKey)
    if (cached) return successResponse(cached)

    const days = getMonthDays(year, month)

    await cacheSet(cacheKey, days, TTL.DAY)
    return successResponse(days)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
