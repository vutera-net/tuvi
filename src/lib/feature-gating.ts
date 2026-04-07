/**
 * Feature Gating System
 * Controls feature access based on subscription tier
 */

import { SubscriptionTier } from '@/data/pricing'

export interface FeatureGate {
  name: string
  requiredTier: SubscriptionTier
  description: string
}

export const FEATURE_GATES: Record<string, FeatureGate> = {
  // Tu Vi Features
  tuvi_unlimited: {
    name: 'tuvi_unlimited',
    requiredTier: 'premium',
    description: 'Unlimited Tu Vi chart generation',
  },
  tuvi_detailed_analysis: {
    name: 'tuvi_detailed_analysis',
    requiredTier: 'premium',
    description: 'Detailed star analysis in Tu Vi chart',
  },
  tuvi_tieu_han: {
    name: 'tuvi_tieu_han',
    requiredTier: 'vip',
    description: 'Yearly (Tieu Han) analysis',
  },
  tuvi_chart_comparison: {
    name: 'tuvi_chart_comparison',
    requiredTier: 'vip',
    description: 'Compare two Tu Vi charts',
  },
  tuvi_pdf_export: {
    name: 'tuvi_pdf_export',
    requiredTier: 'vip',
    description: 'Export Tu Vi chart as PDF',
  },

  // Date Selection Features
  ngaytot_age_filter: {
    name: 'ngaytot_age_filter',
    requiredTier: 'premium',
    description: 'Filter good dates by age',
  },
  ngaytot_event_filter: {
    name: 'ngaytot_event_filter',
    requiredTier: 'premium',
    description: 'Filter good dates by event type',
  },

  // Destiny Features
  destiny_compatibility: {
    name: 'destiny_compatibility',
    requiredTier: 'premium',
    description: 'Check compatibility between 2 people',
  },

  // Feng Shui Features
  phongthuy_detailed: {
    name: 'phongthuy_detailed',
    requiredTier: 'premium',
    description: 'Detailed direction analysis',
  },
  phongthuy_flying_stars: {
    name: 'phongthuy_flying_stars',
    requiredTier: 'premium',
    description: 'Cuu Cung (Flying Stars) analysis',
  },
  phongthuy_interior: {
    name: 'phongthuy_interior',
    requiredTier: 'vip',
    description: 'Interior feng shui rules & recommendations',
  },

  // Horoscope Features
  horoscope_detailed: {
    name: 'horoscope_detailed',
    requiredTier: 'premium',
    description: 'Detailed 5-dimension daily horoscope',
  },
  horoscope_notifications: {
    name: 'horoscope_notifications',
    requiredTier: 'vip',
    description: 'Daily push notifications for horoscope',
  },

  // Data Features
  search_history: {
    name: 'search_history',
    requiredTier: 'premium',
    description: 'Track and view search history',
  },

  // UX Features
  ad_free: {
    name: 'ad_free',
    requiredTier: 'premium',
    description: 'Remove advertisements',
  },
  priority_support: {
    name: 'priority_support',
    requiredTier: 'vip',
    description: 'Priority customer support',
  },
}

/**
 * Check if a subscription tier has access to a feature
 */
export function hasFeatureAccess(
  userTier: SubscriptionTier | null | undefined,
  featureName: string
): boolean {
  if (!userTier) userTier = 'free'

  const gate = FEATURE_GATES[featureName]
  if (!gate) {
    // Feature not gated, available to everyone
    return true
  }

  // Check tier hierarchy: vip > premium > free
  const tierHierarchy: Record<SubscriptionTier, number> = {
    free: 0,
    premium: 1,
    vip: 2,
  }

  return tierHierarchy[userTier] >= tierHierarchy[gate.requiredTier]
}

/**
 * Get upgrade requirement message for a feature
 */
export function getUpgradeMessage(featureName: string): string | null {
  const gate = FEATURE_GATES[featureName]
  if (!gate) return null

  const tierNames: Record<SubscriptionTier, string> = {
    free: 'Free',
    premium: 'Premium',
    vip: 'VIP',
  }

  return `This feature requires ${tierNames[gate.requiredTier]} subscription or higher.`
}

/**
 * Get all features for a subscription tier
 */
export function getFeaturesForTier(tier: SubscriptionTier): FeatureGate[] {
  return Object.values(FEATURE_GATES).filter((gate) => {
    const tierHierarchy: Record<SubscriptionTier, number> = {
      free: 0,
      premium: 1,
      vip: 2,
    }
    return tierHierarchy[tier] >= tierHierarchy[gate.requiredTier]
  })
}

/**
 * Get required tier for a feature
 */
export function getRequiredTier(featureName: string): SubscriptionTier | null {
  const gate = FEATURE_GATES[featureName]
  return gate ? gate.requiredTier : null
}

/**
 * Check if user needs to upgrade for feature
 */
export function needsUpgrade(
  userTier: SubscriptionTier | null | undefined,
  featureName: string
): boolean {
  if (!userTier) userTier = 'free'
  return !hasFeatureAccess(userTier, featureName)
}

/**
 * Middleware to check feature access
 */
export function checkFeatureAccess(
  userTier: SubscriptionTier | null | undefined,
  featureName: string
): {
  allowed: boolean
  message?: string
  requiredTier?: SubscriptionTier
} {
  if (hasFeatureAccess(userTier, featureName)) {
    return { allowed: true }
  }

  const requiredTier = getRequiredTier(featureName)
  return {
    allowed: false,
    message: `${featureName} requires ${requiredTier} subscription`,
    requiredTier: requiredTier || undefined,
  }
}
