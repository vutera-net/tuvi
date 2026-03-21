'use client'

import { useState, useEffect } from 'react'
import type { DayInfo } from '@/types'
import { DIA_CHI, THIEN_CAN } from '@/data/can-chi'
import Link from 'next/link'

interface CalendarViewProps {
  year: number
  month: number
}

const WEEKDAY_LABELS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export function CalendarView({ year: initYear, month: initMonth }: CalendarViewProps) {
  const [year, setYear] = useState(initYear)
  const [month, setMonth] = useState(initMonth)
  const [days, setDays] = useState<DayInfo[]>([])
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/calendar/month?year=${year}&month=${month}`)
      .then((r) => r.json())
      .then((res) => {
        setDays(res.data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [year, month])

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  const firstDayOfWeek = days[0]?.solar.dayOfWeek ?? 0
  const paddingCells = Array(firstDayOfWeek).fill(null)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Calendar grid */}
      <div className="lg:col-span-2">
        {/* Month navigation */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <button onClick={prevMonth} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100">
            ← Trước
          </button>
          <h2 className="font-bold text-gray-800" style={{ color: 'var(--color-primary)' }}>
            Tháng {month}/{year}
          </h2>
          <button onClick={nextMonth} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100">
            Sau →
          </button>
        </div>

        {/* Weekday headers */}
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className={`py-2 ${d === 'CN' ? 'text-red-500' : ''}`}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        {loading ? (
          <div className="flex h-64 items-center justify-center text-gray-400">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-7 gap-1">
            {paddingCells.map((_, i) => <div key={`pad-${i}`} />)}
            {days.map((day) => (
              <button
                key={day.solar.day}
                onClick={() => setSelectedDay(day)}
                className={`day-${day.rating} cursor-pointer rounded-lg border bg-white p-2 text-left transition hover:shadow-md ${
                  selectedDay?.solar.day === day.solar.day ? 'ring-2 ring-red-400' : ''
                } ${day.solar.dayOfWeek === 0 ? 'bg-red-50' : ''}`}
              >
                <div className={`text-lg font-bold ${day.solar.dayOfWeek === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                  {day.solar.day}
                </div>
                <div className="text-xs text-gray-500">{day.lunar.day}/{day.lunar.month}</div>
                {day.festivals.length > 0 && (
                  <div className="mt-0.5 truncate text-xs text-yellow-600">🎉</div>
                )}
                {day.ngayKy.length > 0 && (
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Day detail */}
      <div>
        {selectedDay ? (
          <DayDetail day={selectedDay} />
        ) : (
          <div className="rounded-xl bg-white p-6 text-center text-gray-400 shadow-sm">
            Chọn một ngày để xem chi tiết
          </div>
        )}
      </div>
    </div>
  )
}

function DayDetail({ day }: { day: DayInfo }) {
  const { solar, lunar, truc, sao28, hoangDaoGio, ngayKy, festivals, rating } = day
  const canChiDay = `${THIEN_CAN[lunar.canDay]} ${DIA_CHI[lunar.chiDay]}`
  const canChiMonth = `${THIEN_CAN[lunar.canMonth]} ${DIA_CHI[lunar.chiMonth]}`
  const canChiYear = `${THIEN_CAN[lunar.canYear]} ${DIA_CHI[lunar.chiYear]}`
  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

  const ratingColor = rating === 'tot' ? 'text-green-700 bg-green-50' : rating === 'xau' ? 'text-red-700 bg-red-50' : 'text-yellow-700 bg-yellow-50'
  const ratingLabel = rating === 'tot' ? 'Ngày tốt' : rating === 'xau' ? 'Ngày xấu' : 'Bình thường'

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 border-b pb-4">
        <div className="text-sm text-gray-500">{weekdays[solar.dayOfWeek]}</div>
        <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          {solar.day}/{solar.month}/{solar.year}
        </div>
        <div className="text-gray-600">
          Âm lịch: {lunar.day}/{lunar.month}{lunar.isLeapMonth ? ' (nhuận)' : ''}
        </div>
        <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-sm font-medium ${ratingColor}`}>
          {ratingLabel}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Can Chi Ngày</span>
          <span className="font-medium">{canChiDay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Can Chi Tháng</span>
          <span className="font-medium">{canChiMonth}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Can Chi Năm</span>
          <span className="font-medium">{canChiYear}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Trực</span>
          <span className="font-medium">{truc}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sao 28</span>
          <span className="font-medium">{sao28}</span>
        </div>
      </div>

      {hoangDaoGio.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2 text-xs font-medium text-green-700">Giờ Hoàng Đạo</div>
          <div className="flex flex-wrap gap-1">
            {hoangDaoGio.map((i) => (
              <span key={i} className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                {DIA_CHI[i]}
              </span>
            ))}
          </div>
        </div>
      )}

      {ngayKy.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2 text-xs font-medium text-red-700">Ngày kỵ</div>
          <div className="flex flex-wrap gap-1">
            {ngayKy.map((ky) => (
              <span key={ky} className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                {ky}
              </span>
            ))}
          </div>
        </div>
      )}

      {festivals.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2 text-xs font-medium text-yellow-700">Ngày lễ</div>
          {festivals.map((f) => (
            <div key={f} className="text-xs text-gray-700">🎉 {f}</div>
          ))}
        </div>
      )}
    </div>
  )
}
