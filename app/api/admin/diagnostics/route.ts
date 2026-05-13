// app/api/admin/diagnostics/route.ts — Production diagnostics endpoint

import { NextRequest } from 'next/server'
import { ok, serverErr, requireAdmin } from '@/lib/api-middleware'
import { getDiagnostics, getSystemHealth } from '@/lib/observability'
import { getCacheStats } from '@/lib/cache'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const diagnostics = getDiagnostics()
    const cacheStats  = getCacheStats()

    return ok({
      ...diagnostics,
      cache: cacheStats,
      timestamp: new Date().toISOString(),
    })
  } catch (e) { return serverErr(e, 'GET /api/admin/diagnostics') }
}
