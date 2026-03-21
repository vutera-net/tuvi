/**
 * 12 Cung Tử Vi (Twelve Palaces)
 */

export interface CungInfo {
  index: number // 0-11
  name: string
  nameVi: string
  description: string
  aspects: string[] // What life areas it covers
}

export const CUNG_LIST: CungInfo[] = [
  {
    index: 0,
    name: 'Menh',
    nameVi: 'Mệnh',
    description: 'Cung Mệnh - Bản thân, tính cách, vận mệnh tổng quan',
    aspects: ['Tính cách', 'Ngoại hình', 'Vận mệnh', 'Thể trạng'],
  },
  {
    index: 1,
    name: 'HuynhDe',
    nameVi: 'Huynh Đệ',
    description: 'Cung Huynh Đệ - Anh chị em, bạn bè thân thiết',
    aspects: ['Anh chị em', 'Bạn bè', 'Đồng nghiệp thân'],
  },
  {
    index: 2,
    name: 'PhuThe',
    nameVi: 'Phu Thê',
    description: 'Cung Phu Thê - Hôn nhân, tình duyên',
    aspects: ['Hôn nhân', 'Vợ/chồng', 'Tình duyên', 'Quan hệ đối tác'],
  },
  {
    index: 3,
    name: 'TuTuc',
    nameVi: 'Tử Tức',
    description: 'Cung Tử Tức - Con cái, sáng tạo',
    aspects: ['Con cái', 'Học trò', 'Sáng tạo', 'Năng lực sinh sản'],
  },
  {
    index: 4,
    name: 'TaiBach',
    nameVi: 'Tài Bạch',
    description: 'Cung Tài Bạch - Tài chính, thu nhập',
    aspects: ['Thu nhập', 'Tài sản', 'Đầu tư', 'Tiêu xài'],
  },
  {
    index: 5,
    name: 'TatAch',
    nameVi: 'Tật Ách',
    description: 'Cung Tật Ách - Sức khỏe, bệnh tật, tai nạn',
    aspects: ['Sức khỏe', 'Bệnh tật', 'Tai nạn', 'Tâm lý'],
  },
  {
    index: 6,
    name: 'ThienDi',
    nameVi: 'Thiên Di',
    description: 'Cung Thiên Di - Di chuyển, xa nhà, xuất ngoại',
    aspects: ['Du lịch', 'Di cư', 'Xa nhà', 'Môi trường bên ngoài'],
  },
  {
    index: 7,
    name: 'NoBoc',
    nameVi: 'Nô Bộc',
    description: 'Cung Nô Bộc - Cấp dưới, nhân viên, bạn bè phổ thông',
    aspects: ['Nhân viên', 'Cấp dưới', 'Bạn bè', 'Đối tác'],
  },
  {
    index: 8,
    name: 'QuanLoc',
    nameVi: 'Quan Lộc',
    description: 'Cung Quan Lộc - Sự nghiệp, công danh',
    aspects: ['Nghề nghiệp', 'Thăng tiến', 'Danh vọng', 'Kinh doanh'],
  },
  {
    index: 9,
    name: 'DienTrach',
    nameVi: 'Điền Trạch',
    description: 'Cung Điền Trạch - Nhà cửa, bất động sản',
    aspects: ['Nhà ở', 'Đất đai', 'Bất động sản', 'Môi trường sống'],
  },
  {
    index: 10,
    name: 'PhucDuc',
    nameVi: 'Phúc Đức',
    description: 'Cung Phúc Đức - Phúc duyên, tinh thần, tín ngưỡng',
    aspects: ['Phúc lộc tích lũy', 'Tâm linh', 'Tinh thần', 'Tổ tiên'],
  },
  {
    index: 11,
    name: 'PhuMau',
    nameVi: 'Phụ Mẫu',
    description: 'Cung Phụ Mẫu - Cha mẹ, bề trên, cấp trên',
    aspects: ['Cha mẹ', 'Cấp trên', 'Lãnh đạo', 'Bảo hộ'],
  },
]

// Cung name in order starting from Mệnh
export const CUNG_NAMES_ORDER = CUNG_LIST.map((c) => c.nameVi)

// Đối cung (opposite palace)
export function getDoiCung(cungIndex: number): number {
  return (cungIndex + 6) % 12
}
