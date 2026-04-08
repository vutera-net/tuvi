import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TuViPdfDocument } from '@/lib/pdf/tuvi-pdf'
import type { TuViChart } from '@/types'
import { createElement } from 'react'

/**
 * POST /api/tuvi/export-pdf
 * Generate and return a PDF for a Tu Vi chart.
 * Requires VIP subscription.
 *
 * Body: { chart: TuViChart }
 */
export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check VIP tier
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { subscription: true, subExpiresAt: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isExpired = user.subExpiresAt && user.subExpiresAt < new Date()
  const tier = isExpired ? 'free' : user.subscription

  if (tier !== 'vip') {
    return NextResponse.json(
      { error: 'VIP subscription required', requiredTier: 'vip' },
      { status: 403 }
    )
  }

  let chart: TuViChart
  try {
    const body = await request.json()
    chart = body.chart as TuViChart
    if (!chart?.label || !chart?.palaces) throw new Error('Invalid chart data')
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    const doc = createElement(TuViPdfDocument, {
      chart,
      generatedAt: new Date().toLocaleDateString('vi-VN'),
    })

    const buffer = await renderToBuffer(doc as any)
    const filename = `la-so-tu-vi-${chart.label.replace(/\s+/g, '-').toLowerCase()}.pdf`

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
