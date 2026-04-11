'use client'

import { useState, useEffect } from 'react'

const HARMONY_URL = 'https://vutera.net'
const STORAGE_KEY = 'tuvi_ecosystem_banner_dismissed'

export function EcosystemBanner({ className = '' }: { className?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-sm ${className}`}>
      <button 
        onClick={dismiss}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 hover:text-blue-600"
      >
        ✕
      </button>
      
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl shadow-inner">
          ☯
        </div>
        <div>
          <h3 className="font-semibold text-blue-900">Hệ Sinh Thái Harmony</h3>
          <p className="mt-1 text-xs text-blue-700 leading-relaxed">
            TuVi là một phần của hệ sinh thái phong thủy tự động Harmony. Mọi tinh hoa được kết tinh tại <a href={HARMONY_URL} className="font-bold underline hover:text-blue-900">vutera.net</a>
          </p>
        </div>
      </div>
    </div>
  )
}
