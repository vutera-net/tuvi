/**
 * 24 Tiết Khí (Solar Terms)
 */

export interface TietKhi {
  name: string
  nameVi: string
  month: number // Solar month (1-12)
  description: string
}

export const TIET_KHI: TietKhi[] = [
  { name: 'Lap Xuan', nameVi: 'Lập Xuân', month: 2, description: 'Bắt đầu mùa xuân' },
  { name: 'Vu Thuy', nameVi: 'Vũ Thủy', month: 2, description: 'Mưa nước' },
  { name: 'Kinh Trap', nameVi: 'Kinh Trập', month: 3, description: 'Sâu bọ thức giấc' },
  { name: 'Xuan Phan', nameVi: 'Xuân Phân', month: 3, description: 'Xuân phân' },
  { name: 'Thanh Minh', nameVi: 'Thanh Minh', month: 4, description: 'Trời quang mây tạnh' },
  { name: 'Coc Vu', nameVi: 'Cốc Vũ', month: 4, description: 'Mưa lúa' },
  { name: 'Lap Ha', nameVi: 'Lập Hạ', month: 5, description: 'Bắt đầu mùa hè' },
  { name: 'Tieu Man', nameVi: 'Tiểu Mãn', month: 5, description: 'Lúa bắt đầu chín' },
  { name: 'Mang Chung', nameVi: 'Mang Chủng', month: 6, description: 'Gieo hạt lúa mạch' },
  { name: 'Ha Chi', nameVi: 'Hạ Chí', month: 6, description: 'Hạ chí' },
  { name: 'Tieu Thu', nameVi: 'Tiểu Thử', month: 7, description: 'Hơi nóng nhỏ' },
  { name: 'Dai Thu', nameVi: 'Đại Thử', month: 7, description: 'Hơi nóng lớn' },
  { name: 'Lap Thu', nameVi: 'Lập Thu', month: 8, description: 'Bắt đầu mùa thu' },
  { name: 'Xu Thu', nameVi: 'Xử Thử', month: 8, description: 'Hết nóng bức' },
  { name: 'Bach Lo', nameVi: 'Bạch Lộ', month: 9, description: 'Sương trắng' },
  { name: 'Thu Phan', nameVi: 'Thu Phân', month: 9, description: 'Thu phân' },
  { name: 'Han Lo', nameVi: 'Hàn Lộ', month: 10, description: 'Sương lạnh' },
  { name: 'Suong Giong', nameVi: 'Sương Giáng', month: 10, description: 'Sương giáng xuống' },
  { name: 'Lap Dong', nameVi: 'Lập Đông', month: 11, description: 'Bắt đầu mùa đông' },
  { name: 'Tieu Tuyet', nameVi: 'Tiểu Tuyết', month: 11, description: 'Tuyết nhỏ' },
  { name: 'Dai Tuyet', nameVi: 'Đại Tuyết', month: 12, description: 'Tuyết lớn' },
  { name: 'Dong Chi', nameVi: 'Đông Chí', month: 12, description: 'Đông chí' },
  { name: 'Tieu Han', nameVi: 'Tiểu Hàn', month: 1, description: 'Lạnh nhỏ' },
  { name: 'Dai Han', nameVi: 'Đại Hàn', month: 1, description: 'Lạnh lớn' },
]

/**
 * Approximate solar term dates (day of month) for each year
 * In practice, computed from solar longitude - these are approximations
 */
export const TIET_KHI_APPROX_DAYS: number[] = [
  4, 19, // Jan: Tiểu Hàn, Đại Hàn
  4, 19, // Feb: Lập Xuân, Vũ Thủy
  6, 21, // Mar: Kinh Trập, Xuân Phân
  5, 20, // Apr: Thanh Minh, Cốc Vũ
  6, 21, // May: Lập Hạ, Tiểu Mãn
  6, 21, // Jun: Mang Chủng, Hạ Chí
  7, 23, // Jul: Tiểu Thử, Đại Thử
  7, 23, // Aug: Lập Thu, Xử Thử
  8, 23, // Sep: Bạch Lộ, Thu Phân
  8, 23, // Oct: Hàn Lộ, Sương Giáng
  7, 22, // Nov: Lập Đông, Tiểu Tuyết
  7, 22, // Dec: Đại Tuyết, Đông Chí
]
