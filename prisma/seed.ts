// Load env FIRST before any other imports
import * as fs from 'fs'
import * as path from 'path'

const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

// NOW import prisma and bcrypt
import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'
import { format } from 'date-fns'

async function main() {
  console.log('🌱 Seeding database...')

  // Create test users
  const password = await bcrypt.hash('password123', 12)

  const user1 = await prisma.user.upsert({
    where: { email: 'demo@tuvi.local' },
    update: {},
    create: {
      email: 'demo@tuvi.local',
      name: 'Demo User',
      password,
      birthYear: 1990,
      birthMonth: 5,
      birthDay: 15,
      birthHour: 9,
      gender: 'male',
      subscription: 'premium',
      subExpiresAt: new Date('2025-12-31'),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'test@tuvi.local' },
    update: {},
    create: {
      email: 'test@tuvi.local',
      name: 'Test User',
      password,
      birthYear: 1995,
      birthMonth: 8,
      birthDay: 22,
      birthHour: 3,
      gender: 'female',
      subscription: 'free',
    },
  })

  console.log('✅ Users created:', { user1: user1.email, user2: user2.email })

  // Create sample Tu Vi charts
  const lunarDate = {
    day: 15,
    month: 5,
    year: 1990,
    isLeapMonth: false,
    canDay: 4,
    chiDay: 5,
    canMonth: 10,
    chiMonth: 4,
    canYear: 6,
    chiYear: 5,
    jd: 2448376,
  }

  const chart1 = await prisma.tuViChart.create({
    data: {
      userId: user1.id,
      label: 'Thôi Em 1990',
      birthDate: lunarDate,
      birthHour: 9,
      gender: 'male',
      chartData: {
        cuc: 'Thuy Nhi Cuc',
        menh: 'Kim',
        napAm: 'Kiem Phong Kim',
        daiHan: [],
      },
    },
  })

  console.log('✅ Tu Vi chart created:', chart1.id)

  // Create sample search history
  await prisma.searchHistory.create({
    data: {
      userId: user1.id,
      type: 'ngaytot',
      query: { eventType: 'cuoiHoi', month: 3, year: 2025 },
      result: { goodDates: [5, 12, 18, 25] },
    },
  })

  console.log('✅ Search history created')

  // Create sample daily horoscopes for today
  const todayString = format(new Date(), 'yyyy-MM-dd')
  const todayDate = new Date(todayString)

  const zodiacs = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi']
  const zodiacVn = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

  for (let i = 0; i < zodiacs.length; i++) {
    const horoscopeContent = {
      date: todayString,
      zodiac: zodiacVn[i],
      title: `${zodiacVn[i]} - ${todayString}`,
      overview: 'Hôm nay là một ngày tốt lành với cơ hội mới phát sinh.',
      loveForecast: 'Tình cảm được cải thiện, là lúc tốt để giao tiếp với người thân yêu.',
      careerForecast: 'Công việc tiến triển tốt, hãy tận dụng cơ hội.',
      financeForecast: 'Tài chính ổn định, có khả năng có thêm nguồn thu.',
      healthForecast: 'Sức khỏe bình thường, hãy giữ gìn lối sống lành mạnh.',
      luckyColor: 'Đỏ',
      luckyDirection: 'Đông',
      luckyHour: 'Tý (23-1 giờ)',
      scores: {
        overall: 7,
        love: 7,
        career: 8,
        finance: 6,
        health: 7,
      },
      rating: 'good',
    }

    try {
      // Delete existing record if it exists to avoid constraint issues
      await prisma.dailyHoroscope.deleteMany({
        where: {
          date: todayDate,
          zodiac: zodiacs[i],
        },
      })

      // Create new horoscope
      await prisma.dailyHoroscope.create({
        data: {
          date: todayDate,
          zodiac: zodiacs[i],
          content: horoscopeContent as any,
        },
      })
    } catch (error) {
      console.warn(`⚠️  Failed to create horoscope for ${zodiacVn[i]}: ${(error as Error).message}`)
    }
  }

  console.log('✅ Daily horoscopes created for today')
  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
