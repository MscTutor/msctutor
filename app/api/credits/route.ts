// app/api/credits/route.ts — Get and deduct user credits

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { getAuthUser }  from '@/lib/auth'
import { CREDITS }      from '@/lib/constants'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Auto-reset free plan daily credits
    if (dbUser.plan === 'free') {
      const lastReset = dbUser.creditsResetAt
      const now       = new Date()
      const dayMs     = 24 * 60 * 60 * 1000
      if (!lastReset || now.getTime() - lastReset.getTime() > dayMs) {
        await prisma.user.update({
          where: { firebaseUid: user.uid },
          data:  { credits: 5, creditsResetAt: now },
        })
        return NextResponse.json({ credits: 5, plan: dbUser.plan })
      }
    }

    return NextResponse.json({ credits: dbUser.credits, plan: dbUser.plan })
  } catch (err) {
    console.error('credits GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { action } = await req.json()
    const cost = CREDITS[action as keyof typeof CREDITS] ?? 1

    const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (dbUser.credits < cost) {
      return NextResponse.json({ error: 'Insufficient credits', credits: dbUser.credits }, { status: 402 })
    }

    const updated = await prisma.user.update({
      where: { firebaseUid: user.uid },
      data:  { credits: { decrement: cost } },
    })

    return NextResponse.json({ credits: updated.credits, deducted: cost })
  } catch (err) {
    console.error('credits POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
