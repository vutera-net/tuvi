import { type NextRequest } from 'next/server'
import { scoreDayForEvent } from '@/lib/engines/date-selection-engine'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import type { EventType } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const dateStr = searchParams.get('date')
    const eventType = (searchParams.get('event') ?? 'general') as EventType

    if (!dateStr) return errorResponse('Missing date parameter')

    const [year, month, day] = dateStr.split('-').map(Number)
    if (!year || !month || !day) return errorResponse('Invalid date format')

    const result = scoreDayForEvent(day, month, year, eventType)
    return successResponse(result)
  } catch (err) {
    return serverErrorResponse(err)
  }
}
