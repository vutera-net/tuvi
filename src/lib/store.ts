/**
 * Zustand global store
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ZodiacSign } from '@/types'

interface UserPreferences {
  // Birth info
  birthYear: number | null
  birthMonth: number | null
  birthDay: number | null
  birthHour: number | null // 0-11
  gender: 'male' | 'female' | null
  name: string

  // UI preferences
  preferredZodiac: ZodiacSign | null
  calendarView: 'month' | 'week'

  // Actions
  setBirthInfo: (info: {
    birthYear: number
    birthMonth: number
    birthDay: number
    birthHour: number
    gender: 'male' | 'female'
    name: string
  }) => void
  setPreferredZodiac: (zodiac: ZodiacSign) => void
  setCalendarView: (view: 'month' | 'week') => void
  reset: () => void
}

const initialState = {
  birthYear: null,
  birthMonth: null,
  birthDay: null,
  birthHour: null,
  gender: null,
  name: '',
  preferredZodiac: null,
  calendarView: 'month' as const,
}

export const useUserStore = create<UserPreferences>()(
  persist(
    (set) => ({
      ...initialState,

      setBirthInfo: (info) =>
        set({
          birthYear: info.birthYear,
          birthMonth: info.birthMonth,
          birthDay: info.birthDay,
          birthHour: info.birthHour,
          gender: info.gender,
          name: info.name,
        }),

      setPreferredZodiac: (zodiac) => set({ preferredZodiac: zodiac }),

      setCalendarView: (view) => set({ calendarView: view }),

      reset: () => set(initialState),
    }),
    {
      name: 'tuvi-user-preferences',
    }
  )
)
