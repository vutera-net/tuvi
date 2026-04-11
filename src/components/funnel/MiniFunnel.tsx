'use client'

import { useState, useEffect } from 'react'
import { useSessionMemory } from '@/hooks/useSessionMemory'
import { getCanChiYear } from '@/data/can-chi'
import { trackCTAClick } from '@/lib/analytics'

const ANMENH_URL = 'https://anmenh.vutera.net'

export function MiniFunnel() {
  const [state, setState] = useState<'idle' | 'calculating' | 'result'>('idle')
  const { memory } = useSessionMemory()
  const [progress, setProgress] = useState(0)

  const canChi = memory?.birthYear ? getCanChiYear(memory.birthYear).full : null

  const handleStart = () => {
    setState('calculating')
    setProgress(0)
  }

  useEffect(() => {
    if (state === 'calculating') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setState('result'), 300)
            return 100
          }
          return prev + 5
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [state])

  const hrefParams = new URLSearchParams()
  hrefParams.set('source', 'tuvi_minifunnel')
  hrefParams.set('intent', 'gieo_que_nhanh')
  if (memory?.birthYear) hrefParams.set('birthYear', memory.birthYear.toString())
  if (memory?.gender) hrefParams.set('gender', memory.gender)
  const href = `${ANMENH_URL}/bridge?${hrefParams.toString()}`

  return (
    <div className="mx-auto my-8 max-w-md overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl shadow-purple-100/50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4 text-white">
        <h3 className="text-lg font-bold">Gieo quẻ 1 giây</h3>
        <p className="text-xs opacity-80">Phát hiện cơ hội & rủi ro tức thì</p>
      </div>

      <div className="p-8 text-center">
        {state === 'idle' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-purple-50 text-4xl shadow-inner">
                🔮
                <div className="absolute -inset-1 animate-ping rounded-full bg-purple-200/50" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {canChi 
                  ? `Khám phá ngay vận hạn tuổi ${canChi} trong tháng tới.`
                  : "Khám phá ngay vận hạn của bạn trong tháng tới."}
              </p>
            </div>
            <button
              onClick={handleStart}
              className="w-full rounded-2xl bg-purple-600 py-4 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] hover:bg-purple-700 active:scale-[0.98]"
            >
              BẮT ĐẦU GIEO QUẺ
            </button>
          </div>
        )}

        {state === 'calculating' && (
          <div className="py-8 space-y-6">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-600 animate-pulse">
                {progress < 40 && "Đang đối soát Can Chi..."}
                {progress >= 40 && progress < 80 && "Đang tính toán các sao lưu..."}
                {progress >= 80 && "Đang tổng hợp kết quả..."}
              </p>
              <p className="text-xs text-gray-400">Độ chính xác: 85%</p>
            </div>
          </div>
        )}

        {state === 'result' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="rounded-2xl bg-amber-50 p-6 text-left border border-amber-100">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Kết quả sơ bộ</p>
              <h4 className="mt-1 text-lg font-bold text-amber-900">Có điểm sáng về Tài Lộc</h4>
              <p className="mt-3 text-sm leading-relaxed text-amber-800">
                Hệ thống nhận thấy trong 30 ngày tới, tuổi {canChi || "của bạn"} có sự dịch chuyển tốt về cung Tài Bạch. Tuy nhiên, có một sự cản trở ngầm từ phía đồng nghiệp hoặc đối tác mà bạn cần lưu ý...
              </p>
            </div>
            
            <div className="space-y-3">
              <a
                href={href}
                onClick={() => trackCTAClick('minifunnel_result', 'gieo_que')}
                className="block w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                XEM CHI TIẾT CÁCH HÓA GIẢI →
              </a>
              <p className="text-[10px] text-gray-400">Dữ liệu được bảo mật bởi AnMenh Labs</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
