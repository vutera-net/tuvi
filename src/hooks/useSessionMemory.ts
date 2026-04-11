import { useState, useEffect } from 'react'

export interface SessionMemory {
  birthYear?: number
  birthMonth?: number
  birthDay?: number
  birthHour?: number
  gender?: 'male' | 'female'
  name?: string
}

const STORAGE_KEY = 'tuvi_session_memory'

export function useSessionMemory() {
  const [memory, setMemoryState] = useState<SessionMemory | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setMemoryState(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Failed to parse session memory:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  function updateMemory(data: Partial<SessionMemory>) {
    setMemoryState((prev) => {
      const next = { ...prev, ...data }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
        console.warn('Failed to save session memory:', e)
      }
      return next
    })
  }

  function clearMemory() {
    setMemoryState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.warn('Failed to remove session memory:', e)
    }
  }

  return {
    memory,
    isLoaded,
    updateMemory,
    clearMemory,
  }
}
