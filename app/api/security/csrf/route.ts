// app/api/security/csrf/route.ts — Get CSRF token

import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken }         from '@/lib/security/csrf'

export async function GET(req: NextRequest) {
  const token = generateCSRFToken()
  const res   = NextResponse.json({ csrfToken: token })
  res.cookies.set('msc_csrf', token, {
    httpOnly: false,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   3600,
    path:     '/',
  })
  return res
}
