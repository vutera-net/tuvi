/**
 * Pricing and Monetization Tests
 */

import { getPricingPlan, isFeatureAvailable, getYearlySavings } from '@/lib/pricing'
import { hasFeatureAccess, needsUpgrade, getRequiredTier, FEATURE_GATES } from '@/lib/feature-gating'

describe('Pricing System', () => {
  describe('getPricingPlan', () => {
    it('should return free plan', () => {
      const plan = getPricingPlan('free')
      expect(plan).toBeDefined()
      expect(plan.tier).toBe('free')
      expect(plan.monthlyPrice).toBe(0)
    })

    it('should return premium plan with pricing', () => {
      const plan = getPricingPlan('premium')
      expect(plan).toBeDefined()
      expect(plan.tier).toBe('premium')
      expect(plan.monthlyPrice).toBe(99000)
      expect(plan.yearlyPrice).toBe(799000)
    })

    it('should return vip plan with pricing', () => {
      const plan = getPricingPlan('vip')
      expect(plan).toBeDefined()
      expect(plan.tier).toBe('vip')
      expect(plan.monthlyPrice).toBe(199000)
      expect(plan.yearlyPrice).toBe(1499000)
    })

    it('should have correct yearly discount for premium', () => {
      const plan = getPricingPlan('premium')
      const monthlyTotal = plan.monthlyPrice * 12
      const yearlyPrice = plan.yearlyPrice
      expect(yearlyPrice).toBeLessThan(monthlyTotal)
    })

    it('should have correct yearly discount for vip', () => {
      const plan = getPricingPlan('vip')
      const monthlyTotal = plan.monthlyPrice * 12
      const yearlyPrice = plan.yearlyPrice
      expect(yearlyPrice).toBeLessThan(monthlyTotal)
    })
  })

  describe('getYearlySavings', () => {
    it('should calculate savings for premium yearly plan', () => {
      const plan = getPricingPlan('premium')
      const savings = getYearlySavings(plan.monthlyPrice, plan.yearlyPrice)
      expect(savings).toBeGreaterThan(0)
      expect(savings).toBeLessThanOrEqual(100) // Percentage
    })

    it('should calculate savings for vip yearly plan', () => {
      const plan = getPricingPlan('vip')
      const savings = getYearlySavings(plan.monthlyPrice, plan.yearlyPrice)
      expect(savings).toBeGreaterThan(0)
      expect(savings).toBeLessThanOrEqual(100)
    })

    it('should return 0 savings for free tier', () => {
      const savings = getYearlySavings(0, 0)
      expect(savings).toBe(0)
    })
  })

  describe('isFeatureAvailable', () => {
    it('should make common features available for all tiers', () => {
      expect(isFeatureAvailable('calendar', 'free')).toBe(true)
      expect(isFeatureAvailable('calendar', 'premium')).toBe(true)
      expect(isFeatureAvailable('calendar', 'vip')).toBe(true)
    })

    it('should restrict unlimited tu vi to premium+', () => {
      expect(isFeatureAvailable('tuvi_unlimited', 'free')).toBe(false)
      expect(isFeatureAvailable('tuvi_unlimited', 'premium')).toBe(true)
      expect(isFeatureAvailable('tuvi_unlimited', 'vip')).toBe(true)
    })

    it('should restrict vip features to vip tier', () => {
      expect(isFeatureAvailable('pdf_export', 'free')).toBe(false)
      expect(isFeatureAvailable('pdf_export', 'premium')).toBe(false)
      expect(isFeatureAvailable('pdf_export', 'vip')).toBe(true)
    })
  })
})

describe('Feature Gating', () => {
  describe('hasFeatureAccess', () => {
    it('should allow free tier access to free features', () => {
      expect(hasFeatureAccess('calendar', 'free')).toBe(true)
      expect(hasFeatureAccess('xem_menh', 'free')).toBe(true)
    })

    it('should deny free tier access to premium features', () => {
      expect(hasFeatureAccess('tuvi_unlimited', 'free')).toBe(false)
      expect(hasFeatureAccess('ngaytot_age_filter', 'free')).toBe(false)
    })

    it('should allow premium tier access to premium features', () => {
      expect(hasFeatureAccess('tuvi_unlimited', 'premium')).toBe(true)
      expect(hasFeatureAccess('compatibility_detailed', 'premium')).toBe(true)
    })

    it('should deny premium tier access to vip features', () => {
      expect(hasFeatureAccess('pdf_export', 'premium')).toBe(false)
      expect(hasFeatureAccess('horoscope_notifications', 'premium')).toBe(false)
    })

    it('should allow vip tier access to all features', () => {
      expect(hasFeatureAccess('tuvi_unlimited', 'vip')).toBe(true)
      expect(hasFeatureAccess('pdf_export', 'vip')).toBe(true)
      expect(hasFeatureAccess('calendar', 'vip')).toBe(true)
    })
  })

  describe('needsUpgrade', () => {
    it('should return true if feature not available', () => {
      const needs = needsUpgrade('tuvi_unlimited', 'free')
      expect(needs).toBe(true)
    })

    it('should return false if feature available', () => {
      const needs = needsUpgrade('tuvi_unlimited', 'premium')
      expect(needs).toBe(false)
    })

    it('should return upgrade tier required', () => {
      const result = needsUpgrade('pdf_export', 'premium')
      expect(result).toBe(true)
    })
  })

  describe('getRequiredTier', () => {
    it('should return tier for calendar feature (free)', () => {
      const tier = getRequiredTier('calendar')
      expect(tier).toBe('free')
    })

    it('should return tier for unlimited tu vi (premium)', () => {
      const tier = getRequiredTier('tuvi_unlimited')
      expect(tier).toBe('premium')
    })

    it('should return tier for pdf export (vip)', () => {
      const tier = getRequiredTier('pdf_export')
      expect(tier).toBe('vip')
    })
  })

  describe('Feature Gates Coverage', () => {
    it('should have gates for all major features', () => {
      const requiredFeatures = [
        'calendar',
        'xem_menh',
        'tuvi_basic',
        'tuvi_unlimited',
        'ngaytot_check',
        'ngaytot_age_filter',
        'phongthuy_battrach',
        'phongthuy_interior',
        'daily_horoscope',
        'horoscope_notifications',
        'pdf_export',
        'chart_comparison',
      ]

      requiredFeatures.forEach((feature) => {
        expect(FEATURE_GATES[feature]).toBeDefined()
      })
    })

    it('should have tier hierarchy: free < premium < vip', () => {
      const freeTier = Object.entries(FEATURE_GATES).filter(([_, gate]) => gate.tier === 'free')
      const premiumTier = Object.entries(FEATURE_GATES).filter(([_, gate]) => gate.tier === 'premium')
      const vipTier = Object.entries(FEATURE_GATES).filter(([_, gate]) => gate.tier === 'vip')

      expect(freeTier.length).toBeGreaterThan(0)
      expect(premiumTier.length).toBeGreaterThan(0)
      expect(vipTier.length).toBeGreaterThan(0)
      expect(freeTier.length).toBeGreaterThanOrEqual(premiumTier.length)
      expect(premiumTier.length).toBeGreaterThanOrEqual(vipTier.length)
    })
  })

  describe('Vietnamese Market Pricing', () => {
    it('should use Vietnamese Dong (VND)', () => {
      const plan = getPricingPlan('premium')
      expect(plan.currency).toBe('VND')
    })

    it('should use realistic Vietnamese pricing', () => {
      const free = getPricingPlan('free')
      const premium = getPricingPlan('premium')
      const vip = getPricingPlan('vip')

      // Free < Premium < VIP
      expect(free.monthlyPrice).toBe(0)
      expect(premium.monthlyPrice).toBeGreaterThan(0)
      expect(vip.monthlyPrice).toBeGreaterThan(premium.monthlyPrice)

      // Prices should be in 1000s (Vietnamese pricing convention)
      expect(premium.monthlyPrice % 1000).toBe(0)
      expect(vip.monthlyPrice % 1000).toBe(0)
    })
  })
})
