// lib/content-pipeline.ts
// ══════════════════════════════════════════════════════════════════
// DYNAMIC EDUCATIONAL CONTENT ENGINE
// Extends existing PDF extract, slugify, deepseek, prisma
// ══════════════════════════════════════════════════════════════════

import { generateSlug }  from './slug'
import { logger }        from './logger'

// ── CONTENT TYPES ─────────────────────────────────────────────────
export type ContentKind =
  | 'question' | 'formula' | 'chapter' | 'experiment'
  | 'note' | 'syllabus' | 'concept' | 'blog'

export interface ContentChunk {
  kind:       ContentKind
  title:      string
  titleHindi? :string
  body:       string
  subject:    string
  classLevel: string
  board:      string
  chapterNo?: number
  slug:       string
  language:   string
  tags:       string[]
  sourceRef?: string  // original PDF page / URL
  mediaUrl?:  string  // image/diagram URL
  isPublic:   boolean
  needsApproval: boolean
}

export interface PipelineResult {
  chunks:  ContentChunk[]
  errors:  string[]
  stats: {
    totalChunks: number
    saved:       number
    skipped:     number
  }
}

// ── SLUG DEDUP ────────────────────────────────────────────────────
export function makeUniqueSlug(base: string): string {
  const slug = generateSlug(base.slice(0, 80))
  return `${slug}-${Date.now().toString(36)}`
}

// ── EXTRACT TAGS FROM CONTENT ─────────────────────────────────────
export function extractTags(text: string, subject: string): string[] {
  const KEYWORD_SETS: Record<string, string[]> = {
    mathematics: ['algebra','geometry','trigonometry','calculus','statistics','probability','mensuration','polynomial','quadratic','linear'],
    physics:     ['motion','force','energy','work','power','gravitation','optics','waves','electricity','magnetism','thermodynamics'],
    chemistry:   ['atoms','molecules','acids','bases','oxidation','reduction','organic','periodic','bonding','reaction','electrolysis'],
    biology:     ['cell','tissue','photosynthesis','respiration','reproduction','genetics','evolution','nutrition','nervous','digestion'],
  }
  const kws  = KEYWORD_SETS[subject.toLowerCase()] ?? []
  const lower = text.toLowerCase()
  const found = kws.filter(k => lower.includes(k))
  found.unshift(subject.toLowerCase())
  return [...new Set(found)].slice(0, 8)
}

// ── AUTO-DETECT CONTENT KIND ──────────────────────────────────────
export function detectContentKind(text: string): ContentKind {
  const lower = text.toLowerCase().trim()
  if (/^(what|how|why|explain|define|find|calculate|prove|show|derive)/i.test(lower))
    return 'question'
  if (/formula|=|equation|expression/i.test(lower.slice(0, 60)))
    return 'formula'
  if (/experiment|aim|objective|materials|procedure|observation/i.test(lower))
    return 'experiment'
  if (/chapter|unit|lesson|topic/i.test(lower.slice(0, 40)))
    return 'chapter'
  return 'note'
}

// ── CHUNK TEXT INTO CONTENT PIECES ───────────────────────────────
export function chunkTextContent(
  text: string,
  subject: string,
  classLevel: string,
  board = 'CBSE',
  language = 'en',
  approvalNeeded = true,
  maxChunkLen = 2000
): ContentChunk[] {
  const chunks: ContentChunk[] = []

  // Split on headings, blank lines, numbered items
  const sections = text
    .split(/\n{2,}|(?=\n[A-Z\d][.\)]\s)|(?=#{1,3}\s)/)
    .map(s => s.trim())
    .filter(s => s.length > 50)

  for (const section of sections) {
    const truncated = section.slice(0, maxChunkLen)
    const kind      = detectContentKind(truncated)
    const title     = truncated.split('\n')[0].replace(/^[#*\d.\)\s]+/, '').slice(0, 150).trim()
    const slug      = makeUniqueSlug(`${subject}-${classLevel}-${title.slice(0, 40)}`)
    const tags      = extractTags(truncated, subject)

    if (title.length < 5) continue   // skip noise

    chunks.push({
      kind, title, body: truncated, subject, classLevel, board,
      slug, language, tags,
      isPublic:      !approvalNeeded,
      needsApproval: approvalNeeded,
    })
  }

  return chunks
}

// ── SAVE CHUNKS TO DB ─────────────────────────────────────────────
export async function savePipelineChunks(
  chunks: ContentChunk[],
  uploadedBy: string,
  uploadedByRole: string
): Promise<PipelineResult> {
  const errors: string[] = []
  let saved = 0, skipped = 0

  try {
    const { default: prisma } = await import('./prisma')

    for (const chunk of chunks) {
      try {
        // Find or skip subject
        const subjectRecord = await prisma.subject.findFirst({
          where: { slug: { contains: chunk.subject.toLowerCase().replace(/\s/g, '-') } },
          select: { id: true },
        }).catch(() => null)

        if (chunk.kind === 'question') {
          await prisma.question.create({
            data: {
              slug:          chunk.slug,
              title:         chunk.title,
              titleHindi:    chunk.titleHindi,
              solution:      chunk.body,
              language:      chunk.language,
              source:        'pipeline',
              isPublic:      chunk.isPublic,
              isApproved:    !chunk.needsApproval,
              difficulty:    'medium',
              subjectId:     subjectRecord?.id,
              addedByRole:   uploadedByRole,
            },
          })
          saved++
        } else if (chunk.kind === 'chapter' || chunk.kind === 'note' || chunk.kind === 'syllabus') {
          await prisma.contentPage.create({
            data: {
              type:        chunk.kind,
              slug:        chunk.slug,
              title:       chunk.title,
              content:     chunk.body,
              classLevel:  chunk.classLevel,
              board:       chunk.board,
              isPublic:    chunk.isPublic,
              isApproved:  !chunk.needsApproval,
              subjectId:   subjectRecord?.id,
              addedBy:     uploadedBy,
              addedByRole: uploadedByRole,
            },
          })
          saved++
        } else {
          // concept / experiment → ContentPage with kind
          await prisma.contentPage.create({
            data: {
              type:        chunk.kind,
              slug:        chunk.slug,
              title:       chunk.title,
              content:     chunk.body,
              classLevel:  chunk.classLevel,
              board:       chunk.board,
              isPublic:    chunk.isPublic,
              isApproved:  !chunk.needsApproval,
              subjectId:   subjectRecord?.id,
              addedBy:     uploadedBy,
              addedByRole: uploadedByRole,
            },
          })
          saved++
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        if (msg.includes('Unique constraint')) { skipped++; continue }
        errors.push(`[${chunk.kind}] ${chunk.title.slice(0, 40)}: ${msg}`)
        logger.dbError('savePipelineChunks', e)
      }
    }
  } catch (e) {
    errors.push('DB connection failed — chunks not persisted')
    logger.dbError('savePipelineChunks', e)
  }

  return { chunks, errors, stats: { totalChunks: chunks.length, saved, skipped } }
}

// ── AI-ENHANCED CHUNK ENRICHMENT ──────────────────────────────────
export async function enrichChunkWithAI(
  chunk: ContentChunk,
  language: string
): Promise<ContentChunk> {
  if (!process.env.DEEPSEEK_API_KEY) return chunk

  try {
    const { deepseekChat } = await import('./deepseek')
    const prompt = `Given this educational content, return ONLY a JSON object (no markdown):
{
  "title": "improved title (max 80 chars)",
  "summary": "2-sentence summary",
  "difficulty": "easy|medium|hard",
  "tags": ["tag1","tag2","tag3"]
}

Content: ${chunk.body.slice(0, 500)}
Subject: ${chunk.subject}, Class: ${chunk.classLevel}`

    const raw   = await deepseekChat(prompt, 300)
    const clean = raw.replace(/```json|```/g, '').trim()
    const data  = JSON.parse(clean)

    return {
      ...chunk,
      title: data.title ?? chunk.title,
      tags:  data.tags  ?? chunk.tags,
    }
  } catch { return chunk }
}

// ── CONTENT INDEX ENTRY (for search) ─────────────────────────────
export interface SearchIndexEntry {
  id:         string
  kind:       ContentKind
  title:      string
  body:       string
  subject:    string
  classLevel: string
  url:        string
  score:      number
}

// Simple in-memory search index (upgradeable to Meilisearch/Algolia)
const SEARCH_INDEX: SearchIndexEntry[] = []

export function addToSearchIndex(entry: SearchIndexEntry): void {
  const existing = SEARCH_INDEX.findIndex(e => e.id === entry.id)
  if (existing >= 0) SEARCH_INDEX[existing] = entry
  else SEARCH_INDEX.push(entry)
}

export function searchLocalIndex(query: string, limit = 10): SearchIndexEntry[] {
  const q = query.toLowerCase().trim()
  return SEARCH_INDEX
    .filter(e => e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
