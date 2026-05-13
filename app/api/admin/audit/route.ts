// app/api/admin/audit/route.ts — View audit logs

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, requireAdmin } from '@/lib/api-middleware'

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAdmin(req)
    if (response) return response

    const { searchParams } = req.nextUrl
    const page     = Math.max(1, parseInt(searchParams.get('page')  ?? '1', 10))
    const limit    = Math.min(50, parseInt(searchParams.get('limit') ?? '50', 10))
    const severity = searchParams.get('severity')
    const action   = searchParams.get('action')
    const userId   = searchParams.get('userId')

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const where = {
        ...(severity ? { severity } : {}),
        ...(action   ? { action }   : {}),
        ...(userId   ? { userId }   : {}),
      }
      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where, orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit, take: limit,
        }),
        prisma.auditLog.count({ where }),
      ])
      return ok({ logs, total, page, pages: Math.ceil(total / limit) })
    } catch {
      return ok({ logs: [], total: 0, page: 1, pages: 0, note: 'DB not configured' })
    }
  } catch (e) { return serverErr(e, 'GET /api/admin/audit') }
}
