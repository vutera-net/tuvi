import { NextRequest, NextResponse } from 'next/server'
import { generateDailyHoroscope } from '@/lib/engines/horoscope-generator'
import { cacheGet, cacheSet, cacheKeys, TTL } from '@/lib/cache'

const ZODIAC_NAMES = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
const ZODIAC_VN = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

export async function GET(req: NextRequest) {
  try {
    const zodiac = req.nextUrl.searchParams.get('zodiac')?.toLowerCase()
    const dateStr = req.nextUrl.searchParams.get('date') // YYYY-MM-DD format

    if (!zodiac || !ZODIAC_NAMES.includes(zodiac)) {
      return NextResponse.json(
        { error: 'Invalid zodiac. Must be one of: ' + ZODIAC_NAMES.join(', ') },
        { status: 400 }
      )
    }

    const zodiacIndex = ZODIAC_NAMES.indexOf(zodiac)
    const zodiacVn = ZODIAC_VN[zodiacIndex]
    const date = dateStr ? new Date(dateStr) : new Date()

    // Validate date format
    if (dateStr && isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 })
    }

    const cacheKey = cacheKeys.dailyHoroscope(date.toISOString().split('T')[0], zodiac)
    const cached = await cacheGet(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    const horoscope = generateDailyHoroscope(date, zodiacVn)

    // Cache for 24 hours
    await cacheSet(cacheKey, horoscope, TTL.DAY)

    return NextResponse.json(horoscope)
  } catch (error) {
    console.error('Daily horoscope error:', error)
    return NextResponse.json({ error: 'Failed to generate horoscope' }, { status: 500 })
  }
}
