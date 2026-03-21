import type { Metadata } from 'next'
import { XemMenhForm } from '@/components/common/XemMenhForm'

export const metadata: Metadata = {
  title: 'Xem Mệnh Ngũ Hành',
  description:
    'Xác định mệnh Ngũ Hành (Kim Mộc Thủy Hỏa Thổ) theo năm sinh. Xem màu sắc may mắn, hướng tốt và tính cách theo mệnh.',
}

export default function XemMenhPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Luận Mệnh Ngũ Hành</h1>
        <p className="mt-2 text-gray-600">
          Nhập năm sinh để xác định mệnh Nạp Âm Ngũ Hành và phân tích vận mệnh
        </p>
      </div>
      <XemMenhForm />
    </div>
  )
}
