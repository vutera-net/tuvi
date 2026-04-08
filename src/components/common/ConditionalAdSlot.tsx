import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdSlot } from './AdSlot'

interface Props {
  size?: 'leaderboard' | 'rectangle' | 'banner'
  className?: string
  'data-slot'?: string
}

/**
 * Server component — renders AdSlot only for free-tier users.
 * Premium/VIP users see nothing (ad_free feature gate).
 */
export async function ConditionalAdSlot(props: Props) {
  const session = await auth()

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { subscription: true, subExpiresAt: true },
    })

    if (user) {
      const isExpired = user.subExpiresAt && user.subExpiresAt < new Date()
      const tier = isExpired ? 'free' : user.subscription
      if (tier !== 'free') return null
    }
  }

  return <AdSlot {...props} />
}
