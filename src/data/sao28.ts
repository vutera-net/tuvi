/**
 * 28 Sao (Lunar Mansions / Nhị Thập Bát Tú)
 * Divided into 4 groups of 7 stars for East/North/West/South
 */

export interface Sao28 {
  index: number // 0-27
  name: string
  nameVi: string
  group: 'Dong' | 'Bac' | 'Tay' | 'Nam'
  animal: string
  rating: 'tot' | 'xau' | 'trung'
  description: string
  goodFor: string[]
  badFor: string[]
}

export const SAO_28: Sao28[] = [
  // ĐÔNG (7 sao)
  { index: 0, name: 'Giac', nameVi: 'Giác', group: 'Dong', animal: 'Giao long', rating: 'tot', description: 'Sao tốt, thích hợp khởi sự', goodFor: ['Xuất hành', 'Khai trương', 'Cưới hỏi'], badFor: [] },
  { index: 1, name: 'Khang', nameVi: 'Cang', group: 'Dong', animal: 'Rồng', rating: 'xau', description: 'Sao xấu, nên tránh việc trọng đại', goodFor: [], badFor: ['Cưới hỏi', 'Khai trương'] },
  { index: 2, name: 'De', nameVi: 'Đê', group: 'Dong', animal: 'Chó đất', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Xuất hành', 'Khai trương'] },
  { index: 3, name: 'Phong', nameVi: 'Phòng', group: 'Dong', animal: 'Thỏ', rating: 'tot', description: 'Sao tốt, tài lộc hanh thông', goodFor: ['Mua bán', 'Khai trương', 'Hôn nhân'], badFor: [] },
  { index: 4, name: 'Tam', nameVi: 'Tâm', group: 'Dong', animal: 'Cáo', rating: 'xau', description: 'Sao xấu, hung hiểm', goodFor: [], badFor: ['Cưới hỏi', 'Xuất hành', 'Khai trương'] },
  { index: 5, name: 'Wei', nameVi: 'Vĩ', group: 'Dong', animal: 'Hổ', rating: 'tot', description: 'Sao tốt, thịnh vượng', goodFor: ['Xây dựng', 'Khai trương', 'Hôn nhân'], badFor: [] },
  { index: 6, name: 'Co', nameVi: 'Cơ', group: 'Dong', animal: 'Báo', rating: 'trung', description: 'Sao trung bình', goodFor: ['Học tập'], badFor: ['Xuất hành'] },

  // BẮC (7 sao)
  { index: 7, name: 'Dau', nameVi: 'Đẩu', group: 'Bac', animal: 'Hươu', rating: 'tot', description: 'Sao tốt, quan lộc hanh thông', goodFor: ['Khai trương', 'Xuất hành', 'Nhậm chức'], badFor: [] },
  { index: 8, name: 'Nguu', nameVi: 'Ngưu', group: 'Bac', animal: 'Trâu', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Cưới hỏi', 'Khai trương', 'Xuất hành'] },
  { index: 9, name: 'Nu', nameVi: 'Nữ', group: 'Bac', animal: 'Dơi', rating: 'trung', description: 'Sao trung bình', goodFor: ['May mặc', 'Thêu thùa'], badFor: ['Xuất hành'] },
  { index: 10, name: 'Hu', nameVi: 'Hư', group: 'Bac', animal: 'Chuột', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Khai trương', 'Xuất hành', 'Cưới hỏi'] },
  { index: 11, name: 'Nguy', nameVi: 'Nguy', group: 'Bac', animal: 'Chim én', rating: 'trung', description: 'Sao trung bình', goodFor: ['Phúc lộc'], badFor: ['Xuất hành'] },
  { index: 12, name: 'That', nameVi: 'Thất', group: 'Bac', animal: 'Lợn', rating: 'tot', description: 'Sao tốt, hanh thông', goodFor: ['Xây dựng', 'Khai trương'], badFor: [] },
  { index: 13, name: 'Bich', nameVi: 'Bích', group: 'Bac', animal: 'Du', rating: 'tot', description: 'Sao tốt', goodFor: ['Học tập', 'Khai trương'], badFor: [] },

  // TÂY (7 sao)
  { index: 14, name: 'Khue', nameVi: 'Khuê', group: 'Tay', animal: 'Chó', rating: 'tot', description: 'Sao tốt, văn học hanh thông', goodFor: ['Học tập', 'Xuất bản', 'Khai trương'], badFor: [] },
  { index: 15, name: 'Lau', nameVi: 'Lâu', group: 'Tay', animal: 'Gà', rating: 'tot', description: 'Sao tốt, sinh tài', goodFor: ['Mua bán', 'Khai trương', 'Hôn nhân'], badFor: [] },
  { index: 16, name: 'Vi', nameVi: 'Vị', group: 'Tay', animal: 'Quạ', rating: 'tot', description: 'Sao tốt, phúc thọ', goodFor: ['Cưới hỏi', 'Khai trương', 'Xuất hành'], badFor: [] },
  { index: 17, name: 'Mao', nameVi: 'Mão', group: 'Tay', animal: 'Khỉ', rating: 'xau', description: 'Sao xấu, hung hiểm', goodFor: [], badFor: ['Cưới hỏi', 'Khai trương', 'Xuất hành'] },
  { index: 18, name: 'Tat', nameVi: 'Tất', group: 'Tay', animal: 'Ngựa', rating: 'tot', description: 'Sao tốt, lợi ích', goodFor: ['Mua bán', 'Du lịch'], badFor: [] },
  { index: 19, name: 'Chuy', nameVi: 'Chủy', group: 'Tay', animal: 'Sói', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Xuất hành', 'Khai trương'] },
  { index: 20, name: 'Sam', nameVi: 'Sâm', group: 'Tay', animal: 'Vượn', rating: 'trung', description: 'Sao trung bình', goodFor: ['Cầu kiện'], badFor: ['Hôn nhân'] },

  // NAM (7 sao)
  { index: 21, name: 'Tinh', nameVi: 'Tỉnh', group: 'Nam', animal: 'Sao', rating: 'tot', description: 'Sao tốt, hanh thông', goodFor: ['Khai trương', 'Xuất hành', 'Học tập'], badFor: [] },
  { index: 22, name: 'Qui', nameVi: 'Quỉ', group: 'Nam', animal: 'Dê', rating: 'xau', description: 'Sao xấu, phòng tai nạn', goodFor: [], badFor: ['Xuất hành', 'Khai trương', 'Cưới hỏi'] },
  { index: 23, name: 'Lieu', nameVi: 'Liễu', group: 'Nam', animal: 'Hươu', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Xuất hành', 'Khai trương'] },
  { index: 24, name: 'Tinh2', nameVi: 'Tinh', group: 'Nam', animal: 'Mã', rating: 'tot', description: 'Sao tốt, danh vọng', goodFor: ['Nhậm chức', 'Khai trương', 'Cưới hỏi'], badFor: [] },
  { index: 25, name: 'Truong', nameVi: 'Trương', group: 'Nam', animal: 'Hươu', rating: 'tot', description: 'Sao tốt, thịnh vượng', goodFor: ['Khai trương', 'Xuất hành', 'Mua bán'], badFor: [] },
  { index: 26, name: 'I', nameVi: 'Dực', group: 'Nam', animal: 'Rắn', rating: 'xau', description: 'Sao xấu', goodFor: [], badFor: ['Xuất hành', 'Khai trương', 'Cưới hỏi'] },
  { index: 27, name: 'Chan', nameVi: 'Chẩn', group: 'Nam', animal: 'Giun', rating: 'tot', description: 'Sao tốt, văn chương', goodFor: ['Học tập', 'Viết lách'], badFor: [] },
]

/**
 * Get the 28 Sao index for a given day
 * Formula: (jd + offset) % 28
 * Reference: sao Giác is on a specific JD
 */
export function getSao28Index(jd: number): number {
  // Julian Day 2451545 (Jan 1, 2000) -> Sao index mapping
  // This is an approximation; precise calculation needs ephemeris
  return ((jd - 2451545 + 10) % 28 + 28) % 28
}

export function getSao28(jd: number): Sao28 {
  return SAO_28[getSao28Index(jd)]
}
