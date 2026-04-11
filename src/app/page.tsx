import Link from 'next/link'
import { getDayInfo } from '@/lib/engines/lunar-engine'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'
import { ConditionalAdSlot } from '@/components/common/ConditionalAdSlot'

const FEATURES = [
  {
    icon: '📅',
    title: 'Lịch Vạn Niên',
    description: 'Xem lịch âm dương, Can Chi, 24 Tiết Khí, ngày lễ Việt Nam',
    href: '/lich',
    color: '#C41E3A',
  },
  {
    icon: '⚡',
    title: 'Luận Mệnh Ngũ Hành',
    description: 'Xác định mệnh Kim Mộc Thủy Hỏa Thổ, màu sắc và hướng may mắn',
    href: '/xem-menh',
    color: '#DAA520',
  },
  {
    icon: '⭐',
    title: 'Lá Số Tử Vi',
    description: 'Tử Vi Đẩu Số với 14 chính tinh, 12 cung và Đại Vận chi tiết',
    href: '/tu-vi',
    color: '#9333EA',
  },
  {
    icon: '📆',
    title: 'Xem Ngày Tốt Xấu',
    description: 'Chọn ngày tốt cho cưới hỏi, khai trương, động thổ, nhập trạch',
    href: '/xem-ngay',
    color: '#228B22',
  },
  {
    icon: '🏠',
    title: 'Phong Thủy',
    description: 'Bát Trạch, Cửu Cung Phi Tinh, hướng nhà và bố trí nội thất',
    href: '/phong-thuy',
    color: '#1E90FF',
  },
  {
    icon: '🔮',
    title: 'Tử Vi Hàng Ngày',
    description: 'Dự báo 5 lĩnh vực: sự nghiệp, tài chính, tình cảm, sức khỏe',
    href: '/tu-vi-hang-ngay',
    color: '#DC143C',
  },
]

const ZODIACS = [
  { name: 'Tý', emoji: '🐭' }, { name: 'Sửu', emoji: '🐮' }, { name: 'Dần', emoji: '🐯' },
  { name: 'Mão', emoji: '🐰' }, { name: 'Thìn', emoji: '🐉' }, { name: 'Tỵ', emoji: '🐍' },
  { name: 'Ngọ', emoji: '🐴' }, { name: 'Mùi', emoji: '🐑' }, { name: 'Thân', emoji: '🐒' },
  { name: 'Dậu', emoji: '🐓' }, { name: 'Tuất', emoji: '🐕' }, { name: 'Hợi', emoji: '🐗' },
]

export default function HomePage() {
  const today = new Date()
  const dayInfo = getDayInfo(today.getDate(), today.getMonth() + 1, today.getFullYear())
  const { lunar, truc, sao28, hoangDaoGio, rating } = dayInfo

  const canChiDay = `${THIEN_CAN[lunar.canDay]} ${DIA_CHI[lunar.chiDay]}`
  const canChiYear = `${THIEN_CAN[lunar.canYear]} ${DIA_CHI[lunar.chiYear]}`
  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="text-[200px] leading-none">☯</div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Luận Mệnh - Chọn Ngày - An Tâm
          </h1>
          <p className="mt-4 text-lg text-red-100 md:text-xl">
            Nền tảng phong thủy, tử vi và xem ngày tốt xấu toàn diện nhất cho người Việt
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/xem-menh"
              className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-300"
            >
              Xem Mệnh Ngũ Hành Miễn Phí
            </Link>
            <Link
              href="/tu-vi"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-red-700"
            >
              Lập Lá Số Tử Vi
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Calendar */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm text-gray-500">{weekdays[dayInfo.solar.dayOfWeek]}</div>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
              </div>
              <div className="text-gray-600">
                Âm lịch: ngày <strong>{lunar.day}</strong> tháng <strong>{lunar.month}</strong> năm{' '}
                <strong>{canChiYear}</strong>
              </div>
              <div className="mt-1 text-gray-600">
                Can Chi ngày: <strong>{canChiDay}</strong> • Trực: <strong>{truc}</strong> • Sao:{' '}
                <strong>{sao28}</strong>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full px-4 py-2 font-semibold text-white ${
                  rating === 'tot' ? 'bg-green-600' : rating === 'xau' ? 'bg-red-600' : 'bg-yellow-500'
                }`}
              >
                Ngày {rating === 'tot' ? 'TỐT' : rating === 'xau' ? 'XẤU' : 'TRUNG BÌNH'}
              </div>
              <Link
                href={`/lich?date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}
                className="text-sm text-red-700 underline"
              >
                Xem chi tiết →
              </Link>
            </div>
          </div>

          {hoangDaoGio.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <span className="text-sm text-gray-500">Giờ Hoàng Đạo hôm nay: </span>
              {hoangDaoGio.map((i) => (
                <span
                  key={i}
                  className="mr-2 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800"
                >
                  {DIA_CHI[i]}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Khám phá tất cả tính năng
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 font-bold text-gray-800" style={{ color: feature.color }}>
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad slot - free tier only */}
      <div className="flex justify-center py-2">
        <ConditionalAdSlot size="leaderboard" />
      </div>

      {/* Daily Horoscope preview */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Tử Vi Hàng Ngày - 12 Con Giáp
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {ZODIACS.map((z) => (
            <Link
              key={z.name}
              href={`/tu-vi-hang-ngay?zodiac=${z.name.toLowerCase()}`}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm transition hover:shadow-md"
            >
              <span className="text-3xl">{z.emoji}</span>
              <span className="mt-1 text-sm font-medium text-gray-700">{z.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Phong Thủy & Tử Vi cho người Việt
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Harmony Tử Vi là nền tảng tra cứu phong thủy, tử vi và xem ngày tốt xấu toàn diện nhất,
            kết hợp tri thức cổ truyền phương Đông với công nghệ hiện đại. Từ việc luận mệnh Ngũ Hành
            theo năm sinh, lập lá số Tử Vi Đẩu Số với 14 chính tinh và 12 cung, cho đến xem ngày tốt
            cho cưới hỏi, khai trương, động thổ - tất cả được tính toán chính xác dựa trên thuật toán
            đã được kiểm chứng.
          </p>
        </div>
      </section>
    </div>
  )
}
