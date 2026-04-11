'use client'

import { useEffect, useState } from 'react'

const ANMENH_URL = 'https://anmenh.vutera.net'
const STORAGE_KEY = 'tuvi_sticky_cta_dismissed'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return
    }

    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(scrollPct > 0.3 && scrollPct < 0.85)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  function trackClick() {
    if (window.gtag) {
      window.gtag('event', 'tuvi_cta_click', {
        cta_variant: 'sticky',
        destination: 'anmenh',
      })
    }
  }

  if (dismissed || !visible) return null

  return (
    <div className="fixed bottom-6 right-4 z-50 flex items-center gap-2 md:right-6">
      <a
        href={ANMENH_URL}
        onClick={trackClick}
        className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
      >
        <span>🔮</span>
        <span>Xem bản cá nhân</span>
        <span>→</span>
      </a>
      <button
        onClick={handleDismiss}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-xs text-white opacity-60 transition hover:opacity-100"
        aria-label="Đóng"
      >
        ✕
      </button>
    </div>
  )
}

// Typed window for GA4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
