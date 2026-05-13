// lib/security/rate-limiter.ts
// ══════════════════════════════════════════════════════════════════
// MULTI-TIER RATE LIMITER — Free, no Redis required for basic use
// Sliding window algorithm with automatic cleanup
// ══════════════════════════════════════════════════════════════════

export type RateLimitTier = 'strict' | 'standard' | 'relaxed' | 'admin'

interface Window {
  count:     number
  resetAt:   number   // Unix ms
  blocked:   boolean
  blockUntil?: number
}

// In-memory store (process-local, resets on restart — fine for Vercel edge)
const STORE = new Map<string, Window>()

// Auto-cleanup every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, win] of STORE.entries()) {
      if (now > win.resetAt && !win.blocked) STORE.delete(key)
    }
  }, 5 * 60_000)
}

// ── TIER CONFIGS ──────────────────────────────────────────────────
const TIERS: Record<RateLimitTier, { max: number; windowMs: number; blockMs: number }> = {
  strict:   { max: 5,   windowMs: 60_000,   blockMs: 15 * 60_000 },  // 5/min → 15min block
  standard: { max: 30,  windowMs: 60_000,   blockMs: 5  * 60_000 },  // 30/min → 5min block
  relaxed:  { max: 100, windowMs: 60_000,   blockMs: 60_000       },  // 100/min → 1min block
  admin:    { max: 200, windowMs: 60_000,   blockMs: 0            },  // 200/min, no block
}

export interface RateLimitResult {
  allowed:     boolean
  remaining:   number
  resetAt:     number
  retryAfter?: number    // seconds to wait if blocked
  tier:        RateLimitTier
}

export function checkRateLimit(key: string, tier: RateLimitTier = 'standard'): RateLimitResult {
  const config = TIERS[tier]
  const now    = Date.now()
  const win    = STORE.get(key)

  // Check if currently blocked
  if (win?.blocked && win.blockUntil && now < win.blockUntil) {
    return {
      allowed:    false,
      remaining:  0,
      resetAt:    win.blockUntil,
      retryAfter: Math.ceil((win.blockUntil - now) / 1000),
      tier,
    }
  }

  // Window expired or new key
  if (!win || now > win.resetAt) {
    STORE.set(key, { count: 1, resetAt: now + config.windowMs, blocked: false })
    return { allowed: true, remaining: config.max - 1, resetAt: now + config.windowMs, tier }
  }

  win.count++

  // Exceeded limit — block
  if (win.count > config.max) {
    if (config.blockMs > 0) {
      win.blocked    = true
      win.blockUntil = now + config.blockMs
    }
    return {
      allowed:    false,
      remaining:  0,
      resetAt:    win.blockUntil ?? win.resetAt,
      retryAfter: Math.ceil((config.blockMs || config.windowMs) / 1000),
      tier,
    }
  }

  return { allowed: true, remaining: config.max - win.count, resetAt: win.resetAt, tier }
}

// ── ENDPOINT-SPECIFIC LIMITERS ────────────────────────────────────
export const ENDPOINT_TIERS: Record<string, RateLimitTier> = {
  '/api/ask':            'standard',  // 30/min
  '/api/ask-image':      'strict',    // 5/min (expensive)
  '/api/ask-voice':      'strict',    // 5/min
  '/api/ask-pdf':        'strict',    // 5/min
  '/api/auth/register':  'strict',    // 5/min (prevent spam accounts)
  '/api/auth/login':     'strict',    // 5/min (prevent brute force)
  '/api/payment':        'strict',    // 5/min
  '/api/exam/generate':  'standard',  // 30/min
  '/api/learning/chat':  'standard',  // 30/min
  '/api/admin':          'admin',     // 200/min
  '/api/learning':       'relaxed',   // 100/min
}

export function getEndpointTier(pathname: string): RateLimitTier {
  for (const [pattern, tier] of Object.entries(ENDPOINT_TIERS)) {
    if (pathname.startsWith(pattern)) return tier
  }
  return 'standard'
}

// ── HEADERS FOR RATE LIMIT RESPONSE ──────────────────────────────
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Tier':      result.tier,
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset':     String(Math.ceil(result.resetAt / 1000)),
  }
  if (!result.allowed && result.retryAfter) {
    headers['Retry-After']         = String(result.retryAfter)
    headers['X-RateLimit-Blocked'] = 'true'
  }
  return headers
}
