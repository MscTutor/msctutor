// lib/api-middleware.ts — Centralized API middleware (security-hardened)
import { NextRequest, NextResponse } from 'next/server'
import { logger }              from './logger'
import { checkRateLimit, getEndpointTier, rateLimitHeaders } from './security/rate-limiter'
import { sanitizeText, detectSuspiciousInput } from './security/input-sanitizer'
import { audit }               from './security/audit-log'
import { checkApiPermission }  from './security/rbac'
import type { Role }           from './security/rbac'

// ── RESPONSE HELPERS ──────────────────────────────────────────────
export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}
export function err(message: string, status = 400, details?: unknown) {
  logger.warn(`API ${status}: ${message}`, details)
  return NextResponse.json({ error: message, ...(details ? { details } : {}) }, { status })
}
export function serverErr(e: unknown, context = 'API') {
  logger.apiError(context, e)
  return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
}
export function tooManyRequests(retryAfter = 60) {
  return NextResponse.json(
    { error: 'Too many requests. Please slow down!', retryAfter },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } }
  )
}

// ── PARSE BODY SAFELY ─────────────────────────────────────────────
export async function parseBody(req: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const ct = req.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) return null
    const text = await req.text()
    if (!text || text.length > 500_000) return null   // 500KB max body
    return JSON.parse(text)
  } catch { return null }
}

// ── FIELD VALIDATION ──────────────────────────────────────────────
export function requireFields(body: Record<string, unknown>, fields: string[]): string | null {
  for (const f of fields) {
    const val = body[f]
    if (val === undefined || val === null || String(val).trim() === '') return `${f} is required`
  }
  return null
}

export function sanitize(str: unknown, maxLen = 1000): string {
  return sanitizeText(String(str ?? ''), { maxLength: maxLen }).clean
}

// ── GET CLIENT IP ─────────────────────────────────────────────────
export function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
}

// ── RATE LIMIT ────────────────────────────────────────────────────
export function rateLimit(key: string, max = 30, windowMs = 60_000): boolean {
  const result = checkRateLimit(key, 'standard')
  return result.allowed
}

// ── AUTH HELPERS ──────────────────────────────────────────────────
export async function getAuthUserSafe(req: NextRequest) {
  try {
    const { getAuthUser } = await import('./auth')
    return await getAuthUser(req)
  } catch { return null }
}

export async function requireAuth(req: NextRequest) {
  const user = await getAuthUserSafe(req)
  if (!user) {
    await audit.accessDenied(getClientIP(req), req.nextUrl.pathname)
    return { user: null, response: err('Unauthorized. Please login.', 401) }
  }
  if ((user as { role?: string }).role === 'banned') {
    return { user: null, response: err('Your account has been suspended.', 403) }
  }
  return { user, response: null }
}

export async function requireAdmin(req: NextRequest) {
  const { user, response } = await requireAuth(req)
  if (response) return { user: null, response }
  const role = (user as { role?: string }).role ?? ''
  if (!['super_admin', 'content_admin'].includes(role)) {
    await audit.accessDenied(getClientIP(req), req.nextUrl.pathname, (user as { uid?: string }).uid)
    return { user: null, response: err('Forbidden. Admin access required.', 403) }
  }
  return { user, response: null }
}

export async function requireRole(req: NextRequest, roles: string[]) {
  const { user, response } = await requireAuth(req)
  if (response) return { user: null, response }
  const role = (user as { role?: string }).role ?? ''
  if (!roles.includes(role)) {
    return { user: null, response: err('Insufficient permissions.', 403) }
  }
  return { user, response: null }
}

// ── DB SAFE WRAPPER ───────────────────────────────────────────────
export async function dbSafe<T>(op: () => Promise<T>, fallback: T, context = 'DB'): Promise<T> {
  try { return await op() } catch (e) { logger.dbError(context, e); return fallback }
}

// ── SUSPICIOUS INPUT CHECK ────────────────────────────────────────
export function checkInputSafety(body: Record<string, unknown>): {
  safe: boolean; threats: string[]; field?: string
} {
  const strings: Record<string, string> = {}
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === 'string') strings[k] = v
  }
  const result = detectSuspiciousInput(strings)
  return { safe: !result.suspicious, threats: result.threats, field: result.field }
}

// ── STANDARD API HANDLER WRAPPER ──────────────────────────────────
type Handler = (req: NextRequest, body: Record<string, unknown>, ip: string) => Promise<NextResponse>

export function apiHandler(handler: Handler, opts: {
  rateLimit?:   { max: number; window: number }
  requireAuth?: boolean
  requireBody?: boolean
  allowedRoles?: string[]
  checkInputs?:  boolean
} = {}) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const ip = getClientIP(req)

    // Rate limit
    if (opts.rateLimit) {
      const tier   = getEndpointTier(req.nextUrl.pathname)
      const result = checkRateLimit(`${ip}:${req.nextUrl.pathname}`, tier)
      if (!result.allowed) {
        await audit.rateLimitHit(ip, req.nextUrl.pathname)
        return tooManyRequests(result.retryAfter)
      }
    }

    // Auth check
    if (opts.requireAuth) {
      const { response } = opts.allowedRoles
        ? await requireRole(req, opts.allowedRoles)
        : await requireAuth(req)
      if (response) return response
    }

    // Parse body
    let body: Record<string, unknown> = {}
    if (opts.requireBody !== false && req.method !== 'GET') {
      const parsed = await parseBody(req)
      if (!parsed) return err('Invalid request body (must be JSON)', 400)
      body = parsed
    }

    // Input safety
    if (opts.checkInputs) {
      const safety = checkInputSafety(body)
      if (!safety.safe) {
        await audit.suspicious(ip, req.nextUrl.pathname, `${safety.threats.join(',')} in ${safety.field}`)
        if (safety.threats.includes('PROMPT_INJECTION')) {
          return err('Request contains invalid content.', 400)
        }
      }
    }

    try {
      return await handler(req, body, ip)
    } catch (e) {
      return serverErr(e, req.nextUrl.pathname)
    }
  }
}

// ── MONITORING HOOK ───────────────────────────────────────────────
export function monitorAPI(
  route: string,
  duration: number,
  status: number,
  error?: string
): void {
  // Structured log for Vercel observability
  const logData = {
    type:     'API_METRIC',
    route,
    duration: `${duration}ms`,
    status,
    slow:     duration > 5000,
    error:    error?.slice(0, 200),
    ts:       new Date().toISOString(),
  }
  if (status >= 500 || duration > 5000) {
    console.error(JSON.stringify(logData))
  } else if (status >= 400) {
    console.warn(JSON.stringify(logData))
  }
}

// ── TIMED HANDLER WRAPPER ─────────────────────────────────────────
export function withMonitoring(route: string, handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const start = Date.now()
    let status  = 200
    try {
      const res = await handler(req)
      status = res.status
      monitorAPI(route, Date.now() - start, status)
      return res
    } catch (e: unknown) {
      status = 500
      monitorAPI(route, Date.now() - start, status, (e as Error)?.message)
      return serverErr(e, route)
    }
  }
}

// ── PAGINATED RESPONSE ────────────────────────────────────────────
export function paginated<T>(
  items:   T[],
  total:   number,
  page:    number,
  limit:   number
): { items: T[]; total: number; page: number; pages: number; hasMore: boolean } {
  return { items, total, page, pages: Math.ceil(total / limit), hasMore: page * limit < total }
}

// ── SAFE DB PAGINATED QUERY ───────────────────────────────────────
export async function dbPaginated<T>(
  query:   () => Promise<[T[], number]>,
  page:    number,
  limit:   number
) {
  try {
    const [items, total] = await query()
    return { ...paginated(items, total, page, limit), error: null }
  } catch (e) {
    logger.dbError('paginated-query', e)
    return { items: [], total: 0, page, pages: 0, hasMore: false, error: 'Query failed' }
  }
}

// ── RESPONSE WITH CORRELATION ID ─────────────────────────────────
export function okWithId(data: unknown, status = 200): NextResponse {
  const correlationId = Math.random().toString(36).slice(2, 10)
  return NextResponse.json({ ...((data as object) ?? {}), _rid: correlationId }, {
    status,
    headers: { 'X-Correlation-Id': correlationId },
  })
}
