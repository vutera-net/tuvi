/**
 * Feature Gating Middleware
 * Validates user subscription tier and feature access for API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasFeatureAccess } from '@/lib/feature-gating'
import { prisma } from '@/lib/prisma'

export interface FeatureGateOptions {
  requiredFeature: string
  customErrorMessage?: string
}

/**
 * Middleware to check feature access for API routes
 * Usage: wrapWithFeatureGate(handler, { requiredFeature: 'tuvi_unlimited' })
 */
export async function checkFeatureAccess(
  request: NextRequest,
  requiredFeature: string
): Promise<{ hasAccess: boolean; user: any; message?: string }> {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return {
        hasAccess: false,
        user: null,
        message: 'Unauthorized - please sign in',
      }
    }

    // Get user subscription from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        subscription: true,
        subExpiresAt: true,
      },
    })

    if (!user) {
      return {
        hasAccess: false,
        user: null,
        message: 'User not found',
      }
    }

    // Check if subscription is expired
    if (user.subExpiresAt && new Date(user.subExpiresAt) < new Date()) {
      return {
        hasAccess: false,
        user,
        message: 'Subscription expired - please renew',
      }
    }

    // Check feature access
    const hasAccess = hasFeatureAccess((user.subscription as 'free' | 'premium' | 'vip') || 'free', requiredFeature)

    return {
      hasAccess,
      user,
      message: hasAccess ? undefined : `Feature '${requiredFeature}' requires ${requiredFeature.split('_')[0]} tier or higher`,
    }
  } catch (error) {
    console.error('Error checking feature access:', error)
    return {
      hasAccess: false,
      user: null,
      message: 'Error checking feature access',
    }
  }
}

/**
 * Middleware function to wrap API handlers
 */
export function withFeatureGate(requiredFeature: string, handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const { hasAccess, user, message } = await checkFeatureAccess(request, requiredFeature)

    if (!hasAccess) {
      return NextResponse.json({ error: message, tier: requiredFeature }, { status: 403 })
    }

    // Add user context to request
    ;(request as any).user = user

    return handler(request, context)
  }
}

/**
 * Check tier upgrade requirement
 */
export async function getTierUpgradeMessage(requiredFeature: string): Promise<string> {
  const featureTierMap: Record<string, string> = {
    tuvi_unlimited: 'premium',
    ngaytot_age_filter: 'premium',
    phongthuy_interior: 'premium',
    pdf_export: 'vip',
    horoscope_notifications: 'vip',
    chart_comparison: 'premium',
    compatibility_detailed: 'premium',
  }

  const requiredTier = featureTierMap[requiredFeature] || 'premium'
  return `This feature requires a ${requiredTier.toUpperCase()} subscription. Please upgrade to continue.`
}

/**
 * Middleware for checking free tier usage limits
 * e.g., max 3 Tu Vi charts per month for free users
 */
export async function checkUsageLimit(
  userId: string,
  feature: string,
  limit: number
): Promise<{ isWithinLimit: boolean; used: number; remaining: number }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        subscription: true,
        charts: true,
      },
    })

    if (!user || user.subscription !== 'free') {
      // Premium/VIP users have no limits
      return { isWithinLimit: true, used: 0, remaining: limit }
    }

    // Count usage in current month
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const used = user.charts.filter((chart: { createdAt: string | Date }) => {
      const created = new Date(chart.createdAt)
      return created >= monthStart && created <= monthEnd
    }).length

    const remaining = Math.max(0, limit - used)

    return {
      isWithinLimit: used < limit,
      used,
      remaining,
    }
  } catch (error) {
    console.error('Error checking usage limit:', error)
    return { isWithinLimit: true, used: 0, remaining: limit }
  }
}

/**
 * Log feature usage for analytics
 */
export async function logFeatureUsage(userId: string, feature: string, success: boolean) {
  try {
    // Could be extended to log to analytics service
    console.log(`Feature usage: ${feature} by user ${userId} - ${success ? 'success' : 'failed'}`)

    // In future, could log to analytics table:
    // await prisma.featureUsageLog.create({
    //   data: {
    //     userId,
    //     feature,
    //     success,
    //     timestamp: new Date(),
    //   },
    // })
  } catch (error) {
    console.error('Error logging feature usage:', error)
  }
}

/**
 * Middleware for routes that need subscription check
 */
export async function requireSubscription(request: NextRequest, tier: 'premium' | 'vip' = 'premium') {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { subscription: true, subExpiresAt: true },
    })

    if (!user || user.subscription === 'free') {
      return NextResponse.json(
        { error: 'Premium subscription required', tier, upgrade: true },
        { status: 403 }
      )
    }

    if (user.subExpiresAt && new Date(user.subExpiresAt) < new Date()) {
      return NextResponse.json({ error: 'Subscription expired', renew: true }, { status: 403 })
    }

    // Check tier requirement
    if (tier === 'vip' && user.subscription === 'premium') {
      return NextResponse.json({ error: 'VIP subscription required', tier: 'vip', upgrade: true }, { status: 403 })
    }

    return null // All checks passed
  } catch (error) {
    console.error('Error in subscription check:', error)
    return NextResponse.json({ error: 'Error checking subscription' }, { status: 500 })
  }
}
