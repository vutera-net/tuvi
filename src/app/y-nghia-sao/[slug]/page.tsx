import type { Metadata } from 'next'
import { getViStarSummary } from '@/data/tuvi/vi-star-summaries'
import { getExpandedSEOContent } from '@/data/tuvi/seo-expanded-matrix'
import { ContentLock } from '@/components/funnel/ContentLock'
import { PersonalDoubtTrigger } from '@/components/funnel/PersonalDoubtTrigger'

interface PageProps {
  params: Promise<{ slug: string }>
}

const SLUG_TO_STAR: Record<string, string> = {
  'tu-vi': 'Tử Vi', 'liem-trinh': 'Liêm Trinh', 'thien-dong': 'Thiên Đồng', 'vu-khuc': 'Vũ Khúc',
  'thai-duong': 'Thái Dương', 'thien-co': 'Thiên Cơ', 'thien-phu': 'Thiên Phủ', 'thai-am': 'Thái Âm',
  'tham-lang': 'Tham Lang', 'cu-mon': 'Cự Môn', 'thien-tuong': 'Thiên Tướng', 'thien-luong': 'Thiên Lương',
  'that-sat': 'Thất Sát', 'pha-quan': 'Phá Quân'
}

const SLUG_TO_PALACE: Record<string, string> = {
  'menh': 'Mệnh', 'phu-mau': 'Phụ Mẫu', 'phuc-duc': 'Phúc Đức', 'dien-trach': 'Điền Trạch',
  'quan-loc': 'Quan Lộc', 'no-boc': 'Nô Bộc', 'thien-di': 'Thiên Di', 'tat-ach': 'Tật Ách',
  'tai-bach': 'Tài Bạch', 'tu-tuc': 'Tử Tức', 'phu-the': 'Phu Thê', 'huynh-de': 'Huynh Đệ'
}

/**
 * Utility to parse the slug back into sao and cung
 * Format: [sao]-tai-cung-[cung]
 */
function parseSlug(slug: string): { saoSlug: string; cungSlug: string } | null {
  const parts = slug.split('-tai-cung-')
  if (parts.length !== 2) return null
  return { saoSlug: parts[0], cungSlug: parts[1] }
}

export function generateStaticParams() {
  const stars = Object.keys(SLUG_TO_STAR)
  const palaces = Object.keys(SLUG_TO_PALACE)
  const params = []
  for (const sao of stars) {
    for (const cung of palaces) {
      params.push({ slug: `${sao}-tai-cung-${cung}` })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseSlug(slug)
  const sao = parsed ? (SLUG_TO_STAR[parsed.saoSlug] || parsed.saoSlug) : 'Sao'
  const cung = parsed ? (SLUG_TO_PALACE[parsed.cungSlug] || parsed.cungSlug) : 'Cung'
  
  return {
    title: `Ý nghĩa sao ${sao} tại cung ${cung} | Harmony Tử Vi`,
    description: `Giải mã chi tiết ý nghĩa, tác động và vận hạn khi sao ${sao} tọa thủ tại cung ${cung} trong lá số Tử Vi.`,
  }
}

export default async function SaoCungPage({ params }: PageProps) {
  const { slug } = await params
  const parsed = parseSlug(slug)
  
  if (!parsed) {
    return <div className="p-12 text-center">Đường dẫn không hợp lệ</div>
  }

  const sao = SLUG_TO_STAR[parsed.saoSlug] || parsed.saoSlug
  const cung = SLUG_TO_PALACE[parsed.cungSlug] || parsed.cungSlug

  const baseSummary = getViStarSummary(sao, cung) || `Sao ${sao} mang nhiều tính chất đặc biệt khi đóng tại cung ${cung}.`
  const expanded = getExpandedSEOContent(sao, cung, baseSummary)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-gray-900">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Ý nghĩa sao <span className="text-red-700">{sao}</span> tại cung <span className="text-red-700">{cung}</span>
        </h1>
        <div className="mt-4 flex justify-center gap-2">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Tra cứu Tử Vi</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Kiến thức bách khoa</span>
        </div>
      </header>

      <div className="mt-8 prose prose-purple max-w-none">
        <p className="text-lg leading-relaxed text-gray-700">
          Trong Tử Vi Đẩu Số, khi sao <strong>{sao}</strong> tọa lạc tại cung <strong>{cung}</strong>, nó tạo ra những biến số quan trọng ảnh hưởng đến vận mệnh của đương số. Tùy thuộc vào đắc hãm và các cát tinh, hung tinh hội chiếu mà ý nghĩa có thể thay đổi.
        </p>

        <h2 className="mt-12 text-2xl font-bold">1. Tổng quan cách cục</h2>
        <p>
          {expanded.overview}
        </p>
        
        <PersonalDoubtTrigger context="tuvi" variant="prominent" className="my-6" />

        <h2 className="mt-12 text-2xl font-bold">2. Vận tài và Sự nghiệp</h2>
        <p>
          {expanded.fortune}
        </p>

        <h2 className="mt-12 text-2xl font-bold">3. Lời khuyên và Lưu ý</h2>
        <p className="mb-4">
          <strong>Lời khuyên:</strong> {expanded.advice}
        </p>
        <p>
          <strong>Rủi ro cần đề phòng:</strong> {expanded.risk}
        </p>

        <div className="mt-12">
          <ContentLock 
            context="tuvi_library" 
            items={[
              `Vận trình đại hạn 10 năm của sao ${sao} tại cung ${cung}`,
              `Ảnh hưởng của các bộ sao phụ chiếu về cung ${cung}`,
              `Lời khuyên chi tiết về ngày lành tháng tốt để kích hoạt cung ${cung}`
            ]}
          />
        </div>
      </div>
    </div>
  )
}
