'use client'

interface AdSlotProps {
  size?: 'leaderboard' | 'rectangle' | 'banner'
  className?: string
  'data-slot'?: string
}

const SIZE_CLASSES: Record<NonNullable<AdSlotProps['size']>, string> = {
  leaderboard: 'h-[90px] w-full max-w-[728px]',
  rectangle:   'h-[250px] w-[300px]',
  banner:      'h-[60px] w-full',
}

/**
 * Placeholder ad slot — replace inner content with real AdSense tag when ready.
 * Only render for free-tier users (check subscription in parent server component).
 */
export function AdSlot({ size = 'leaderboard', className = '', 'data-slot': slot }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 ${SIZE_CLASSES[size]} ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      {/* TODO: Replace with AdSense snippet
        <ins className="adsbygoogle"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span className="text-xs text-gray-400">Quảng cáo</span>
    </div>
  )
}
