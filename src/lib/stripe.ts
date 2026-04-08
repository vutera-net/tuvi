/**
 * Stripe Integration for Payment Processing
 * Handles subscription management and payments
 */

import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

// Initialize Stripe (requires STRIPE_SECRET_KEY in environment)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia' as any,
})

/**
 * Price IDs from Stripe Dashboard
 * Must be configured in Stripe account
 */
export const STRIPE_PRICES = {
  premium_monthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY || 'price_xxx',
  premium_yearly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY || 'price_xxx',
  vip_monthly: process.env.NEXT_PUBLIC_STRIPE_VIP_MONTHLY || 'price_xxx',
  vip_yearly: process.env.NEXT_PUBLIC_STRIPE_VIP_YEARLY || 'price_xxx',
}

export interface CheckoutSessionParams {
  priceId: string
  userId: string
  email: string
  successUrl: string
  cancelUrl: string
}

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(params: CheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.email,
      metadata: {
        userId: params.userId,
      },
      // Enable promotions
      allow_promotion_codes: true,
      // Automatically tax calculation
      automatic_tax: {
        enabled: true,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

/**
 * Get customer portal session for managing subscriptions
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        return handleSubscriptionChange(event.data.object as Stripe.Subscription)

      case 'customer.subscription.deleted':
        return handleSubscriptionCancellation(event.data.object as Stripe.Subscription)

      case 'invoice.payment_succeeded':
        return handlePaymentSuccess(event.data.object as Stripe.Invoice)

      case 'invoice.payment_failed':
        return handlePaymentFailed(event.data.object as Stripe.Invoice)

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error handling webhook:', error)
    throw error
  }
}

/**
 * Handle subscription creation/update
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  const status = subscription.status
  const currentPeriodEnd = new Date((subscription as any).current_period_end * 1000)

  // Determine tier from price ID
  let tier: 'premium' | 'vip' = 'premium'
  const priceId = subscription.items.data[0]?.price.id

  if (
    priceId === STRIPE_PRICES.vip_monthly ||
    priceId === STRIPE_PRICES.vip_yearly
  ) {
    tier = 'vip'
  }

  if (['active', 'trialing'].includes(status)) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: tier,
        subExpiresAt: currentPeriodEnd,
      },
    })
  } else {
    // past_due, unpaid, paused → downgrade
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: 'free',
        subExpiresAt: null,
      },
    })
  }
}

/**
 * Handle subscription cancellation (customer.subscription.deleted)
 * Fires after period end when cancel_at_period_end was set
 */
async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscription: 'free',
      subExpiresAt: null,
    },
  })
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(invoice: Stripe.Invoice) {
  // Subscription renewal is handled by handleSubscriptionChange (subscription.updated event)
  // Nothing extra needed here
}

/**
 * Handle failed payment — downgrade after invoice finalization failure
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription
  if (!subscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const userId = subscription.metadata?.userId
  if (!userId) return

  // Only downgrade if subscription is now in a bad state
  if (['past_due', 'unpaid'].includes(subscription.status)) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: 'free',
        subExpiresAt: null,
      },
    })
  }
}

/**
 * Get subscription details
 */
export async function getSubscriptionDetails(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    throw error
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return subscription
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    throw error
  }
}

/**
 * Get customer subscriptions
 */
export async function getCustomerSubscriptions(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    })
    return subscriptions.data
  } catch (error) {
    console.error('Error retrieving subscriptions:', error)
    throw error
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(body: string, signature: string): Stripe.Event | null {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET not configured')
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    return event
  } catch (error) {
    console.error('Webhook verification failed:', error)
    return null
  }
}

/**
 * Create invoice for one-time purchase (PDF export, etc.)
 */
export async function createOneTimePurchaseCheckout(params: {
  userId: string
  email: string
  productName: string
  amount: number // in cents
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'vnd',
            product_data: {
              name: params.productName,
            },
            unit_amount: params.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.email,
      metadata: {
        userId: params.userId,
        productType: 'one_time_purchase',
      },
    })

    return session
  } catch (error) {
    console.error('Error creating one-time purchase:', error)
    throw error
  }
}
