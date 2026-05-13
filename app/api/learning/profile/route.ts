// app/api/learning/profile/route.ts

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, parseBody } from '@/lib/api-middleware'
import { logger }       from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get('uid')
    if (!uid?.trim()) return err('uid required')

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const record = await prisma.learnerProfile.findUnique({ where: { userId: uid } })
      if (!record) return ok({ profile: null })
      return ok({ profile: JSON.parse(record.data) })
    } catch {
      return ok({ profile: null, note: 'DB not configured — using localStorage' })
    }
  } catch (e) { return serverErr(e, 'GET /api/learning/profile') }
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req)
    if (!body || !body.profile) return err('profile required')
    const profile = body.profile as Record<string, unknown>
    const uid     = String(profile.userId ?? '')
    if (!uid) return err('profile.userId required')

    try {
      const { default: prisma } = await import('@/lib/prisma')
      await prisma.learnerProfile.upsert({
        where:  { userId: uid },
        update: { data: JSON.stringify(profile), updatedAt: new Date() },
        create: { userId: uid, data: JSON.stringify(profile) },
      })
      return ok({ saved: true })
    } catch {
      return ok({ saved: false, note: 'DB not configured — localStorage only' })
    }
  } catch (e) { return serverErr(e, 'POST /api/learning/profile') }
}
