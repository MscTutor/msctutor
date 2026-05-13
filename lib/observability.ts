// lib/observability.ts — Enterprise-grade monitoring and diagnostics
// Structured logging + performance tracking + abuse detection
// Works without any paid service — uses Vercel logs as backend

import { logger } from './logger'

// ── METRIC TYPES ─────────────────────────────────────────────────
export interface APIMetric {
  route:      string
  method:     string
  duration:   number
  statusCode: number
  userId?:    string
  ip:         string
  slow:       boolean     // > 5s
  error?:     string
  cacheHit?:  boolean
  timestamp:  string
}

export interface UserActivity {
  userId:    string
  action:    string
  subject?:  string
  classLevel?: string
  duration?: number
  success:   boolean
  ts:        string
}

export interface SystemHealth {
  cacheHitRate:  number   // 0-1
  avgResponseMs: number
  errorRate:     number   // 0-1
  activeUsers:   number
  questionsLast24h: number
}

// ── IN-MEMORY METRICS (1-min window, resets on restart) ──────────
const metrics = {
  requests:     [] as { ts: number; duration: number; status: number; route: string }[],
  errors:       0,
  cacheHits:    0,
  cacheMisses:  0,
  activeIPs:    new Set<string>(),
}

// Auto-clean old metrics every minute
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const cutoff = Date.now() - 60_000
    metrics.requests = metrics.requests.filter(r => r.ts > cutoff)
    metrics.activeIPs.clear()
  }, 60_000)
}

// ── RECORD API METRIC ─────────────────────────────────────────────
export function recordMetric(m: Omit<APIMetric, 'timestamp'>): void {
  const metric: APIMetric = { ...m, timestamp: new Date().toISOString() }

  metrics.requests.push({ ts: Date.now(), duration: m.duration, status: m.statusCode, route: m.route })
  metrics.activeIPs.add(m.ip)
  if (m.cacheHit) metrics.cacheHits++
  else metrics.cacheMisses++
  if (m.statusCode >= 500) metrics.errors++

  // Log structured metric
  const logFn = m.slow || m.statusCode >= 500 ? console.error : m.statusCode >= 400 ? console.warn : console.log
  logFn(JSON.stringify({ type: 'API_METRIC', ...metric }))

  // Alert on high error rate
  const recentErrors = metrics.requests.filter(r => r.ts > Date.now() - 60_000 && r.status >= 500).length
  if (recentErrors > 10) {
    console.error(JSON.stringify({ type: 'ALERT', severity: 'HIGH', message: `High error rate: ${recentErrors} errors/min`, route: m.route }))
  }
}

// ── GET SYSTEM HEALTH ─────────────────────────────────────────────
export function getSystemHealth(): SystemHealth {
  const recent      = metrics.requests.filter(r => r.ts > Date.now() - 60_000)
  const errorCount  = recent.filter(r => r.status >= 500).length
  const avgDuration = recent.length > 0 ? recent.reduce((s, r) => s + r.duration, 0) / recent.length : 0
  const total       = metrics.cacheHits + metrics.cacheMisses

  return {
    cacheHitRate:     total > 0 ? metrics.cacheHits / total : 0,
    avgResponseMs:    Math.round(avgDuration),
    errorRate:        recent.length > 0 ? errorCount / recent.length : 0,
    activeUsers:      metrics.activeIPs.size,
    questionsLast24h: 0,  // Requires DB query
  }
}

// ── ABUSE DETECTION ───────────────────────────────────────────────
interface AbuseSignal {
  ip:       string
  signals:  string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  action:   'monitor' | 'slow' | 'block'
}

const IP_HISTORY = new Map<string, { count: number; errors: number; firstSeen: number }>()

export function detectAbuse(ip: string, route: string, statusCode: number): AbuseSignal | null {
  const now     = Date.now()
  const history = IP_HISTORY.get(ip) ?? { count: 0, errors: 0, firstSeen: now }

  history.count++
  if (statusCode >= 400) history.errors++
  IP_HISTORY.set(ip, history)

  const ageMin   = (now - history.firstSeen) / 60_000
  const reqPerMin = ageMin > 0 ? history.count / ageMin : history.count
  const errRate  = history.count > 0 ? history.errors / history.count : 0

  const signals: string[] = []
  if (reqPerMin > 100) signals.push(`High request rate: ${Math.round(reqPerMin)}/min`)
  if (errRate > 0.5 && history.count > 10) signals.push(`High error rate: ${Math.round(errRate * 100)}%`)
  if (history.count > 1000 && ageMin < 5) signals.push('Burst pattern detected')

  if (signals.length === 0) return null

  const severity: AbuseSignal['severity'] = signals.length >= 3 ? 'critical' : signals.length === 2 ? 'high' : signals.length === 1 && reqPerMin > 200 ? 'medium' : 'low'
  const action: AbuseSignal['action'] = severity === 'critical' ? 'block' : severity === 'high' ? 'slow' : 'monitor'

  if (severity !== 'low') {
    console.error(JSON.stringify({ type: 'ABUSE_DETECTED', ip, route, signals, severity, action }))
  }

  return { ip, signals, severity, action }
}

// ── PERFORMANCE TIMER ─────────────────────────────────────────────
export class PerfTimer {
  private start = Date.now()
  private marks: Record<string, number> = {}

  mark(name: string) { this.marks[name] = Date.now() - this.start }
  elapsed() { return Date.now() - this.start }

  report(route: string, ip: string, status: number, cacheHit = false) {
    const duration = this.elapsed()
    recordMetric({
      route, method: 'GET', duration, statusCode: status, ip,
      slow: duration > 5000, cacheHit,
      error: status >= 500 ? `HTTP ${status}` : undefined,
    })
    return duration
  }
}

// ── DIAGNOSTIC ENDPOINT DATA ──────────────────────────────────────
export function getDiagnostics() {
  const health = getSystemHealth()
  return {
    health,
    metrics: {
      requestsLastMin:   metrics.requests.length,
      cacheHits:         metrics.cacheHits,
      cacheMisses:       metrics.cacheMisses,
      errors:            metrics.errors,
      trackedIPs:        IP_HISTORY.size,
    },
    version: process.env.NEXT_PUBLIC_BUILD_TIME ?? 'unknown',
    env:     process.env.NODE_ENV,
    uptime:  Math.round(process.uptime?.() ?? 0),
  }
}

// ── USER ACTIVITY TRACKING ────────────────────────────────────────
export function trackActivity(activity: Omit<UserActivity, 'ts'>): void {
  const full: UserActivity = { ...activity, ts: new Date().toISOString() }
  console.log(JSON.stringify({ type: 'USER_ACTIVITY', ...full }))
}
