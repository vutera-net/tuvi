import { type NextRequest } from 'next/server'
import { getDayInfo } from '@/lib/engines/lunar-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const dateStr = searchParams.get('date')

    if (!dateStr) {
      return errorResponse('Missing date parameter. Format: YYYY-MM-DD')
    }

    const [year, month, day] = dateStr.split('-').map(Number)
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return errorResponse('Invalid date format. Use YYYY-MM-DD')
    }

    // Check cache
    const cacheKey = cacheKeys.dayInfo(year, month, day)
    const cached = await cacheGet(cacheKey)
    if (cached) return successResponse(cached)

    const dayInfo = getDayInfo(day, month, year)

    // Cache for 24 hours
    await cacheSet(cacheKey, dayInfo, TTL.DAY)

    return successResponse(dayInfo)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
