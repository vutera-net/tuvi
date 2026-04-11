import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PRICING_PLANS } from '@/data/pricing'
import { UpgradeButton, CancelSubscriptionButton, ContactSupportLink } from './SubscriptionActions'

export const metadata: Metadata = {
  title: 'Tài khoản | Harmony Tử Vi',
  description: 'Quản lý tài khoản và gói đăng ký Harmony Tử Vi.',
}

const TIER_LABEL: Record<string, string> = {
  free: 'Miễn Phí',
  premium: 'Premium',
  vip: 'VIP',
}

const TIER_COLOR: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  premium: 'bg-amber-100 text-amber-800',
  vip: 'bg-red-100 text-red-800',
}

export default async function TaiKhoanPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/dang-nhap?next=/tai-khoan')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      subscription: true,
      subExpiresAt: true,
      createdAt: true,
      _count: { select: { charts: true } },
    },
  })

  if (!user) redirect('/dang-nhap')

  const now = new Date()
  const isExpired = user.subExpiresAt && user.subExpiresAt < now
  const tier = isExpired ? 'free' : (user.subscription as 'free' | 'premium' | 'vip')
  const plan = PRICING_PLANS[tier]
  const isPaid = tier !== 'free'

  const expiresLabel = user.subExpiresAt
    ? new Date(user.subExpiresAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  const memberSince = new Date(user.createdAt).toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
            Tài Khoản
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900">
                {user.name || user.email}
              </h1>
              <p className="mt-1 text-sm text-gray-500">Thành viên từ {memberSince}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${TIER_COLOR[tier]}`}>
              {TIER_LABEL[tier]}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-5">

          {/* Left: Current plan */}
          <div className="md:col-span-3 space-y-6">

            {/* Plan info card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Gói hiện tại</h2>

              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${TIER_COLOR[tier]}`}>
                  {plan.nameVi}
                </span>
                {isPaid && expiresLabel && (
                  <span className="text-sm text-gray-500">
                    {isExpired ? '⚠️ Đã hết hạn' : `Hết hạn ${expiresLabel}`}
                  </span>
                )}
              </div>

              <p className="mb-5 text-sm text-gray-600">{plan.descriptionVi}</p>

              {/* Usage stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-2xl font-bold text-gray-900">{user._count.charts}</p>
                  <p className="text-xs text-gray-500">Lá số đã tạo</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-2xl font-bold text-gray-900">
                    {tier === 'free' ? '3/tháng' : '∞'}
                  </p>
                  <p className="text-xs text-gray-500">Giới hạn lá số</p>
                </div>
              </div>
            </div>

            {/* Features included */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Tính năng của bạn</h2>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f.name} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-green-500">✓</span>
                    <span className="text-gray-700">{f.nameVi}</span>
                    {f.details && <span className="text-xs text-gray-400">({f.details})</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Upgrade / Actions */}
          <div className="md:col-span-2 space-y-5">

            {/* Upgrade section */}
            {tier === 'free' && (
              <>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h3 className="mb-1 font-semibold text-amber-900">Nâng lên Premium</h3>
                  <p className="mb-4 text-xs text-amber-700">
                    Lá số không giới hạn, xem ngày lọc theo tuổi, phong thủy chi tiết.
                  </p>
                  <div className="mb-3 text-center">
                    <span className="text-2xl font-bold text-amber-900">99.000đ</span>
                    <span className="text-xs text-amber-700">/tháng</span>
                  </div>
                  <UpgradeButton tier="premium" label="Nâng lên Premium" />
                </div>

                <div className="rounded-2xl border-2 p-5" style={{ borderColor: 'var(--color-primary)', background: '#fff8f0' }}>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Nâng lên VIP</h3>
                    <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                      Phổ biến
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-gray-600">
                    Tất cả Premium + Tiểu Vận, so sánh lá số, xuất PDF, hỗ trợ ưu tiên.
                  </p>
                  <div className="mb-3 text-center">
                    <span className="text-2xl font-bold text-gray-900">199.000đ</span>
                    <span className="text-xs text-gray-500">/tháng</span>
                  </div>
                  <UpgradeButton tier="vip" label="Nâng lên VIP" highlight />
                </div>
              </>
            )}

            {tier === 'premium' && (
              <div className="rounded-2xl border-2 p-5" style={{ borderColor: 'var(--color-primary)', background: '#fff8f0' }}>
                <h3 className="mb-1 font-semibold text-gray-900">Nâng lên VIP</h3>
                <p className="mb-4 text-xs text-gray-600">
                  Mở thêm Tiểu Vận, so sánh lá số, xuất PDF và hỗ trợ ưu tiên.
                </p>
                <div className="mb-3 text-center">
                  <span className="text-2xl font-bold text-gray-900">199.000đ</span>
                  <span className="text-xs text-gray-500">/tháng</span>
                </div>
                <UpgradeButton tier="vip" label="Nâng lên VIP" highlight />
              </div>
            )}

            {tier === 'vip' && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                <p className="text-3xl mb-2">🏆</p>
                <p className="font-semibold text-gray-800">Bạn đang dùng gói cao nhất!</p>
                <p className="mt-1 text-xs text-gray-500">Tất cả tính năng đã được mở khóa.</p>
              </div>
            )}

            {/* Support */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <p className="mb-3 text-sm text-gray-600">Cần trợ giúp về gói dịch vụ?</p>
              <ContactSupportLink />
            </div>

            {/* Cancel */}
            {isPaid && !isExpired && (
              <div className="text-center">
                <CancelSubscriptionButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
