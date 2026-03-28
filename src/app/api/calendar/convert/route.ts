import { NextRequest, NextResponse } from 'next/server'
import { solarToLunar, lunarToSolar } from '@/lib/engines/lunar-engine'

export async function GET(req: NextRequest) {
  try {
    const direction = req.nextUrl.searchParams.get('direction') // 'to-lunar' or 'to-solar'
    const day = parseInt(req.nextUrl.searchParams.get('day') || '0')
    const month = parseInt(req.nextUrl.searchParams.get('month') || '0')
    const year = parseInt(req.nextUrl.searchParams.get('year') || '0')
    const isLeapMonth = req.nextUrl.searchParams.get('isLeapMonth') === 'true'

    if (!direction || !day || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required parameters: direction, day, month, year' },
        { status: 400 }
      )
    }

    if (direction === 'to-lunar') {
      // Solar to Lunar
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        return NextResponse.json({ error: 'Invalid solar date' }, { status: 400 })
      }

      const lunar = solarToLunar(day, month, year)
      return NextResponse.json({
        from: { day, month, year, type: 'solar' },
        to: {
          day: lunar.day,
          month: lunar.month,
          year: lunar.year,
          isLeapMonth: lunar.isLeapMonth,
          type: 'lunar',
          canDay: lunar.canDay,
          chiDay: lunar.chiDay,
        },
      })
    } else if (direction === 'to-solar') {
      // Lunar to Solar
      if (month < 1 || month > 12 || day < 1 || day > 30) {
        return NextResponse.json({ error: 'Invalid lunar date' }, { status: 400 })
      }

      const solar = lunarToSolar(day, month, year, isLeapMonth)
      return NextResponse.json({
        from: { day, month, year, isLeapMonth, type: 'lunar' },
        to: {
          day: solar.day,
          month: solar.month,
          year: solar.year,
          dayOfWeek: solar.dayOfWeek,
          type: 'solar',
        },
      })
    } else {
      return NextResponse.json({ error: 'Invalid direction. Use "to-lunar" or "to-solar"' }, { status: 400 })
    }
  } catch (error) {
    console.error('Date conversion error:', error)
    return NextResponse.json({ error: 'Failed to convert date' }, { status: 500 })
  }
}
