/**
 * Standard API response helpers
 */

import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data }, { status })
}

export function errorResponse(message: string, status = 400): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ error: message }, { status })
}

export function notFoundResponse(resource = 'Resource'): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ error: `${resource} not found` }, { status: 404 })
}

export function serverErrorResponse(err?: unknown): NextResponse<ApiResponse<never>> {
  console.error('[API Error]', err)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
