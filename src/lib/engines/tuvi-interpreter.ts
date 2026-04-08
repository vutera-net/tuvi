/**
 * Tử Vi Chart Interpreter
 *
 * Provides palace-level and whole-chart interpretations.
 * Uses star-meanings.ts as the data source (504+ star × palace entries).
 * Leverages iztro-derived data already embedded in Star objects:
 *   - star.brightness  (Miếu/Vượng/Đắc Địa/Bình Hòa/Hãm Địa)
 *   - star.isGood      (false for 凶星: Kình Dương, Đà La, Hỏa, Linh, Địa Không/Kiếp, Hóa Kỵ…)
 *   - star.shortMeaning ('Hóa Lộc' | 'Hóa Quyền' | 'Hóa Khoa' | 'Hóa Kỵ' | '')
 */

import type { TuViChart, Palace, Star } from '@/types'
import { getStarMeaning } from '@/data/tuvi/star-meanings'
import { getViStarSummary } from '@/data/tuvi/vi-star-summaries'

// ============================================================
// NAME NORMALIZATION  (Vietnamese → romanized keys in star-meanings.ts)
// ============================================================

// 14 chính tinh + Lộc Tồn (also has meanings in star-meanings.ts)
const STAR_VI_TO_KEY: Record<string, string> = {
  'Tử Vi': 'Tu Vi',
  'Thiên Cơ': 'Thien Co',
  'Thái Dương': 'Thai Duong',
  'Vũ Khúc': 'Vu Khuc',
  'Thiên Đồng': 'Thien Dong',
  'Liêm Trinh': 'Liem Trinh',
  'Thiên Phủ': 'Thien Phu',
  'Thái Âm': 'Tai Am',
  'Tham Lang': 'Tham Lang',
  'Cự Môn': 'Cu Mon',
  'Thiên Tướng': 'Thien Tuong',
  'Thiên Lương': 'Thien Luong',
  'Thất Sát': 'That Sat',
  'Phá Quân': 'Pha Quan',
  'Lộc Tồn': 'Loc Ton',
}

const PALACE_VI_TO_KEY: Record<string, string> = {
  'Mệnh': 'Menh',
  'Huynh Đệ': 'Huong De',
  'Phu Thê': 'Phu The',
  'Tử Tức': 'Tu Tuc',
  'Tài Bạch': 'Tai Bach',
  'Tật Ách': 'Tat Ach',
  'Thiên Di': 'Thien Di',
  'Nô Bộc': 'No Boc',
  'Quan Lộc': 'Quan Loc',
  'Điền Trạch': 'Dien Trach',
  'Phúc Đức': 'Phuc Duc',
  'Phụ Mẫu': 'Phu Mau',
}

// ============================================================
// PUBLIC TYPES
// ============================================================

export interface PalaceInterpretation {
  palaceName: string
  overview: string
  mainStarsAnalysis: string[]
  minorStarsAnalysis: string[]
  summary: string
  rating: 'excellent' | 'good' | 'average' | 'bad'
}

// ============================================================
// PALACE SUMMARIES (keyed by Vietnamese palace name)
// ============================================================

const PALACE_OVERVIEWS: Record<string, string> = {
  'Mệnh': 'Cung Mệnh xác định tính cách, khí chất và phương hướng phát triển suốt cuộc đời.',
  'Huynh Đệ': 'Cung Huynh Đệ liên quan đến mối quan hệ với anh chị em ruột và bạn bè thân thiết.',
  'Phu Thê': 'Cung Phu Thê chỉ tình cảm hôn nhân, duyên số và mối quan hệ với vợ/chồng.',
  'Tử Tức': 'Cung Tử Tức phản ánh con cái, sự sinh sản và phúc lộc do con mang lại.',
  'Tài Bạch': 'Cung Tài Bạch cho thấy khả năng kiếm tiền, thu nhập và tích lũy tài sản.',
  'Tật Ách': 'Cung Tật Ách liên quan đến sức khỏe thân thể, bệnh tật và tai nạn cần đề phòng.',
  'Thiên Di': 'Cung Thiên Di chỉ du lịch, tha hương, thay đổi chỗ ở hoặc công tác xa nhà.',
  'Nô Bộc': 'Cung Nô Bộc là cung bạn bè, đồng nghiệp, người dưới quyền và mối quan hệ xã hội.',
  'Quan Lộc': 'Cung Quan Lộc quan trọng nhất — phản ánh sự nghiệp, địa vị, công danh và thành tích.',
  'Điền Trạch': 'Cung Điền Trạch cho thấy nhà cửa, bất động sản, cội nguồn và ổn định gia đình.',
  'Phúc Đức': 'Cung Phúc Đức liên quan đến phúc đức tích lũy, hưởng thụ tinh thần và may mắn dài lâu.',
  'Phụ Mẫu': 'Cung Phụ Mẫu chỉ tình cảm với cha mẹ, sự hỗ trợ của bề trên và quý nhân.',
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Look up interpretation for a star in a specific palace.
 * Bridges Vietnamese names → romanized keys used in star-meanings.ts.
 */
export function getStarInterpretation(starName: string, palaceName: string): string {
  // Vietnamese summaries first (14 main stars × 12 palaces)
  const vi = getViStarSummary(starName, palaceName)
  if (vi) return vi

  // Fall back to English from star-meanings.ts via romanized keys
  const starKey = STAR_VI_TO_KEY[starName]
  const palaceKey = PALACE_VI_TO_KEY[palaceName]
  if (starKey && palaceKey) {
    const meaning = getStarMeaning(starKey, palaceKey)
    if (meaning) return meaning.summary
  }

  return `${starName} tại ${palaceName} có ảnh hưởng đến vận khí của cung này.`
}

/**
 * Rate a palace based on star quality.
 * Main stars: brightness scale (Miếu/Vượng = excellent, Hãm Địa = bad).
 * Minor stars: isGood flag (Kình Dương, Đà La, Hỏa Tinh, Địa Không/Kiếp, Hóa Kỵ = bad).
 */
function ratePalace(palace: Palace): 'excellent' | 'good' | 'average' | 'bad' {
  const brightStars = palace.mainStars.filter(
    (s) => s.brightness === 'mieu' || s.brightness === 'vuong',
  ).length
  const hamStars = palace.mainStars.filter((s) => s.brightness === 'hamDia').length
  const badMinorStars = palace.minorStars.filter((s) => !s.isGood).length

  const score = brightStars * 2 - hamStars - badMinorStars

  if (score >= 3) return 'excellent'
  if (score >= 1) return 'good'
  if (score <= -2) return 'bad'
  return 'average'
}

/**
 * Format a star label including its Tứ Hóa marker if present.
 * e.g. "Tử Vi (Miếu) [Hóa Lộc]"
 */
function formatStar(star: Star): string {
  const brightnessLabel: Record<string, string> = {
    mieu: 'Miếu', vuong: 'Vượng', dacDia: 'Đắc Địa', binhHoa: 'Bình Hòa', hamDia: 'Hãm Địa',
  }
  const bright = brightnessLabel[star.brightness] ?? star.brightness
  const hoa = star.shortMeaning ? ` [${star.shortMeaning}]` : ''
  return `${star.name} (${bright})${hoa}`
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Generate detailed interpretation for a single palace.
 */
export function interpretPalace(palace: Palace): PalaceInterpretation {
  const rating = ratePalace(palace)

  const mainStarsAnalysis = palace.mainStars.map((star) => {
    const label = formatStar(star)
    const meaning = getStarInterpretation(star.name, palace.name)
    return `${label}: ${meaning}`
  })

  // Show up to 5 notable minor stars (bad ones first for warning, then good)
  const sortedMinor = [
    ...palace.minorStars.filter((s) => !s.isGood),
    ...palace.minorStars.filter((s) => s.isGood),
  ].slice(0, 5)

  const minorStarsAnalysis = sortedMinor.map((star) => {
    const hoaNote = star.shortMeaning ? ` [${star.shortMeaning}]` : ''
    const tone = star.isGood ? 'Cát tinh hỗ trợ' : 'Hung tinh cần đề phòng'
    return `${star.name}${hoaNote}: ${tone}`
  })

  // Tứ Hóa summary
  const hoaStars = [...palace.mainStars, ...palace.minorStars]
    .filter((s) => s.shortMeaning)
    .map((s) => `${s.name} ${s.shortMeaning}`)
  const hoaNote = hoaStars.length > 0
    ? ` Đặc biệt có ${hoaStars.join(', ')} — ảnh hưởng rõ rệt đến cung này.`
    : ''

  return {
    palaceName: palace.name,
    overview: PALACE_OVERVIEWS[palace.name] ?? `Cung ${palace.name} có ảnh hưởng quan trọng đến cuộc sống.`,
    mainStarsAnalysis,
    minorStarsAnalysis,
    summary: `Cung ${palace.name} đánh giá: ${rating}.${hoaNote}`,
    rating,
  }
}

/**
 * Detect notable star combinations (tổ hợp sao) across all palaces.
 */
export function findStarCombinations(chart: TuViChart): string[] {
  const combinations: string[] = []

  for (const palace of chart.palaces) {
    const starNames = new Set(palace.mainStars.map((s) => s.name))

    // Sát Phá Liêm (Thất Sát - Phá Quân - Liêm Trinh cùng cung)
    if (starNames.has('Thất Sát') && starNames.has('Phá Quân') && starNames.has('Liêm Trinh')) {
      combinations.push(`Tổ hợp "Sát Phá Liêm" tại cung ${palace.name} — mưu lược phi thường, biến động lớn`)
    }

    // Cơ Nguyệt Đồng Lương (Thiên Cơ - Thái Âm - Thiên Đồng - Thiên Lương) — thường 2-3 sao
    const coNguyet = ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'].filter((n) => starNames.has(n))
    if (coNguyet.length >= 2) {
      combinations.push(`Tổ hợp "Cơ Nguyệt Đồng Lương" (${coNguyet.join(' - ')}) tại cung ${palace.name} — phù hợp kỹ thuật, văn chương`)
    }

    // Tử Phủ (Tử Vi + Thiên Phủ cùng cung — rất hiếm, chỉ ở Thìn/Tuất)
    if (starNames.has('Tử Vi') && starNames.has('Thiên Phủ')) {
      combinations.push(`Tổ hợp "Tử Phủ" tại cung ${palace.name} — vương giả khí phách, lãnh đạo thiên bẩm`)
    }

    // Nhật Nguyệt (Thái Dương + Thái Âm cùng cung — chỉ ở Sửu/Mùi)
    if (starNames.has('Thái Dương') && starNames.has('Thái Âm')) {
      combinations.push(`Tổ hợp "Nhật Nguyệt" tại cung ${palace.name} — sáng suốt, hài hòa âm dương`)
    }

    // Vũ Sát (Vũ Khúc + Thất Sát)
    if (starNames.has('Vũ Khúc') && starNames.has('Thất Sát')) {
      combinations.push(`Tổ hợp "Vũ Sát" tại cung ${palace.name} — quyết đoán mạnh mẽ, dễ xung đột`)
    }

    // Tham Vũ (Tham Lang + Vũ Khúc)
    if (starNames.has('Tham Lang') && starNames.has('Vũ Khúc')) {
      combinations.push(`Tổ hợp "Tham Vũ" tại cung ${palace.name} — tham vọng lớn, năng lực tài chính`)
    }
  }

  return combinations
}

/**
 * Generate overall life direction analysis.
 */
export function analyzeLifeDirection(chart: TuViChart): string {
  const menhPalace = chart.palaces[chart.cungMenhIndex]
  const careerPalace = chart.palaces.find((p) => p.name === 'Quan Lộc')
  const financePalace = chart.palaces.find((p) => p.name === 'Tài Bạch')

  const menhRating = menhPalace ? ratePalace(menhPalace) : 'average'

  const parts: string[] = [
    `Mệnh ${chart.menh} (${chart.napAm}), ${chart.cuc}.`,
  ]

  if (menhPalace?.mainStars.some((s) => s.brightness === 'mieu' || s.brightness === 'vuong')) {
    parts.push('Cung Mệnh có sao sáng — tính cách mạnh mẽ, định hướng rõ ràng.')
  } else if (menhPalace?.mainStars.some((s) => s.brightness === 'hamDia')) {
    parts.push('Cung Mệnh có sao hãm — cần rèn luyện thêm bản thân, tránh bốc đồng.')
  }

  if (careerPalace?.mainStars.some((s) => s.isGood && (s.brightness === 'mieu' || s.brightness === 'vuong'))) {
    parts.push('Quan Lộc cung vượng — sự nghiệp có nhiều cơ hội thăng tiến.')
  }

  if (financePalace?.mainStars.some((s) => s.isGood)) {
    parts.push('Tài Bạch cung tốt — khả năng tài chính ổn định, có thể tích lũy.')
  }

  // Tứ Hóa trên cung Mệnh
  const hoaOnMenh = menhPalace
    ? [...(menhPalace.mainStars), ...(menhPalace.minorStars)]
        .filter((s) => s.shortMeaning)
        .map((s) => `${s.name} ${s.shortMeaning}`)
    : []
  if (hoaOnMenh.length > 0) {
    parts.push(`Cung Mệnh có Tứ Hóa: ${hoaOnMenh.join(', ')} — tăng cường ảnh hưởng đáng kể.`)
  }

  const combos = findStarCombinations(chart)
  if (combos.length > 0) {
    parts.push(`Tổ hợp đặc biệt: ${combos[0]}`)
  }

  return parts.join(' ') + '\n\nHãy tập trung vào điểm mạnh phù hợp với mệnh cục để phát huy tối đa tiềm năng.'
}
