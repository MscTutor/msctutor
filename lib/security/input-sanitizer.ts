// lib/security/input-sanitizer.ts
// ══════════════════════════════════════════════════════════════════
// INPUT SANITIZATION — XSS, SQL injection, prompt injection prevention
// Free — no external library
// ══════════════════════════════════════════════════════════════════

export interface SanitizeResult {
  clean:    string
  wasClean: boolean          // false = suspicious input detected
  threats:  string[]
}

// ── XSS PATTERNS ─────────────────────────────────────────────────
const XSS_PATTERNS: RegExp[] = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /<[^>]+on\w+\s*=\s*["'][^"']*["']/gi,  // onclick="...", onerror='...'
  /javascript\s*:/gi,
  /vbscript\s*:/gi,
  /<iframe[\s\S]*?>/gi,
  /<object[\s\S]*?>/gi,
  /<embed[\s\S]*?>/gi,
  /<link[\s\S]*?>/gi,
  /data\s*:\s*text\/html/gi,
  /expression\s*\(/gi,                    // CSS expression()
  /url\s*\(\s*['"]?\s*javascript/gi,
]

// ── SQL INJECTION PATTERNS ────────────────────────────────────────
const SQL_PATTERNS: RegExp[] = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|HAVING|WHERE)\b)/gi,
  /(-{2}|\/\*|\*\/)/g,                    // SQL comments
  /('\s*OR\s*'1'\s*=\s*'1)/gi,           // Classic ' OR '1'='1
  /;\s*(SELECT|DROP|INSERT|UPDATE)/gi,
  /\x00/,                                 // Null bytes
]

// ── PROMPT INJECTION PATTERNS (for AI inputs) ─────────────────────
const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?/gi,
  /you\s+are\s+now\s+(?:dan|jailbreak|unrestricted)/gi,
  /pretend\s+(?:you\s+are|to\s+be)\s+(?:an?\s+)?(evil|unrestricted|unfiltered)/gi,
  /system\s*:\s*you\s+(?:are|must|should)\s+now/gi,
  /\[SYSTEM\]|\[INST\]|\[\/INST\]/gi,
  /override\s+(?:your\s+)?(?:training|restrictions|guidelines)/gi,
  /as\s+an?\s+(?:ai|llm|language\s+model),?\s+you\s+(?:must|should|will)\s+(?:not\s+)?(?:refuse|ignore)/gi,
]

// ── PHONE / EMAIL PATTERNS ────────────────────────────────────────
export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim()) &&
    email.length <= 320
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-().+]/g, '')
  return /^\d{7,15}$/.test(digits)
}

// ── SANITIZE TEXT INPUT ───────────────────────────────────────────
export function sanitizeText(input: string, options: {
  maxLength?:    number
  allowHtml?:    boolean
  checkSql?:     boolean
  checkPrompt?:  boolean
} = {}): SanitizeResult {
  const { maxLength = 5000, allowHtml = false, checkSql = true, checkPrompt = false } = options
  const threats: string[] = []
  let clean = String(input ?? '').trim()

  // Length check
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength)
  }

  // XSS patterns
  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(clean)) {
      threats.push('XSS')
      pattern.lastIndex = 0
      if (!allowHtml) {
        clean = clean.replace(pattern, '')
        pattern.lastIndex = 0
      }
      break
    }
    pattern.lastIndex = 0
  }

  // HTML entity encode if not allowing HTML
  if (!allowHtml) {
    clean = clean
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // SQL injection check (detect only, don't modify AI inputs)
  if (checkSql) {
    for (const pattern of SQL_PATTERNS) {
      if (pattern.test(clean)) {
        threats.push('SQL_INJECTION')
        pattern.lastIndex = 0
        break
      }
      pattern.lastIndex = 0
    }
  }

  // Prompt injection check (for AI inputs)
  if (checkPrompt) {
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(clean)) {
        threats.push('PROMPT_INJECTION')
        clean = '[Potentially unsafe instruction removed]'
        break
      }
    }
  }

  // Remove null bytes
  clean = clean.replace(/\x00/g, '')

  // Normalize whitespace
  clean = clean.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  return {
    clean,
    wasClean: threats.length === 0,
    threats,
  }
}

// ── SANITIZE OBJECT (deep) ────────────────────────────────────────
export function sanitizeObject(
  obj: Record<string, unknown>,
  maxDepth = 5
): Record<string, unknown> {
  if (maxDepth <= 0) return {}

  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    // Sanitize key itself
    const safeKey = key.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 100)
    if (!safeKey) continue

    if (typeof value === 'string') {
      result[safeKey] = sanitizeText(value, { maxLength: 10000 }).clean
    } else if (typeof value === 'number') {
      result[safeKey] = isFinite(value) ? value : 0
    } else if (typeof value === 'boolean') {
      result[safeKey] = value
    } else if (Array.isArray(value)) {
      result[safeKey] = value.slice(0, 100).map(v =>
        typeof v === 'string' ? sanitizeText(v).clean :
        typeof v === 'object' && v !== null ? sanitizeObject(v as Record<string, unknown>, maxDepth - 1) : v
      )
    } else if (value !== null && typeof value === 'object') {
      result[safeKey] = sanitizeObject(value as Record<string, unknown>, maxDepth - 1)
    } else if (value === null) {
      result[safeKey] = null
    }
    // Skip functions, symbols, undefined
  }
  return result
}

// ── VALIDATE URL ──────────────────────────────────────────────────
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

// ── SAFE REDIRECT ─────────────────────────────────────────────────
export function safeRedirect(url: string): string {
  if (!url) return '/'
  // Allow only relative paths
  if (url.startsWith('/') && !url.startsWith('//')) return url
  // Prevent open redirect
  return '/'
}

// ── DETECT SUSPICIOUS INPUT ───────────────────────────────────────
export function detectSuspiciousInput(inputs: Record<string, string>): {
  suspicious: boolean
  threats:    string[]
  field?:     string
} {
  for (const [field, value] of Object.entries(inputs)) {
    const result = sanitizeText(value, { checkSql: true, checkPrompt: true })
    if (!result.wasClean) {
      return { suspicious: true, threats: result.threats, field }
    }
  }
  return { suspicious: false, threats: [] }
}
