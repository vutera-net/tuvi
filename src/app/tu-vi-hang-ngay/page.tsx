import type { Metadata } from 'next'
import { HoroscopeView } from '@/components/common/HoroscopeView'

export const metadata: Metadata = {
  title: 'Tử Vi Hàng Ngày - 12 Con Giáp',
  description:
    'Tử vi hàng ngày cho 12 con giáp. Dự báo sự nghiệp, tài chính, tình cảm, sức khỏe và vận tổng quan.',
}

export default function TuViHangNgayPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Tử Vi Hàng Ngày</h1>
        <p className="mt-2 text-gray-600">Dự báo vận hàng ngày cho 12 con giáp</p>
      </div>
      <HoroscopeView />
    </div>
  )
}
