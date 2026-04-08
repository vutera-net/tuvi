'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UpgradeButtonProps {
  tier: 'premium' | 'vip'
  label: string
  highlight?: boolean
}

export function UpgradeButton({ tier, label, highlight }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billingCycle }),
      })
      const data = await res.json()

      if (data.setupRequired) {
        alert('Hệ thống thanh toán chưa được cấu hình. Vui lòng liên hệ hỗ trợ.')
        return
      }
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Billing cycle toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
            billingCycle === 'monthly'
              ? 'border-red-400 bg-red-50 text-red-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Hàng tháng
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
            billingCycle === 'yearly'
              ? 'border-red-400 bg-red-50 text-red-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Hàng năm
          <span className="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
            -{tier === 'premium' ? '33' : '38'}%
          </span>
        </button>
      </div>

      <button
        onClick={handleUpgrade}
        disabled={loading}
        className={`w-full rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 ${
          highlight ? '' : 'opacity-90'
        }`}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {loading ? 'Đang xử lý...' : label}
      </button>
    </div>
  )
}

export function CancelSubscriptionButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCancel() {
    setLoading(true)
    try {
      const res = await fetch('/api/subscription', { method: 'DELETE' })
      if (res.ok) {
        setOpen(false)
        router.refresh()
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại.')
      }
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-gray-400 underline underline-offset-2 hover:text-red-600"
      >
        Hủy đăng ký
      </button>

      {/* Confirmation modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Xác nhận hủy đăng ký</h3>
            <p className="mb-6 text-sm text-gray-600">
              Sau khi hủy, bạn vẫn dùng được gói hiện tại đến hết chu kỳ thanh toán.
              Sau đó tài khoản sẽ chuyển về gói Miễn Phí.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Giữ lại
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? 'Đang hủy...' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function ContactSupportLink() {
  return (
    <Link
      href="/lien-he"
      className="inline-block rounded-full border px-6 py-2.5 text-sm font-medium transition hover:bg-red-50"
      style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
    >
      Liên hệ hỗ trợ
    </Link>
  )
}
