import { type NextRequest } from 'next/server'
import { calculateBatTrach } from '@/lib/engines/bat-trach-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthYear, gender } = body

    if (!birthYear || !gender) {
      return errorResponse('Missing birthYear or gender')
    }
    if (!['male', 'female'].includes(gender)) {
      return errorResponse('gender must be male or female')
    }
    if (birthYear < 1900 || birthYear > 2100) {
      return errorResponse('birthYear must be between 1900 and 2100')
    }

    const cacheKey = cacheKeys.batTrach(birthYear, gender)
    const cached = await cacheGet(cacheKey)
    if (cached) return successResponse(cached)

    const result = calculateBatTrach(birthYear, gender)

    await cacheSet(cacheKey, result, TTL.YEAR)
    return successResponse(result)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
