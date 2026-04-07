/**
 * Pricing & Subscription Tiers
 * Defines feature availability for different subscription levels
 */

export type SubscriptionTier = 'free' | 'premium' | 'vip'

export interface PricingPlan {
  tier: SubscriptionTier
  name: string
  nameVi: string
  priceMonthly: number // VND
  priceYearly: number // VND
  priceYearlyDiscount: number // % discount
  description: string
  descriptionVi: string
  monthlyBilling: boolean
  bestFor: string
  features: PricingFeature[]
}

export interface PricingFeature {
  name: string
  nameVi: string
  free: boolean
  premium: boolean
  vip: boolean
  details?: string
}

// Feature list
const features: PricingFeature[] = [
  // Calendar Features
  {
    name: 'Lunar Calendar Conversion',
    nameVi: 'Chuyển đổi Lịch Âm-Dương',
    free: true,
    premium: true,
    vip: true,
  },
  {
    name: 'Can Chi & Tiet Khi Viewing',
    nameVi: 'Xem Can Chi & Tiết Khí',
    free: true,
    premium: true,
    vip: true,
  },

  // Destiny Features
  {
    name: 'Basic Ngu Hanh Analysis',
    nameVi: 'Phân tích Ngũ Hành Cơ Bản',
    free: true,
    premium: true,
    vip: true,
  },
  {
    name: 'Detailed Menh Interpretation',
    nameVi: 'Giải Thích Menh Chi Tiết',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: '2-Person Compatibility Check',
    nameVi: 'Kiểm Tra Hợp Menh 2 Người',
    free: false,
    premium: true,
    vip: true,
  },

  // Tu Vi Features
  {
    name: 'Tu Vi Chart Generation',
    nameVi: 'Tạo Lá Số Tử Vi',
    free: true,
    premium: true,
    vip: true,
    details: '3 charts/month',
  },
  {
    name: 'Unlimited Tu Vi Charts',
    nameVi: 'Lá Số Tử Vi Không Giới Hạn',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Detailed Star Analysis',
    nameVi: 'Phân Tích Sao Chi Tiết',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Tieu Han (Yearly) Analysis',
    nameVi: 'Phân Tích Tiểu Hạn (Năm)',
    free: false,
    premium: false,
    vip: true,
  },
  {
    name: 'Chart Comparison',
    nameVi: 'So Sánh 2 Lá Số',
    free: false,
    premium: false,
    vip: true,
  },
  {
    name: 'PDF Chart Export',
    nameVi: 'Xuất PDF Lá Số',
    free: false,
    premium: false,
    vip: true,
  },

  // Date Selection Features
  {
    name: 'Good Date Selection',
    nameVi: 'Xem Ngày Tốt Xấu',
    free: true,
    premium: true,
    vip: true,
    details: 'Basic (no filters)',
  },
  {
    name: 'Age-Based Date Filtering',
    nameVi: 'Lọc Ngày Theo Tuổi',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Event-Specific Filtering',
    nameVi: 'Lọc Ngày Theo Sự Kiện',
    free: false,
    premium: true,
    vip: true,
  },

  // Feng Shui Features
  {
    name: 'Bat Trach (8 Mansions)',
    nameVi: 'Bát Trạch (8 Cung)',
    free: true,
    premium: true,
    vip: true,
  },
  {
    name: 'Detailed Direction Analysis',
    nameVi: 'Phân Tích Hướng Chi Tiết',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Cuu Cung Flying Stars',
    nameVi: 'Cửu Cung Phi Tinh',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Interior Feng Shui Rules',
    nameVi: 'Quy Tắc Phong Thủy Nội Thất',
    free: false,
    premium: false,
    vip: true,
  },
  {
    name: 'Room Layout Recommendations',
    nameVi: 'Gợi Ý Bố Trí Phòng',
    free: false,
    premium: false,
    vip: true,
  },

  // Horoscope Features
  {
    name: 'Daily Horoscope Overview',
    nameVi: 'Tổng Quan Tu Vi Hàng Ngày',
    free: true,
    premium: true,
    vip: true,
  },
  {
    name: 'Detailed 5-Dimension Horoscope',
    nameVi: 'Tu Vi Hàng Ngày 5 Chiều Chi Tiết',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Daily Push Notifications',
    nameVi: 'Thông Báo Push Hàng Ngày',
    free: false,
    premium: false,
    vip: true,
  },

  // Data & History
  {
    name: 'Save Tu Vi Charts',
    nameVi: 'Lưu Lá Số Tử Vi',
    free: true,
    premium: true,
    vip: true,
  },
  {
    name: 'Search History Tracking',
    nameVi: 'Lưu Lịch Sử Tra Cứu',
    free: false,
    premium: true,
    vip: true,
  },

  // User Experience
  {
    name: 'Advertisements',
    nameVi: 'Có Quảng Cáo',
    free: true,
    premium: false,
    vip: false,
  },
  {
    name: 'Ad-Free Experience',
    nameVi: 'Không Có Quảng Cáo',
    free: false,
    premium: true,
    vip: true,
  },
  {
    name: 'Priority Support',
    nameVi: 'Hỗ Trợ Ưu Tiên',
    free: false,
    premium: false,
    vip: true,
  },
]

// Pricing Plans
export const PRICING_PLANS: Record<SubscriptionTier, PricingPlan> = {
  free: {
    tier: 'free',
    name: 'Free',
    nameVi: 'Miễn Phí',
    priceMonthly: 0,
    priceYearly: 0,
    priceYearlyDiscount: 0,
    description: 'Explore basic feng shui and destiny features',
    descriptionVi: 'Khám phá các tính năng phong thủy và xem mệnh cơ bản',
    monthlyBilling: false,
    bestFor: 'Curious beginners exploring feng shui',
    features: features.filter((f) => f.free),
  },
  premium: {
    tier: 'premium',
    name: 'Premium',
    nameVi: 'Premium',
    priceMonthly: 99000, // ~$4 USD
    priceYearly: 799000, // ~$31 USD, ~2 months free
    priceYearlyDiscount: 33,
    description: 'Full access to Tu Vi charts, date selection, and feng shui analysis',
    descriptionVi: 'Truy cập đầy đủ lá số Tử Vi, xem ngày tốt, và phân tích phong thủy',
    monthlyBilling: true,
    bestFor: 'Regular users seeking detailed spiritual guidance',
    features: features.filter((f) => f.premium),
  },
  vip: {
    tier: 'vip',
    name: 'VIP',
    nameVi: 'VIP',
    priceMonthly: 199000, // ~$8 USD
    priceYearly: 1499000, // ~$58 USD, ~2.5 months free
    priceYearlyDiscount: 38,
    description: 'Premium plus advanced analysis, interior feng shui, and personal consulting',
    descriptionVi: 'Premium cộng phân tích nâng cao, phong thủy nội thất, và tư vấn cá nhân',
    monthlyBilling: true,
    bestFor: 'Serious practitioners needing complete guidance',
    features: features.filter((f) => f.vip),
  },
}

// Helper functions
export function getPricingPlan(tier: SubscriptionTier): PricingPlan {
  return PRICING_PLANS[tier]
}

export function getPricePer12Months(tier: SubscriptionTier): number {
  const plan = PRICING_PLANS[tier]
  return plan.priceYearly || plan.priceMonthly * 12
}

export function getYearlySavings(tier: SubscriptionTier): number {
  const plan = PRICING_PLANS[tier]
  if (!plan.priceYearly) return 0
  const monthlyTotal = plan.priceMonthly * 12
  return monthlyTotal - plan.priceYearly
}

export function isFeatureAvailable(
  feature: string,
  tier: SubscriptionTier
): boolean {
  const plan = PRICING_PLANS[tier]
  const featureData = features.find((f) => f.name === feature)
  if (!featureData) return false
  return featureData[tier]
}

export const ALL_FEATURES = features
