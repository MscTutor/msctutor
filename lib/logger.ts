// lib/logger.ts — Production-safe centralized logger (FREE, no paid service)

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level:     LogLevel
  message:   string
  data?:     unknown
  timestamp: string
  path?:     string
}

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV  = process.env.NODE_ENV === 'development'

function log(level: LogLevel, message: string, data?: unknown, path?: string) {
  // In production: only warn/error
  if (IS_PROD && (level === 'debug' || level === 'info')) return

  const entry: LogEntry = {
    level, message,
    timestamp: new Date().toISOString(),
    path,
    data: IS_PROD && data ? '[redacted in prod]' : data,
  }

  const prefix = {
    debug: '🔍',
    info:  'ℹ️',
    warn:  '⚠️',
    error: '❌',
  }[level]

  if (IS_DEV) {
    // Pretty console output for development
    const style = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[36m'
    console.log(`${style}${prefix} [${level.toUpperCase()}]\x1b[0m ${message}`, data ? '\n' + JSON.stringify(data, null, 2) : '')
  } else {
    // JSON output for production (Vercel logs it properly)
    console.log(JSON.stringify(entry))
  }
}

export const logger = {
  debug: (msg: string, data?: unknown, path?: string) => log('debug', msg, data, path),
  info:  (msg: string, data?: unknown, path?: string) => log('info',  msg, data, path),
  warn:  (msg: string, data?: unknown, path?: string) => log('warn',  msg, data, path),
  error: (msg: string, data?: unknown, path?: string) => log('error', msg, data, path),

  // API-specific helpers
  apiError:   (route: string, err: unknown) => log('error', `API Error: ${route}`, { error: err instanceof Error ? err.message : err }),
  apiInfo:    (route: string, msg: string)  => log('info',  `API: ${route} — ${msg}`),
  dbError:    (op: string, err: unknown)    => log('warn',  `DB Error (${op}) — using fallback`, { error: err instanceof Error ? err.message : err }),
  aiError:    (err: unknown)                => log('warn',  'AI service error — using fallback', { error: err instanceof Error ? err.message : err }),
  authError:  (msg: string)                 => log('warn',  `Auth: ${msg}`),
}

export default logger
