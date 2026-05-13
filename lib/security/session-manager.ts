// lib/security/session-manager.ts
// ══════════════════════════════════════════════════════════════════
// SECURE SESSION MANAGEMENT — Token rotation, blacklist, device tracking
// ══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, randomBytes }   from 'crypto'

const SECRET  = process.env.SESSION_SECRET ?? 'msc-session-secret-change-in-production'
const COOKIE  = 'msc_auth_token'
const ROLE_C  = 'msc_user_role'

// In-memory token blacklist (for logout + compromised tokens)
// In production scale: use Redis. For Vercel serverless: acceptable for low scale.
const TOKEN_BLACKLIST = new Set<string>()
const BRUTE_FORCE     = new Map<string, { count: number; firstAt: number; lockedUntil?: number }>()

// ── SESSION OPTIONS ───────────────────────────────────────────────
export const SESSION_CONFIG = {
  maxAge:         7 * 24 * 3600,   // 7 days
  renewBefore:    24 * 3600,       // Renew if < 1 day left
  cookieOptions: {
    httpOnly:  true,
    secure:    process.env.NODE_ENV === 'production',
    sameSite:  'lax' as const,
    path:      '/',
  },
}

// ── SET SESSION COOKIES ───────────────────────────────────────────
export function setSessionCookies(res: NextResponse, token: string, role: string): void {
  const expiry = new Date(Date.now() + SESSION_CONFIG.maxAge * 1000)

  res.cookies.set(COOKIE, token, {
    ...SESSION_CONFIG.cookieOptions,
    expires: expiry,
  })
  res.cookies.set(ROLE_C, role, {
    ...SESSION_CONFIG.cookieOptions,
    httpOnly: false,   // Role readable by JS for UI decisions
    expires:  expiry,
  })
}

// ── CLEAR SESSION ─────────────────────────────────────────────────
export function clearSession(res: NextResponse): void {
  const expired = new Date(0)
  res.cookies.set(COOKIE, '', { ...SESSION_CONFIG.cookieOptions, expires: expired, maxAge: 0 })
  res.cookies.set(ROLE_C, '', { httpOnly: false, secure: false, sameSite: 'lax', path: '/', expires: expired, maxAge: 0 })
}

// ── BLACKLIST TOKEN (logout / compromise) ─────────────────────────
export function blacklistToken(token: string): void {
  TOKEN_BLACKLIST.add(token.slice(-32))  // Store only last 32 chars (saves memory)
  // Auto-clean after maxAge
  setTimeout(() => TOKEN_BLACKLIST.delete(token.slice(-32)), SESSION_CONFIG.maxAge * 1000)
}

export function isTokenBlacklisted(token: string): boolean {
  return TOKEN_BLACKLIST.has(token.slice(-32))
}

// ── GET TOKEN FROM REQUEST ────────────────────────────────────────
export function getTokenFromRequest(req: NextRequest): string | null {
  // 1. Cookie (preferred — HttpOnly)
  const cookieToken = req.cookies.get(COOKIE)?.value
  if (cookieToken) return cookieToken

  // 2. Authorization header (for API clients)
  const authHeader = req.headers.get('authorization') ?? ''
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim()
  }

  return null
}

// ── BRUTE FORCE PROTECTION (login) ───────────────────────────────
const MAX_ATTEMPTS   = 5
const WINDOW_MS      = 15 * 60_000    // 15 min
const LOCKOUT_MS     = 30 * 60_000    // 30 min lockout

export interface BruteForceResult {
  allowed:       boolean
  attemptsLeft?: number
  lockedUntil?:  number
  lockoutMins?:  number
}

export function checkBruteForce(identifier: string): BruteForceResult {
  const now    = Date.now()
  const record = BRUTE_FORCE.get(identifier)

  // Check lockout
  if (record?.lockedUntil && now < record.lockedUntil) {
    return {
      allowed:     false,
      lockedUntil: record.lockedUntil,
      lockoutMins: Math.ceil((record.lockedUntil - now) / 60_000),
    }
  }

  // Window expired — reset
  if (record && now - record.firstAt > WINDOW_MS) {
    BRUTE_FORCE.delete(identifier)
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS }
  }

  const count = record?.count ?? 0
  return {
    allowed:      count < MAX_ATTEMPTS,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - count),
  }
}

export function recordFailedAttempt(identifier: string): BruteForceResult {
  const now    = Date.now()
  const record = BRUTE_FORCE.get(identifier) ?? { count: 0, firstAt: now }

  record.count++

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS
    BRUTE_FORCE.set(identifier, record)
    // Auto-clear after lockout
    setTimeout(() => BRUTE_FORCE.delete(identifier), LOCKOUT_MS + 1000)
    return { allowed: false, lockedUntil: record.lockedUntil, lockoutMins: Math.ceil(LOCKOUT_MS / 60_000) }
  }

  BRUTE_FORCE.set(identifier, record)
  return { allowed: true, attemptsLeft: MAX_ATTEMPTS - record.count }
}

export function clearBruteForce(identifier: string): void {
  BRUTE_FORCE.delete(identifier)
}

// ── SIGN NONCE for CSRF/one-time tokens ──────────────────────────
export function signNonce(data: string): string {
  const nonce = randomBytes(8).toString('hex')
  const sig   = createHmac('sha256', SECRET).update(`${data}.${nonce}`).digest('hex').slice(0, 16)
  return `${nonce}.${sig}`
}

export function verifyNonce(data: string, token: string): boolean {
  const [nonce, sig] = token.split('.')
  if (!nonce || !sig) return false
  const expected = createHmac('sha256', SECRET).update(`${data}.${nonce}`).digest('hex').slice(0, 16)
  return sig === expected
}

// ── PARSE USER AGENT for device info ─────────────────────────────
export function parseDeviceInfo(ua: string = ''): {
  device:  string
  browser: string
  os:      string
} {
  const isMobile  = /mobile|android|iphone|ipad/i.test(ua)
  const isTablet  = /tablet|ipad/i.test(ua)
  const browser   = /chrome/i.test(ua) ? 'Chrome'
    : /firefox/i.test(ua) ? 'Firefox'
    : /safari/i.test(ua)  ? 'Safari'
    : /edge/i.test(ua)    ? 'Edge'
    : 'Unknown'
  const os = /windows/i.test(ua) ? 'Windows'
    : /mac/i.test(ua)     ? 'macOS'
    : /android/i.test(ua) ? 'Android'
    : /iphone|ipad/i.test(ua) ? 'iOS'
    : /linux/i.test(ua)   ? 'Linux'
    : 'Unknown'

  return {
    device:  isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
    browser,
    os,
  }
}
