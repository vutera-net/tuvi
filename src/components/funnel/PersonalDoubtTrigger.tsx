'use client'

import { trackCTAClick } from '@/lib/analytics'

const ANMENH_URL = 'https://anmenh.vutera.net'

type TriggerVariant = 'subtle' | 'prominent'

interface PersonalDoubtTriggerProps {
  variant?: TriggerVariant
  context?: 'tuvi' | 'phongthuy' | 'ngaytot' | 'horoscope' | 'default'
  className?: string
}

const CONTEXT_TEXT = {
  tuvi: 'Kết quả này chỉ dựa trên ngày sinh — chưa xét giờ sinh. Độ chính xác có thể thay đổi đáng kể theo giờ sinh của bạn.',
  phongthuy: 'Kết quả Bát Trạch mang tính tổng quan. Để biết hướng bố trí cụ thể theo từng phòng và căn nhà thực tế của bạn, cần thêm thông tin tại AnMenh.',
  ngaytot: 'Danh sách ngày tốt này chưa lọc theo tuổi của bạn. Kết quả thực tế có thể khác nếu xét Tam Nương và Sát Chủ theo tuổi.',
  horoscope: 'Dự báo này áp dụng chung cho tất cả người sinh năm đó. Dự báo cá nhân theo mệnh và giờ sinh có thể khác đáng kể.',
  default: 'Kết quả này mang tính tổng quan theo năm sinh. Để chính xác hơn, cần thêm giờ sinh và thông tin cá nhân của bạn.',
}

export function PersonalDoubtTrigger({
  variant = 'subtle',
  context = 'default',
  className = '',
}: PersonalDoubtTriggerProps) {
  const text = CONTEXT_TEXT[context]

  if (variant === 'prominent') {
    return (
      <div className={`flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 ${className}`}>
        <span className="mt-0.5 shrink-0 text-lg">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-900">Lưu ý về độ chính xác</p>
          <p className="mt-1 text-sm text-amber-800">{text}</p>
          <a
            href={ANMENH_URL}
            onClick={() => trackCTAClick('doubt_trigger_prominent', context)}
            className="mt-2 inline-block text-xs font-semibold text-amber-700 underline hover:text-amber-900"
          >
            Xem kết quả chính xác hơn tại AnMenh →
          </a>
        </div>
      </div>
    )
  }

  // subtle (default) — inline text callout
  return (
    <p className={`text-xs text-gray-400 italic ${className}`}>
      * {text}{' '}
      <a 
        href={ANMENH_URL} 
        onClick={() => trackCTAClick('doubt_trigger_subtle', context)}
        className="font-medium text-purple-500 not-italic hover:text-purple-700"
      >
        Xem tại AnMenh →
      </a>
    </p>
  )
}
