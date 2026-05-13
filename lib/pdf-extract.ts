// lib/pdf-extract.ts — PDF text extraction + structured content pipeline

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse')

export interface PDFExtractResult {
  text:       string
  pages:      number
  info:       Record<string, unknown>
  // Extended
  chunks:     PDFChunk[]
  formulas:   string[]
  images:     number   // estimated image count from page count
  wordCount:  number
  language:   string   // detected language
  title:      string   // extracted title from PDF metadata or first line
}

export interface PDFChunk {
  index:    number
  type:     'chapter' | 'section' | 'paragraph' | 'formula' | 'list'
  title:    string
  content:  string
  wordCount: number
  pageEst:  number    // estimated page number
  formulas: string[]  // formulas found in this chunk
}

// ── FORMULA PATTERNS ─────────────────────────────────────────────
const FORMULA_PATTERNS: RegExp[] = [
  /[A-Za-z]+\s*=\s*[A-Za-z0-9\s\+\-\*\/\^\(\)]+/g,  // v = u + at
  /[FEPVQmMkK]\s*=\s*[\w\s\+\-\*\/\^\(\)]+/g,          // F = ma, E = mc²
  /∫|∑|∏|√|∂|∇|∞|≈|≠|≤|≥/g,                          // Calculus symbols
  /\d+\s*[A-Za-z]+\s*\+\s*\d*\s*[A-Za-z]*/g,           // Chemical: 2H₂ + O₂
]

function extractFormulas(text: string): string[] {
  const found = new Set<string>()
  for (const pattern of FORMULA_PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags)
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      const formula = m[0].trim()
      if (formula.length >= 3 && formula.length <= 80) found.add(formula)
    }
  }
  return [...found].slice(0, 30)
}

// ── DETECT LANGUAGE ───────────────────────────────────────────────
function detectPDFLanguage(text: string): string {
  const sample = text.slice(0, 500)
  if ((sample.match(/[\u0900-\u097F]/g) ?? []).length > 20) return 'hi'
  if ((sample.match(/[\u0980-\u09FF]/g) ?? []).length > 20) return 'bn'
  if ((sample.match(/[\u0B80-\u0BFF]/g) ?? []).length > 20) return 'ta'
  if ((sample.match(/[\u0600-\u06FF]/g) ?? []).length > 20) return 'ar'
  return 'en'
}

// ── EXTRACT TITLE FROM PDF ────────────────────────────────────────
function extractPDFTitle(text: string, info: Record<string, unknown>): string {
  // Try PDF metadata title first
  if (info.Title && typeof info.Title === 'string' && info.Title.length > 3) {
    return info.Title.slice(0, 100)
  }
  // Find first non-trivial line
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5)
  for (const line of lines.slice(0, 10)) {
    if (line.length > 10 && line.length < 150 && !/^page\s*\d/i.test(line)) {
      return line.slice(0, 100)
    }
  }
  return 'Untitled Document'
}

// ── SMART CHUNKING ───────────────────────────────────────────────
export function splitIntoChapters(text: string): string[] {
  const patterns = [
    /chapter\s+\d+/gi,
    /अध्याय\s+\d+/g,
    /CHAPTER\s+[IVXLC]+/g,
    /^#{1,2}\s+.+$/gm,
    /^\d+\.\s+[A-Z].+$/gm,
  ]

  let splits: number[] = [0]
  for (const pattern of patterns) {
    let m: RegExpExecArray | null
    const re = new RegExp(pattern.source, pattern.flags)
    while ((m = re.exec(text)) !== null) splits.push(m.index)
  }
  splits = [...new Set(splits)].sort((a, b) => a - b)

  const chapters: string[] = []
  for (let i = 0; i < splits.length; i++) {
    const chunk = text.slice(splits[i], splits[i + 1] ?? text.length).trim()
    if (chunk.length > 200) chapters.push(chunk)
  }
  return chapters.length > 0 ? chapters : [text]
}

// ── SMART STRUCTURED CHUNKS ───────────────────────────────────────
export function buildStructuredChunks(text: string, chunkSizeWords = 400): PDFChunk[] {
  const chapters = splitIntoChapters(text)
  const chunks: PDFChunk[] = []
  let chunkIndex = 0

  for (const chapter of chapters) {
    // Detect chunk type
    const firstLine = chapter.split('\n')[0]?.trim() ?? ''
    const isFormula = /=|formula|equation/i.test(firstLine)
    const isList    = /^[\d\-\*•]/.test(firstLine)
    const isChapter = /chapter|अध्याय|\d+\./i.test(firstLine)

    const type: PDFChunk['type'] = isFormula ? 'formula'
      : isList    ? 'list'
      : isChapter ? 'chapter'
      : chapter.length > 1000 ? 'section' : 'paragraph'

    // Split large chunks
    const words    = chapter.split(/\s+/)
    const subChunks: string[] = []
    for (let i = 0; i < words.length; i += chunkSizeWords) {
      subChunks.push(words.slice(i, i + chunkSizeWords).join(' '))
    }

    for (let si = 0; si < subChunks.length; si++) {
      const content = subChunks[si]
      chunks.push({
        index:    chunkIndex++,
        type:     si > 0 ? 'paragraph' : type,
        title:    si === 0 ? firstLine.slice(0, 80) : `${firstLine.slice(0, 40)} (cont.)`,
        content:  content.trim(),
        wordCount: content.split(/\s+/).length,
        pageEst:  Math.floor(chunkIndex * 0.4),
        formulas: extractFormulas(content),
      })
    }
  }

  return chunks
}

// ── MAIN EXTRACT FUNCTION (extended) ─────────────────────────────
export async function extractPDFText(buffer: Buffer): Promise<PDFExtractResult> {
  const data     = await pdfParse(buffer)
  const text: string = data.text ?? ''
  const info     = data.info ?? {}
  const pages: number = data.numpages ?? 1
  const chunks   = buildStructuredChunks(text)
  const formulas = extractFormulas(text)
  const language = detectPDFLanguage(text)
  const title    = extractPDFTitle(text, info)
  const wordCount = text.split(/\s+/).filter(Boolean).length

  return { text, pages, info, chunks, formulas, images: Math.floor(pages * 0.3), wordCount, language, title }
}

export function extractChapterTitle(chapterText: string): string {
  const firstLine = chapterText.split('\n').find(l => l.trim().length > 3)
  return (firstLine ?? 'Chapter').trim().slice(0, 100)
}

