import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { NguHanh } from '@/types'
import {
  NGU_HANH_VI, NGU_HANH_MAU_TOT, NGU_HANH_MAU_XAU,
  NGU_HANH_HUONG_TOT, NGU_HANH_SO_MAY_MAN, NGU_HANH_TINH_CACH,
  NGU_HANH_COLOR_HEX, TUONG_SINH, TUONG_KHAC,
} from '@/data/ngu-hanh'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/structured-data'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { PersonalDoubtTrigger } from '@/components/funnel/PersonalDoubtTrigger'
import { ContentLock } from '@/components/funnel/ContentLock'
import { AnMenhCTA } from '@/components/funnel/AnMenhCTA'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

// Slug → NguHanh mapping
const SLUG_TO_MENH: Record<string, NguHanh> = {
  kim:  'Kim',
  moc:  'Moc',
  thuy: 'Thuy',
  hoa:  'Hoa',
  tho:  'Tho',
}

const MENH_TO_SLUG: Record<NguHanh, string> = {
  Kim: 'kim', Moc: 'moc', Thuy: 'thuy', Hoa: 'hoa', Tho: 'tho',
}

// Additional description per element
const MENH_MO_TA: Record<NguHanh, string> = {
  Kim: 'Người mệnh Kim thuộc về kim loại, vật cứng rắn. Tượng trưng cho sự cứng rắn, quyết đoán và danh dự.',
  Moc: 'Người mệnh Mộc thuộc về cây cối, sự tăng trưởng. Tượng trưng cho sự nhân từ, sáng tạo và phát triển.',
  Thuy: 'Người mệnh Thủy thuộc về nước, sự linh hoạt. Tượng trưng cho trí tuệ, mềm mại và khả năng thích nghi.',
  Hoa: 'Người mệnh Hỏa thuộc về lửa, sự nhiệt tình. Tượng trưng cho niềm đam mê, năng lượng và sự nhiệt huyết.',
  Tho: 'Người mệnh Thổ thuộc về đất, sự ổn định. Tượng trưng cho tính thực tế, trung thực và kiên nhẫn.',
}

// House feng shui tips per element
const PHONG_THUY_NHA: Record<NguHanh, string[]> = {
  Kim: [
    'Dùng màu trắng, xám, bạc cho tường và nội thất chính',
    'Vật liệu kim loại (inox, nhôm, thép) phù hợp cho bếp và phòng làm việc',
    'Tránh màu đỏ, cam quá nổi — Hỏa khắc Kim',
    'Hướng Tây và Tây Bắc là hướng tốt nhất cho cửa chính',
    'Đặt tượng kim loại hoặc chuông gió ở hướng Tây để kích hoạt tài lộc',
  ],
  Moc: [
    'Dùng màu xanh lá, xanh lục, nâu gỗ cho phòng khách và phòng ngủ',
    'Cây xanh trong nhà mang sinh khí, đặc biệt ở góc Đông',
    'Nội thất gỗ tự nhiên rất tốt cho mệnh Mộc',
    'Hướng Đông và Đông Nam là hướng tốt nhất',
    'Tránh quá nhiều đồ kim loại — Kim khắc Mộc',
  ],
  Thuy: [
    'Dùng màu đen, xanh dương, tím nhạt cho trang trí',
    'Thủy sinh Mộc — kết hợp màu xanh lá rất tốt',
    'Đặt bể cá hoặc bình hoa có nước ở hướng Bắc',
    'Hướng Bắc là hướng tốt nhất cho cửa chính',
    'Tránh quá nhiều đất (chậu cảnh đất) — Thổ khắc Thủy',
  ],
  Hoa: [
    'Dùng màu đỏ, cam, hồng, tím cho điểm nhấn trang trí',
    'Ánh sáng tự nhiên dồi dào, cửa sổ lớn mang lại may mắn',
    'Hướng Nam là hướng tốt nhất cho cửa chính và phòng làm việc',
    'Đèn chiếu sáng ấm áp ở hướng Nam kích hoạt vận may',
    'Tránh màu đen, xanh dương quá đậm — Thủy khắc Hỏa',
  ],
  Tho: [
    'Dùng màu vàng, nâu đất, be, kem cho nội thất chính',
    'Đồ gốm sứ, đá tự nhiên rất tốt cho người mệnh Thổ',
    'Hướng Đông Bắc, Tây Nam và Trung Tâm đều tốt',
    'Giữ nhà gọn gàng, ổn định — Thổ thích sự bền vững',
    'Cây xanh quá nhiều có thể khắc — Mộc khắc Thổ',
  ],
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_MENH).map((slug) => ({ nguhanh: slug }))
}

interface Props {
  params: Promise<{ nguhanh: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nguhanh } = await params
  const menh = SLUG_TO_MENH[nguhanh]
  if (!menh) return {}

  const menhVi = NGU_HANH_VI[menh]
  return {
    title: `Phong Thủy Mệnh ${menhVi} - Màu Sắc, Hướng Tốt, Bố Trí Nhà`,
    description: `Người mệnh ${menhVi}: màu sắc may mắn, hướng nhà tốt, bố trí nội thất và các lưu ý phong thủy quan trọng theo Bát Trạch.`,
    keywords: [
      `phong thủy mệnh ${nguhanh}`,
      `mệnh ${menhVi} hợp màu gì`,
      `hướng nhà mệnh ${menhVi}`,
      `người mệnh ${menhVi}`,
      'phong thủy ngũ hành',
    ],
    alternates: {
      canonical: `/phong-thuy/menh-${nguhanh}`,
    },
  }
}

export default async function PhongThuyMenhPage({ params }: Props) {
  const { nguhanh } = await params
  const menh = SLUG_TO_MENH[nguhanh]
  if (!menh) notFound()

  const menhVi    = NGU_HANH_VI[menh]
  const color     = NGU_HANH_COLOR_HEX[menh]
  const mauTot    = NGU_HANH_MAU_TOT[menh]
  const mauXau    = NGU_HANH_MAU_XAU[menh]
  const huongTot  = NGU_HANH_HUONG_TOT[menh]
  const soMayMan  = NGU_HANH_SO_MAY_MAN[menh]
  const tinhCach  = NGU_HANH_TINH_CACH[menh]
  const sinhBoi   = TUONG_SINH[menh]      // element that generates this
  // Find which element generates menh
  const sinhBoiEl = (Object.entries(TUONG_SINH) as [NguHanh, NguHanh][]).find(([, v]) => v === menh)?.[0]
  const tuongSinh = TUONG_SINH[menh]      // element this generates
  const tuongKhac = TUONG_KHAC[menh]      // element this dominates
  const khacBoi   = (Object.entries(TUONG_KHAC) as [NguHanh, NguHanh][]).find(([, v]) => v === menh)?.[0]

  const faqSchema = generateFAQSchema([
    {
      question: `Người mệnh ${menhVi} hợp màu gì?`,
      answer: `Màu sắc tốt cho mệnh ${menhVi}: ${mauTot.join(', ')}. Tránh màu: ${mauXau.join(', ')}.`,
    },
    {
      question: `Nhà hướng nào tốt cho người mệnh ${menhVi}?`,
      answer: `Hướng tốt: ${huongTot.join(', ')}. Dựa trên Bát Trạch phong thủy, người mệnh ${menhVi} nên ưu tiên các hướng này cho cửa chính và phòng ngủ.`,
    },
    {
      question: `Mệnh ${menhVi} hợp với mệnh nào?`,
      answer: `Mệnh ${menhVi} tương sinh với mệnh ${NGU_HANH_VI[tuongSinh]}${sinhBoiEl ? ` và được mệnh ${NGU_HANH_VI[sinhBoiEl]} sinh` : ''}. Tương khắc với mệnh ${NGU_HANH_VI[tuongKhac]}${khacBoi ? ` và bị mệnh ${NGU_HANH_VI[khacBoi as NguHanh]} khắc` : ''}.`,
    },
  ], 'Harmony Tử Vi', BASE_URL)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Trang chủ', item: BASE_URL },
    { name: 'Phong Thủy', item: `${BASE_URL}/phong-thuy` },
    { name: `Mệnh ${menhVi}`, item: `${BASE_URL}/phong-thuy/menh-${nguhanh}` },
  ])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumb items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Phong Thủy', href: '/phong-thuy' },
            { label: `Mệnh ${menhVi}` },
          ]} />
          <div className="mt-6 flex items-center gap-5">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
              style={{ backgroundColor: color }}
            >
              {menhVi[0]}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
                Phong Thủy Ngũ Hành
              </p>
              <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
                Mệnh {menhVi}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-gray-600">{MENH_MO_TA[menh]}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">

        {/* Personality */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-xl font-bold text-gray-900">Tính cách &amp; đặc điểm</h2>
          <p className="text-gray-700">{tinhCach}</p>
        </section>

        {/* Colors + directions + numbers */}
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">Màu sắc may mắn</h2>
            <div className="flex flex-wrap gap-2">
              {mauTot.map((m) => (
                <span key={m} className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  ✓ {m}
                </span>
              ))}
            </div>
            <p className="mt-4 mb-2 text-sm font-medium text-gray-500">Nên tránh:</p>
            <div className="flex flex-wrap gap-2">
              {mauXau.map((m) => (
                <span key={m} className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                  ✗ {m}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">Hướng may mắn</h2>
            <div className="flex flex-wrap gap-2">
              {huongTot.map((h) => (
                <span key={h} className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: color }}>
                  {h}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">Số may mắn</h2>
            <div className="flex gap-3">
              {soMayMan.map((s) => (
                <span
                  key={s}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white shadow"
                  style={{ backgroundColor: color }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Ngu Hanh relations */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Quan hệ Ngũ Hành</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {sinhBoiEl && (
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Được sinh bởi</p>
                <p className="mt-1 text-lg font-bold text-green-800">Mệnh {NGU_HANH_VI[sinhBoiEl as NguHanh]}</p>
                <p className="text-sm text-green-700">{NGU_HANH_VI[sinhBoiEl as NguHanh]} sinh {menhVi} — tương sinh, rất hợp</p>
              </div>
            )}
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Sinh ra</p>
              <p className="mt-1 text-lg font-bold text-green-800">Mệnh {NGU_HANH_VI[tuongSinh]}</p>
              <p className="text-sm text-green-700">{menhVi} sinh {NGU_HANH_VI[tuongSinh]} — tương sinh, rất hợp</p>
            </div>
            {khacBoi && (
              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500">Bị khắc bởi</p>
                <p className="mt-1 text-lg font-bold text-red-700">Mệnh {NGU_HANH_VI[khacBoi as NguHanh]}</p>
                <p className="text-sm text-red-600">{NGU_HANH_VI[khacBoi as NguHanh]} khắc {menhVi} — cần thêm sự thấu hiểu</p>
              </div>
            )}
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-500">Khắc</p>
              <p className="mt-1 text-lg font-bold text-red-700">Mệnh {NGU_HANH_VI[tuongKhac]}</p>
              <p className="text-sm text-red-600">{menhVi} khắc {NGU_HANH_VI[tuongKhac]} — cần thêm sự thấu hiểu</p>
            </div>
          </div>
        </section>

        {/* Phong thuy nha */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Phong thủy nhà ở cho mệnh {menhVi}</h2>
          <ul className="space-y-3">
            {PHONG_THUY_NHA[menh].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-0.5 text-base" style={{ color }}>▸</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Accuracy note */}
        <PersonalDoubtTrigger variant="prominent" context="phongthuy" />

        {/* Locked detail content */}
        <ContentLock
          context="phongthuy"
          buttonText="Xem bố trí chi tiết →"
          items={[
            `Cửu Cung Phi Tinh năm nay cho mệnh ${menhVi} — sao bay vào cung nào`,
            'Bố trí phòng ngủ theo hướng Sinh Khí cá nhân của bạn',
            'Vị trí đặt bàn làm việc và bếp tránh Tuyệt Mệnh',
            'Màu sơn từng phòng phù hợp với cung mệnh thực tế',
          ]}
        />

        {/* Other elements */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Xem phong thủy theo mệnh khác</h2>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(SLUG_TO_MENH) as [string, NguHanh][])
              .filter(([slug]) => slug !== nguhanh)
              .map(([slug, el]) => (
                <Link
                  key={slug}
                  href={`/phong-thuy/menh-${slug}`}
                  className="rounded-full border px-4 py-1.5 text-sm font-medium transition hover:text-white"
                  style={{ borderColor: NGU_HANH_COLOR_HEX[el], color: NGU_HANH_COLOR_HEX[el] }}
                  onMouseOver={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = NGU_HANH_COLOR_HEX[el]
                  }}
                  onMouseOut={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = ''
                  }}
                >
                  Mệnh {NGU_HANH_VI[el]}
                </Link>
              ))}
          </div>
        </section>

        {/* Related articles */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Xem thêm</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/phong-thuy" className="font-medium text-red-700 hover:underline">
                Tính Bát Trạch theo năm sinh và giới tính — chính xác hơn
              </Link>
            </li>
            <li>
              <Link href="/tu-vi" className="font-medium text-red-700 hover:underline">
                Lập lá số Tử Vi Đẩu Số cá nhân
              </Link>
            </li>
            <li>
              <Link href="/xem-ngay" className="font-medium text-red-700 hover:underline">
                Xem ngày tốt xấu — lọc theo tuổi
              </Link>
            </li>
          </ul>
        </section>

        {/* AnMenh CTA */}
        <AnMenhCTA variant="banner" context="phongthuy" />
      </div>
    </div>
  )
}
