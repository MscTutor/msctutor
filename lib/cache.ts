// lib/cache.ts — Multi-tier cache (FREE, no Redis needed for basic use)
// LRU in-memory cache with TTL + HTTP cache control helpers

interface CacheEntry<T> {
  value:     T
  expiresAt: number
  hits:      number
}

class LRUCache<T> {
  private map  = new Map<string, CacheEntry<T>>()
  private maxSize: number

  constructor(maxSize = 500) {
    this.maxSize = maxSize
    // Cleanup every 2 minutes
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 120_000)
    }
  }

  get(key: string): T | null {
    const entry = this.map.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) { this.map.delete(key); return null }
    // Move to end (LRU)
    this.map.delete(key)
    entry.hits++
    this.map.set(key, entry)
    return entry.value
  }

  set(key: string, value: T, ttlSeconds = 300): void {
    if (this.map.size >= this.maxSize) {
      // Evict oldest
      const firstKey = this.map.keys().next().value
      if (firstKey) this.map.delete(firstKey)
    }
    this.map.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000, hits: 0 })
  }

  delete(key: string): void { this.map.delete(key) }

  invalidatePrefix(prefix: string): number {
    let count = 0
    for (const key of this.map.keys()) {
      if (key.startsWith(prefix)) { this.map.delete(key); count++ }
    }
    return count
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.map.entries()) {
      if (now > entry.expiresAt) this.map.delete(key)
    }
  }

  size(): number { return this.map.size }

  stats() {
    let hits = 0
    for (const e of this.map.values()) hits += e.hits
    return { size: this.map.size, maxSize: this.maxSize, totalHits: hits }
  }
}

// ── GLOBAL CACHE INSTANCES ────────────────────────────────────────
// Separate caches for different data types
export const questionCache = new LRUCache<unknown>(1000)   // Question solutions
export const chapterCache  = new LRUCache<unknown>(200)    // Chapter content
export const formulaCache  = new LRUCache<unknown>(100)    // Formula lookups
export const userCache     = new LRUCache<unknown>(500)    // User profiles (short TTL)
export const searchCache   = new LRUCache<unknown>(300)    // Search results

// ── CACHE TTL CONSTANTS (seconds) ─────────────────────────────────
export const TTL = {
  QUESTION:     3600,    // 1 hour — question solutions rarely change
  CHAPTER:      86400,   // 24 hours — chapter content is static
  FORMULA:      86400,   // 24 hours — formulas are static
  USER:         60,      // 1 min — user data changes often
  SEARCH:       300,     // 5 min — search results
  LEADERBOARD:  120,     // 2 min — leaderboard
  STATS:        600,     // 10 min — dashboard stats
}

// ── CACHE-ASIDE HELPER ────────────────────────────────────────────
export async function cached<T>(
  cache: LRUCache<T>,
  key:   string,
  ttl:   number,
  fetch: () => Promise<T>
): Promise<T> {
  const hit = cache.get(key)
  if (hit !== null) return hit
  const value = await fetch()
  cache.set(key, value, ttl)
  return value
}

// ── HTTP CACHE HEADERS ────────────────────────────────────────────
export function cacheHeaders(ttlSeconds: number, options: {
  public?:       boolean
  staleWhile?:   number
  mustRevalidate?: boolean
} = {}): Record<string, string> {
  const { public: isPublic = true, staleWhile = 0, mustRevalidate = false } = options
  const directives = [
    isPublic ? 'public' : 'private',
    `max-age=${ttlSeconds}`,
    staleWhile > 0 ? `stale-while-revalidate=${staleWhile}` : '',
    mustRevalidate  ? 'must-revalidate' : '',
  ].filter(Boolean).join(', ')

  return {
    'Cache-Control':  directives,
    'Vary':           'Accept-Encoding',
    'X-Cache-TTL':    String(ttlSeconds),
  }
}

// ── STATIC CONTENT HEADERS ────────────────────────────────────────
export const STATIC_CACHE  = cacheHeaders(86400 * 7,  { staleWhile: 86400 })  // 7d + 1d stale
export const DYNAMIC_CACHE = cacheHeaders(300,         { staleWhile: 60 })      // 5m + 1m stale
export const NO_CACHE      = { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
export const PRIVATE_CACHE = cacheHeaders(60, { public: false, mustRevalidate: true })

// ── RESPONSE CACHE WRAPPER ─────────────────────────────────────────
export function withCache(body: unknown, ttl: number, isPublic = true): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      ...cacheHeaders(ttl, { public: isPublic, staleWhile: Math.floor(ttl / 5) }),
    },
  })
}

// ── INVALIDATION HELPERS ──────────────────────────────────────────
export function invalidateUser(userId: string): void {
  userCache.invalidatePrefix(`user:${userId}`)
  questionCache.invalidatePrefix(`user:${userId}`)
}

export function invalidateChapter(chapterId: string): void {
  chapterCache.delete(`chapter:${chapterId}`)
  searchCache.invalidatePrefix('search:')
}

export function getCacheStats() {
  return {
    questions:  questionCache.stats(),
    chapters:   chapterCache.stats(),
    formulas:   formulaCache.stats(),
    users:      userCache.stats(),
    search:     searchCache.stats(),
  }
}
