/**
 * Tử Vi Chart Interpreter
 * Provides detailed interpretations for stars, palaces, and combinations
 */

import type { TuViChart, Palace, Star } from '@/types'

export interface PalaceInterpretation {
  palaceName: string
  overview: string
  mainStarsAnalysis: string[]
  minorStarsAnalysis: string[]
  summary: string
  rating: 'excellent' | 'good' | 'average' | 'bad'
}

// Star interpretations per palace
const STAR_INTERPRETATIONS: Record<string, Record<string, string>> = {
  tuVi: {
    menh: 'Chủ tể của tuổi, xác định hướng phát triển cuộc sống',
    huynh: 'Ảnh hưởng đến mối quan hệ anh chị em',
    phuThe: 'Tình yêu gia đình, hôn nhân được chăm sóc',
    tuTuc: 'Con cái hưng thịnh, có nhiều lợi tức',
    taiBac: 'Tài chính ổn định, có khả năng tích lũy',
    tatAch: 'Sức khỏe bền bỉ, ít bệnh tật',
    thienDi: 'Chuyến du lịch thuận lợi, công tác suôn sẻ',
    noBoc: 'Bạn bè tín nghĩa, có người giúp đỡ',
    quanLoc: 'Sự nghiệp hưng thịnh, được thăng tiến',
    dienTrach: 'Nhà cửa an bình, bất động sản may mắn',
    phucDuc: 'Phúc lộc dồi dào, tích lũy tốt',
    puMau: 'Cha mẹ được hưởng phúc, quan hệ tốt',
  },
  thienCo: {
    menh: 'Tước hạng cao, được người khác tôn trọng',
    huynh: 'Anh chị em có khó khăn',
    phuThe: 'Tình cảm lạnh nhạt, hôn nhân chậm',
    tuTuc: 'Con cái ít, khó có',
    taiBac: 'Tài chính khó khăn',
    tatAch: 'Sức khỏe có vấn đề',
    thienDi: 'Du lịch gặp trở ngại',
    noBoc: 'Bạn bè khó tìm',
    quanLoc: 'Sự nghiệp chậm phát triển',
    dienTrach: 'Nhà cửa không an bình',
    phucDuc: 'Phúc đức hạn chế',
    puMau: 'Quan hệ cha mẹ căng thẳng',
  },
  thaiDuong: {
    menh: 'Hào phóng, lạc quan, được quý mến',
    huynh: 'Anh chị em hỗ trợ tốt',
    phuThe: 'Hôn nhân hạnh phúc, vợ chồng ân ái',
    tuTuc: 'Con cái thông minh, chăm học',
    taiBac: 'Thu nhập cao, có tiền tích lũy',
    tatAch: 'Sức khỏe mạnh mẽ',
    thienDi: 'Du lịch thuận lợi, công tác thành công',
    noBoc: 'Nhiều bạn bè, được ủng hộ',
    quanLoc: 'Sự nghiệp thăng tiến, nổi bật',
    dienTrach: 'Nhà cửa rộng rãi, tài sản dồi dào',
    phucDuc: 'Phúc lộc vàng vàng',
    puMau: 'Cha mẹ được tôn trọng, yên tâm',
  },
}

/**
 * Get interpretation for a star in a specific palace
 */
export function getStarInterpretation(starName: string, palaceName: string): string {
  const lowerStarName = starName.toLowerCase().replaceAll(' ', '')
  const interpretations = STAR_INTERPRETATIONS[lowerStarName] || {}
  const lowerPalace = palaceName.toLowerCase().replaceAll(' ', '')

  for (const [key, value] of Object.entries(interpretations)) {
    if (key.toLowerCase().replaceAll(' ', '') === lowerPalace) {
      return value
    }
  }

  return `${starName} tại ${palaceName} có ảnh hưởng đến phát triển của cung này.`
}

/**
 * Calculate palace rating based on stars
 */
function ratePalace(palace: Palace): 'excellent' | 'good' | 'average' | 'bad' {
  const allStars = [...palace.mainStars, ...palace.minorStars]
  if (allStars.length === 0) return 'average'

  const goodStars = allStars.filter(s => s.brightness === 'mieu' || s.brightness === 'vuong').length
  const badStars = allStars.filter(s => s.brightness === 'hamDia').length

  if (goodStars >= 2) return 'excellent'
  if (goodStars === 1 && badStars === 0) return 'good'
  if (badStars >= 2) return 'bad'
  return 'average'
}

/**
 * Generate detailed interpretation for a palace
 */
export function interpretPalace(palace: Palace): PalaceInterpretation {
  const mainStarAnalyses = palace.mainStars.map(star =>
    `${star.name} (${star.brightness}): ${getStarInterpretation(star.name, palace.name)}`
  )

  const minorStarAnalyses = palace.minorStars.slice(0, 3).map(star =>
    `${star.name}: ${getStarInterpretation(star.name, palace.name)}`
  )

  const rating = ratePalace(palace)

  const summaries: Record<string, string> = {
    menh: 'Cung Mệnh xác định tính cách, khí chất và phương hướng phát triển cuộc sống.',
    huynh: 'Cung Huynh Đệ liên quan đến mối quan hệ với anh chị em ruột, bạn bè thân thiết.',
    phuThe: 'Cung Phủ Thể chỉ tình cảm hôn nhân, đầu năm và mối quan hệ với vợ/chồng.',
    tuTuc: 'Cung Tử Tức phản ánh con cái, sự sinh sản và phúc lộc từ con.',
    taiBac: 'Cung Tài Bạch cho thấy tài chính, thu nhập, tiền bạc và khả năng tích lũy.',
    tatAch: 'Cung Tật Ách liên quan đến sức khỏe thân thể, bệnh tật và tai nạn.',
    thienDi: 'Cung Thiên Di chỉ du lịch, thay đổi việc làm, công tác ở xa.',
    noBoc: 'Cung Nô Bộc là cung bạn bè, người dưới quyền, công nhân viên.',
    quanLoc: 'Cung Quan Lộc quan trọng nhất - chỉ sự nghiệp, địa vị, công danh.',
    dienTrach: 'Cung Điền Trạch cho thấy nhà cửa, bất động sản, quê hương.',
    phucDuc: 'Cung Phúc Đức liên quan đến phúc đức tích lũy, may mắn cuối đời.',
    puMau: 'Cung Phụ Mẫu chỉ tình cảm với cha mẹ, sự hỗ trợ gia đình.',
  }

  return {
    palaceName: palace.name,
    overview: summaries[palace.name.toLowerCase()] || 'Cung này có ảnh hưởng quan trọng đến phát triển cuộc sống.',
    mainStarsAnalysis: mainStarAnalyses,
    minorStarsAnalysis: minorStarAnalyses,
    summary: `Cung ${palace.name} với sự hiện diện của các sao tạo nên một phong cảnh ${rating}. Cần chú ý phát triển theo hướng tích cực để tối ưu hóa phúc lộc.`,
    rating,
  }
}

/**
 * Identify strong star combinations and their meanings
 */
export function findStarCombinations(chart: TuViChart): string[] {
  const combinations: string[] = []

  // Check for classic combinations (examples)
  for (const palace of chart.palaces) {
    const starNames = palace.mainStars.map(s => s.name)

    // Example: "Sat Pha Liem" combination
    if (starNames.includes('That Sat') && starNames.includes('Pha Quan') && starNames.includes('Liem Trinh')) {
      combinations.push('Tìm thấy kết hợp "Sát Phá Liêm" - rất hiếm gặp, chỉ định mưu lược cao')
    }

    // Example: "Co Nguyet Dong Luong"
    if (starNames.includes('Thien Co') && starNames.includes('Thai Am')) {
      combinations.push(`Tại cung ${palace.name}: Kết hợp Thiên Cơ - Thái Âm - phù hợp cho công việc bí mật`)
    }
  }

  return combinations
}

/**
 * Generate overall life direction analysis
 */
export function analyzeLifeDirection(chart: TuViChart): string {
  const menhPalace = chart.palaces[chart.cungMenhIndex]
  const careerPalace = chart.palaces.find(p => p.name === 'Quan Loc')
  const financePalace = chart.palaces.find(p => p.name === 'Tài Bạch')

  let analysis = `Với ${chart.menh} mệnh, bạn có xu hướng phát triển theo hướng:`

  if (menhPalace.mainStars.some(s => s.brightness === 'mieu')) {
    analysis += ' được chuyên tâm và tập trung cao trong công việc,'
  }

  if (careerPalace?.mainStars.some(s => s.isGood)) {
    analysis += ' sự nghiệp sẽ được thăng tiến nhanh chóng,'
  }

  if (financePalace?.mainStars.some(s => s.isGood)) {
    analysis += ' tài chính ổn định và có khả năng tích lũy.'
  }

  return analysis + '\n\nHãy tập trung vào các cơ hội thích hợp với tính cách và khả năng của mình.'
}
