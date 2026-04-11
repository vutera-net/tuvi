'use client'

const ANMENH_URL = 'https://anmenh.vutera.net'

interface ContentLockProps {
  items: string[]
  context?: string
  buttonText?: string
  className?: string
}

function trackLockView(context: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_content_lock_view', { context })
  }
}

function trackLockClick(context: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_cta_click', {
      cta_variant: 'content_lock',
      context,
      destination: 'anmenh',
    })
  }
}

import { useSessionMemory } from '@/hooks/useSessionMemory'

export function ContentLock({
  items,
  context = 'default',
  buttonText = 'Tạo hồ sơ để xem',
  className = '',
}: ContentLockProps) {
  const { memory } = useSessionMemory()
  
  const hrefParams = new URLSearchParams()
  hrefParams.set('source', 'tuvi_lock')
  hrefParams.set('intent', context)
  if (memory?.birthYear) hrefParams.set('birthYear', memory.birthYear.toString())
  if (memory?.gender) hrefParams.set('gender', memory.gender)

  const href = `${ANMENH_URL}/bridge?${hrefParams.toString()}`
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-purple-100 bg-white ${className}`}
      // Trigger view tracking once when rendered
      ref={(el) => { if (el) trackLockView(context) }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-purple-100 bg-purple-50 px-5 py-3">
        <span className="text-base">🔒</span>
        <span className="text-sm font-semibold text-purple-900">Phần dành riêng cho bạn</span>
        <span className="ml-auto rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
          AnMenh
        </span>
      </div>

      {/* Locked items */}
      <div className="relative px-5 py-4">
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 shrink-0 text-purple-400">•</span>
              <span className="text-gray-500 blur-[3px] select-none">{item}</span>
            </li>
          ))}
        </ul>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* CTA */}
      <div className="border-t border-purple-50 bg-purple-50/50 px-5 py-4 text-center">
        <a
          href={href}
          onClick={() => trackLockClick(context)}
          className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
        >
          {buttonText} →
        </a>
        <p className="mt-2 text-xs text-gray-400">Miễn phí · Không cần thẻ tín dụng</p>
      </div>
    </div>
  )
}

// Typed window for GA4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
