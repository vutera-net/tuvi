import type { Metadata } from 'next'
import { NgayTotForm } from '@/components/ngaytot/NgayTotForm'

export const metadata: Metadata = {
  title: 'Xem Ngày Tốt Xấu',
  description:
    'Chọn ngày tốt cho cưới hỏi, khai trương, động thổ, nhập trạch, xuất hành. Xem Hoàng Đạo, Hắc Đạo, Trực, 28 Sao.',
}

export default function XemNgayPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Xem Ngày Tốt Xấu</h1>
        <p className="mt-2 text-gray-600">
          Tìm ngày tốt cho sự kiện quan trọng dựa trên Trực, 28 Sao, Hoàng Đạo
        </p>
      </div>
      <NgayTotForm />
    </div>
  )
}
