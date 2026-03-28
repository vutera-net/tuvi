import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'
import { STRIPE_PRICES } from '@/lib/stripe'

/**
 * POST /api/checkout
 * Create a Stripe checkout session for subscription upgrade
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

    // Determine price ID
    let priceId: string
    if (tier === 'premium') {
      priceId =
        billingCycle === 'monthly'
          ? STRIPE_PRICES.premium_monthly
          : STRIPE_PRICES.premium_yearly
    } else {
      priceId =
        billingCycle === 'monthly'
          ? STRIPE_PRICES.vip_monthly
          : STRIPE_PRICES.vip_yearly
    }

    if (
      priceId.includes('xxx') ||
      !process.env.STRIPE_SECRET_KEY ||
      !process.env.NEXT_PUBLIC_STRIPE_KEY
    ) {
      return NextResponse.json(
        {
          error: 'Payment system not configured. Please contact support.',
          setupRequired: true,
        },
        { status: 503 }
      )
    }

    // Get the origin for success/cancel URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Create checkout session
    const checkoutSession = await createCheckoutSession({
      priceId,
      userId: session.user.id || '',
      email: session.user.email,
      successUrl: `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/pricing`,
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
