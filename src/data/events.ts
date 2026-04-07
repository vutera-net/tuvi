/**
 * Event Types & Date Selection Requirements
 * Defines special considerations for choosing good dates for various events
 */

export type EventCategory = 'wedding' | 'business' | 'construction' | 'moving' | 'other'

export interface EventType {
  key: string
  name: string
  nameVi: string
  category: EventCategory
  description: string
  descriptionVi: string
  /**
   * Specific Truc days that are favorable/unfavorable
   * null = no preference, true = favorable, false = unfavorable
   */
  trucPreferences?: Record<string, boolean | null>
  /**
   * Which hours are best for this event
   */
  preferredHours?: number[]
  /**
   * Special prohibitions for this event
   */
  prohibitions?: string[]
  /**
   * Age groups with special considerations
   * true = should check xung tuoi, false = no need
   */
  ageAdjustments?: boolean
}

const WEDDING_EVENTS: Record<string, EventType> = {
  cuoiHoi: {
    key: 'cuoiHoi',
    name: 'Wedding',
    nameVi: 'Cưới Hỏi',
    category: 'wedding',
    description: 'Wedding ceremony & betrothal',
    descriptionVi: 'Ngày cưới hỏi, hôn lễ',
    trucPreferences: {
      kien: true,
      tru: true,
      man: null,
      binh: false,
      dinh: false,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: null,
    },
    preferredHours: [5, 7, 9, 11, 13, 15], // Better hours for wedding
    prohibitions: [
      'Tam Nuong days',
      'Nguyet Ky days',
      'Days of Sat Chu for bride/groom zodiac',
      'Phu thien day if groom is Rat zodiac',
    ],
    ageAdjustments: true,
  },
  hinhhuon: {
    key: 'hinhhuon',
    name: 'Betrothal',
    nameVi: 'Hình Hưởng',
    category: 'wedding',
    description: 'Formal betrothal & engagement',
    descriptionVi: 'Ngày đính hôn, hình hương',
    trucPreferences: {
      kien: true,
      tru: true,
      man: true,
      binh: false,
      dinh: false,
      chap: true,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: true,
    },
    ageAdjustments: true,
  },
}

const BUSINESS_EVENTS: Record<string, EventType> = {
  khaiTruong: {
    key: 'khaiTruong',
    name: 'Grand Opening',
    nameVi: 'Khai Trương',
    category: 'business',
    description: 'Business opening, shop inauguration',
    descriptionVi: 'Khai trương cửa hàng, công ty',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: true,
      dinh: true,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
    preferredHours: [7, 9, 11, 13], // Business hours
    prohibitions: ['Hac Dao hours', 'Nguyet Ky days'],
  },
  kyHopDong: {
    key: 'kyHopDong',
    name: 'Contract Signing',
    nameVi: 'Ký Hợp Đồng',
    category: 'business',
    description: 'Signing important contracts or agreements',
    descriptionVi: 'Ngày ký hợp đồng, ký kết hợp tác',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: true,
      dinh: true,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
    prohibitions: ['Days when Hac Dao dominates'],
  },
  kiemPhong: {
    key: 'kiemPhong',
    name: 'Safe Installation',
    nameVi: 'Kiếm Phong',
    category: 'business',
    description: 'Installing a safe or vault',
    descriptionVi: 'Ngày đặt tủ khoá, kiếm phong',
    trucPreferences: {
      kien: true,
      tru: true,
      man: true,
      binh: false,
      dinh: false,
      chap: true,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: true,
    },
  },
  phucPhat: {
    key: 'phucPhat',
    name: 'Inventory Taking',
    nameVi: 'Phục Phát',
    category: 'business',
    description: 'Inventory counting, stock-taking',
    descriptionVi: 'Ngày bốc thẻ, bốc khoá, kiểm kho',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: null,
      dinh: null,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
  },
}

const CONSTRUCTION_EVENTS: Record<string, EventType> = {
  dongTho: {
    key: 'dongTho',
    name: 'Ground Breaking',
    nameVi: 'Động Thổ',
    category: 'construction',
    description: 'Ground breaking, construction commencement',
    descriptionVi: 'Ngày động thổ, khởi công xây dựng',
    trucPreferences: {
      kien: true,
      tru: null,
      man: false,
      binh: true,
      dinh: true,
      chap: false,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: false,
    },
    prohibitions: [
      'Days when animal zodiac clashes with site direction',
      'Thoi Dia days (seasonal conflicts)',
    ],
    ageAdjustments: true,
  },
  nhapTrach: {
    key: 'nhapTrach',
    name: 'Occupancy',
    nameVi: 'Nhập Trạch',
    category: 'construction',
    description: 'Moving into new house, occupancy',
    descriptionVi: 'Ngày nhập trạch, vào nhà mới',
    trucPreferences: {
      kien: true,
      tru: true,
      man: null,
      binh: false,
      dinh: false,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: null,
    },
    preferredHours: [7, 9, 11, 13], // Daytime preferred
    prohibitions: [
      'Tam Nuong days',
      'Thoi Dia days',
      'Days when zodiac xung with owner',
    ],
    ageAdjustments: true,
  },
  suaXua: {
    key: 'suaXua',
    name: 'House Renovation',
    nameVi: 'Sửa Xưa',
    category: 'construction',
    description: 'House renovation, repair',
    descriptionVi: 'Sửa nhà, cải tạo, tu sửa nhà cửa',
    trucPreferences: {
      kien: true,
      tru: null,
      man: false,
      binh: true,
      dinh: true,
      chap: false,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: false,
    },
  },
}

const MOVING_EVENTS: Record<string, EventType> = {
  xuatHanh: {
    key: 'xuatHanh',
    name: 'Travel Departure',
    nameVi: 'Xuất Hành',
    category: 'moving',
    description: 'Long journey departure, travel',
    descriptionVi: 'Ngày đi xa, khởi hành, đi công tác',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: true,
      dinh: null,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
    prohibitions: ['Days when zodiac xung with travel direction'],
    ageAdjustments: true,
  },
  dichDen: {
    key: 'dichDen',
    name: 'Relocation',
    nameVi: 'Dịch Đến',
    category: 'moving',
    description: 'Moving to new residence',
    descriptionVi: 'Ngày chuyển nhà, dịch chuyển địa điểm',
    trucPreferences: {
      kien: true,
      tru: true,
      man: null,
      binh: false,
      dinh: false,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: null,
    },
    ageAdjustments: true,
  },
}

const OTHER_EVENTS: Record<string, EventType> = {
  nhapHoc: {
    key: 'nhapHoc',
    name: 'School Enrollment',
    nameVi: 'Nhập Học',
    category: 'other',
    description: 'Starting school, enrollment',
    descriptionVi: 'Ngày vào học, đăng ký lớp',
    trucPreferences: {
      kien: true,
      tru: true,
      man: true,
      binh: false,
      dinh: false,
      chap: true,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: true,
    },
    preferredHours: [7, 9, 11],
    prohibitions: ['Hac Dao hours'],
    ageAdjustments: true,
  },
  caoDang: {
    key: 'caoDang',
    name: 'Promotion',
    nameVi: 'Cao Đắng',
    category: 'other',
    description: 'Promotion or advancement',
    descriptionVi: 'Ngày lên chức, thăng chức, vinh quang',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: true,
      dinh: true,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
  },
  doChuyen: {
    key: 'doChuyen',
    name: 'Job Change',
    nameVi: 'Đổi Chuyên',
    category: 'other',
    description: 'Changing job or career',
    descriptionVi: 'Ngày thay đổi công việc, chuyên ngành',
    trucPreferences: {
      kien: true,
      tru: null,
      man: true,
      binh: true,
      dinh: true,
      chap: null,
      pha: false,
      nguy: false,
      thanh: true,
      thu: null,
      khai: true,
      be: true,
    },
  },
  batSu: {
    key: 'batSu',
    name: 'Master Ceremony',
    nameVi: 'Bát Tự',
    category: 'other',
    description: 'Hair cutting, first haircut ceremony',
    descriptionVi: 'Ngày cắt tóc lần đầu, bát tự',
    trucPreferences: {
      kien: true,
      tru: true,
      man: true,
      binh: false,
      dinh: false,
      chap: true,
      pha: false,
      nguy: false,
      thanh: true,
      thu: true,
      khai: true,
      be: true,
    },
    ageAdjustments: false,
  },
}

// Combine all events
export const EVENT_TYPES = {
  ...WEDDING_EVENTS,
  ...BUSINESS_EVENTS,
  ...CONSTRUCTION_EVENTS,
  ...MOVING_EVENTS,
  ...OTHER_EVENTS,
}

export const EVENTS_BY_CATEGORY = {
  wedding: WEDDING_EVENTS,
  business: BUSINESS_EVENTS,
  construction: CONSTRUCTION_EVENTS,
  moving: MOVING_EVENTS,
  other: OTHER_EVENTS,
}

// Helper function to get event by key
export function getEvent(key: string): EventType | undefined {
  return EVENT_TYPES[key as keyof typeof EVENT_TYPES]
}

// Helper function to get all events in a category
export function getEventsByCategory(category: EventCategory): EventType[] {
  return Object.values(EVENTS_BY_CATEGORY[category])
}

// Helper function to check if a truc is favorable for an event
export function isTrucFavorable(eventKey: string, trucName: string): boolean | null {
  const event = getEvent(eventKey)
  if (!event || !event.trucPreferences) {
    return null
  }
  return event.trucPreferences[trucName.toLowerCase()] ?? null
}

// Get all available events as array
export const ALL_EVENTS = Object.values(EVENT_TYPES)

// Get events by category name
export function getCategoryEvents(category: EventCategory): EventType[] {
  return Object.values(EVENTS_BY_CATEGORY[category] || {})
}
