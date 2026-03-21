import { type NextRequest } from 'next/server'
import { searchGoodDates } from '@/lib/engines/date-selection-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import type { EventType } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromDate, toDate, eventType = 'general', minScore = 60 } = body

    if (!fromDate || !toDate) {
      return errorResponse('Missing fromDate or toDate')
    }

    const [fy, fm, fd] = fromDate.split('-').map(Number)
    const [ty, tm, td] = toDate.split('-').map(Number)

    // Limit range to 90 days to prevent abuse
    const fromJd = fd + fm * 30 + fy * 365
    const toJd = td + tm * 30 + ty * 365
    if (toJd - fromJd > 90) {
      return errorResponse('Date range cannot exceed 90 days')
    }

    const results = searchGoodDates(fy, fm, fd, ty, tm, td, eventType as EventType, minScore)

    return successResponse(results)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
