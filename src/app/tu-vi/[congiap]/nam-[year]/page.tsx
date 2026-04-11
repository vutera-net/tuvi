import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNguHanhByYear } from '@/lib/engines/ngu-hanh-engine'
import { getCanChiByYear } from '@/lib/engines/ngu-hanh-engine'
import { TUONG_SINH, TUONG_KHAC, NGU_HANH_VI, NGU_HANH_COLOR_HEX } from '@/data/ngu-hanh'
import type { NguHanh } from '@/types'
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { PersonalDoubtTrigger } from '@/components/funnel/PersonalDoubtTrigger'
import { ContentLock } from '@/components/funnel/ContentLock'
import { AnMenhCTA } from '@/components/funnel/AnMenhCTA'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tuvi.vutera.net'

// Zodiac definitions — each sign's birth years have a fixed 12-year cycle
const CONGIAP = [
  { slug: 'ty',   name: 'Tý',   emoji: '🐭', baseYear: 2020, nguHanhElement: 'Thuy' as NguHanh },
  { slug: 'suu',  name: 'Sửu',  emoji: '🐮', baseYear: 2021, nguHanhElement: 'Tho'  as NguHanh },
  { slug: 'dan',  name: 'Dần',  emoji: '🐯', baseYear: 2022, nguHanhElement: 'Moc'  as NguHanh },
  { slug: 'mao',  name: 'Mão',  emoji: '🐰', baseYear: 2023, nguHanhElement: 'Moc'  as NguHanh },
  { slug: 'thin', name: 'Thìn', emoji: '🐉', baseYear: 2024, nguHanhElement: 'Tho'  as NguHanh },
  { slug: 'ti',   name: 'Tỵ',   emoji: '🐍', baseYear: 2025, nguHanhElement: 'Hoa'  as NguHanh },
  { slug: 'ngo',  name: 'Ngọ',  emoji: '🐴', baseYear: 2026, nguHanhElement: 'Hoa'  as NguHanh },
  { slug: 'mui',  name: 'Mùi',  emoji: '🐑', baseYear: 2027, nguHanhElement: 'Tho'  as NguHanh },
  { slug: 'than', name: 'Thân', emoji: '🐒', baseYear: 2028, nguHanhElement: 'Kim'  as NguHanh },
  { slug: 'dau',  name: 'Dậu',  emoji: '🐓', baseYear: 2029, nguHanhElement: 'Kim'  as NguHanh },
  { slug: 'tuat', name: 'Tuất', emoji: '🐕', baseYear: 2030, nguHanhElement: 'Tho'  as NguHanh },
  { slug: 'hoi',  name: 'Hợi',  emoji: '🐗', baseYear: 2031, nguHanhElement: 'Thuy' as NguHanh },
]

const CURRENT_YEAR = 2026
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2]

const MENH_SLUG: Record<NguHanh, string> = {
  Kim: 'kim', Moc: 'moc', Thuy: 'thuy', Hoa: 'hoa', Tho: 'tho',
}

// Forecast templates based on Nguhanh compatibility
type CompatType = 'excellent' | 'good' | 'neutral' | 'challenging'

function getCompatType(zodiacEl: NguHanh, yearEl: NguHanh): CompatType {
  if (TUONG_SINH[yearEl] === zodiacEl || TUONG_SINH[zodiacEl] === yearEl) return 'excellent'
  if (TUONG_KHAC[yearEl] === zodiacEl) return 'challenging'
  if (TUONG_KHAC[zodiacEl] === yearEl) return 'good'
  return 'neutral'
}

const FORECAST_TEMPLATES: Record<CompatType, {
  overall: string; love: string; career: string; finance: string; health: string
}> = {
  excellent: {
    overall: 'Đây là năm đại vận với năng lượng tương sinh mạnh mẽ. Mọi lĩnh vực đều có cơ hội phát triển vượt bậc. Hãy tận dụng thời điểm thuận lợi này để thực hiện các dự án lớn.',
    love: 'Tình cảm thăng hoa, dễ tìm được người tri kỷ hoặc mối quan hệ tiến triển tốt đẹp. Đây là thời điểm lý tưởng để kết hôn hoặc mở lòng với tình yêu mới.',
    career: 'Sự nghiệp nở rộ, có cơ hội thăng tiến rõ rệt. Các dự án được triển khai thuận lợi, nhận được sự ủng hộ từ cấp trên và đồng nghiệp.',
    finance: 'Tài lộc dồi dào, thu nhập tăng đáng kể. Đầu tư vào thời điểm này mang lại lợi nhuận tốt, nhưng cần tránh chi tiêu quá mức.',
    health: 'Sức khỏe dồi dào năng lượng, thể chất và tinh thần đều ổn định. Đây là năm tốt để rèn luyện thể thao và chăm sóc sức khỏe lâu dài.',
  },
  good: {
    overall: 'Năm nay mang đến nhiều cơ hội thuận lợi. Năng lượng năm và bản mệnh hài hòa, tạo điều kiện cho những bước tiến vững chắc trong cuộc sống.',
    love: 'Tình cảm ổn định, mối quan hệ phát triển thuận chiều. Nửa năm sau có nhiều tin vui về hôn nhân hoặc tình cảm.',
    career: 'Công việc tiến triển tốt, nỗ lực được ghi nhận. Tập trung vào chuyên môn sẽ mang lại kết quả xứng đáng trong năm.',
    finance: 'Tài chính ổn định, có thêm nguồn thu nhập từ công việc phụ. Tiết kiệm và đầu tư thận trọng sẽ tích lũy được vốn tốt.',
    health: 'Sức khỏe nhìn chung tốt. Chú ý nghỉ ngơi đầy đủ và duy trì lối sống lành mạnh để giữ vững thể lực.',
  },
  neutral: {
    overall: 'Năm nay là thời điểm ổn định, phù hợp để củng cố nền tảng và chuẩn bị cho những bước phát triển tiếp theo. Không có biến động lớn, nhưng cần kiên nhẫn.',
    love: 'Tình cảm bình ổn, không có nhiều xáo trộn. Dành thời gian để hiểu nhau sâu hơn và vun đắp mối quan hệ.',
    career: 'Công việc duy trì ổn định. Đây là năm tốt để học hỏi nâng cao kỹ năng, chuẩn bị cho bước tiến lớn hơn.',
    finance: 'Tài chính cân bằng, thu chi ở mức độ vừa phải. Tránh các quyết định đầu tư mạo hiểm trong năm này.',
    health: 'Sức khỏe trung bình, cần chú ý đến các vấn đề tiêu hóa và giấc ngủ. Duy trì chế độ ăn uống điều độ.',
  },
  challenging: {
    overall: 'Năm có một số thách thức cần vượt qua. Năng lượng năm tạo ra áp lực nhưng đây cũng là cơ hội để tôi luyện ý chí và bản lĩnh. Cần thận trọng và linh hoạt.',
    love: 'Tình cảm có thể gặp một số hiểu lầm hoặc bất đồng. Kiên nhẫn lắng nghe và đặt mình vào vị trí của đối phương sẽ giúp mọi việc suôn sẻ hơn.',
    career: 'Công việc đối mặt với một số khó khăn. Tập trung vào giải quyết vấn đề từng bước, không nên hấp tấp. Cẩn thận với các hợp đồng và quan hệ đối tác.',
    finance: 'Tài chính cần được quản lý cẩn thận. Tránh các khoản đầu tư lớn hoặc vay mượn không cần thiết. Dự phòng ngân sách cho các chi phí phát sinh.',
    health: 'Chú ý sức khỏe, đặc biệt là hệ miễn dịch và stress. Nghỉ ngơi đầy đủ và thực hành thiền định để cân bằng tâm trí.',
  },
}

export function generateStaticParams() {
  const params = []
  for (const z of CONGIAP) {
    for (const y of YEARS) {
      params.push({ congiap: z.slug, year: String(y) })
    }
  }
  return params
}

interface Props {
  params: Promise<{ congiap: string; year: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { congiap, year } = await params
  const zodiac = CONGIAP.find((z) => z.slug === congiap)
  const y = parseInt(year)
  if (!zodiac || isNaN(y)) return {}

  const canChi = getCanChiByYear(y)
  return {
    title: `Tử Vi ${zodiac.name} Năm ${y} - Vận Hạn & Dự Báo ${canChi}`,
    description: `Tử vi tuổi ${zodiac.name} năm ${y} (${canChi}): dự báo tổng quan, tình cảm, sự nghiệp, tài chính, sức khỏe. Vận hạn và lời khuyên cho tuổi ${zodiac.name}.`,
    keywords: [
      `tử vi ${zodiac.name.toLowerCase()} năm ${y}`,
      `tuổi ${zodiac.name.toLowerCase()} năm ${y}`,
      `${zodiac.name.toLowerCase()} năm ${y}`,
      `vận ${zodiac.name.toLowerCase()} ${y}`,
    ],
    alternates: {
      canonical: `/tu-vi/${congiap}/nam-${year}`,
    },
  }
}

export default async function TuViConGiapNamPage({ params }: Props) {
  const { congiap, year } = await params
  const zodiac = CONGIAP.find((z) => z.slug === congiap)
  const y = parseInt(year)

  if (!zodiac || isNaN(y) || y < 1900 || y > 2100) notFound()

  const yearInfo  = getNguHanhByYear(y)
  const canChi    = getCanChiByYear(y)
  const compat    = getCompatType(zodiac.nguHanhElement, yearInfo.menh)
  const forecast  = FORECAST_TEMPLATES[compat]
  const yearColor = NGU_HANH_COLOR_HEX[yearInfo.menh]
  const zodiacColor = NGU_HANH_COLOR_HEX[zodiac.nguHanhElement]

  // Birth years for this zodiac (nearby years)
  const birthYears = [-24, -12, 0, 12, 24]
    .map((offset) => zodiac.baseYear + offset)
    .filter((by) => by >= 1930 && by <= 2020)

  const compatLabel: Record<CompatType, string> = {
    excellent: 'Đại Cát ★★★★★',
    good: 'Tốt ★★★★',
    neutral: 'Bình Thường ★★★',
    challenging: 'Cần Thận Trọng ★★',
  }
  const compatColor: Record<CompatType, string> = {
    excellent: 'bg-yellow-500',
    good: 'bg-green-600',
    neutral: 'bg-blue-500',
    challenging: 'bg-orange-500',
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Trang chủ', item: BASE_URL },
    { name: 'Tử Vi', item: `${BASE_URL}/tu-vi` },
    { name: `${zodiac.name} Năm ${y}`, item: `${BASE_URL}/tu-vi/${congiap}/nam-${y}` },
  ])

  const AREAS = [
    { key: 'overall',  label: 'Tổng quan',   icon: '🔮', text: forecast.overall },
    { key: 'love',     label: 'Tình cảm',    icon: '❤️', text: forecast.love },
    { key: 'career',   label: 'Sự nghiệp',   icon: '💼', text: forecast.career },
    { key: 'finance',  label: 'Tài chính',   icon: '💰', text: forecast.finance },
    { key: 'health',   label: 'Sức khỏe',    icon: '🌿', text: forecast.health },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-red-100 bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumb items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Tử Vi', href: '/tu-vi' },
            { label: `Tuổi ${zodiac.name} Năm ${y}` },
          ]} />

          <div className="mt-6 flex items-center gap-5">
            <span className="text-6xl">{zodiac.emoji}</span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
                Tử Vi {y}
              </p>
              <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
                Tuổi {zodiac.name} Năm {y}
              </h1>
              <p className="mt-1 text-gray-600">Năm {canChi} — Mệnh {NGU_HANH_VI[yearInfo.menh]}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className={`rounded-full px-4 py-1.5 text-sm font-bold text-white ${compatColor[compat]}`}>
              {compatLabel[compat]}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
              Mệnh tuổi: <strong>{NGU_HANH_VI[zodiac.nguHanhElement]}</strong>
            </span>
            <span className="rounded-full px-3 py-1.5 text-sm text-white" style={{ backgroundColor: yearColor }}>
              Năm {NGU_HANH_VI[yearInfo.menh]}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">

        {/* Forecast areas */}
        <div className="grid gap-4 md:grid-cols-2">
          {AREAS.map(({ key, label, icon, text }) => (
            <div
              key={key}
              className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${key === 'overall' ? 'md:col-span-2' : ''}`}
            >
              <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-gray-900">
                <span>{icon}</span> {label}
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{text}</p>
            </div>
          ))}
        </div>

        {/* Accuracy note */}
        <PersonalDoubtTrigger variant="prominent" context="tuvi" />

        {/* Locked detail content */}
        <ContentLock
          context="tuvi"
          buttonText="Xem Tiểu Vận cá nhân →"
          items={[
            `Vận từng tháng trong năm ${y} cho tuổi ${zodiac.name}`,
            'Tiểu Vận — giai đoạn may mắn và khó khăn chi tiết',
            'Cảnh báo tháng cần thận trọng riêng theo mệnh của bạn',
            'Ngày tốt để xuất hành, ký hợp đồng theo tuổi',
          ]}
        />

        {/* Birth years */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">Tuổi {zodiac.name} sinh năm nào?</h2>
          <div className="flex flex-wrap gap-2">
            {birthYears.map((by) => (
              <span key={by} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {by}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Chu kỳ 12 năm: người sinh năm {zodiac.name} được luận giải tử vi theo tuổi {zodiac.name}.
          </p>
        </section>

        {/* Year nav */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">Xem tử vi tuổi {zodiac.name} năm khác</h2>
          <div className="flex flex-wrap gap-2">
            {YEARS.filter((yr) => yr !== y).map((yr) => (
              <Link
                key={yr}
                href={`/tu-vi/${congiap}/nam-${yr}`}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition hover:bg-red-50"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Năm {yr}
              </Link>
            ))}
          </div>
        </section>

        {/* Zodiac nav */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-lg font-bold text-gray-900">12 Con Giáp Năm {y}</h2>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {CONGIAP.map((z) => (
              <Link
                key={z.slug}
                href={`/tu-vi/${z.slug}/nam-${y}`}
                className={`flex flex-col items-center rounded-xl border p-2 text-center text-xs transition hover:shadow-md ${
                  z.slug === congiap ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-white'
                }`}
              >
                <span className="text-xl">{z.emoji}</span>
                <span className="mt-1 font-medium text-gray-700">{z.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">Xem thêm</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/phong-thuy/menh-${MENH_SLUG[zodiac.nguHanhElement]}`} className="font-medium text-red-700 hover:underline">
                Phong thủy mệnh {NGU_HANH_VI[zodiac.nguHanhElement]} — màu sắc &amp; hướng nhà tốt
              </Link>
            </li>
            <li>
              <Link href="/tu-vi" className="font-medium text-red-700 hover:underline">
                Lập lá số Tử Vi Đẩu Số chi tiết (14 chính tinh, 12 cung)
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
        <AnMenhCTA variant="banner" context="tuvi" />
      </div>
    </div>
  )
}
