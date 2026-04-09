import { type NextRequest } from 'next/server'
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-response'
import { calculateBatTrach } from '@/lib/engines/bat-trach-engine'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'

// ============================================================
// CAN CHI COMPATIBILITY TABLES
// ============================================================

const CAN_HOP: Record<string, string> = {
  'Giáp': 'Kỷ', 'Kỷ': 'Giáp',
  'Ất': 'Canh', 'Canh': 'Ất',
  'Bính': 'Tân', 'Tân': 'Bính',
  'Đinh': 'Nhâm', 'Nhâm': 'Đinh',
  'Mậu': 'Quý', 'Quý': 'Mậu',
}

const CAN_KHAC: Record<string, string[]> = {
  'Giáp': ['Mậu', 'Canh'], 'Ất': ['Kỷ', 'Tân'],
  'Bính': ['Canh', 'Nhâm'], 'Đinh': ['Tân', 'Quý'],
  'Mậu': ['Nhâm', 'Giáp'], 'Kỷ': ['Quý', 'Ất'],
  'Canh': ['Giáp', 'Bính'], 'Tân': ['Ất', 'Đinh'],
  'Nhâm': ['Bính', 'Mậu'], 'Quý': ['Đinh', 'Kỷ'],
}

const TAM_HOP = [
  ['Dần', 'Ngọ', 'Tuất'],
  ['Hợi', 'Mão', 'Mùi'],
  ['Thân', 'Tý', 'Thìn'],
  ['Tỵ', 'Dậu', 'Sửu'],
]

const LUC_HOP = [
  ['Tý', 'Sửu'], ['Dần', 'Hợi'], ['Mão', 'Tuất'],
  ['Thìn', 'Dậu'], ['Tỵ', 'Thân'], ['Ngọ', 'Mùi'],
]

const LUC_XUNG = [
  ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'],
  ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi'],
]

// Cung Phi compatibility matrix (8×8) — score max 40
type CungName = 'Càn' | 'Khảm' | 'Cấn' | 'Chấn' | 'Tốn' | 'Ly' | 'Khôn' | 'Đoài'

const CUNG_MATRIX: Record<CungName, Record<CungName, { text: string; score: number }>> = {
  Càn:  { Càn: { text: 'Phục Vị', score: 25 }, Khảm: { text: 'Lục Sát', score: 5 }, Cấn: { text: 'Thiên Y', score: 35 }, Chấn: { text: 'Ngũ Quỷ', score: 2 }, Tốn: { text: 'Họa Hại', score: 10 }, Ly: { text: 'Tuyệt Mệnh', score: 0 }, Khôn: { text: 'Diên Niên', score: 30 }, Đoài: { text: 'Sinh Khí', score: 40 } },
  Khảm: { Càn: { text: 'Lục Sát', score: 5 }, Khảm: { text: 'Phục Vị', score: 25 }, Cấn: { text: 'Ngũ Quỷ', score: 2 }, Chấn: { text: 'Thiên Y', score: 35 }, Tốn: { text: 'Sinh Khí', score: 40 }, Ly: { text: 'Diên Niên', score: 30 }, Khôn: { text: 'Tuyệt Mệnh', score: 0 }, Đoài: { text: 'Họa Hại', score: 10 } },
  Cấn:  { Càn: { text: 'Thiên Y', score: 35 }, Khảm: { text: 'Ngũ Quỷ', score: 2 }, Cấn: { text: 'Phục Vị', score: 25 }, Chấn: { text: 'Lục Sát', score: 5 }, Tốn: { text: 'Tuyệt Mệnh', score: 0 }, Ly: { text: 'Họa Hại', score: 10 }, Khôn: { text: 'Sinh Khí', score: 40 }, Đoài: { text: 'Diên Niên', score: 30 } },
  Chấn: { Càn: { text: 'Ngũ Quỷ', score: 2 }, Khảm: { text: 'Thiên Y', score: 35 }, Cấn: { text: 'Lục Sát', score: 5 }, Chấn: { text: 'Phục Vị', score: 25 }, Tốn: { text: 'Diên Niên', score: 30 }, Ly: { text: 'Sinh Khí', score: 40 }, Khôn: { text: 'Họa Hại', score: 10 }, Đoài: { text: 'Tuyệt Mệnh', score: 0 } },
  Tốn:  { Càn: { text: 'Họa Hại', score: 10 }, Khảm: { text: 'Sinh Khí', score: 40 }, Cấn: { text: 'Tuyệt Mệnh', score: 0 }, Chấn: { text: 'Diên Niên', score: 30 }, Tốn: { text: 'Phục Vị', score: 25 }, Ly: { text: 'Thiên Y', score: 35 }, Khôn: { text: 'Ngũ Quỷ', score: 2 }, Đoài: { text: 'Lục Sát', score: 5 } },
  Ly:   { Càn: { text: 'Tuyệt Mệnh', score: 0 }, Khảm: { text: 'Diên Niên', score: 30 }, Cấn: { text: 'Họa Hại', score: 10 }, Chấn: { text: 'Sinh Khí', score: 40 }, Tốn: { text: 'Thiên Y', score: 35 }, Ly: { text: 'Phục Vị', score: 25 }, Khôn: { text: 'Lục Sát', score: 5 }, Đoài: { text: 'Ngũ Quỷ', score: 2 } },
  Khôn: { Càn: { text: 'Diên Niên', score: 30 }, Khảm: { text: 'Tuyệt Mệnh', score: 0 }, Cấn: { text: 'Sinh Khí', score: 40 }, Chấn: { text: 'Họa Hại', score: 10 }, Tốn: { text: 'Ngũ Quỷ', score: 2 }, Ly: { text: 'Lục Sát', score: 5 }, Khôn: { text: 'Phục Vị', score: 25 }, Đoài: { text: 'Thiên Y', score: 35 } },
  Đoài: { Càn: { text: 'Sinh Khí', score: 40 }, Khảm: { text: 'Họa Hại', score: 10 }, Cấn: { text: 'Diên Niên', score: 30 }, Chấn: { text: 'Tuyệt Mệnh', score: 0 }, Tốn: { text: 'Lục Sát', score: 5 }, Ly: { text: 'Ngũ Quỷ', score: 2 }, Khôn: { text: 'Thiên Y', score: 35 }, Đoài: { text: 'Phục Vị', score: 25 } },
}

// Map CungMenh enum (from bat-trach-engine) -> CungName for matrix lookup
const CUNG_MENH_TO_NAME: Record<string, CungName> = {
  Kham: 'Khảm', Khon: 'Khôn', Chan: 'Chấn', Ton: 'Tốn',
  Can: 'Càn', Doai: 'Đoài', Gen: 'Cấn', Ly: 'Ly',
}

function getYearCan(year: number): string {
  return THIEN_CAN[(year + 6) % 10]
}

function getYearChi(year: number): string {
  return DIA_CHI[(year + 8) % 12]
}

// ============================================================
// COMPATIBILITY CALCULATION
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { year1, gender1, year2, gender2 } = body

    if (!year1 || !gender1 || !year2 || !gender2) {
      return errorResponse('Missing required fields: year1, gender1, year2, gender2')
    }
    if (!['male', 'female'].includes(gender1) || !['male', 'female'].includes(gender2)) {
      return errorResponse('gender must be male or female')
    }

    const can1 = getYearCan(year1)
    const can2 = getYearCan(year2)
    const chi1 = getYearChi(year1)
    const chi2 = getYearChi(year2)

    // 1. Thiên Can — max 20 điểm
    let canScore = 10
    let canText = 'Bình Hòa'
    let canDesc = `Thiên can ${can1} và ${can2} không sinh không khắc, ở mức bình hòa.`
    if (CAN_HOP[can1] === can2) {
      canScore = 20
      canText = 'Tương Hợp'
      canDesc = `Thiên can ${can1} và ${can2} tương hợp. Vợ chồng tâm đầu ý hợp, dễ ăn nên làm ra.`
    } else if (CAN_KHAC[can1]?.includes(can2) || CAN_KHAC[can2]?.includes(can1)) {
      canScore = 2
      canText = 'Tương Khắc'
      canDesc = `Thiên can ${can1} và ${can2} tương khắc. Dễ bất đồng, cần sự nhường nhịn từ cả hai.`
    }

    // 2. Địa Chi — max 40 điểm
    let chiScore = 15
    let chiText = 'Bình Hòa'
    let chiDesc = `Địa chi ${chi1} và ${chi2} không hình khắc cũng không hợp, gia đạo bình yên.`
    const isTamHop = TAM_HOP.some(g => g.includes(chi1) && g.includes(chi2))
    const isLucHop = LUC_HOP.some(p => p.includes(chi1) && p.includes(chi2))
    const isLucXung = LUC_XUNG.some(p => p.includes(chi1) && p.includes(chi2))
    if (isTamHop || isLucHop) {
      chiScore = 40
      chiText = isTamHop ? 'Tam Hợp' : 'Lục Hợp'
      chiDesc = `Địa chi ${chi1} và ${chi2} thuộc ${chiText}. Gia đình đầm ấm, hậu thuẫn vững chắc.`
    } else if (isLucXung) {
      chiScore = 0
      chiText = 'Lục Xung'
      chiDesc = `Địa chi ${chi1} và ${chi2} Lục Xung. Tính cách đối lập, cần sự thấu hiểu và nhẫn nại.`
    }

    // 3. Cung Phi Bát Trạch — max 40 điểm
    const batTrach1 = calculateBatTrach(year1, gender1)
    const batTrach2 = calculateBatTrach(year2, gender2)
    const cungName1 = CUNG_MENH_TO_NAME[batTrach1.cungMenh]
    const cungName2 = CUNG_MENH_TO_NAME[batTrach2.cungMenh]
    const cungResult = CUNG_MATRIX[cungName1][cungName2]
    const cungScore = cungResult.score
    const cungText = cungResult.text
    let cungDesc: string
    if (cungScore >= 30) {
      cungDesc = `Cung ${cungName1} và ${cungName2} gặp sao ${cungText}. Đại cát, sức khỏe và tài lộc hưng vượng.`
    } else if (cungScore >= 20) {
      cungDesc = `Cung ${cungName1} và ${cungName2} gặp sao ${cungText}. Gia đạo yên vui, cuộc sống no đủ.`
    } else if (cungScore >= 10) {
      cungDesc = `Cung ${cungName1} và ${cungName2} gặp sao ${cungText}. Có thể có trắc trở nhỏ, cần khoan dung.`
    } else {
      cungDesc = `Cung ${cungName1} và ${cungName2} phạm sao ${cungText}. Xung khắc mạnh, nên hóa giải bằng phong thủy.`
    }

    const totalScore = canScore + chiScore + cungScore
    let interpretation: string
    if (totalScore >= 80) {
      interpretation = 'Trời sinh một cặp! Tương hợp cực kỳ cao, cuộc hôn nhân sẽ tràn đầy hạnh phúc và tài lộc.'
    } else if (totalScore >= 60) {
      interpretation = 'Tương hợp rất tốt. Dù có đôi lúc mâu thuẫn nhưng luôn biết cách dung hòa và xây dựng gia đình êm ấm.'
    } else if (totalScore >= 40) {
      interpretation = 'Tương hợp trung bình. Cần nhiều sự thấu hiểu và nhường nhịn để vượt qua khác biệt.'
    } else {
      interpretation = 'Có nhiều điểm xung khắc. Tuy nhiên phận do người tạo — tình yêu và nhẫn nại có thể hóa giải tất cả.'
    }

    return successResponse({
      person1: { year: year1, gender: gender1, can: can1, chi: chi1, cung: cungName1 },
      person2: { year: year2, gender: gender2, can: can2, chi: chi2, cung: cungName2 },
      can: { score: canScore, text: canText, description: canDesc },
      chi: { score: chiScore, text: chiText, description: chiDesc },
      cung: { score: cungScore, text: cungText, description: cungDesc },
      totalScore,
      maxScore: 100,
      interpretation,
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
