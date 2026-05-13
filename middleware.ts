// middleware.ts — Full security middleware (rate limit + CSRF + auth + i18n)
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getEndpointTier, rateLimitHeaders } from './lib/security/rate-limiter'
import { checkCSRF }        from './lib/security/csrf'
import { isTokenBlacklisted, getTokenFromRequest } from './lib/security/session-manager'
import { audit }            from './lib/security/audit-log'
import { ROUTE_PERMISSIONS } from './lib/security/rbac'

const SKIP_PATHS = ['/_next/', '/favicon', '/sw.js', '/manifest', '/og-image', '/robots', '/sitemap']
const AUTH_PATHS = ['/login', '/register']
const PROTECTED  = ['/dashboard', '/teacher/', '/school-dashboard', '/admin']

function getIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip           = getIP(req)

  // 1. Skip static / internal
  if (SKIP_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next()

  // 2. Rate limiting (API routes only)
  if (pathname.startsWith('/api/')) {
    const tier   = getEndpointTier(pathname)
    const key    = `${ip}:${pathname.split('?')[0]}`
    const result = checkRateLimit(key, tier)

    if (!result.allowed) {
      await audit.rateLimitHit(ip, pathname)
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please wait.', retryAfter: result.retryAfter }),
        {
          status:  429,
          headers: {
            'Content-Type': 'application/json',
            ...rateLimitHeaders(result),
          },
        }
      )
    }
  }

  // 3. CSRF check (state-changing API requests)
  if (pathname.startsWith('/api/') && !['GET','HEAD','OPTIONS'].includes(req.method)) {
    const csrf = checkCSRF(req)
    if (!csrf.valid) {
      await audit.csrfViolation(ip, pathname)
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing CSRF token.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  // 4. Auth cookie check for protected pages
  const token = getTokenFromRequest(req)

  // Blacklisted token
  if (token && isTokenBlacklisted(token)) {
    const res = NextResponse.redirect(new URL('/login', req.url))
    res.cookies.delete('msc_auth_token')
    res.cookies.delete('msc_user_role')
    return res
  }

  // Protected page — no token
  const needsAuth = PROTECTED.some(p => pathname.startsWith(p))
  if (needsAuth && !token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Admin routes — check role cookie
  if (pathname.startsWith('/admin')) {
    const role = req.cookies.get('msc_user_role')?.value
    if (!token || !['super_admin', 'content_admin'].includes(role ?? '')) {
      await audit.accessDenied(ip, pathname)
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Already logged in → skip auth pages
  if (AUTH_PATHS.some(p => pathname.includes(p)) && token) {
    const role = req.cookies.get('msc_user_role')?.value
    const dest = role === 'teacher' ? '/teacher/dashboard'
      : role === 'school_admin'  ? '/school-dashboard'
      : role?.includes('admin')  ? '/admin'
      : '/dashboard'
    return NextResponse.redirect(new URL(dest, req.url))
  }

  // 5. Security headers on all responses
  const res = NextResponse.next()
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
