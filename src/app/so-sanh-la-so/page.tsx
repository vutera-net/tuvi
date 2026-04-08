import type { Metadata } from 'next'
import { ChartCompareForm } from '@/components/tuvi/ChartCompareForm'

export const metadata: Metadata = {
  title: 'So sánh 2 Lá Số Tử Vi | Harmony Tử Vi',
  description:
    'So sánh 2 lá số Tử Vi: phân tích tương hợp ngũ hành, cung phu thê, đại hạn hiện tại và điểm tương hợp tổng thể.',
}

export default function SoSanhLaSoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
          Tử Vi Đẩu Số
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
          So Sánh 2 Lá Số
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-500">
          Phân tích tương hợp ngũ hành, cung phu thê và đại hạn giữa 2 người.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <ChartCompareForm />
      </div>
    </div>
  )
}
