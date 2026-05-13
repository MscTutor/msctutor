// app/api/auth/login/route.ts — Brute force protection + audit log

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, parseBody } from '@/lib/api-middleware'
import { checkBruteForce, recordFailedAttempt, clearBruteForce } from '@/lib/security/session-manager'
import { audit }        from '@/lib/security/audit-log'
import { sanitizeText } from '@/lib/security/input-sanitizer'

function ip(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
}

export async function POST(req: NextRequest) {
  const clientIP = ip(req)
  const ua       = req.headers.get('user-agent') ?? ''

  try {
    const body = await parseBody(req)
    if (!body) return err('Invalid request', 400)

    const idToken = String(body.idToken ?? '').trim()
    const email   = sanitizeText(String(body.email ?? ''), { maxLength: 320 }).clean

    if (!idToken) return err('Firebase ID token required', 400)

    // Brute force check
    const bf = checkBruteForce(`login:${clientIP}`)
    if (!bf.allowed) {
      await audit.bruteForce(clientIP, '/api/auth/login', { lockoutMins: bf.lockoutMins })
      return err(`Too many attempts. Wait ${bf.lockoutMins} minute(s).`, 429)
    }

    try {
      const { adminAuth } = await import('@/lib/firebase-admin')
      const decoded = await adminAuth.verifyIdToken(idToken)

      clearBruteForce(`login:${clientIP}`)
      await audit.loginSuccess(decoded.uid, clientIP, ua)

      let role = 'student'
      try {
        const { default: prisma } = await import('@/lib/prisma')
        const user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid }, select: { role: true } })
        role = user?.role ?? 'student'
      } catch {}

      return ok({ success: true, uid: decoded.uid, role })
    } catch {
      recordFailedAttempt(`login:${clientIP}`)
      await audit.loginFailed(clientIP, email || 'unknown', ua)
      return err('Invalid token or session expired. Please login again.', 401)
    }
  } catch (e) { return serverErr(e, 'POST /api/auth/login') }
}
