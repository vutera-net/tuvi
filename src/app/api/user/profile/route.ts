import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        birthYear: true,
        birthMonth: true,
        birthDay: true,
        birthHour: true,
        gender: true,
        subscription: true,
        subExpiresAt: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json({ error: 'Failed to get profile' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, birthYear, birthMonth, birthDay, birthHour, gender } = body

    // Validate birth info if provided
    if (birthYear && (birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31 || birthHour < 0 || birthHour > 11)) {
      return NextResponse.json({ error: 'Invalid birth info' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(birthYear && { birthYear }),
        ...(birthMonth && { birthMonth }),
        ...(birthDay && { birthDay }),
        ...(birthHour !== undefined && { birthHour }),
        ...(gender && { gender }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthYear: true,
        birthMonth: true,
        birthDay: true,
        birthHour: true,
        gender: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
