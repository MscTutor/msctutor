// app/api/admin/retrieval/route.ts — Retrieval stats + AI cost report

import { NextRequest } from 'next/server'
import { ok, serverErr, requireAdmin } from '@/lib/api-middleware'
import { getRetrievalStats } from '@/lib/retrieval-engine'
import { getCacheStats }     from '@/lib/cache'
import { getSystemHealth }   from '@/lib/observability'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const retrieval = getRetrievalStats()
    const cache     = getCacheStats()
    const health    = getSystemHealth()

    const report = {
      retrieval: {
        ...retrieval,
        summary: [
          `Hit rate: ${retrieval.hitRate}%`,
          `AI skip rate: ${retrieval.aiSaveRate}%`,
          `Estimated cost saved: ${retrieval.estimatedCostSaved}`,
          `Avg tokens saved per query: ${retrieval.avgTokensSaved}`,
        ],
      },
      cache: {
        ...cache,
        totalHits: Object.values(cache).reduce((s, c) => s + c.totalHits, 0),
      },
      health,
      costOptimization: {
        retrievalFirst: '✅ Active — checks 5 content sources before AI',
        caching:        '✅ Active — LRU cache (1h for questions)',
        seoReuse:       '✅ Active — successful AI answers auto-saved',
        rateLimit:      '✅ Active — 30/min standard, 5/min for heavy endpoints',
        estimatedMonthlySavingsAt1000Queries: `$${(retrieval.avgTokensSaved * 1000 / 1000 * 0.002).toFixed(2)}`,
      },
      timestamp: new Date().toISOString(),
    }

    return ok(report)
  } catch (e) { return serverErr(e, 'GET /api/admin/retrieval') }
}
