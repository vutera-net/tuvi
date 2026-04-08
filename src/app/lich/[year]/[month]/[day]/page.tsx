import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDayInfo } from '@/lib/engines/lunar-engine'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { Breadcrumb } from '@/components/common/Breadcrumb'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

const WEEKDAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

interface Props {
  params: Promise<{ year: string; month: string; day: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day } = await params
  const y = parseInt(year), m = parseInt(month), d = parseInt(day)
  if (isNaN(y) || isNaN(m) || isNaN(d)) return {}

  const dayInfo = getDayInfo(d, m, y)
  const { lunar } = dayInfo
  const canChiYear = `${THIEN_CAN[lunar.canYear]} ${DIA_CHI[lunar.chiYear]}`

  return {
    title: `Xem Ngày ${d}/${m}/${y} - Lịch Âm Dương, Can Chi, Hoàng Đạo`,
    description: `Ngày ${d} tháng ${m} năm ${y}: Âm lịch ngày ${lunar.day} tháng ${lunar.month} năm ${canChiYear}. Giờ Hoàng Đạo, Trực ${dayInfo.truc}, Sao ${dayInfo.sao28}.`,
    alternates: {
      canonical: `/lich/${year}/${month}/${day}`,
    },
  }
}

export const revalidate = 86400 // ISR: revalidate daily

export default async function LichNgayPage({ params }: Props) {
  const { year, month, day } = await params
  const y = parseInt(year), m = parseInt(month), d = parseInt(day)

  if (
    isNaN(y) || isNaN(m) || isNaN(d) ||
    m < 1 || m > 12 || d < 1 || d > 31 ||
    y < 1900 || y > 2100
  ) {
    notFound()
  }

  let dayInfo
  try {
    dayInfo = getDayInfo(d, m, y)
  } catch {
    notFound()
  }

  const { solar, lunar, hoangDaoGio, hacDaoGio, truc, sao28, ngayKy, festivals, rating, canGio, chiGio } = dayInfo

  const canChiDay  = `${THIEN_CAN[lunar.canDay]} ${DIA_CHI[lunar.chiDay]}`
  const canChiMonth = `${THIEN_CAN[lunar.canMonth]} ${DIA_CHI[lunar.chiMonth]}`
  const canChiYear  = `${THIEN_CAN[lunar.canYear]} ${DIA_CHI[lunar.chiYear]}`

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Trang chủ', item: BASE_URL },
    { name: 'Lịch Vạn Niên', item: `${BASE_URL}/lich` },
    { name: `Ngày ${d}/${m}/${y}`, item: `${BASE_URL}/lich/${y}/${m}/${d}` },
  ])

  const ratingLabel = rating === 'tot' ? 'NGÀY TỐT' : rating === 'xau' ? 'NGÀY XẤU' : 'NGÀY TRUNG BÌNH'
  const ratingColor = rating === 'tot' ? 'bg-green-600' : rating === 'xau' ? 'bg-red-600' : 'bg-yellow-500'

  // Prev / Next day navigation
  const prevDate = new Date(y, m - 1, d - 1)
  const nextDate = new Date(y, m - 1, d + 1)
  const fmtPath = (dt: Date) =>
    `/lich/${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumb items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Lịch Vạn Niên', href: '/lich' },
            { label: `${d}/${m}/${y}` },
          ]} />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">{WEEKDAYS[solar.dayOfWeek]}</p>
              <h1 className="font-serif text-3xl font-bold text-gray-900">
                Ngày {d} tháng {m} năm {y}
              </h1>
              <p className="mt-1 text-gray-600">
                Âm lịch: {lunar.day}/{lunar.month}{lunar.isLeapMonth ? ' (nhuận)' : ''} năm <strong>{canChiYear}</strong>
              </p>
            </div>
            <span className={`self-start rounded-full px-4 py-2 text-sm font-bold text-white ${ratingColor}`}>
              {ratingLabel}
            </span>
          </div>

          {/* Prev/Next nav */}
          <div className="mt-5 flex gap-3">
            <Link
              href={fmtPath(prevDate)}
              className="rounded-full border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              ← Ngày trước
            </Link>
            <Link
              href={fmtPath(nextDate)}
              className="rounded-full border px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Ngày sau →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">

        {/* Can Chi info */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Can Chi</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Can Chi Ngày', value: canChiDay },
              { label: 'Can Chi Tháng', value: canChiMonth },
              { label: 'Can Chi Năm', value: canChiYear },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 text-base font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Trực</p>
              <p className="mt-1 font-bold text-gray-800">{truc}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">28 Sao</p>
              <p className="mt-1 font-bold text-gray-800">{sao28}</p>
            </div>
            {lunar.solarTerm && (
              <div className="rounded-xl bg-amber-50 p-3 text-center sm:col-span-2">
                <p className="text-xs text-amber-600">Tiết khí</p>
                <p className="mt-1 font-bold text-amber-800">{lunar.solarTerm}</p>
              </div>
            )}
          </div>
        </section>

        {/* Hoang Dao gio */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Giờ Hoàng Đạo &amp; Hắc Đạo</h2>
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => {
              const isHD = hoangDaoGio.includes(i)
              const isHac = hacDaoGio.includes(i)
              const canChi = `${THIEN_CAN[canGio[i]]} ${DIA_CHI[chiGio[i]]}`
              return (
                <div
                  key={i}
                  className={`rounded-lg p-2 text-center text-xs ${
                    isHD ? 'bg-yellow-100 text-yellow-800 font-semibold' :
                    isHac ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <div>{DIA_CHI[i]}</div>
                  <div className="text-[10px] mt-0.5">{canChi.split(' ')[0]}</div>
                  {isHD && <div className="text-[9px] text-yellow-600">★</div>}
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-gray-400">★ Giờ Hoàng Đạo | Xám: Giờ Hắc Đạo</p>
        </section>

        {/* Ngay ky + Festivals */}
        {(ngayKy.length > 0 || festivals.length > 0) && (
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Lưu ý ngày này</h2>
            {ngayKy.length > 0 && (
              <div className="mb-3">
                <p className="mb-2 text-sm font-medium text-red-600">Ngày kiêng kỵ:</p>
                <div className="flex flex-wrap gap-2">
                  {ngayKy.map((n) => (
                    <span key={n} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">{n}</span>
                  ))}
                </div>
              </div>
            )}
            {festivals.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-green-600">Ngày lễ:</p>
                <div className="flex flex-wrap gap-2">
                  {festivals.map((f) => (
                    <span key={f} className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/xem-ngay"
            className="flex-1 rounded-xl border-2 p-4 text-center text-sm font-semibold transition hover:bg-red-50"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            Tìm ngày tốt cho sự kiện →
          </Link>
          <Link
            href="/lich"
            className="flex-1 rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Xem lịch tháng
          </Link>
        </div>
      </div>
    </div>
  )
}
