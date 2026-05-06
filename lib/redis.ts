// Upstash Redis — FREE tier
// If not configured, falls back gracefully (no caching)

let redis: any = null

async function getRedis() {
  if (redis) return redis
  if (!process.env.UPSTASH_REDIS_REST_URL) return null
  try {
    const { Redis } = await import('@upstash/redis')
    redis = new Redis({
      url:   process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
    })
    return redis
  } catch { return null }
}

export async function cacheGet(key: string): Promise<string | null> {
  const r = await getRedis()
  if (!r) return null
  try { return await r.get(key) } catch { return null }
}

export async function cacheSet(key: string, value: string, ex = 3600): Promise<void> {
  const r = await getRedis()
  if (!r) return
  try { await r.set(key, value, { ex }) } catch { /* silent */ }
}

export async function cacheDel(key: string): Promise<void> {
  const r = await getRedis()
  if (!r) return
  try { await r.del(key) } catch { /* silent */ }
}
