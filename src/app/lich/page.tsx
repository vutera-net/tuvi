import type { Metadata } from 'next'
import { CalendarView } from '@/components/calendar/CalendarView'

export const metadata: Metadata = {
  title: 'Lịch Vạn Niên - Xem Lịch Âm Dương',
  description:
    'Tra cứu lịch vạn niên âm dương, Can Chi ngày tháng năm, giờ Hoàng Đạo, Trực, 28 Sao và ngày tốt xấu.',
}

export default function LichPage() {
  const today = new Date()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lịch Vạn Niên</h1>
        <p className="mt-2 text-gray-600">
          Tra cứu lịch âm dương, Can Chi, Trực, 28 Sao, giờ Hoàng Đạo và ngày lễ
        </p>
      </div>
      <CalendarView year={today.getFullYear()} month={today.getMonth() + 1} />
    </div>
  )
}
