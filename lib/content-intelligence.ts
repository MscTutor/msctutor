// lib/content-intelligence.ts
// ══════════════════════════════════════════════════════════════════
// CONTENT INTELLIGENCE ENGINE — Quality scoring, versioning, linking
// Extends existing content pipeline without replacing it
// ══════════════════════════════════════════════════════════════════

// ── EDUCATIONAL QUALITY SCORING ────────────────────────────────────
export interface ContentQualityScore {
  total:        number   // 0-100
  completeness: number   // Has all required sections
  clarity:      number   // Reading level + structure
  ncertAlignment: number // NCERT keywords + chapter refs
  multilingualReady: number // Translation hooks in place
  seoScore:     number   // Meta, slug, keywords present
  issues:       string[]
  suggestions:  string[]
}

export function scoreContentQuality(content: {
  title:       string
  body:        string
  classLevel?: string
  subject?:    string
  formula?:    string
  ncertRef?:   string
  metaTitle?:  string
  metaDesc?:   string
  keywords?:   string
  language?:   string
}): ContentQualityScore {
  const issues:      string[] = []
  const suggestions: string[] = []
  let completeness = 100, clarity = 100, ncertAlignment = 50, seoScore = 100

  // Completeness
  if (!content.title || content.title.length < 5)  { completeness -= 30; issues.push('Title too short or missing') }
  if (!content.body  || content.body.length < 200)  { completeness -= 40; issues.push('Content too short (< 200 chars)'); suggestions.push('Add more explanation, examples, or steps') }
  if (!content.subject)                              { completeness -= 10; suggestions.push('Add subject metadata') }
  if (!content.classLevel)                           { completeness -= 10; suggestions.push('Add class level metadata') }
  if (!content.formula && content.subject?.includes('math')) { suggestions.push('Consider adding relevant formula') }

  // Clarity
  const sentences = content.body.split(/[.!?]+/).filter(s => s.trim().length > 10)
  const avgLen    = sentences.reduce((s, sen) => s + sen.split(' ').length, 0) / Math.max(sentences.length, 1)
  if (avgLen > 30) { clarity -= 20; suggestions.push('Break long sentences into shorter ones for better clarity') }
  if (content.body.split('\n').filter(l => l.trim()).length < 3) { clarity -= 20; suggestions.push('Add paragraph breaks for better readability') }

  // NCERT alignment
  const ncertKeywords = ['ncert','chapter','exercise','textbook','cbse','icse','solution','example','theorem','formula','definition','concept']
  const bodyLower = content.body.toLowerCase() + ' ' + content.title.toLowerCase()
  const found = ncertKeywords.filter(kw => bodyLower.includes(kw)).length
  ncertAlignment = Math.min(100, found * 10 + (content.ncertRef ? 20 : 0))
  if (ncertAlignment < 40) suggestions.push('Add NCERT chapter reference and educational keywords')

  // SEO
  if (!content.metaTitle || content.metaTitle.length < 20) { seoScore -= 25; issues.push('Meta title missing or too short') }
  if (!content.metaDesc  || content.metaDesc.length < 50)  { seoScore -= 25; issues.push('Meta description missing or too short') }
  if (!content.keywords  || content.keywords.length < 10)  { seoScore -= 20; suggestions.push('Add educational keywords') }

  const multilingualReady = content.language ? 80 : 50

  const total = Math.round((completeness * 0.3 + clarity * 0.2 + ncertAlignment * 0.2 + seoScore * 0.2 + multilingualReady * 0.1))

  return { total: Math.max(0, Math.min(100, total)), completeness, clarity, ncertAlignment, seoScore, multilingualReady, issues, suggestions }
}

// ── CURRICULUM ALIGNMENT METADATA ─────────────────────────────────
export interface CurriculumAlignment {
  board:       'CBSE' | 'ICSE' | 'State' | 'IGCSE' | 'IB' | 'Unknown'
  classLevel:  string
  subject:     string
  chapterNo?:  number
  unit?:       string
  learningObjectives: string[]
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  examTopics:  boolean    // Is this a high-frequency exam topic?
  difficulty:  'easy' | 'medium' | 'hard'
}

export function detectCurriculumAlignment(content: string, subject = '', classLevel = ''): CurriculumAlignment {
  const lower = content.toLowerCase()

  const board = /icse|isc/i.test(content) ? 'ICSE'
    : /igcse/i.test(content) ? 'IGCSE'
    : /ib\b/i.test(content)  ? 'IB'
    : /cbse|ncert/i.test(content) ? 'CBSE'
    : 'Unknown'

  // Bloom's level detection
  const bloomsLevel = /design|create|invent|compose|formulate/i.test(lower) ? 'create'
    : /judge|evaluate|assess|critique|justify/i.test(lower) ? 'evaluate'
    : /compare|contrast|analyze|differentiate|examine/i.test(lower) ? 'analyze'
    : /solve|calculate|demonstrate|apply|use/i.test(lower) ? 'apply'
    : /explain|describe|summarize|interpret|classify/i.test(lower) ? 'understand'
    : 'remember'

  // Learning objectives extraction
  const objectives: string[] = []
  const objectivePatterns = [
    /students? (?:will|can|should) (?:be able to )?(.+?)(?:\.|$)/gi,
    /by the end.+?(?:understand|explain|apply|calculate|identify) (.+?)(?:\.|$)/gi,
    /learning objectives?:?\s*(.+?)(?:\n|$)/gi,
  ]
  for (const p of objectivePatterns) {
    let m: RegExpExecArray | null
    while ((m = p.exec(content)) !== null && objectives.length < 5) {
      objectives.push(m[1].trim().slice(0, 100))
    }
  }

  const examTopics = /important|exam|board exam|frequently asked|previous year|must know/i.test(lower)
  const difficulty = /advanced|complex|difficult|hard|JEE|competitive/i.test(lower) ? 'hard'
    : /basic|simple|introduction|easy|beginner/i.test(lower) ? 'easy'
    : 'medium'

  return { board, classLevel, subject, bloomsLevel, learningObjectives: objectives, examTopics, difficulty }
}

// ── CONTENT VERSIONING ────────────────────────────────────────────
export interface ContentVersion {
  version:    string       // semver: major.minor.patch
  contentHash: string      // SHA-like hash for change detection
  changedAt:  string
  changedBy:  string
  changeNote: string
  prevVersion?: string
}

export function generateContentHash(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36).padStart(8, '0')
}

export function bumpVersion(current: string, changeType: 'major' | 'minor' | 'patch'): string {
  const [ma, mi, pa] = current.split('.').map(Number)
  if (changeType === 'major') return `${ma + 1}.0.0`
  if (changeType === 'minor') return `${ma}.${mi + 1}.0`
  return `${ma}.${mi}.${pa + 1}`
}

// ── AUTO INTERNAL LINKING ─────────────────────────────────────────
interface LinkCandidate {
  text:  string
  url:   string
  title: string
}

const EDUCATIONAL_LINK_MAP: Record<string, LinkCandidate> = {
  'newton\'s laws':     { text:'Newton\'s Laws',     url:'/formulas/newtons-second-law',  title:'Newton\'s Laws Formula' },
  'ohm\'s law':         { text:'Ohm\'s Law',         url:'/formulas/ohms-law',             title:'Ohm\'s Law Formula' },
  'pythagoras':         { text:'Pythagoras Theorem', url:'/formulas/pythagorean-theorem',  title:'Pythagoras Theorem' },
  'quadratic formula':  { text:'Quadratic Formula',  url:'/formulas/quadratic-formula',    title:'Quadratic Formula' },
  'photosynthesis':     { text:'Photosynthesis',     url:'/class/10/biology',              title:'Class 10 Biology' },
  'electromagnetism':   { text:'Electromagnetism',   url:'/class/12/physics',              title:'Class 12 Physics' },
  'calculus':           { text:'Calculus',           url:'/class/12/mathematics',          title:'Class 12 Mathematics' },
}

export function generateInternalLinks(content: string, maxLinks = 5): LinkCandidate[] {
  const found: LinkCandidate[] = []
  const lower = content.toLowerCase()

  for (const [keyword, link] of Object.entries(EDUCATIONAL_LINK_MAP)) {
    if (lower.includes(keyword) && found.length < maxLinks) {
      found.push(link)
    }
  }
  return found
}

// ── FLASHCARD GENERATION ──────────────────────────────────────────
export interface Flashcard {
  front:    string    // Question / term
  back:     string    // Answer / definition
  subject:  string
  classLevel: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags:     string[]
}

export function generateFlashcardsFromContent(
  content: string,
  subject:     string,
  classLevel:  string,
  maxCards = 10
): Flashcard[] {
  const cards: Flashcard[] = []
  const lines = content.split('\n').filter(l => l.trim().length > 20)

  // Pattern: Definition lines
  const defPattern = /^(.+?)\s+(?:is|are|refers to|defined as|means)\s+(.+?)\.?$/i
  for (const line of lines.slice(0, 30)) {
    if (cards.length >= maxCards) break
    const m = line.match(defPattern)
    if (m && m[1].length < 60 && m[2].length > 10) {
      cards.push({ front: `What is ${m[1]}?`, back: m[2].trim(), subject, classLevel, difficulty: 'medium', tags: [subject, classLevel] })
    }
  }

  // Pattern: Formula lines
  const formulaPattern = /(.+?)\s*=\s*(.+?)(?:\s*\(|$)/g
  let match: RegExpExecArray | null
  while ((match = formulaPattern.exec(content)) !== null && cards.length < maxCards) {
    if (match[1].length < 30 && match[2].length < 50) {
      cards.push({ front: `Formula for ${match[1].trim()}?`, back: `${match[1].trim()} = ${match[2].trim()}`, subject, classLevel, difficulty: 'medium', tags: ['formula', subject] })
    }
  }

  return cards
}

// ── EDUCATIONAL INTENT CLUSTERS ───────────────────────────────────
export interface IntentCluster {
  cluster:    string     // 'exam_prep' | 'concept_learning' | 'formula_practice' | 'revision' | 'homework'
  subIntent?: string
  urgency:    'high' | 'normal' | 'low'
  recommended: string[]  // recommended page types
}

export function classifyEducationalIntent(query: string): IntentCluster {
  const q = query.toLowerCase()

  if (/exam|test tomorrow|board|jee|neet|competitive/i.test(q)) {
    return { cluster:'exam_prep', urgency:'high', recommended:['mock-test','formulas','revision'] }
  }
  if (/formula|equation|calculate|solve/i.test(q)) {
    return { cluster:'formula_practice', urgency:'normal', recommended:['formulas','ask','experiments'] }
  }
  if (/what is|explain|define|mean|understand/i.test(q)) {
    return { cluster:'concept_learning', urgency:'normal', recommended:['learn','ai-teacher','ask'] }
  }
  if (/revision|revise|recap|summary|quick/i.test(q)) {
    return { cluster:'revision', urgency:'normal', recommended:['revise','ai-teacher','formulas'] }
  }
  if (/homework|assignment|exercise|question/i.test(q)) {
    return { cluster:'homework', urgency:'high', recommended:['ask','formulas','learn'] }
  }
  return { cluster:'concept_learning', urgency:'normal', recommended:['ask','learn','ai-teacher'] }
}
