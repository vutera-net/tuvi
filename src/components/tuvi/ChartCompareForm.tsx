'use client'

import { useState } from 'react'
import type { TuViChart, DaiHan, Palace, CompatibilityResult } from '@/types'
import { checkYearCompatibility } from '@/lib/engines/ngu-hanh-engine'
import { NGU_HANH_COLOR_HEX, NGU_HANH_VI } from '@/data/ngu-hanh'

const CURRENT_YEAR = new Date().getFullYear()

const HOURS = [
  'Tý (23-1h)', 'Sửu (1-3h)', 'Dần (3-5h)', 'Mão (5-7h)',
  'Thìn (7-9h)', 'Tỵ (9-11h)', 'Ngọ (11-13h)', 'Mùi (13-15h)',
  'Thân (15-17h)', 'Dậu (17-19h)', 'Tuất (19-21h)', 'Hợi (21-23h)',
]

interface PersonForm {
  label: string
  gender: string
  birthYear: string
  birthMonth: string
  birthDay: string
  birthHour: string
}

const EMPTY_FORM: PersonForm = {
  label: '', gender: 'male', birthYear: '', birthMonth: '', birthDay: '', birthHour: '0',
}

function getCurrentDaiHan(chart: TuViChart): DaiHan | undefined {
  const age = CURRENT_YEAR - chart.birthDate.year
  return chart.daiHan.find((dh) => age >= dh.startAge && age <= dh.endAge)
}

function getPhuThePalace(chart: TuViChart): Palace | undefined {
  return chart.palaces.find((p) => p.name === 'Phu Thê')
}

function palaceStarSummary(palace: Palace | undefined): { good: number; bad: number } {
  if (!palace) return { good: 0, bad: 0 }
  return {
    good: palace.mainStars.filter((s) => s.isGood && (s.brightness === 'mieu' || s.brightness === 'vuong')).length,
    bad: palace.mainStars.filter((s) => !s.isGood || s.brightness === 'hamDia').length,
  }
}

function calcOverallScore(nguHanh: CompatibilityResult, p1: Palace | undefined, p2: Palace | undefined): number {
  // 50% ngũ hành, 50% cung phu thê
  const ngScore = nguHanh.score
  const s1 = palaceStarSummary(p1)
  const s2 = palaceStarSummary(p2)
  const phuTheScore = Math.min(100, ((s1.good + s2.good) * 20) - ((s1.bad + s2.bad) * 10) + 50)
  return Math.round(ngScore * 0.5 + phuTheScore * 0.5)
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 75 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626'
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-3xl font-bold"
        style={{ borderColor: color, color }}
      >
        {score}
      </div>
      <p className="mt-1 text-xs text-gray-500">/ 100</p>
    </div>
  )
}

function PersonFormCard({
  label, form, onChange,
}: {
  label: string
  form: PersonForm
  onChange: (f: PersonForm) => void
}) {
  function set(key: keyof PersonForm, val: string) {
    onChange({ ...form, [key]: val })
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-800">{label}</h3>
      <div className="space-y-3">
        <input
          placeholder="Tên / nhãn"
          value={form.label}
          onChange={(e) => set('label', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
        />
        <select
          value={form.gender}
          onChange={(e) => set('gender', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
        >
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number" placeholder="Năm" min={1900} max={2100}
            value={form.birthYear} onChange={(e) => set('birthYear', e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
          />
          <input
            type="number" placeholder="Tháng" min={1} max={12}
            value={form.birthMonth} onChange={(e) => set('birthMonth', e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
          />
          <input
            type="number" placeholder="Ngày" min={1} max={31}
            value={form.birthDay} onChange={(e) => set('birthDay', e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
          />
        </div>
        <select
          value={form.birthHour}
          onChange={(e) => set('birthHour', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
        >
          {HOURS.map((h, i) => <option key={i} value={i}>{h}</option>)}
        </select>
      </div>
    </div>
  )
}

async function fetchChart(form: PersonForm): Promise<TuViChart> {
  const res = await fetch('/api/tuvi/chart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: form.label || 'Lá số',
      gender: form.gender,
      birthYear: parseInt(form.birthYear),
      birthMonth: parseInt(form.birthMonth),
      birthDay: parseInt(form.birthDay),
      birthHour: parseInt(form.birthHour),
      isLunar: false,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data as TuViChart
}

export function ChartCompareForm() {
  const [form1, setForm1] = useState<PersonForm>(EMPTY_FORM)
  const [form2, setForm2] = useState<PersonForm>(EMPTY_FORM)
  const [charts, setCharts] = useState<[TuViChart, TuViChart] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCompare() {
    if (!form1.birthYear || !form1.birthMonth || !form1.birthDay ||
        !form2.birthYear || !form2.birthMonth || !form2.birthDay) {
      setError('Vui lòng điền đầy đủ thông tin cả 2 người.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const [c1, c2] = await Promise.all([fetchChart(form1), fetchChart(form2)])
      setCharts([c1, c2])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Có lỗi xảy ra.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input forms */}
      <div className="grid gap-4 md:grid-cols-2">
        <PersonFormCard label="Người 1" form={form1} onChange={setForm1} />
        <PersonFormCard label="Người 2" form={form2} onChange={setForm2} />
      </div>

      {error && <p className="text-center text-sm text-red-600">{error}</p>}

      <button
        onClick={handleCompare}
        disabled={loading}
        className="mx-auto flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {loading ? 'Đang phân tích...' : '☯ So sánh 2 lá số'}
      </button>

      {/* Results */}
      {charts && <CompareResult chart1={charts[0]} chart2={charts[1]} />}
    </div>
  )
}

function CompareResult({ chart1, chart2 }: { chart1: TuViChart; chart2: TuViChart }) {
  const nguHanh = checkYearCompatibility(
    chart1.birthDate.year, chart1.label,
    chart2.birthDate.year, chart2.label,
  )
  const phuThe1 = getPhuThePalace(chart1)
  const phuThe2 = getPhuThePalace(chart2)
  const daiHan1 = getCurrentDaiHan(chart1)
  const daiHan2 = getCurrentDaiHan(chart2)
  const overallScore = calcOverallScore(nguHanh, phuThe1, phuThe2)

  const relationLabel =
    nguHanh.relationship === 'tuongSinh' ? 'Tương Sinh' :
    nguHanh.relationship === 'tuongKhac' ? 'Tương Khắc' : 'Hòa Hợp'

  const relationColor =
    nguHanh.relationship === 'tuongSinh' ? 'text-green-700 bg-green-50 border-green-200' :
    nguHanh.relationship === 'tuongKhac' ? 'text-red-700 bg-red-50 border-red-200' :
    'text-amber-700 bg-amber-50 border-amber-200'

  return (
    <div className="space-y-5">
      {/* Overall score header */}
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:justify-between">
        <div className="flex gap-6 text-center">
          <PersonBadge chart={chart1} />
          <div className="flex items-center text-2xl text-gray-300">☯</div>
          <PersonBadge chart={chart2} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <ScoreCircle score={overallScore} />
          <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${relationColor}`}>
            {relationLabel}
          </span>
        </div>
      </div>

      {/* Ngũ Hành */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">Ngũ Hành Tương Hợp</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <ElementCard chart={chart1} score={nguHanh.score} />
          <ElementCard chart={chart2} score={nguHanh.score} />
        </div>
        <div className={`mt-4 rounded-xl border p-4 text-sm ${relationColor}`}>
          <strong>{nguHanh.analysis}</strong>
        </div>
      </div>

      {/* Cung Phu Thê */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">Cung Phu Thê</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <PhuTheCard label={chart1.label} palace={phuThe1} />
          <PhuTheCard label={chart2.label} palace={phuThe2} />
        </div>
      </div>

      {/* Đại Vận hiện tại */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800">
          Đại Vận Hiện Tại <span className="text-xs font-normal text-gray-400">({CURRENT_YEAR})</span>
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <DaiHanCard label={chart1.label} daiHan={daiHan1} cucNumber={chart1.cucNumber} />
          <DaiHanCard label={chart2.label} daiHan={daiHan2} cucNumber={chart2.cucNumber} />
        </div>
      </div>
    </div>
  )
}

function PersonBadge({ chart }: { chart: TuViChart }) {
  const color = NGU_HANH_COLOR_HEX[chart.menh]
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {NGU_HANH_VI[chart.menh][0]}
      </div>
      <p className="text-sm font-medium text-gray-800">{chart.label}</p>
      <p className="text-xs text-gray-500">{chart.gender === 'male' ? 'Nam' : 'Nữ'} · {chart.birthDate.year}</p>
    </div>
  )
}

function ElementCard({ chart, score }: { chart: TuViChart; score: number }) {
  const color = NGU_HANH_COLOR_HEX[chart.menh]
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-1 text-sm font-medium text-gray-700">{chart.label}</p>
      <p className="text-lg font-bold" style={{ color }}>
        Mệnh {NGU_HANH_VI[chart.menh]}
      </p>
      <p className="text-xs text-gray-500">{chart.napAm}</p>
    </div>
  )
}

function PhuTheCard({ label, palace }: { label: string; palace: Palace | undefined }) {
  const stars = palace?.mainStars ?? []
  const good = stars.filter((s) => s.isGood && s.brightness !== 'hamDia')
  const bad = stars.filter((s) => !s.isGood || s.brightness === 'hamDia')

  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      {!palace || stars.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Cung trống</p>
      ) : (
        <div className="space-y-1">
          {stars.map((s) => (
            <div key={s.name} className="flex items-center gap-2 text-xs">
              <span className={s.isGood ? 'text-green-600' : 'text-red-500'}>
                {s.isGood ? '✓' : '✗'}
              </span>
              <span className="text-gray-700">{s.name}</span>
              <span className="text-gray-400">
                ({s.brightness === 'mieu' ? 'Miếu' :
                  s.brightness === 'vuong' ? 'Vượng' :
                  s.brightness === 'dacDia' ? 'Đắc Địa' :
                  s.brightness === 'hamDia' ? 'Hãm Địa' : 'Bình Hòa'})
              </span>
            </div>
          ))}
          <p className="mt-2 text-xs text-gray-500">
            {good.length} sao tốt · {bad.length} sao xấu
          </p>
        </div>
      )}
    </div>
  )
}

function DaiHanCard({
  label, daiHan, cucNumber,
}: {
  label: string
  daiHan: DaiHan | undefined
  cucNumber: number
}) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      {!daiHan ? (
        <p className="text-sm text-gray-400 italic">Chưa bắt đầu Đại Vận</p>
      ) : (
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-gray-800">
            Cung {daiHan.palaceName} · {daiHan.diaChi}
          </p>
          <p className="text-xs text-gray-500">
            Tuổi {daiHan.startAge}–{daiHan.endAge} · {cucNumber} năm/vận
          </p>
          <p className="text-xs text-gray-500">
            Từ năm {daiHan.startYear}
          </p>
        </div>
      )}
    </div>
  )
}
