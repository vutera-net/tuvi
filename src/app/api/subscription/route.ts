import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/subscription
 * Get user's current subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        subscription: true,
        subExpiresAt: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const now = new Date()
    const isExpired = user.subExpiresAt && user.subExpiresAt < now

    return NextResponse.json({
      subscription: isExpired ? 'free' : user.subscription,
      expiresAt: user.subExpiresAt,
      isActive: !isExpired && user.subscription !== 'free',
      memberSince: user.createdAt,
    })
  } catch (error) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/subscription/upgrade
 * Initiate subscription upgrade (prepare for Stripe)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tier, billingCycle } = body

    if (!tier || !['premium', 'vip'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      )
    }

    if (!billingCycle || !['monthly', 'yearly'].includes(billingCycle)) {
      return NextResponse.json(
        { error: 'Invalid billing cycle' },
        { status: 400 }
      )
    }

    // TODO: Integrate with Stripe API
    // This is a placeholder for Stripe session creation
    const stripeSessionId = `stripe_${Date.now()}_${Math.random()}`

    return NextResponse.json({
      sessionId: stripeSessionId,
      tier,
      billingCycle,
      message: 'Payment session prepared. Integrate with Stripe to complete.',
      status: 'pending_payment',
    })
  } catch (error) {
    console.error('Subscription upgrade error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate upgrade' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/subscription
 * Update subscription (admin or webhook from Stripe)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, tier, expiresAt } = body

    // TODO: Verify webhook signature from Stripe

    if (!userId || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: tier,
        subExpiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      select: {
        id: true,
        email: true,
        subscription: true,
        subExpiresAt: true,
      },
    })

    return NextResponse.json({
      message: 'Subscription updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Subscription update error:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/subscription
 * Cancel subscription
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        subscription: 'free',
        subExpiresAt: null,
      },
      select: {
        id: true,
        email: true,
        subscription: true,
      },
    })

    return NextResponse.json({
      message: 'Subscription cancelled',
      user,
    })
  } catch (error) {
    console.error('Subscription cancellation error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
