/**
 * 12 Trực (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế)
 * Calculated from the combination of lunar month branch and day branch
 */

export interface Truc {
  name: string
  nameVi: string
  rating: 'tot' | 'xau' | 'trung'
  description: string
  goodFor: string[]
  badFor: string[]
}

export const TRUC_LIST: Truc[] = [
  {
    name: 'Kien',
    nameVi: 'Kiến',
    rating: 'tot',
    description: 'Ngày lành, thích hợp khởi sự',
    goodFor: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Xây dựng'],
    badFor: ['An táng'],
  },
  {
    name: 'Tru',
    nameVi: 'Trừ',
    rating: 'trung',
    description: 'Ngày trung bình, nên tránh khởi sự',
    goodFor: ['Dọn dẹp', 'Chữa bệnh'],
    badFor: ['Khai trương', 'Cưới hỏi', 'Xuất hành'],
  },
  {
    name: 'Man',
    nameVi: 'Mãn',
    rating: 'tot',
    description: 'Ngày đầy đủ, viên mãn',
    goodFor: ['Khai trương', 'Cưới hỏi', 'Hội họp', 'Mua bán'],
    badFor: ['An táng', 'Cầu kiện'],
  },
  {
    name: 'Binh',
    nameVi: 'Bình',
    rating: 'trung',
    description: 'Ngày bằng phẳng, ổn định',
    goodFor: ['Du lịch', 'Học tập', 'Thăm hỏi'],
    badFor: ['Tố tụng'],
  },
  {
    name: 'Dinh',
    nameVi: 'Định',
    rating: 'tot',
    description: 'Ngày vững chắc, ổn định',
    goodFor: ['Giao dịch', 'Kết hôn', 'Khai trương', 'Mua bán'],
    badFor: ['Đi xa', 'Xuất hành'],
  },
  {
    name: 'Chap',
    nameVi: 'Chấp',
    rating: 'trung',
    description: 'Ngày chấp nhận, bắt đầu',
    goodFor: ['Trồng trọt', 'Xây dựng'],
    badFor: ['Kết hôn', 'Khai trương'],
  },
  {
    name: 'Pha',
    nameVi: 'Phá',
    rating: 'xau',
    description: 'Ngày phá hỏng, nên tránh khởi sự',
    goodFor: ['Phá dỡ công trình cũ'],
    badFor: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Ký hợp đồng'],
  },
  {
    name: 'Nguy',
    nameVi: 'Nguy',
    rating: 'xau',
    description: 'Ngày nguy hiểm, cần thận trọng',
    goodFor: [],
    badFor: ['Xuất hành', 'Khai trương', 'Cưới hỏi'],
  },
  {
    name: 'Thanh',
    nameVi: 'Thành',
    rating: 'tot',
    description: 'Ngày thành công, hoàn tất',
    goodFor: ['Khai trương', 'Cưới hỏi', 'Ký hợp đồng', 'Nhập trạch'],
    badFor: ['An táng'],
  },
  {
    name: 'Thu',
    nameVi: 'Thu',
    rating: 'trung',
    description: 'Ngày thu hoạch',
    goodFor: ['Thu hoạch', 'Ký kết'],
    badFor: ['Xuất hành', 'Khai trương'],
  },
  {
    name: 'Khai',
    nameVi: 'Khai',
    rating: 'tot',
    description: 'Ngày mở ra, khởi đầu tốt',
    goodFor: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Nhập trạch', 'Động thổ'],
    badFor: ['An táng'],
  },
  {
    name: 'Be',
    nameVi: 'Bế',
    rating: 'xau',
    description: 'Ngày bế tắc, khép lại',
    goodFor: ['Tích trữ', 'Bảo quản'],
    badFor: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Động thổ'],
  },
]

/**
 * Calculate Truc for a given lunar date
 * Formula: (chiMonth + chiDay) % 12
 */
export function getTrucIndex(chiMonthIndex: number, chiDayIndex: number): number {
  return (chiMonthIndex + chiDayIndex) % 12
}

export function getTruc(chiMonthIndex: number, chiDayIndex: number): Truc {
  const idx = getTrucIndex(chiMonthIndex, chiDayIndex)
  return TRUC_LIST[idx]
}
