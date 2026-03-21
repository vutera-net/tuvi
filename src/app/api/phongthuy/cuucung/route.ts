import { type NextRequest } from 'next/server'
import { calculateYearlyCuuCung, calculateMonthlyCuuCung } from '@/lib/engines/cuu-cung-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const year = Number(searchParams.get('year'))
    const month = searchParams.get('month') ? Number(searchParams.get('month')) : undefined

    if (isNaN(year) || year < 1900 || year > 2100) {
      return errorResponse('Invalid year')
    }

    const cacheKey = cacheKeys.cuuCung(year, month)
    const cached = await cacheGet(cacheKey)
    if (cached) return successResponse(cached)

    const result = month
      ? calculateMonthlyCuuCung(year, month)
      : calculateYearlyCuuCung(year)

    await cacheSet(cacheKey, result, TTL.DAY)
    return successResponse(result)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
