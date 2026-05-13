// lib/security/audit-log.ts
// ══════════════════════════════════════════════════════════════════
// AUDIT LOG SYSTEM — Immutable security event log
// Stores in DB + structured console output for Vercel logs
// ══════════════════════════════════════════════════════════════════

export type AuditAction =
  // Auth events
  | 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT'
  | 'REGISTER' | 'PASSWORD_RESET' | 'TOKEN_REFRESH'
  // Access events
  | 'ACCESS_DENIED' | 'UNAUTHORIZED_ATTEMPT'
  | 'ADMIN_ACCESS' | 'SENSITIVE_DATA_ACCESS'
  // User management
  | 'USER_BANNED' | 'USER_UNBANNED' | 'USER_DELETED'
  | 'ROLE_CHANGED' | 'USER_CREATED' | 'USER_UPDATED'
  // Content events
  | 'CONTENT_PUBLISHED' | 'CONTENT_DELETED' | 'CONTENT_UPDATED'
  // Payment events
  | 'PAYMENT_INITIATED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED'
  | 'REFUND_ISSUED' | 'CREDITS_ADDED' | 'CREDITS_DEDUCTED'
  // Security events
  | 'RATE_LIMIT_HIT' | 'BRUTE_FORCE_DETECTED' | 'SUSPICIOUS_ACTIVITY'
  | 'CSRF_VIOLATION' | 'SQL_INJECTION_ATTEMPT' | 'XSS_ATTEMPT'
  | 'INVALID_FILE_UPLOAD' | 'FILE_UPLOAD_SUCCESS'
  // API events
  | 'API_ERROR' | 'API_TIMEOUT' | 'BULK_OPERATION'
  // School/Teacher events
  | 'SCHOOL_CREATED' | 'TEACHER_ADDED' | 'STUDENT_ADDED'
  | 'EXAM_PUBLISHED' | 'ATTENDANCE_MARKED' | 'HOMEWORK_ASSIGNED'

export type AuditSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

const ACTION_SEVERITY: Partial<Record<AuditAction, AuditSeverity>> = {
  LOGIN_SUCCESS:          'LOW',
  LOGIN_FAILED:           'MEDIUM',
  LOGOUT:                 'LOW',
  REGISTER:               'LOW',
  ACCESS_DENIED:          'MEDIUM',
  UNAUTHORIZED_ATTEMPT:   'HIGH',
  ADMIN_ACCESS:           'MEDIUM',
  USER_BANNED:            'HIGH',
  USER_DELETED:           'HIGH',
  ROLE_CHANGED:           'HIGH',
  PAYMENT_SUCCESS:        'MEDIUM',
  PAYMENT_FAILED:         'MEDIUM',
  REFUND_ISSUED:          'HIGH',
  RATE_LIMIT_HIT:         'MEDIUM',
  BRUTE_FORCE_DETECTED:   'CRITICAL',
  SUSPICIOUS_ACTIVITY:    'CRITICAL',
  CSRF_VIOLATION:         'CRITICAL',
  SQL_INJECTION_ATTEMPT:  'CRITICAL',
  XSS_ATTEMPT:            'CRITICAL',
  INVALID_FILE_UPLOAD:    'MEDIUM',
}

export interface AuditEntry {
  id:         string
  action:     AuditAction
  severity:   AuditSeverity
  userId?:    string
  ip:         string
  userAgent?: string
  path?:      string
  details?:   Record<string, unknown>
  timestamp:  string
  success:    boolean
}

// ── SANITIZE SENSITIVE DATA ───────────────────────────────────────
function sanitize(details?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!details) return undefined
  const REDACT = ['password', 'token', 'secret', 'key', 'card', 'cvv', 'pan']
  const clean: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(details)) {
    clean[k] = REDACT.some(r => k.toLowerCase().includes(r))
      ? '[REDACTED]'
      : typeof v === 'object' ? '[object]' : v
  }
  return clean
}

// ── MAIN AUDIT FUNCTION ───────────────────────────────────────────
export async function auditLog(params: {
  action:    AuditAction
  userId?:   string
  ip:        string
  userAgent?: string
  path?:     string
  details?:  Record<string, unknown>
  success:   boolean
}): Promise<void> {
  const severity = ACTION_SEVERITY[params.action] ?? 'LOW'
  const entry: AuditEntry = {
    id:        `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    action:    params.action,
    severity,
    userId:    params.userId,
    ip:        params.ip,
    userAgent: params.userAgent?.slice(0, 200),
    path:      params.path,
    details:   sanitize(params.details),
    timestamp: new Date().toISOString(),
    success:   params.success,
  }

  // 1. Structured console log (captured by Vercel logs)
  const logFn = severity === 'CRITICAL' || severity === 'HIGH'
    ? console.error
    : console.log

  logFn(JSON.stringify({
    type:      'AUDIT',
    ...entry,
    // Add stack trace for critical events
    ...(severity === 'CRITICAL' ? { stack: new Error().stack?.split('\n').slice(1, 4).join('|') } : {}),
  }))

  // 2. Save to DB (non-blocking, best effort)
  setImmediate(async () => {
    try {
      const { default: prisma } = await import('@/lib/prisma')
      await (prisma as unknown as { auditLog: { create: (args: unknown) => Promise<unknown> } }).auditLog.create({
        data: {
          action:    entry.action,
          severity:  entry.severity,
          userId:    entry.userId,
          ip:        entry.ip,
          userAgent: entry.userAgent,
          path:      entry.path,
          details:   entry.details ? JSON.stringify(entry.details) : null,
          success:   entry.success,
        },
      })
    } catch {
      // DB not configured — log only to console (already done above)
    }
  })

  // 3. Alert on critical events (extensible to email/Slack/PagerDuty)
  if (severity === 'CRITICAL') {
    await alertCriticalEvent(entry)
  }
}

// ── CRITICAL EVENT ALERTING ───────────────────────────────────────
async function alertCriticalEvent(entry: AuditEntry): Promise<void> {
  // Log prominently to stderr (always visible in Vercel)
  console.error('\n🚨 CRITICAL SECURITY EVENT 🚨\n', JSON.stringify(entry, null, 2), '\n')

  // Future: Send to Slack/email/PagerDuty
  // await fetch(process.env.SLACK_WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ text: '...' }) })
}

// ── CONVENIENCE HELPERS ───────────────────────────────────────────
export const audit = {
  loginFailed: (ip: string, email: string, ua?: string) =>
    auditLog({ action: 'LOGIN_FAILED', ip, path: '/api/auth/login', details: { email: email.slice(0, 50) }, success: false, userAgent: ua }),

  loginSuccess: (userId: string, ip: string, ua?: string) =>
    auditLog({ action: 'LOGIN_SUCCESS', userId, ip, path: '/api/auth/login', success: true, userAgent: ua }),

  accessDenied: (ip: string, path: string, userId?: string) =>
    auditLog({ action: 'ACCESS_DENIED', userId, ip, path, success: false }),

  rateLimitHit: (ip: string, path: string) =>
    auditLog({ action: 'RATE_LIMIT_HIT', ip, path, success: false }),

  bruteForce: (ip: string, path: string, details?: Record<string, unknown>) =>
    auditLog({ action: 'BRUTE_FORCE_DETECTED', ip, path, details, success: false }),

  csrfViolation: (ip: string, path: string) =>
    auditLog({ action: 'CSRF_VIOLATION', ip, path, success: false }),

  suspicious: (ip: string, path: string, reason: string) =>
    auditLog({ action: 'SUSPICIOUS_ACTIVITY', ip, path, details: { reason }, success: false }),

  paymentSuccess: (userId: string, ip: string, amount: number, plan: string) =>
    auditLog({ action: 'PAYMENT_SUCCESS', userId, ip, path: '/api/payment', details: { amount, plan }, success: true }),

  userBanned: (adminId: string, targetId: string, ip: string, reason?: string) =>
    auditLog({ action: 'USER_BANNED', userId: adminId, ip, details: { targetId, reason }, success: true }),

  roleChanged: (adminId: string, targetId: string, oldRole: string, newRole: string, ip: string) =>
    auditLog({ action: 'ROLE_CHANGED', userId: adminId, ip, details: { targetId, oldRole, newRole }, success: true }),

  invalidUpload: (userId: string | undefined, ip: string, reason: string, filename?: string) =>
    auditLog({ action: 'INVALID_FILE_UPLOAD', userId, ip, details: { reason, filename }, success: false }),

  xssAttempt: (ip: string, path: string, input?: string) =>
    auditLog({ action: 'XSS_ATTEMPT', ip, path, details: { input: input?.slice(0, 100) }, success: false }),
}
