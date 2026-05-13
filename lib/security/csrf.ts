// lib/security/csrf.ts
// ══════════════════════════════════════════════════════════════════
// CSRF PROTECTION — Double Submit Cookie Pattern
// Free, no external library needed
// ══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { createHmac, randomBytes }   from 'crypto'

const SECRET  = process.env.CSRF_SECRET ?? 'msc-csrf-secret-change-in-production'
const COOKIE  = 'msc_csrf'
const HEADER  = 'x-csrf-token'
const MAX_AGE = 3600   // 1 hour in seconds

// ── GENERATE TOKEN ────────────────────────────────────────────────
export function generateCSRFToken(): string {
  const nonce     = randomBytes(16).toString('hex')
  const timestamp = Math.floor(Date.now() / 1000)
  const payload   = `${nonce}.${timestamp}`
  const signature = createHmac('sha256', SECRET).update(payload).digest('hex')
  return `${payload}.${signature}`
}

// ── VALIDATE TOKEN ────────────────────────────────────────────────
export function validateCSRFToken(token: string): { valid: boolean; reason?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'Missing token' }
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    return { valid: false, reason: 'Malformed token' }
  }

  const [nonce, timestamp, signature] = parts

  // Verify signature
  const payload     = `${nonce}.${timestamp}`
  const expected    = createHmac('sha256', SECRET).update(payload).digest('hex')
  if (signature !== expected) {
    return { valid: false, reason: 'Invalid signature' }
  }

  // Check expiry
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10)
  if (age > MAX_AGE) {
    return { valid: false, reason: 'Token expired' }
  }

  return { valid: true }
}

// ── MIDDLEWARE: CHECK CSRF ON MUTATION REQUESTS ───────────────────
export function checkCSRF(req: NextRequest): { valid: boolean; reason?: string } {
  // Only check state-changing methods
  const method = req.method.toUpperCase()
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return { valid: true }

  // Skip for API routes called from mobile apps (different origin check)
  const contentType = req.headers.get('content-type') ?? ''
  const isAPI       = req.nextUrl.pathname.startsWith('/api/')
  if (!isAPI) return { valid: true }

  // Allow same-origin or trusted origins
  const origin    = req.headers.get('origin')
  const appUrl    = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const trustedOrigins = [
    appUrl,
    'http://localhost:3000',
    'http://localhost:3001',
    'https://msctutor.vercel.app',
  ].filter(Boolean)

  if (origin && !trustedOrigins.some(o => origin.startsWith(o))) {
    // Get CSRF token from header or form body
    const headerToken = req.headers.get(HEADER)
    const cookieToken = req.cookies.get(COOKIE)?.value

    if (!headerToken || !cookieToken) {
      return { valid: false, reason: 'Missing CSRF token' }
    }

    // Double submit: header token must match cookie token
    if (headerToken !== cookieToken) {
      return { valid: false, reason: 'CSRF token mismatch' }
    }

    const validation = validateCSRFToken(headerToken)
    if (!validation.valid) return validation
  }

  return { valid: true }
}

// ── SET CSRF COOKIE ON RESPONSE ───────────────────────────────────
export function setCSRFCookie(res: NextResponse): string {
  const token = generateCSRFToken()
  res.cookies.set(COOKIE, token, {
    httpOnly:  false,    // Must be readable by JS for double-submit
    secure:    process.env.NODE_ENV === 'production',
    sameSite:  'strict',
    maxAge:    MAX_AGE,
    path:      '/',
  })
  return token
}

// ── API ROUTE CSRF ENDPOINT ───────────────────────────────────────
// GET /api/security/csrf → Returns token for frontend
export function handleCSRFRequest(req: NextRequest): NextResponse {
  const res   = NextResponse.json({ success: true })
  const token = setCSRFCookie(res)
  return NextResponse.json({ csrfToken: token }, { headers: res.headers })
}
