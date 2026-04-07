import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20'), 100)
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')

    const charts = await prisma.tuViChart.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        label: true,
        birthDate: true,
        birthHour: true,
        gender: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    })

    const total = await prisma.tuViChart.count({
      where: { userId: session.user.id },
    })

    return NextResponse.json({
      charts,
      pagination: { offset, limit, total },
    })
  } catch (error) {
    console.error('Get charts error:', error)
    return NextResponse.json({ error: 'Failed to get charts' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const chartId = req.nextUrl.searchParams.get('id')
    if (!chartId) {
      return NextResponse.json({ error: 'Missing chart id' }, { status: 400 })
    }

    const chart = await prisma.tuViChart.findUnique({
      where: { id: chartId },
      select: { userId: true },
    })

    if (!chart || chart.userId !== session.user.id) {
      return NextResponse.json({ error: 'Chart not found' }, { status: 404 })
    }

    await prisma.tuViChart.delete({ where: { id: chartId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete chart error:', error)
    return NextResponse.json({ error: 'Failed to delete chart' }, { status: 500 })
  }
}
