// app/api/admin/cache/route.ts — Cache stats + invalidation

import { NextRequest }  from 'next/server'
import { ok, serverErr, requireAdmin } from '@/lib/api-middleware'
import { getCacheStats, questionCache, chapterCache, formulaCache, searchCache, userCache } from '@/lib/cache'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response
    return ok({ stats: getCacheStats(), timestamp: new Date().toISOString() })
  } catch (e) { return serverErr(e, 'GET /api/admin/cache') }
}

export async function DELETE(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const { searchParams } = req.nextUrl
    const type = searchParams.get('type') ?? 'all'

    const cleared: string[] = []
    if (type === 'all' || type === 'questions') { questionCache.invalidatePrefix(''); cleared.push('questions') }
    if (type === 'all' || type === 'chapters')  { chapterCache.invalidatePrefix('');  cleared.push('chapters') }
    if (type === 'all' || type === 'formulas')  { formulaCache.invalidatePrefix('');  cleared.push('formulas') }
    if (type === 'all' || type === 'search')    { searchCache.invalidatePrefix('');   cleared.push('search') }
    if (type === 'all' || type === 'users')     { userCache.invalidatePrefix('');     cleared.push('users') }

    return ok({ cleared, message: `Cache cleared: ${cleared.join(', ')}` })
  } catch (e) { return serverErr(e, 'DELETE /api/admin/cache') }
}
