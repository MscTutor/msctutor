// lib/media-automation.ts
// ══════════════════════════════════════════════════════════════════
// EDUCATIONAL MEDIA AUTOMATION — SVG graphics, thumbnails, banners
// Extends existing storage structure (Storj/R2 compatible)
// ══════════════════════════════════════════════════════════════════

// ── SUBJECT COLOR SYSTEM (consistent across platform) ─────────────
export const SUBJECT_BRAND: Record<string, { primary: string; light: string; dark: string; icon: string }> = {
  mathematics:      { primary:'#1e40af', light:'#dbeafe', dark:'#1e3a8a', icon:'📐' },
  physics:          { primary:'#0369a1', light:'#e0f2fe', dark:'#075985', icon:'⚡' },
  chemistry:        { primary:'#6d28d9', light:'#ede9fe', dark:'#4c1d95', icon:'⚗️' },
  biology:          { primary:'#065f46', light:'#d1fae5', dark:'#064e3b', icon:'🧬' },
  science:          { primary:'#0369a1', light:'#e0f2fe', dark:'#075985', icon:'🔬' },
  english:          { primary:'#1e3a5f', light:'#eff6ff', dark:'#1e3a5f', icon:'📖' },
  hindi:            { primary:'#991b1b', light:'#fee2e2', dark:'#7f1d1d', icon:'📝' },
  'social-science': { primary:'#065f46', light:'#d1fae5', dark:'#064e3b', icon:'🌍' },
  history:          { primary:'#92400e', light:'#fef3c7', dark:'#78350f', icon:'📜' },
  geography:        { primary:'#065f46', light:'#d1fae5', dark:'#064e3b', icon:'🗺️' },
  economics:        { primary:'#065f46', light:'#d1fae5', dark:'#064e3b', icon:'📊' },
  accountancy:      { primary:'#92400e', light:'#fef3c7', dark:'#78350f', icon:'🧾' },
}
const DEFAULT_BRAND = { primary:'#1a3a6b', light:'#e8eef8', dark:'#0f2040', icon:'📚' }

export function getSubjectBrand(subject: string) {
  return SUBJECT_BRAND[subject.toLowerCase()] ?? DEFAULT_BRAND
}

// ── SVG FORMULA CARD ──────────────────────────────────────────────
export function generateFormulaSVG(params: {
  formula:    string
  title:      string
  subject?:   string
  variables?: { sym: string; meaning: string }[]
  width?:     number
  height?:    number
}): string {
  const { formula, title, subject = 'mathematics', variables = [], width = 600, height = 240 } = params
  const brand   = getSubjectBrand(subject)
  const varRows = variables.slice(0, 4)
  const hasVars = varRows.length > 0

  return `<svg width="${width}" height="${hasVars ? height + varRows.length * 24 : height}" viewBox="0 0 ${width} ${hasVars ? height + varRows.length * 24 : height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.dark}"/>
      <stop offset="100%" style="stop-color:${brand.primary}"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${hasVars ? height + varRows.length * 24 : height}" rx="16" fill="url(#bg)"/>

  <!-- Title -->
  <text x="24" y="38" font-family="Sora, system-ui, sans-serif" font-size="15" font-weight="700" fill="rgba(255,255,255,0.75)">${escapeXML(title)}</text>

  <!-- Subject icon -->
  <text x="${width - 40}" y="38" font-family="system-ui" font-size="20" text-anchor="middle">${brand.icon}</text>

  <!-- Formula box -->
  <rect x="16" y="52" width="${width - 32}" height="80" rx="12" fill="rgba(255,255,255,0.12)"/>
  <text x="${width / 2}" y="102" font-family="'Courier New', monospace" font-size="${formula.length > 30 ? 22 : 28}" font-weight="900" fill="white" text-anchor="middle" filter="url(#shadow)">${escapeXML(formula)}</text>

  <!-- Variables -->
  ${varRows.map((v, i) => `
  <rect x="16" y="${148 + i * 28}" width="${width - 32}" height="24" rx="6" fill="rgba(255,255,255,0.08)"/>
  <text x="28" y="${165 + i * 28}" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="rgba(255,255,255,0.9)">${escapeXML(v.sym)}</text>
  <text x="60" y="${165 + i * 28}" font-family="system-ui" font-size="12" fill="rgba(255,255,255,0.7)">= ${escapeXML(v.meaning)}</text>
  `).join('')}

  <!-- MscTutor watermark -->
  <text x="${width - 20}" y="${(hasVars ? height + varRows.length * 24 : height) - 12}" font-family="system-ui" font-size="10" fill="rgba(255,255,255,0.35)" text-anchor="end">MscTutor.in</text>
</svg>`
}

function escapeXML(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

// ── EDUCATIONAL CARD SVG ──────────────────────────────────────────
export function generateEducationalCardSVG(params: {
  title:      string
  subtitle?:  string
  subject?:   string
  classLevel?: string
  type?:      'chapter' | 'formula' | 'experiment' | 'quiz'
  stats?:     { icon: string; value: string | number; label: string }[]
}): string {
  const { title, subtitle, subject = 'mathematics', classLevel, type = 'chapter', stats = [] } = params
  const brand  = getSubjectBrand(subject)
  const typeLabel = { chapter:'CHAPTER', formula:'FORMULA', experiment:'EXPERIMENT', quiz:'QUIZ' }[type]

  return `<svg width="400" height="220" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand.dark}"/>
      <stop offset="100%" stop-color="${brand.primary}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="220" rx="16" fill="url(#cg)"/>
  <!-- Decorative circle -->
  <circle cx="360" cy="40" r="60" fill="rgba(255,255,255,0.05)"/>
  <!-- Type badge -->
  <rect x="16" y="16" width="${typeLabel.length * 7 + 20}" height="22" rx="11" fill="rgba(255,255,255,0.2)"/>
  <text x="26" y="31" font-family="system-ui" font-size="10" font-weight="700" fill="white">${typeLabel}</text>
  <!-- Class badge -->
  ${classLevel ? `<rect x="${400 - classLevel.length * 8 - 50}" y="16" width="${classLevel.length * 8 + 30}" height="22" rx="11" fill="rgba(255,255,255,0.15)"/>
  <text x="${400 - classLevel.length * 4 - 35}" y="31" font-family="system-ui" font-size="10" font-weight="700" fill="white" text-anchor="middle">Class ${classLevel}</text>` : ''}
  <!-- Title -->
  <text x="16" y="90" font-family="Sora, system-ui" font-size="${title.length > 35 ? 16 : 20}" font-weight="800" fill="white" width="370">${escapeXML(title.slice(0,55))}</text>
  ${subtitle ? `<text x="16" y="115" font-family="system-ui" font-size="13" fill="rgba(255,255,255,0.75)">${escapeXML(subtitle.slice(0,60))}</text>` : ''}
  <!-- Stats row -->
  ${stats.slice(0,3).map((s, i) => `
  <text x="${16 + i * 130}" y="175" font-family="system-ui" font-size="10" fill="rgba(255,255,255,0.6)">${escapeXML(s.label)}</text>
  <text x="${16 + i * 130}" y="195" font-family="Sora, system-ui" font-size="18" font-weight="900" fill="white">${s.icon} ${String(s.value)}</text>
  `).join('')}
  <!-- Brand -->
  <text x="384" y="210" font-family="system-ui" font-size="10" fill="rgba(255,255,255,0.3)" text-anchor="end">msctutor.in</text>
</svg>`
}

// ── OG IMAGE GENERATOR (extends existing /og route) ───────────────
export function generateOGBannerSVG(params: {
  title:      string
  subtitle?:  string
  subject?:   string
  icon?:      string
  locale?:    string
  badges?:    string[]
}): string {
  const { title, subtitle, subject = 'general', icon, locale = 'en', badges = [] } = params
  const brand    = getSubjectBrand(subject)
  const iconChar = icon ?? brand.icon ?? '📚'

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand.dark}"/>
      <stop offset="100%" stop-color="${brand.primary}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <!-- Decorative circles -->
  <circle cx="1050" cy="120" r="220" fill="rgba(255,255,255,0.06)"/>
  <circle cx="150"  cy="550" r="160" fill="rgba(255,255,255,0.04)"/>
  <!-- Logo area -->
  <rect x="50" y="50" width="200" height="50" rx="25" fill="rgba(255,255,255,0.15)"/>
  <text x="150" y="83" font-family="Sora, system-ui" font-size="22" font-weight="900" fill="white" text-anchor="middle">MscTutor</text>
  <!-- Subject icon -->
  <text x="80" y="260" font-family="system-ui" font-size="80">${iconChar}</text>
  <!-- Title -->
  <text x="80" y="330" font-family="Sora, system-ui" font-size="${title.length > 60 ? 36 : 48}" font-weight="900" fill="white">${escapeXML(title.slice(0,65))}</text>
  ${title.length > 65 ? `<text x="80" y="390" font-family="Sora, system-ui" font-size="40" font-weight="900" fill="white">${escapeXML(title.slice(65,120))}</text>` : ''}
  ${subtitle ? `<text x="80" y="${title.length > 65 ? 440 : 390}" font-family="system-ui" font-size="26" fill="rgba(255,255,255,0.8)">${escapeXML(subtitle.slice(0,80))}</text>` : ''}
  <!-- Badges -->
  ${badges.slice(0,4).map((b, i) => `
  <rect x="${80 + i * 220}" y="530" width="${b.length * 12 + 30}" height="40" rx="20" fill="rgba(255,255,255,0.15)"/>
  <text x="${80 + i * 220 + (b.length * 6 + 15)}" y="556" font-family="system-ui" font-size="14" font-weight="700" fill="white" text-anchor="middle">${escapeXML(b)}</text>
  `).join('')}
  <!-- Locale badge -->
  ${locale !== 'en' ? `<rect x="1100" y="50" width="80" height="36" rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="1140" y="73" font-family="system-ui" font-size="14" font-weight="700" fill="white" text-anchor="middle">${locale.toUpperCase()}</text>` : ''}
</svg>`
}

// ── MEDIA KEY GENERATOR (CDN-ready paths) ─────────────────────────
export function generateMediaKey(params: {
  type:    'formula' | 'chapter' | 'og' | 'card' | 'thumbnail'
  subject: string
  slug:    string
  format?: 'svg' | 'webp' | 'png'
}): string {
  const { type, subject, slug, format = 'svg' } = params
  return `media/${type}/${subject}/${slug.slice(0, 50)}.${format}`
}

// ── ANIMATION TEMPLATE GENERATOR ──────────────────────────────────
export function generateAnimationCSS(animationType: 'fadeUp'|'slideIn'|'pulse'|'bounce'|'shimmer'): string {
  const animations: Record<string, string> = {
    fadeUp:   '@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}',
    slideIn:  '@keyframes slideIn{from{transform:translateX(-20px);opacity:0}to{transform:none;opacity:1}}',
    pulse:    '@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}',
    bounce:   '@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}',
    shimmer:  '@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}',
  }
  return animations[animationType] ?? ''
}
