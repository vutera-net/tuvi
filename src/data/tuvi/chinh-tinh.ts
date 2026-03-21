/**
 * 14 Chính Tinh (Main Stars) of Tu Vi Dau So
 */

export interface ChinhTinh {
  id: string
  name: string
  nameVi: string
  group: 'tuvi' | 'thienPhu'
  nguHanh: string
  brightness: Record<string, 'mieu' | 'vuong' | 'dacDia' | 'binhHoa' | 'hamDia'>
  isGood: boolean
  description: string
  strengths: string[]
  weaknesses: string[]
}

// Brightness of each star in each palace (by DiaChi of palace)
// DiaChi: Ty(0) Suu(1) Dan(2) Mao(3) Thin(4) Ti(5) Ngo(6) Mui(7) Than(8) Dau(9) Tuat(10) Hoi(11)
const BRIGHTNESS_TU_VI: Record<string, 'mieu' | 'vuong' | 'dacDia' | 'binhHoa' | 'hamDia'>[] = []

export const CHINH_TINH: ChinhTinh[] = [
  // NHÓM TỬ VI
  {
    id: 'tuVi',
    name: 'Tu Vi',
    nameVi: 'Tử Vi',
    group: 'tuvi',
    nguHanh: 'Thổ',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'hamDia', Dần: 'dacDia', Mão: 'binhHoa',
      Thìn: 'mieu', Tỵ: 'hamDia', Ngọ: 'vuong', Mùi: 'hamDia',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'mieu', Hợi: 'hamDia',
    },
    description: 'Chủ tinh quan trọng nhất, tượng trưng quyền lực, địa vị',
    strengths: ['Lãnh đạo', 'Quyền uy', 'Địa vị cao', 'Bảo hộ'],
    weaknesses: ['Cô đơn', 'Cứng nhắc', 'Hay can thiệp'],
  },
  {
    id: 'thienCo',
    name: 'Thien Co',
    nameVi: 'Thiên Cơ',
    group: 'tuvi',
    nguHanh: 'Mộc',
    isGood: true,
    brightness: {
      Tý: 'dacDia', Sửu: 'binhHoa', Dần: 'mieu', Mão: 'vuong',
      Thìn: 'binhHoa', Tỵ: 'dacDia', Ngọ: 'hamDia', Mùi: 'mieu',
      Thân: 'binhHoa', Dậu: 'dacDia', Tuất: 'binhHoa', Hợi: 'mieu',
    },
    description: 'Sao mưu trí, thông minh, linh hoạt',
    strengths: ['Mưu lược', 'Thông minh', 'Linh hoạt', 'Di chuyển'],
    weaknesses: ['Không ổn định', 'Hay thay đổi', 'Lo lắng'],
  },
  {
    id: 'thaiDuong',
    name: 'Thai Duong',
    nameVi: 'Thái Dương',
    group: 'tuvi',
    nguHanh: 'Hỏa',
    isGood: true,
    brightness: {
      Tý: 'hamDia', Sửu: 'hamDia', Dần: 'dacDia', Mão: 'mieu',
      Thìn: 'mieu', Tỵ: 'vuong', Ngọ: 'mieu', Mùi: 'mieu',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'binhHoa', Hợi: 'hamDia',
    },
    description: 'Sao mặt trời, quý nhân, danh vọng',
    strengths: ['Danh tiếng', 'Quý nhân phù trợ', 'Nhân từ', 'Công chúng'],
    weaknesses: ['Hao tài', 'Bận rộn', 'Vất vả'],
  },
  {
    id: 'vuKhuc',
    name: 'Vu Khuc',
    nameVi: 'Vũ Khúc',
    group: 'tuvi',
    nguHanh: 'Kim',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'dacDia', Dần: 'hamDia', Mão: 'binhHoa',
      Thìn: 'mieu', Tỵ: 'dacDia', Ngọ: 'hamDia', Mùi: 'binhHoa',
      Thân: 'mieu', Dậu: 'dacDia', Tuất: 'mieu', Hợi: 'dacDia',
    },
    description: 'Sao tài lộc, kiên quyết, cương trực',
    strengths: ['Tài lộc', 'Kinh doanh', 'Quyết đoán', 'Bền bỉ'],
    weaknesses: ['Cứng nhắc', 'Cô đơn', 'Hay mâu thuẫn'],
  },
  {
    id: 'thienDong',
    name: 'Thien Dong',
    nameVi: 'Thiên Đồng',
    group: 'tuvi',
    nguHanh: 'Thủy',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'binhHoa', Dần: 'dacDia', Mão: 'mieu',
      Thìn: 'hamDia', Tỵ: 'dacDia', Ngọ: 'hamDia', Mùi: 'mieu',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'hamDia', Hợi: 'mieu',
    },
    description: 'Sao phúc đức, vui vẻ, hưởng thụ',
    strengths: ['Phúc lộc', 'Vui tươi', 'Được yêu quý', 'Hưởng thụ'],
    weaknesses: ['Lười biếng', 'Thiếu nghị lực', 'Dựa dẫm'],
  },
  {
    id: 'liemTrinh',
    name: 'Liem Trinh',
    nameVi: 'Liêm Trinh',
    group: 'tuvi',
    nguHanh: 'Hỏa',
    isGood: false,
    brightness: {
      Tý: 'dacDia', Sửu: 'binhHoa', Dần: 'mieu', Mão: 'hamDia',
      Thìn: 'dacDia', Tỵ: 'mieu', Ngọ: 'binhHoa', Mùi: 'hamDia',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'dacDia', Hợi: 'mieu',
    },
    description: 'Sao quan hệ xã hội, cũng là sao tù tội nếu gặp sao xấu',
    strengths: ['Giao tiếp', 'Chính trực', 'Nghệ thuật'],
    weaknesses: ['Kiện tụng', 'Tai họa', 'Cô lập'],
  },
  // NHÓM THIÊN PHỦ
  {
    id: 'thienPhu',
    name: 'Thien Phu',
    nameVi: 'Thiên Phủ',
    group: 'thienPhu',
    nguHanh: 'Thổ',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'dacDia', Dần: 'binhHoa', Mão: 'dacDia',
      Thìn: 'mieu', Tỵ: 'dacDia', Ngọ: 'mieu', Mùi: 'dacDia',
      Thân: 'mieu', Dậu: 'dacDia', Tuất: 'mieu', Hợi: 'dacDia',
    },
    description: 'Sao phú quý, bảo thủ tài sản',
    strengths: ['Giàu có', 'Bảo tồn', 'Ổn định', 'Tin cậy'],
    weaknesses: ['Bảo thủ', 'Thiếu sáng tạo'],
  },
  {
    id: 'thaiAm',
    name: 'Thai Am',
    nameVi: 'Thái Âm',
    group: 'thienPhu',
    nguHanh: 'Thủy',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'dacDia', Dần: 'binhHoa', Mão: 'mieu',
      Thìn: 'binhHoa', Tỵ: 'hamDia', Ngọ: 'hamDia', Mùi: 'binhHoa',
      Thân: 'mieu', Dậu: 'mieu', Tuất: 'dacDia', Hợi: 'mieu',
    },
    description: 'Sao mặt trăng, tình cảm, phụ nữ',
    strengths: ['Tình cảm', 'Nữ sắc', 'Tài sản', 'Mẹ'],
    weaknesses: ['Đa sầu', 'Thay đổi', 'Mờ nhạt'],
  },
  {
    id: 'thamLang',
    name: 'Tham Lang',
    nameVi: 'Tham Lang',
    group: 'thienPhu',
    nguHanh: 'Thủy',
    isGood: false,
    brightness: {
      Tý: 'mieu', Sửu: 'hamDia', Dần: 'dacDia', Mão: 'binhHoa',
      Thìn: 'hamDia', Tỵ: 'dacDia', Ngọ: 'mieu', Mùi: 'hamDia',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'hamDia', Hợi: 'mieu',
    },
    description: 'Sao đa dục, hưởng thụ, cũng là sao năng động',
    strengths: ['Đa tài', 'Hưởng thụ', 'Nghệ thuật', 'Kiếm tiền nhanh'],
    weaknesses: ['Đa dục', 'Không ổn định', 'Cờ bạc rượu chè'],
  },
  {
    id: 'cuMon',
    name: 'Cu Mon',
    nameVi: 'Cự Môn',
    group: 'thienPhu',
    nguHanh: 'Thủy',
    isGood: false,
    brightness: {
      Tý: 'mieu', Sửu: 'dacDia', Dần: 'hamDia', Mão: 'binhHoa',
      Thìn: 'dacDia', Tỵ: 'binhHoa', Ngọ: 'hamDia', Mùi: 'dacDia',
      Thân: 'hamDia', Dậu: 'binhHoa', Tuất: 'dacDia', Hợi: 'binhHoa',
    },
    description: 'Sao miệng lưỡi, thị phi, cũng là sao hùng biện',
    strengths: ['Hùng biện', 'Diễn thuyết', 'Pháp luật', 'Y học'],
    weaknesses: ['Thị phi', 'Kiện tụng', 'Tranh cãi'],
  },
  {
    id: 'thienTuong',
    name: 'Thien Tuong',
    nameVi: 'Thiên Tướng',
    group: 'thienPhu',
    nguHanh: 'Thủy',
    isGood: true,
    brightness: {
      Tý: 'mieu', Sửu: 'binhHoa', Dần: 'dacDia', Mão: 'mieu',
      Thìn: 'binhHoa', Tỵ: 'dacDia', Ngọ: 'mieu', Mùi: 'binhHoa',
      Thân: 'dacDia', Dậu: 'mieu', Tuất: 'binhHoa', Hợi: 'dacDia',
    },
    description: 'Sao ấn thụ, quan lộc, công bằng',
    strengths: ['Công bằng', 'Quan lộc', 'Phụ tá', 'Quản lý'],
    weaknesses: ['Thụ động', 'Phụ thuộc'],
  },
  {
    id: 'thienLuong',
    name: 'Thien Luong',
    nameVi: 'Thiên Lương',
    group: 'thienPhu',
    nguHanh: 'Mộc',
    isGood: true,
    brightness: {
      Tý: 'dacDia', Sửu: 'mieu', Dần: 'mieu', Mão: 'dacDia',
      Thìn: 'binhHoa', Tỵ: 'hamDia', Ngọ: 'dacDia', Mùi: 'mieu',
      Thân: 'binhHoa', Dậu: 'hamDia', Tuất: 'binhHoa', Hợi: 'dacDia',
    },
    description: 'Sao nhân từ, trưởng thượng, y học',
    strengths: ['Nhân từ', 'Học vấn cao', 'Y học', 'Thọ'],
    weaknesses: ['Cô đơn', 'Hay lo nghĩ', 'Chậm chạp'],
  },
  {
    id: 'thatSat',
    name: 'That Sat',
    nameVi: 'Thất Sát',
    group: 'thienPhu',
    nguHanh: 'Kim',
    isGood: false,
    brightness: {
      Tý: 'mieu', Sửu: 'hamDia', Dần: 'dacDia', Mão: 'binhHoa',
      Thìn: 'mieu', Tỵ: 'dacDia', Ngọ: 'mieu', Mùi: 'hamDia',
      Thân: 'dacDia', Dậu: 'binhHoa', Tuất: 'mieu', Hợi: 'hamDia',
    },
    description: 'Sao quyết liệt, chinh chiến, mạo hiểm',
    strengths: ['Dũng cảm', 'Quyết đoán', 'Quân sự', 'Thể thao'],
    weaknesses: ['Nóng nảy', 'Tai nạn', 'Xung đột'],
  },
  {
    id: 'phaQuan',
    name: 'Pha Quan',
    nameVi: 'Phá Quân',
    group: 'thienPhu',
    nguHanh: 'Thủy',
    isGood: false,
    brightness: {
      Tý: 'mieu', Sửu: 'hamDia', Dần: 'binhHoa', Mão: 'dacDia',
      Thìn: 'hamDia', Tỵ: 'binhHoa', Ngọ: 'mieu', Mùi: 'hamDia',
      Thân: 'binhHoa', Dậu: 'dacDia', Tuất: 'hamDia', Hợi: 'binhHoa',
    },
    description: 'Sao phá cách, thay đổi, không ổn định',
    strengths: ['Sáng tạo', 'Đổi mới', 'Tiên phong'],
    weaknesses: ['Phá hoại', 'Không ổn định', 'Hao tổn'],
  },
]

export const CHINH_TINH_MAP: Record<string, ChinhTinh> = Object.fromEntries(
  CHINH_TINH.map((s) => [s.id, s])
)
