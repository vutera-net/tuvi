import type { Metadata } from 'next'
import { NgayTotForm } from '@/components/ngaytot/NgayTotForm'
import { QuickDateCheck } from '@/components/ngaytot/QuickDateCheck'
import { AnMenhCTA } from '@/components/funnel/AnMenhCTA'
import { PersonalDoubtTrigger } from '@/components/funnel/PersonalDoubtTrigger'

export const metadata: Metadata = {
  title: 'Xem Ngày Tốt Xấu',
  description:
    'Chọn ngày tốt cho cưới hỏi, khai trương, động thổ, nhập trạch, xuất hành. Xem Hoàng Đạo, Hắc Đạo, Trực, 28 Sao.',
}

export default function XemNgayPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Xem Ngày Tốt Xấu</h1>
        <p className="mt-2 text-gray-600">
          Tìm ngày tốt cho sự kiện quan trọng dựa trên Trực, 28 Sao, Hoàng Đạo
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2">
          <NgayTotForm />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickDateCheck />
          <AnMenhCTA context="ngaytot" variant="card" />
        </div>
      </div>

      <div className="mt-8">
        <PersonalDoubtTrigger context="ngaytot" variant="subtle" />
      </div>
    </div>
  )
}
