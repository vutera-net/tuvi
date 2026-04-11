import type { Metadata } from 'next'
import { getViStarSummary } from '@/data/tuvi/vi-star-summaries'
import { getExpandedSEOContent } from '@/data/tuvi/seo-expanded-matrix'
import { ContentLock } from '@/components/funnel/ContentLock'
import { PersonalDoubtTrigger } from '@/components/funnel/PersonalDoubtTrigger'

interface PageProps {
  params: {
    sao: string
    cung: string
  }
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

export function generateStaticParams() {
  const stars = Object.keys(SLUG_TO_STAR)
  const palaces = Object.keys(SLUG_TO_PALACE)
  const params = []
  for (const sao of stars) {
    for (const cung of palaces) {
      params.push({ sao, cung })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sao = SLUG_TO_STAR[params.sao] || params.sao
  const cung = SLUG_TO_PALACE[params.cung] || params.cung
  
  return {
    title: `Ý nghĩa sao ${sao} tại cung ${cung} | Harmony Tử Vi`,
    description: `Giải mã chi tiết ý nghĩa, tác động và vận hạn khi sao ${sao} tọa thủ tại cung ${cung} trong lá số Tử Vi.`,
  }
}

export default function SaoCungPage({ params }: PageProps) {
  const sao = SLUG_TO_STAR[params.sao] || params.sao
  const cung = SLUG_TO_PALACE[params.cung] || params.cung

  const baseSummary = getViStarSummary(sao, cung) || `Sao ${sao} mang nhiều tính chất đặc biệt khi đóng tại cung ${cung}.`
  const expanded = getExpandedSEOContent(sao, cung, baseSummary)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-8 text-sm text-gray-500">
        <a href="/" className="hover:text-purple-600">Trang chủ</a>
        <span className="mx-2">/</span>
        <a href="/tu-vi" className="hover:text-purple-600">Tử Vi</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Sao {sao} tại cung {cung}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
        Ý nghĩa sao <span className="text-purple-600">{sao}</span> tại cung <span className="text-purple-600">{cung}</span>
      </h1>

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
            context={`seo_${params.sao}_${params.cung}`}
            items={[
               `Tác động của Triệt/Tuần lên bộ sao ${sao}`,
               `Vận hạn chi tiết tháng này cho tuổi của bạn`,
               `Cách hóa giải nếu sao ${sao} hãm địa tại {cung}`,
               `Lời khuyên từ chuyên gia cho cách cục này`
            ]}
          />
        </div>
      </div>
    </div>
  )
}
