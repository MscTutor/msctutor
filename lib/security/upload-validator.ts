// lib/security/upload-validator.ts
// ══════════════════════════════════════════════════════════════════
// UPLOAD VALIDATION — Type, size, magic bytes, content safety
// Free — no external scanning service needed
// ══════════════════════════════════════════════════════════════════

export interface UploadValidationResult {
  valid:      boolean
  error?:     string
  fileInfo?:  {
    name:      string
    type:      string
    size:      number
    sizeLabel: string
    extension: string
  }
}

// ── ALLOWED FILE TYPES ────────────────────────────────────────────
export const ALLOWED_TYPES = {
  image: {
    mimes:      ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    maxSizeMB:  5,
    magicBytes: [
      [0xFF, 0xD8, 0xFF],             // JPEG
      [0x89, 0x50, 0x4E, 0x47],       // PNG
      [0x47, 0x49, 0x46],             // GIF
      [0x52, 0x49, 0x46, 0x46],       // WEBP (RIFF)
    ],
  },
  pdf: {
    mimes:      ['application/pdf'],
    extensions: ['.pdf'],
    maxSizeMB:  20,
    magicBytes: [[0x25, 0x50, 0x44, 0x46]],  // %PDF
  },
  audio: {
    mimes:      ['audio/wav', 'audio/mpeg', 'audio/ogg', 'audio/webm'],
    extensions: ['.wav', '.mp3', '.ogg', '.webm'],
    maxSizeMB:  10,
    magicBytes: [
      [0x52, 0x49, 0x46, 0x46],       // WAV (RIFF)
      [0xFF, 0xFB],                   // MP3
      [0x4F, 0x67, 0x67, 0x53],       // OGG
    ],
  },
} as const

type FileCategory = keyof typeof ALLOWED_TYPES

// ── FORMAT FILE SIZE ──────────────────────────────────────────────
function fmtSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  if (bytes >= 1024)        return `${(bytes / 1024).toFixed(0)}KB`
  return `${bytes}B`
}

// ── DANGEROUS CONTENT PATTERNS ────────────────────────────────────
const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /javascript:/i,
  /on\w+\s*=/i,          // onclick=, onerror=, etc.
  /\x00/,               // null bytes
  /<iframe/i,
  /vbscript:/i,
  /data:text\/html/i,
]

// ── VALIDATE FILE ─────────────────────────────────────────────────
export async function validateUpload(
  file: File,
  category: FileCategory
): Promise<UploadValidationResult> {
  const config    = ALLOWED_TYPES[category]
  const ext       = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`
  const sizeLabel = fmtSize(file.size)

  // 1. File name safety
  if (!/^[\w\-. ]+$/.test(file.name)) {
    return { valid: false, error: 'File name contains invalid characters' }
  }
  if (file.name.length > 200) {
    return { valid: false, error: 'File name too long (max 200 characters)' }
  }

  // 2. Extension check
  if (!config.extensions.includes(ext as never)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed: ${config.extensions.join(', ')}`,
    }
  }

  // 3. MIME type check (can be spoofed, but still useful)
  if (!config.mimes.includes(file.type as never)) {
    return {
      valid: false,
      error: `Invalid MIME type: ${file.type}. Expected: ${config.mimes.join(', ')}`,
    }
  }

  // 4. File size check
  const maxBytes = config.maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File too large: ${sizeLabel}. Maximum allowed: ${config.maxSizeMB}MB`,
    }
  }

  // 5. Empty file check
  if (file.size === 0) {
    return { valid: false, error: 'File is empty' }
  }

  // 6. Magic bytes verification (real file type check)
  try {
    const buffer    = await file.slice(0, 12).arrayBuffer()
    const bytes     = new Uint8Array(buffer)
    const magicList = config.magicBytes as readonly (readonly number[])[]
    const hasMagic  = magicList.some(magic =>
      magic.every((b, i) => bytes[i] === b)
    )
    if (!hasMagic) {
      return {
        valid: false,
        error: 'File content does not match its extension. File may be corrupted or disguised.',
      }
    }
  } catch {
    // Can't read — skip magic byte check but log
    console.warn('Could not verify magic bytes for:', file.name)
  }

  // 7. Content safety scan (for text-extractable files)
  if (category === 'pdf') {
    try {
      const sample  = await file.slice(0, 4096).text()
      const danger  = DANGEROUS_PATTERNS.some(p => p.test(sample))
      if (danger) {
        return { valid: false, error: 'File contains potentially dangerous content' }
      }
    } catch { /* Binary content — skip text scan */ }
  }

  return {
    valid: true,
    fileInfo: {
      name:      file.name,
      type:      file.type,
      size:      file.size,
      sizeLabel,
      extension: ext,
    },
  }
}

// ── VALIDATE BASE64 IMAGE ─────────────────────────────────────────
export function validateBase64Image(base64: string, maxSizeMB = 5): UploadValidationResult {
  if (!base64 || typeof base64 !== 'string') {
    return { valid: false, error: 'No image data provided' }
  }

  // Check size (base64 is ~33% larger than binary)
  const approxBytes = (base64.length * 3) / 4
  const maxBytes    = maxSizeMB * 1024 * 1024 * 1.34  // account for base64 overhead
  if (approxBytes > maxBytes) {
    return {
      valid: false,
      error: `Image too large (~${fmtSize(approxBytes)}). Max: ${maxSizeMB}MB`,
    }
  }

  // Basic base64 character validation
  if (!/^[A-Za-z0-9+/=]+$/.test(base64.slice(0, 100))) {
    return { valid: false, error: 'Invalid image data format' }
  }

  return { valid: true }
}

// ── SANITIZE FILENAME ─────────────────────────────────────────────
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')  // Replace unsafe chars
    .replace(/\.{2,}/g, '.')              // No double dots
    .replace(/^[-.]/, '')                 // No leading dashes/dots
    .slice(0, 100)                        // Max length
    || 'file'
}

// ── GENERATE SAFE STORAGE PATH ────────────────────────────────────
export function generateStoragePath(userId: string, category: FileCategory, filename: string): string {
  const safe    = sanitizeFilename(filename)
  const ts      = Date.now()
  const rand    = Math.random().toString(36).slice(2, 8)
  const safeUid = userId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)
  return `uploads/${category}/${safeUid}/${ts}-${rand}-${safe}`
}
