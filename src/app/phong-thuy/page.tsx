import type { Metadata } from 'next'
import { PhongThuyForm } from '@/components/phongthuy/PhongThuyForm'

export const metadata: Metadata = {
  title: 'Phong Thủy Nhà Ở - Bát Trạch & Cửu Cung',
  description:
    'Tính Cung Mệnh Bát Trạch, xem hướng nhà tốt xấu, Cửu Cung Phi Tinh hàng năm. Bố trí phòng ngủ, bếp, phòng làm việc theo phong thủy.',
}

export default function PhongThuyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Phong Thủy Ứng Dụng</h1>
        <p className="mt-2 text-gray-600">
          Bát Trạch - Cửu Cung Phi Tinh - Hướng nhà tốt theo mệnh
        </p>
      </div>
      <PhongThuyForm />
    </div>
  )
}
