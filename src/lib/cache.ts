/**
 * Redis Cache utility using Upstash
 */

import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return redis
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedis()
  if (!client) return null
  try {
    const data = await client.get<T>(key)
    return data
  } catch {
    return null
  }
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds = 86400): Promise<void> {
  const client = getRedis()
  if (!client) return
  try {
    await client.setex(key, ttlSeconds, value)
  } catch {
    // Fail silently - cache is non-critical
  }
}

export async function cacheDel(key: string): Promise<void> {
  const client = getRedis()
  if (!client) return
  try {
    await client.del(key)
  } catch {}
}

// TTL constants (in seconds)
export const TTL = {
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,
} as const

// Cache key builders
export const cacheKeys = {
  dayInfo: (year: number, month: number, day: number) => `day:${year}-${month}-${day}`,
  monthCalendar: (year: number, month: number) => `month:${year}-${month}`,
  tuViChart: (birthYear: number, birthMonth: number, birthDay: number, hour: number, gender: string) =>
    `tuvi:${birthYear}-${birthMonth}-${birthDay}-${hour}-${gender}`,
  batTrach: (birthYear: number, gender: string) => `battrach:${birthYear}-${gender}`,
  cuuCung: (year: number, month?: number) => `cuucung:${year}${month ? `-${month}` : ''}`,
  dailyHoroscope: (date: string, zodiac: string) => `horoscope:${date}-${zodiac}`,
  nguHanh: (birthYear: number) => `nguhanh:${birthYear}`,
}
