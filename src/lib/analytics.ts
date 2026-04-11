declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackContentView(feature: string, page: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_content_view', { feature, page })
  }
}

export function trackCTAClick(variant: string, context: string, position?: string, ab_variant?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_cta_click', {
      cta_variant: variant,
      context,
      position,
      ab_variant,
      destination: 'anmenh',
    })
  }
}

export function trackContentLockView(context: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_content_lock_view', { context })
  }
}

export function trackAnMenhClick(source: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tuvi_anmenh_click', { source })
  }
}
