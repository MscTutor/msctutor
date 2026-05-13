// app/api/admin/security/route.ts — Security events dashboard

import { NextRequest }  from 'next/server'
import { ok, serverErr, requireAdmin, getClientIP } from '@/lib/api-middleware'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const [critical, high, events, bannedIPs] = await Promise.all([
        prisma.auditLog.count({ where: { severity: 'CRITICAL' } }),
        prisma.auditLog.count({ where: { severity: 'HIGH' } }),
        prisma.auditLog.findMany({
          where: { severity: { in: ['CRITICAL', 'HIGH'] } },
          orderBy: { createdAt: 'desc' }, take: 20,
        }),
        prisma.bannedIP.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      ])
      return ok({ summary: { critical, high }, recentEvents: events, bannedIPs })
    } catch {
      return ok({
        summary:       { critical: 0, high: 0 },
        recentEvents:  [],
        bannedIPs:     [],
        note:          'DB not configured',
      })
    }
  } catch (e) { return serverErr(e, 'GET /api/admin/security') }
}

export async function POST(req: NextRequest) {
  // Ban an IP
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const body = await req.json().catch(() => null)
    if (!body?.ip) return ok({ error: 'IP required' })

    try {
      const { default: prisma } = await import('@/lib/prisma')
      await prisma.bannedIP.upsert({
        where:  { ip: body.ip },
        update: { reason: body.reason, expiresAt: body.expiresAt ? new Date(body.expiresAt) : null },
        create: { ip: body.ip, reason: body.reason ?? 'Manual ban', bannedBy: 'admin', expiresAt: body.expiresAt ? new Date(body.expiresAt) : null },
      })
      return ok({ banned: true, ip: body.ip })
    } catch {
      return ok({ banned: false, note: 'DB not configured' })
    }
  } catch (e) { return serverErr(e, 'POST /api/admin/security') }
}
