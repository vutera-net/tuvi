/**
 * Tu Vi Dau So - Minor Stars (Phu Tinh)
 * Include luck stars, protection stars, calamity stars, and romance stars
 */

export type PhutinhCategory = 'luck' | 'protection' | 'calamity' | 'romance'
export type PhutinhType = 'auspicious' | 'inauspicious' | 'neutral'

export interface MinorStar {
  name: string
  nameVi: string
  category: PhutinhCategory
  type: PhutinhType
  description: string
  descriptionVi: string
  meanings: {
    positive: string
    negative: string
  }
}

// Luck Stars (Sao Hoan Lich)
const LUCK_STARS: Record<string, MinorStar> = {
  locTon: {
    name: 'Loc Ton',
    nameVi: 'Lộc Tồn',
    category: 'luck',
    type: 'auspicious',
    description: 'Blessing & Fortune Star',
    descriptionVi: 'Sao Lộc - Mang lại phước lộc, may mắn',
    meanings: {
      positive: 'Wealth, fortune, career advancement, abundance',
      negative: 'Can bring complacency if not well-aspected',
    },
  },
  hoaTinh: {
    name: 'Hoa Tinh',
    nameVi: 'Hóa Tính',
    category: 'luck',
    type: 'auspicious',
    description: 'Transformation Star',
    descriptionVi: 'Sao Hóa Tính - Biến tổn thành lợi, xấu thành tốt',
    meanings: {
      positive:
        'Transforms obstacles into opportunities, luck in unexpected ways, literary talent',
      negative: 'Can cause dramatic changes if ill-placed',
    },
  },
  linhTinh: {
    name: 'Linh Tinh',
    nameVi: 'Linh Tính',
    category: 'luck',
    type: 'auspicious',
    description: 'Spiritual Talent Star',
    descriptionVi: 'Sao Linh Tính - Tài năng siêu phàm, linh cảm cao',
    meanings: {
      positive: 'Spiritual insight, intuition, exceptional talent, wisdom',
      negative: 'Can lead to escapism or unrealistic thinking',
    },
  },
}

// Protection Stars (Sao Bao Ve)
const PROTECTION_STARS: Record<string, MinorStar> = {
  diaKhong: {
    name: 'Dia Khong',
    nameVi: 'Địa Không',
    category: 'protection',
    type: 'inauspicious',
    description: 'Emptiness Star',
    descriptionVi: 'Sao Địa Không - Khí không, hư không, mất mát',
    meanings: {
      positive:
        'Can indicate release of constraints, void of obstacles (context-dependent)',
      negative: 'Loss, emptiness, wasted opportunities, missing things, theft risk',
    },
  },
  diaKiep: {
    name: 'Dia Kiep',
    nameVi: 'Địa Kiếp',
    category: 'protection',
    type: 'inauspicious',
    description: 'Robber Star',
    descriptionVi: 'Sao Địa Kiếp - Cướp, mất mát, tai nạn',
    meanings: {
      positive: 'Can indicate resourcefulness when well-aspected',
      negative: 'Loss, robbery, deception, accidents, betrayal',
    },
  },
  zaPhu: {
    name: 'Za Phu',
    nameVi: 'Tả Phù',
    category: 'protection',
    type: 'neutral',
    description: 'Left Assistant Star',
    descriptionVi: 'Sao Tả Phù - Trợ lực bên trái',
    meanings: {
      positive: 'Support from external sources, helpful people',
      negative: 'Dependency, over-reliance on others',
    },
  },
  huuBat: {
    name: 'Huu Bat',
    nameVi: 'Hữu Bất',
    category: 'protection',
    type: 'neutral',
    description: 'Right Quality Star',
    descriptionVi: 'Sao Hữu Bất - Chất lượng bên phải',
    meanings: {
      positive: 'Noble character, integrity, high standards',
      negative: 'Perfectionism, hard to please',
    },
  },
  vanXuong: {
    name: 'Van Xuong',
    nameVi: 'Văn Xương',
    category: 'protection',
    type: 'neutral',
    description: 'Literary Bone Star',
    descriptionVi: 'Sao Văn Xương - Văn chương, học vấn',
    meanings: {
      positive: 'Education, literature, artistic talent, academic success',
      negative: 'Over-intellectualization, pedantry',
    },
  },
  vanKhuc: {
    name: 'Van Khuc',
    nameVi: 'Văn Khúc',
    category: 'protection',
    type: 'neutral',
    description: 'Literary Bend Star',
    descriptionVi: 'Sao Văn Khúc - Văn khí bị cong, gián tiếp',
    meanings: {
      positive: 'Diplomatic skills, negotiation ability',
      negative: 'Indirectness, complications, slow progress',
    },
  },
  thienKhoi: {
    name: 'Thien Khoi',
    nameVi: 'Thiên Khôi',
    category: 'protection',
    type: 'auspicious',
    description: 'Heavenly Talent Star',
    descriptionVi: 'Sao Thiên Khôi - Tài năng phi thường',
    meanings: {
      positive: 'Exceptional talent, skill, excellence, fame',
      negative: 'Can attract jealousy or envy',
    },
  },
  thienViet: {
    name: 'Thien Viet',
    nameVi: 'Thiên Việt',
    category: 'protection',
    type: 'auspicious',
    description: 'Heavenly Remedy Star',
    descriptionVi: 'Sao Thiên Việt - Khả năng bù đắp, cứu rỗi',
    meanings: {
      positive: 'Problem-solving ability, recovery from setbacks, second chances',
      negative: 'Dependency on luck to fix problems',
    },
  },
}

// Calamity Stars (Sao Tai Hai)
const CALAMITY_STARS: Record<string, MinorStar> = {
  kinhDuong: {
    name: 'Kinh Duong',
    nameVi: 'Kình Dương',
    category: 'calamity',
    type: 'inauspicious',
    description: 'Punishment Star',
    descriptionVi: 'Sao Kình Dương - Phạt, trừng phạt, bệnh tật',
    meanings: {
      positive: 'Can drive justice, accountability',
      negative: 'Punishment, illness, conflict, accidents, legal troubles',
    },
  },
  daLa: {
    name: 'Da La',
    nameVi: 'Đại La',
    category: 'calamity',
    type: 'inauspicious',
    description: 'Major Calamity Star',
    descriptionVi: 'Sao Đại La - Tai họa lớn, bất hạnh',
    meanings: {
      positive: 'Can indicate dramatic transformation',
      negative: 'Calamity, major misfortune, accidents, dangerous situations',
    },
  },
  hoaKy: {
    name: 'Hoa Ky',
    nameVi: 'Hóa Kỵ',
    category: 'calamity',
    type: 'inauspicious',
    description: 'Transformation Obstacle Star',
    descriptionVi: 'Sao Hóa Kỵ - Chuyển hóa xấu, gây hại',
    meanings: {
      positive: 'Can force necessary endings and new beginnings',
      negative: 'Sudden changes, disruption, transformation into negative states',
    },
  },
}

// Romance & Relationship Stars (Sao Trai Dat)
const ROMANCE_STARS: Record<string, MinorStar> = {
  hongLoan: {
    name: 'Hong Loan',
    nameVi: 'Hồng Luyên',
    category: 'romance',
    type: 'neutral',
    description: 'Pink Fate Star',
    descriptionVi: 'Sao Hồng Luyên - Nhân duyên, tình duyên',
    meanings: {
      positive: 'Romance, marriage opportunity, attraction, social popularity',
      negative: 'Can indicate inappropriate relationships if poorly placed',
    },
  },
  thienHi: {
    name: 'Thien Hi',
    nameVi: 'Thiên Hỷ',
    category: 'romance',
    type: 'auspicious',
    description: 'Heavenly Joy Star',
    descriptionVi: 'Sao Thiên Hỷ - Vui vẻ, hạnh phúc, kết hôn tốt',
    meanings: {
      positive: 'Joy, happiness, marriage, celebration, good fortune in relationships',
      negative: 'Over-indulgence, lack of prudence',
    },
  },
  daoHoa: {
    name: 'Dao Hoa',
    nameVi: 'Đào Hoa',
    category: 'romance',
    type: 'neutral',
    description: 'Peach Blossom Star',
    descriptionVi: 'Sao Đào Hoa - Tình duyên, sắc duyên, lôi cuốn',
    meanings: {
      positive: 'Charm, attractiveness, romance, social appeal',
      negative: 'Can lead to infidelity or scandalous relationships if poorly aspected',
    },
  },
}

// Combined export
export const MINOR_STARS = {
  ...LUCK_STARS,
  ...PROTECTION_STARS,
  ...CALAMITY_STARS,
  ...ROMANCE_STARS,
}

export const MINOR_STARS_BY_CATEGORY = {
  luck: LUCK_STARS,
  protection: PROTECTION_STARS,
  calamity: CALAMITY_STARS,
  romance: ROMANCE_STARS,
}

// Get all minor stars as array
export const ALL_MINOR_STARS = Object.values(MINOR_STARS)

// Get minor stars by type
export const AUSPICIOUS_MINOR_STARS = ALL_MINOR_STARS.filter((s) => s.type === 'auspicious')
export const INAUSPICIOUS_MINOR_STARS = ALL_MINOR_STARS.filter((s) => s.type === 'inauspicious')
export const NEUTRAL_MINOR_STARS = ALL_MINOR_STARS.filter((s) => s.type === 'neutral')

// Helper function to get star by name
export function getMinorStar(key: string): MinorStar | undefined {
  return MINOR_STARS[key as keyof typeof MINOR_STARS]
}

// Helper function to get category description
export function getCategoryDescription(category: PhutinhCategory): string {
  const descriptions: Record<PhutinhCategory, string> = {
    luck: 'Luck Stars (Sao Hoan Lich)',
    protection: 'Protection Stars (Sao Bao Ve)',
    calamity: 'Calamity Stars (Sao Tai Hai)',
    romance: 'Romance Stars (Sao Trai Dat)',
  }
  return descriptions[category]
}
