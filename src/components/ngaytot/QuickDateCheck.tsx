'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function QuickDateCheck() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCheck() {
    setLoading(true)
    try {
      const res = await fetch(`/api/ngaytot/check?date=${date}`)
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Check error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ngày hôm nay tốt không?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Chọn ngày</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
          </button>

          {result && (
            <div className="space-y-3 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Đánh giá chung:</span>
                <Badge
                  variant={result.rating === 'tot' ? 'success' : result.rating === 'xau' ? 'danger' : 'warning'}
                  size="lg"
                >
                  {result.rating === 'tot' ? 'Ngày tốt' : result.rating === 'xau' ? 'Ngày xấu' : 'Bình thường'}
                </Badge>
              </div>

              <div className="space-y-2 border-t pt-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Trực:</span>
                  <span className="ml-2 text-gray-600">{result.truc}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sao 28:</span>
                  <span className="ml-2 text-gray-600">{result.sao28}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Điểm:</span>
                  <span className="ml-2 text-gray-600">{result.score}/100</span>
                </div>
              </div>

              {result.advantages && result.advantages.length > 0 && (
                <div className="border-t pt-3">
                  <p className="mb-2 font-medium text-green-700">✓ Điểm tốt:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {result.advantages.map((adv: string, i: number) => (
                      <li key={i}>• {adv}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.issues && result.issues.length > 0 && (
                <div className="border-t pt-3">
                  <p className="mb-2 font-medium text-red-700">✗ Cần chú ý:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {result.issues.map((issue: string, i: number) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
