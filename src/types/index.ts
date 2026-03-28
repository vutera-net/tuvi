// ============================================================
// CALENDAR TYPES
// ============================================================

export interface LunarDate {
  day: number
  month: number
  year: number
  isLeapMonth: boolean
  canDay: number // 0-9
  chiDay: number // 0-11
  canMonth: number
  chiMonth: number
  canYear: number
  chiYear: number
  jd: number // Julian Day Number
  solarTerm?: string
}

export interface SolarDate {
  day: number
  month: number
  year: number
  dayOfWeek: number // 0=CN,1=T2...6=T7
}

export interface DayInfo {
  solar: SolarDate
  lunar: LunarDate
  canGio: number[] // Can cho 12 gio
  chiGio: number[] // Chi cho 12 gio (0-11 tuong ung 12 dia chi)
  hoangDaoGio: number[] // Indices of hoang dao hours
  hacDaoGio: number[] // Indices of hac dao hours
  truc: string // 1 in 12 truc
  sao28: string // 1 in 28 sao
  sao28Rating: 'tot' | 'xau' | 'trung'
  solarTerm?: string // Tiet khi if applicable
  ngayKy: string[] // Tam Nuong, Nguyet Ky...
  festivals: string[]
  rating: 'tot' | 'xau' | 'trung' // Overall day rating
}

// ============================================================
// NGU HANH TYPES
// ============================================================

export type NguHanh = 'Kim' | 'Moc' | 'Thuy' | 'Hoa' | 'Tho'

export interface NguHanhInfo {
  menh: NguHanh
  napAm: string // Full Nap Am name (e.g. "Hai Trung Kim")
  mauSacTot: string[]
  mauSacXau: string[]
  huongTot: string[]
  soMayMan: number[]
  tinhCach: string
  sinhBoi: NguHanh // Element that gives birth to this
  khacBoi: NguHanh // Element that dominates this
  sinh: NguHanh // Element this gives birth to
  khac: NguHanh // Element this dominates
}

export interface CompatibilityResult {
  person1: { name: string; menh: NguHanh; napAm: string }
  person2: { name: string; menh: NguHanh; napAm: string }
  relationship: 'tuongSinh' | 'tuongKhac' | 'hoa' // compatible / conflict / neutral
  score: number // 0-100
  analysis: string
}

// ============================================================
// TU VI TYPES
// ============================================================

export type StarBrightness = 'mieu' | 'vuong' | 'dacDia' | 'binhHoa' | 'hamDia'

export interface Star {
  name: string
  brightness: StarBrightness
  isGood: boolean
  shortMeaning: string
}

export interface Palace {
  index: number // 0-11
  name: string // Menh, Huynh De, Phu The...
  diaChi: string // Ty, Suu, Dan...
  isLifePalace: boolean // Menh cung
  isSoulPalace: boolean // Than cung
  mainStars: Star[]
  minorStars: Star[]
  summary?: string
}

export interface DaiHan {
  startAge: number
  endAge: number
  startYear: number
  palaceIndex: number
  palaceName: string
  diaChi: string
}

export interface TuViChart {
  id?: string
  label: string
  gender: 'male' | 'female'
  birthDate: LunarDate
  birthHourIndex: number // 0-11
  birthHourName: string // Ty, Suu...
  cuc: string // Thuy Nhi Cuc / Moc Tam Cuc...
  cucNumber: number // 2/3/4/5/6
  menh: NguHanh
  napAm: string
  cungMenhIndex: number
  cungThanIndex: number
  palaces: Palace[]
  daiHan: DaiHan[]
}

// ============================================================
// DATE SELECTION TYPES
// ============================================================

export type EventType =
  | 'cuoiHoi'
  | 'khaiTruong'
  | 'dongTho'
  | 'nhapTrach'
  | 'xuatHanh'
  | 'kyHopDong'
  | 'general'

export interface DateSelectionResult {
  solar: SolarDate
  lunar: LunarDate
  score: number // 0-100
  rating: 'tot' | 'kha' | 'trung' | 'xau'
  truc: string
  sao28: string
  sao28Rating: 'tot' | 'xau' | 'trung'
  hoangDaoHours: string[]
  issues: string[] // Nhung dieu can tranh
  advantages: string[] // Nhung diem tot
  suitable: boolean // Suitable for the requested event type
}

// ============================================================
// PHONG THUY TYPES
// ============================================================

export type CungMenh =
  | 'Kham'
  | 'Khon'
  | 'Chan'
  | 'Ton'
  | 'Can'
  | 'Doai'
  | 'Gen'
  | 'Ly'

export type MenhNhom = 'dong' | 'tay'

export type HuongName =
  | 'Sinh Khi'
  | 'Thien Y'
  | 'Dien Nien'
  | 'Phuc Vi'
  | 'Hoa Hai'
  | 'Luc Sat'
  | 'Ngu Quy'
  | 'Tuyet Menh'

export interface HuongInfo {
  name: HuongName
  direction: string // B/N/D/T/DB/DN/TB/TN
  isTot: boolean
  meaning: string
  usage: string
}

export interface BatTrachResult {
  cungMenh: CungMenh
  cungNumber: number // 1,2,3,4,6,7,8,9
  nhomMenh: MenhNhom
  huongs: HuongInfo[]
  huongNhaTot: HuongInfo[] // Top 4 tot
  huongNhaXau: HuongInfo[] // Top 4 xau
}

export interface CuuCungCell {
  star: number // 1-9
  direction: string
  isTot: boolean
  meaning: string
}

export interface CuuCungResult {
  year: number
  month?: number
  centerStar: number
  grid: CuuCungCell[][] // 3x3
  analysis: string
}

// ============================================================
// DAILY HOROSCOPE TYPES
// ============================================================

export type ZodiacSign =
  | 'ty'
  | 'suu'
  | 'dan'
  | 'mao'
  | 'thin'
  | 'ti'
  | 'ngo'
  | 'mui'
  | 'than'
  | 'dau'
  | 'tuat'
  | 'hoi'

export interface HoroscopeScores {
  tongQuan: number // 1-10
  tinhCam: number
  suNghiep: number
  taiChinh: number
  sucKhoe: number
}

export interface DailyHoroscopeContent {
  zodiac: ZodiacSign
  date: string // ISO date
  scores: HoroscopeScores
  tongQuan: string
  tinhCam: string
  suNghiep: string
  taiChinh: string
  sucKhoe: string
  luckyColor: string
  luckyDirection: string
  luckyHour: string
  luckyNumber: number
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
