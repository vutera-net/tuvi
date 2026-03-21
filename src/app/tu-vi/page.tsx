import type { Metadata } from 'next'
import { TuViForm } from '@/components/tuvi/TuViForm'

export const metadata: Metadata = {
  title: 'Lập Lá Số Tử Vi Đẩu Số',
  description:
    'Lập lá số Tử Vi Đẩu Số đầy đủ với 14 chính tinh, 12 cung và Đại Hạn. Giải nghĩa chi tiết từng cung, từng sao.',
}

export default function TuViPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Lá Số Tử Vi Đẩu Số</h1>
        <p className="mt-2 text-gray-600">
          Nhập thông tin để lập lá số Tử Vi với 14 chính tinh, 12 cung đầy đủ
        </p>
      </div>
      <TuViForm />
    </div>
  )
}
