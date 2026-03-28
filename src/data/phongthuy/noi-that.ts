/**
 * Interior Feng Shui Rules - Noi That
 * Room placement recommendations and furniture arrangement rules
 */

export interface RoomType {
  name: string
  nameVi: string
  purpose: string
  bestDirections: string[]
  avoidDirections: string[]
  elements: string[]
  colors: string[]
  recommendations: RoomRecommendation[]
}

export interface RoomRecommendation {
  item: string
  placement: string
  purpose: string
  warning?: string
}

// Bedroom (Phong Ngu)
export const BEDROOM_RULES: RoomRecommendation[] = [
  {
    item: 'Bed headboard',
    placement: 'Against solid wall, not facing door',
    purpose: 'Support and stability, avoid direct flow of chi to head',
    warning: 'Never place bed opposite to door (death position)',
  },
  {
    item: 'Bed position',
    placement: 'Away from windows, not under beams',
    purpose: 'Stability and protection from chi loss',
  },
  {
    item: 'Mirror',
    placement: 'Never opposite bed or reflecting bed',
    purpose: 'Avoid multiplication of negative chi during sleep',
  },
  {
    item: 'Door',
    placement: 'Not visible from bed (use curtain if necessary)',
    purpose: 'Privacy and mental peace',
  },
  {
    item: 'Nightstands',
    placement: 'Symmetrical on both sides of bed',
    purpose: 'Balance and harmony in relationship',
  },
  {
    item: 'Lighting',
    placement: 'Soft, warm lighting; dimmer switches recommended',
    purpose: 'Relaxation and sleep quality',
  },
  {
    item: 'Plants',
    placement: 'Away from bed, in corners with good energy',
    purpose: 'Fresh oxygen without interfering with sleep chi',
  },
  {
    item: 'Electronics',
    placement: 'Away from bed, turn off at night',
    purpose: 'Reduce EMF exposure, improve sleep',
  },
]

// Living Room (Phong Khach)
export const LIVING_ROOM_RULES: RoomRecommendation[] = [
  {
    item: 'Sofa',
    placement: 'Facing entrance but not directly opposite door',
    purpose: 'Welcoming energy, command position',
  },
  {
    item: 'Coffee table',
    placement: 'Center of room, not blocking chi flow',
    purpose: 'Grounding and focal point',
  },
  {
    item: 'TV',
    placement: 'Against wall, not facing bed if open concept',
    purpose: 'Avoid energy distraction in sleeping area',
  },
  {
    item: 'Plants',
    placement: 'Corners and edges to soften sharp angles',
    purpose: 'Improve air quality, balance energy',
  },
  {
    item: 'Art/Paintings',
    placement: 'Uplifting images, avoid dark or violent scenes',
    purpose: 'Set positive mood and energy',
    warning: 'Avoid images of water in living room (wealth loss)',
  },
  {
    item: 'Lighting',
    placement: 'Bright but warm, multiple sources',
    purpose: 'Active yang energy for social space',
  },
  {
    item: 'Entryway',
    placement: 'Clear and uncluttered',
    purpose: 'Allow positive chi to enter home',
    warning: 'Never block entryway with large furniture',
  },
  {
    item: 'Water feature',
    placement: 'Left or center of room, never opposite door',
    purpose: 'Attract wealth chi (if placed correctly)',
    warning: 'Never place water directly opposite main door',
  },
]

// Kitchen (Bep)
export const KITCHEN_RULES: RoomRecommendation[] = [
  {
    item: 'Stove',
    placement: 'Never facing door or window',
    purpose: 'Stability of health and wealth',
    warning: 'Critical position - avoid direct chi flow from outside',
  },
  {
    item: 'Sink',
    placement: 'Away from stove (preferably opposite side)',
    purpose: 'Separate water and fire elements',
    warning: 'Too close to stove brings conflict',
  },
  {
    item: 'Counter',
    placement: 'Facing main area of kitchen',
    purpose: 'Cook can see who enters',
  },
  {
    item: 'Refrigerator',
    placement: 'Not opposite to stove or sink',
    purpose: 'Harmony between elements',
  },
  {
    item: 'Trash',
    placement: 'In corner, out of sight',
    purpose: 'Hide negative chi of waste',
  },
  {
    item: 'Lighting',
    placement: 'Bright white light for hygiene',
    purpose: 'Active yang energy for cooking',
  },
  {
    item: 'Plants/Herbs',
    placement: 'Near window for natural light',
    purpose: 'Fresh herbs, connect to nature',
  },
  {
    item: 'Colors',
    placement: 'Light and clean (white, cream, light green)',
    purpose: 'Support health and family wellbeing',
    warning: 'Avoid dark or depressing colors',
  },
]

// Home Office (Van Phong Nha)
export const HOME_OFFICE_RULES: RoomRecommendation[] = [
  {
    item: 'Desk',
    placement: 'Back against wall, facing door (command position)',
    purpose: 'Authority, focus, protection while working',
    warning: 'Never sit with back to door',
  },
  {
    item: 'Chair',
    placement: 'Comfortable, supports back, solid base',
    purpose: 'Stability and confidence',
  },
  {
    item: 'Filing cabinets',
    placement: 'Behind or beside desk, not blocking chi',
    purpose: 'Organization and wealth storage',
  },
  {
    item: 'Plants',
    placement: 'Left side of desk (health/growth area)',
    purpose: 'Freshen air, boost creativity',
  },
  {
    item: 'Water feature',
    placement: 'Left side of desk (wealth activation)',
    purpose: 'Attract prosperity chi',
    warning: 'Small fountain only, moving water',
  },
  {
    item: 'Lighting',
    placement: 'Bright white light, task lighting',
    purpose: 'Mental clarity and focus',
  },
  {
    item: 'Clutter',
    placement: 'Keep desk and office clean',
    purpose: 'Clear space = clear mind',
    warning: 'Clutter blocks chi and wealth flow',
  },
  {
    item: 'Window',
    placement: 'Open shades to natural light',
    purpose: 'Connection to outside, fresh perspective',
  },
]

// Bathroom (Phong Tam)
export const BATHROOM_RULES: RoomRecommendation[] = [
  {
    item: 'Toilet',
    placement: 'Lid always closed, out of sight if possible',
    purpose: 'Prevent wealth chi from draining',
    warning: 'Open toilet continuously drains family wealth',
  },
  {
    item: 'Mirror',
    placement: 'Facing sink, not reflecting toilet',
    purpose: 'Enhance light and energy',
  },
  {
    item: 'Door',
    placement: 'Keep closed, preferably not visible from living areas',
    purpose: 'Hide negative chi of bathroom',
  },
  {
    item: 'Exhaust fan',
    placement: 'Always use to remove stagnant chi',
    purpose: 'Keep air fresh and chi moving',
  },
  {
    item: 'Lighting',
    placement: 'Bright, clean light',
    purpose: 'Uplift energy in private space',
  },
  {
    item: 'Plants',
    placement: 'Avoid excess moisture-loving plants',
    purpose: 'Minimal, keep space clean',
  },
  {
    item: 'Colors',
    placement: 'Light, clean colors (white, cream, light blue)',
    purpose: 'Support cleanliness and hygiene',
  },
  {
    item: 'Storage',
    placement: 'Organized and hidden',
    purpose: 'Keep clutter invisible',
  },
]

// Dining Room (Phong An)
export const DINING_ROOM_RULES: RoomRecommendation[] = [
  {
    item: 'Table',
    placement: 'Center of room, away from door',
    purpose: 'Family gathering point, stability',
  },
  {
    item: 'Chairs',
    placement: 'Equal number, facing inward',
    purpose: 'Equal importance for all family members',
    warning: 'Odd number of seats creates imbalance',
  },
  {
    item: 'Lighting',
    placement: 'Warm light over table, chandelier ideal',
    purpose: 'Create welcoming dining atmosphere',
  },
  {
    item: 'Mirror',
    placement: 'Can reflect table to symbolize abundance',
    purpose: 'Double the food/wealth symbolically',
  },
  {
    item: 'Colors',
    placement: 'Warm colors (red, orange, yellow)',
    purpose: 'Stimulate appetite and family harmony',
  },
  {
    item: 'Plants',
    placement: 'Moderate, not blocking view',
    purpose: 'Fresh energy without clutter',
  },
  {
    item: 'Art',
    placement: 'Food or family-related imagery',
    purpose: 'Reinforce abundance and togetherness',
    warning: 'Avoid sad or violent images',
  },
]

// All rooms
export const ALL_ROOMS: Record<string, RoomType> = {
  bedroom: {
    name: 'Bedroom',
    nameVi: 'Phòng Ngủ',
    purpose: 'Rest and intimate relationships',
    bestDirections: ['North', 'East', 'Southeast'],
    avoidDirections: ['South', 'Southwest'],
    elements: ['Water', 'Wood'],
    colors: ['Soft colors', 'Light blues', 'Greens', 'Pastels'],
    recommendations: BEDROOM_RULES,
  },
  livingRoom: {
    name: 'Living Room',
    nameVi: 'Phòng Khách',
    purpose: 'Social interaction and family gathering',
    bestDirections: ['East', 'Southeast', 'South'],
    avoidDirections: ['North', 'Northwest'],
    elements: ['Fire', 'Wood'],
    colors: ['Warm colors', 'Earth tones', 'Red', 'Orange', 'Yellow'],
    recommendations: LIVING_ROOM_RULES,
  },
  kitchen: {
    name: 'Kitchen',
    nameVi: 'Bếp',
    purpose: 'Health, nourishment and family prosperity',
    bestDirections: ['East', 'Southeast'],
    avoidDirections: ['West', 'Southwest'],
    elements: ['Fire', 'Water'],
    colors: ['White', 'Cream', 'Light green', 'Light yellow'],
    recommendations: KITCHEN_RULES,
  },
  homeOffice: {
    name: 'Home Office',
    nameVi: 'Văn Phòng Nhà',
    purpose: 'Career success and productivity',
    bestDirections: ['Northeast', 'North', 'East'],
    avoidDirections: ['Southwest'],
    elements: ['Water', 'Wood', 'Metal'],
    colors: ['White', 'Blue', 'Green', 'Earth tones'],
    recommendations: HOME_OFFICE_RULES,
  },
  bathroom: {
    name: 'Bathroom',
    nameVi: 'Phòng Tắm',
    purpose: 'Cleansing and renewal',
    bestDirections: ['Northwest', 'North', 'West'],
    avoidDirections: ['Southeast'],
    elements: ['Water'],
    colors: ['White', 'Light blue', 'Light colors'],
    recommendations: BATHROOM_RULES,
  },
  diningRoom: {
    name: 'Dining Room',
    nameVi: 'Phòng Ăn',
    purpose: 'Family nourishment and togetherness',
    bestDirections: ['East', 'Southeast', 'South'],
    avoidDirections: ['North'],
    elements: ['Fire', 'Earth'],
    colors: ['Warm colors', 'Red', 'Orange', 'Yellow', 'Earth tones'],
    recommendations: DINING_ROOM_RULES,
  },
}

// Helper functions
export function getRoomRules(roomType: string): RoomType | undefined {
  return ALL_ROOMS[roomType as keyof typeof ALL_ROOMS]
}

export function getRoomRecommendations(roomType: string): RoomRecommendation[] {
  const room = getRoomRules(roomType)
  return room?.recommendations || []
}

export function getElementsForRoom(roomType: string): string[] {
  const room = getRoomRules(roomType)
  return room?.elements || []
}

export function getColorsForRoom(roomType: string): string[] {
  const room = getRoomRules(roomType)
  return room?.colors || []
}

export function getBestDirections(roomType: string): string[] {
  const room = getRoomRules(roomType)
  return room?.bestDirections || []
}

export function getAvoidDirections(roomType: string): string[] {
  const room = getRoomRules(roomType)
  return room?.avoidDirections || []
}

export const ALL_ROOM_TYPES = Object.values(ALL_ROOMS)
