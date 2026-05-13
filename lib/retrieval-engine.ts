// lib/retrieval-engine.ts
// ══════════════════════════════════════════════════════════════════
// RETRIEVAL-FIRST EDUCATIONAL ENGINE
// Before calling external AI, search internal verified content:
//   1. NCERT Formulas (40 entries, all subjects)
//   2. Bulk content bank (formulas + experiments)
//   3. Unified chapters/topics (global-content)
//   4. Cached question solutions (LRU + DB)
//   5. Knowledge graph context
// Returns a RetrievalResult — tells orchestrator whether AI is needed
// ══════════════════════════════════════════════════════════════════

import { ALL_NCERT_FORMULAS }             from './ncert-formulas'
import { FORMULA_BANK, EXPERIMENT_BANK }  from './bulk-content-bank'
import {
  getAllUnifiedClasses,
  getUnifiedSubjectCatalog,
  getPlatformContentStats,
} from './global-content'
import { questionCache, formulaCache, chapterCache, TTL } from './cache'

// ── TYPES ─────────────────────────────────────────────────────────
export type RetrievalSource =
  | 'ncert_formula'       // From lib/ncert-formulas.ts
  | 'formula_bank'        // From lib/bulk-content-bank.ts (with diagrams)
  | 'experiment_bank'     // From lib/bulk-content-bank.ts
  | 'chapter_topic'       // From lib/global-content.ts
  | 'cached_question'     // From LRU cache
  | 'db_question'         // From Prisma Question model
  | 'knowledge_graph'     // From static graph in knowledge-graph route

export type RetrievalConfidence = 'exact' | 'high' | 'medium' | 'low' | 'none'

export interface RetrievedContent {
  source:      RetrievalSource
  confidence:  RetrievalConfidence
  title:       string
  content:     string            // Main educational content
  formula?:    string            // Formula string if applicable
  latex?:      string            // LaTeX version
  example?:    string
  derivation?: string
  variables?:  { sym: string; meaning: string; unit: string }[]
  note?:       string
  imageUrl?:   string
  diagramUrl?: string
  ncertRef?:   string
  classLevel?: string
  subject?:    string
  slug?:       string            // URL slug for linking
  relatedUrls?: string[]         // Internal links
  tokensSaved:  number           // Estimated tokens avoided
}

export interface RetrievalResult {
  found:          boolean
  content:        RetrievedContent | null
  needsAI:        boolean         // true = call AI after retrieval
  aiMode:         'skip' | 'extend' | 'full'
  // 'skip'   = internal answer sufficient, don't call AI
  // 'extend' = have content, but user wants deeper explanation
  // 'full'   = no relevant content found, use AI directly
  confidence:     RetrievalConfidence
  retrievalMs?:   number
  tokensEstimated: number         // ~tokens if AI were called
  tokensSaved:    number          // tokens avoided by retrieval
  sources:        RetrievalSource[]
}

// ── QUERY NORMALISER ──────────────────────────────────────────────
function normaliseQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/[?।\.\!\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

// ── INTENT CLASSIFIER ─────────────────────────────────────────────
function classifyIntent(q: string): {
  wantsFormula:   boolean
  wantsExample:   boolean
  wantsDerivation:boolean
  wantsExperiment:boolean
  wantsExplain:   boolean
  wantsDeeper:    boolean
} {
  const lo = q.toLowerCase()
  return {
    wantsFormula:    /formula|equation|calculate|कैसे calculate|what is.*formula/i.test(lo),
    wantsExample:    /example|solved|practice|उदाहरण|दिखाओ/i.test(lo),
    wantsDerivation: /deriv|proof|prove|साबित|व्युत्पत्ति/i.test(lo),
    wantsExperiment: /experiment|lab|practical|प्रयोग/i.test(lo),
    wantsExplain:    /explain|what is|what are|define|kya hai|क्या है/i.test(lo),
    wantsDeeper:     /more detail|deeper|elaborate|विस्तार|और बताओ|full solution/i.test(lo),
  }
}

// ── FORMULA MATCH SCORE ───────────────────────────────────────────
function formulaMatchScore(q: string, name: string, formula: string, chapter: string): number {
  const qn  = normaliseQuery(q)
  const fn  = normaliseQuery(name)
  const ch  = normaliseQuery(chapter)

  if (qn.includes(fn))     return 100   // Exact name match
  if (fn.includes(qn))     return 90    // Name contains query

  // Word overlap
  const qWords = qn.split(' ').filter(w => w.length > 3)
  const fWords = fn.split(' ')
  const overlap = qWords.filter(w => fWords.some(fw => fw.includes(w) || w.includes(fw))).length
  if (qWords.length > 0 && overlap / qWords.length >= 0.6) return Math.round(70 + overlap * 5)

  // Formula symbol match
  if (formula && qn.includes(formula.toLowerCase().replace(/\s/g, ''))) return 85
  if (ch && qn.includes(ch.slice(0, 10))) return 40

  return 0
}

// ── TOPIC MATCH SCORE ─────────────────────────────────────────────
function topicMatchScore(q: string, title: string, content: string): number {
  const qn = normaliseQuery(q)
  const tn = normaliseQuery(title)
  const cn = normaliseQuery(content.slice(0, 500))

  if (tn.includes(qn) || qn.includes(tn)) return 90
  const qWords = qn.split(' ').filter(w => w.length > 3)
  const titleHits   = qWords.filter(w => tn.includes(w)).length
  const contentHits = qWords.filter(w => cn.includes(w)).length
  const titleScore  = qWords.length > 0 ? titleHits / qWords.length * 80 : 0
  const contentScore = qWords.length > 0 ? contentHits / qWords.length * 40 : 0
  return Math.round(Math.max(titleScore, contentScore))
}

// ── ESTIMATED TOKEN SAVINGS ───────────────────────────────────────
function estimateTokensSaved(content: string): number {
  // ~1 token per 4 chars for English; retrieval avoids both input + output tokens
  const outputTokens = Math.ceil(content.length / 4)
  const inputTokens  = 500  // typical question + system prompt
  return inputTokens + outputTokens
}

// ── MAIN RETRIEVAL FUNCTION ───────────────────────────────────────
export async function retrieveEducationalContent(params: {
  question:   string
  subject?:   string
  classLevel?: string
  language?:  string
  userId?:    string
  wantsDeeper?: boolean   // user explicitly asked for more
}): Promise<RetrievalResult> {
  const start  = Date.now()
  const { question, subject, classLevel, language = 'en', wantsDeeper = false } = params
  const qNorm  = normaliseQuery(question)
  const intent = classifyIntent(question)
  const sources: RetrievalSource[] = []

  // ── 1. Check cached question ──────────────────────────────────
  const cacheKey = `q:${qNorm.slice(0, 80)}:${language}`
  const cachedQ  = questionCache.get(cacheKey)
  if (cachedQ && !wantsDeeper) {
    const c = cachedQ as RetrievedContent & { solution?: string }
    const content: RetrievedContent = {
      source:      'cached_question',
      confidence:  'high',
      title:       c.title ?? question,
      content:     c.content ?? c.solution ?? '',
      formula:     c.formula,
      ncertRef:    c.ncertRef,
      classLevel:  c.classLevel ?? classLevel,
      subject:     c.subject ?? subject,
      slug:        c.slug,
      tokensSaved: estimateTokensSaved(c.content ?? c.solution ?? ''),
    }
    return {
      found:true, content, needsAI:false, aiMode:'skip',
      confidence:'high', retrievalMs:Date.now()-start,
      tokensEstimated:1000, tokensSaved:content.tokensSaved, sources:['cached_question'],
    }
  }

  // ── 2. NCERT Formula search ───────────────────────────────────
  let bestFormula: typeof ALL_NCERT_FORMULAS[0] | null = null
  let bestFormulaScore = 0

  const fCacheKey = `formula:${qNorm.slice(0, 60)}`
  const fCached   = formulaCache.get(fCacheKey)
  if (fCached) {
    bestFormula      = fCached as typeof ALL_NCERT_FORMULAS[0]
    bestFormulaScore = 80
    sources.push('ncert_formula')
  } else {
    for (const f of ALL_NCERT_FORMULAS) {
      if (classLevel && f.classLevel !== classLevel) continue
      if (subject && f.subject.toLowerCase() !== subject.toLowerCase()) continue
      const score = formulaMatchScore(question, f.name, f.formula, f.chapter)
      if (score > bestFormulaScore) { bestFormulaScore = score; bestFormula = f }
    }
    if (bestFormula && bestFormulaScore >= 60) {
      formulaCache.set(fCacheKey, bestFormula, TTL.FORMULA)
      sources.push('ncert_formula')
    }
  }

  if (bestFormula && bestFormulaScore >= 60 && (intent.wantsFormula || bestFormulaScore >= 80)) {
    const vars    = bestFormula.variables.map(v => `${v.sym} = ${v.meaning} (${v.unit || '—'})`).join('\n')
    const content = [
      `**Formula:** ${bestFormula.formula}`,
      vars ? `\n**Variables:**\n${vars}` : '',
      bestFormula.example ? `\n**Solved Example:**\n${bestFormula.example}` : '',
      bestFormula.note    ? `\n**Note:** ${bestFormula.note}` : '',
      bestFormula.derivation ? `\n**Derivation:** ${bestFormula.derivation}` : '',
    ].filter(Boolean).join('\n')

    const retrieved: RetrievedContent = {
      source:      'ncert_formula',
      confidence:  bestFormulaScore >= 90 ? 'exact' : 'high',
      title:       bestFormula.name,
      content,
      formula:     bestFormula.formula,
      latex:       bestFormula.latex,
      example:     bestFormula.example,
      derivation:  bestFormula.derivation,
      variables:   bestFormula.variables,
      note:        bestFormula.note,
      ncertRef:    `NCERT Class ${bestFormula.classLevel} ${bestFormula.subject} — ${bestFormula.chapter}`,
      classLevel:  bestFormula.classLevel,
      subject:     bestFormula.subject,
      slug:        `formulas/${bestFormula.id}`,
      relatedUrls: [`/class/${bestFormula.classLevel}/${bestFormula.subject.toLowerCase()}`],
      tokensSaved: estimateTokensSaved(content),
    }

    const aiMode: RetrievalResult['aiMode'] = wantsDeeper || intent.wantsDeeper ? 'extend' : intent.wantsExample && !bestFormula.example ? 'extend' : 'skip'

    return {
      found:true, content:retrieved, needsAI:aiMode !== 'skip', aiMode,
      confidence:retrieved.confidence, retrievalMs:Date.now()-start,
      tokensEstimated:1200, tokensSaved:retrieved.tokensSaved, sources,
    }
  }

  // ── 3. Bulk content bank search ───────────────────────────────
  if (intent.wantsFormula || intent.wantsExperiment) {
    // Formula bank
    for (const entry of FORMULA_BANK) {
      const score = topicMatchScore(question, entry.title, entry.description)
      if (score >= 65) {
        const content = [
          `**Formula:** ${entry.expression}`,
          entry.reaction ? `**Reaction:** ${entry.reaction}` : '',
          `**Explanation:** ${entry.explanation.join(' ')}`,
          `**Use Cases:** ${entry.useCases.slice(0,3).join(' | ')}`,
        ].filter(Boolean).join('\n')

        sources.push('formula_bank')
        const retrieved: RetrievedContent = {
          source:'formula_bank', confidence:'high', title:entry.title, content,
          formula:entry.expression, imageUrl:entry.webp, diagramUrl:entry.diagram,
          subject:entry.subject, classLevel:entry.classRange,
          slug:`formulas/${entry.slug}`, tokensSaved:estimateTokensSaved(content),
          relatedUrls:[`/formulas/${entry.slug}`],
        }
        return {
          found:true, content:retrieved, needsAI:wantsDeeper||intent.wantsDeeper, aiMode:wantsDeeper?'extend':'skip',
          confidence:'high', retrievalMs:Date.now()-start,
          tokensEstimated:1000, tokensSaved:retrieved.tokensSaved, sources,
        }
      }
    }

    // Experiment bank
    if (intent.wantsExperiment) {
      for (const entry of EXPERIMENT_BANK) {
        const score = topicMatchScore(question, entry.title, entry.objective)
        if (score >= 60) {
          const content = [
            `**Objective:** ${entry.objective}`,
            `**Materials:** ${entry.materials.join(', ')}`,
            `**Procedure:**\n${entry.steps.map((s,i) => `${i+1}. ${s}`).join('\n')}`,
            `**Observations:** ${entry.observations.join(' | ')}`,
            `**Conclusion:** ${entry.conclusion}`,
            entry.safety?.length ? `**Safety:** ${entry.safety.join(' | ')}` : '',
          ].filter(Boolean).join('\n')

          sources.push('experiment_bank')
          const retrieved: RetrievedContent = {
            source:'experiment_bank', confidence:'high', title:entry.title, content,
            imageUrl:entry.webp, diagramUrl:entry.diagram,
            subject:entry.subject, slug:`experiments/${entry.slug}`, tokensSaved:estimateTokensSaved(content),
            relatedUrls:[`/experiments/${entry.slug}`],
          }
          return {
            found:true, content:retrieved, needsAI:wantsDeeper, aiMode:wantsDeeper?'extend':'skip',
            confidence:'high', retrievalMs:Date.now()-start,
            tokensEstimated:1100, tokensSaved:retrieved.tokensSaved, sources,
          }
        }
      }
    }
  }

  // ── 4. Chapter/Topic search ───────────────────────────────────
  const classes = classLevel
    ? [{ classLevel, subjects: getAllUnifiedClasses().find(c => c.classLevel === classLevel)?.subjects ?? [] }]
    : getAllUnifiedClasses().slice(0, 4)   // Search recent classes first

  for (const cls of classes) {
    for (const subj of cls.subjects ?? []) {
      if (subject && subj.slug !== subject.toLowerCase()) continue
      for (const chapter of subj.chapters ?? []) {
        const chScore = topicMatchScore(question, chapter.title, chapter.description ?? '')
        if (chScore < 50) continue

        // Check topics within chapter
        for (const topic of chapter.topics ?? []) {
          const tScore = topicMatchScore(question, topic.title, topic.content)
          if (tScore >= 60) {
            const content = [
              `**Topic:** ${topic.title}`,
              topic.content,
              chapter.formulas?.[0] ? `**Formula:** ${chapter.formulas[0].formula}` : '',
            ].filter(Boolean).join('\n')

            const ckey = `ch:${chapter.id}:${topic.slug ?? topic.title.slice(0,20)}`
            chapterCache.set(ckey, { title:topic.title, content }, TTL.CHAPTER)
            sources.push('chapter_topic')

            const retrieved: RetrievedContent = {
              source:'chapter_topic', confidence:tScore>=80?'high':'medium',
              title:`${topic.title} — ${chapter.title}`,
              content, subject:subj.slug, classLevel:cls.classLevel,
              ncertRef:`NCERT Class ${cls.classLevel} ${subj.name} — ${chapter.title}`,
              slug:`learn/${cls.classLevel}/${subj.slug}/${chapter.id}`,
              relatedUrls:[`/class/${cls.classLevel}/${subj.slug}`, `/learn/${cls.classLevel}/${subj.slug}/${chapter.id}`],
              tokensSaved:estimateTokensSaved(content),
            }
            return {
              found:true, content:retrieved, needsAI:wantsDeeper||intent.wantsDeeper||tScore<75, aiMode:tScore>=75&&!wantsDeeper?'skip':'extend',
              confidence:retrieved.confidence, retrievalMs:Date.now()-start,
              tokensEstimated:1500, tokensSaved:retrieved.tokensSaved, sources,
            }
          }
        }
      }
    }
  }

  // ── 5. DB question search ─────────────────────────────────────
  try {
    const { default: prisma } = await import('./prisma')
    const qWords = qNorm.split(' ').filter(w => w.length > 4).slice(0, 4)
    if (qWords.length > 0) {
      const dbQ = await prisma.question.findFirst({
        where: {
          isPublic: true, isApproved: true,
          OR: qWords.map(w => ({ title: { contains: w } })),
          ...(classLevel ? { classLevel } : {}),
        },
        orderBy: { views: 'desc' },
        select: { slug:true, title:true, solution:true, formula:true, ncertRef:true, classLevel:true },
      })
      if (dbQ && dbQ.solution.length > 100) {
        const score = topicMatchScore(question, dbQ.title, dbQ.solution)
        if (score >= 55) {
          sources.push('db_question')
          const retrieved: RetrievedContent = {
            source:'db_question', confidence:'medium', title:dbQ.title, content:dbQ.solution,
            formula:dbQ.formula??undefined, ncertRef:dbQ.ncertRef??undefined, classLevel:dbQ.classLevel??classLevel,
            slug:`q/${dbQ.slug}`, tokensSaved:estimateTokensSaved(dbQ.solution),
            relatedUrls:[`/q/${dbQ.slug}`],
          }
          questionCache.set(cacheKey, retrieved, TTL.QUESTION)
          return {
            found:true, content:retrieved, needsAI:score<75||wantsDeeper, aiMode:score>=75&&!wantsDeeper?'skip':'extend',
            confidence:'medium', retrievalMs:Date.now()-start,
            tokensEstimated:1200, tokensSaved:retrieved.tokensSaved, sources,
          }
        }
      }
    }
  } catch { /* DB optional — silently skip */ }

  // ── 6. No content found — full AI ────────────────────────────
  return {
    found:false, content:null, needsAI:true, aiMode:'full',
    confidence:'none', retrievalMs:Date.now()-start,
    tokensEstimated:1500, tokensSaved:0, sources:[],
  }
}

// ── RETRIEVAL STATS TRACKER (in-memory, resets on restart) ────────
const stats = { attempts:0, found:0, aiSkipped:0, aiExtended:0, aiFull:0, tokensSaved:0 }

export function trackRetrieval(result: RetrievalResult): void {
  stats.attempts++
  if (result.found) stats.found++
  if (result.aiMode === 'skip')   stats.aiSkipped++
  if (result.aiMode === 'extend') stats.aiExtended++
  if (result.aiMode === 'full')   stats.aiFull++
  stats.tokensSaved += result.tokensSaved
}

export function getRetrievalStats() {
  const hitRate = stats.attempts > 0 ? Math.round(stats.found / stats.attempts * 100) : 0
  const aiSaveRate = stats.attempts > 0 ? Math.round(stats.aiSkipped / stats.attempts * 100) : 0
  const estimatedCostSaved = (stats.tokensSaved / 1000) * 0.002  // DeepSeek ~$0.002/1K tokens
  return {
    ...stats, hitRate, aiSaveRate,
    estimatedCostSaved: `$${estimatedCostSaved.toFixed(4)}`,
    avgTokensSaved: stats.attempts > 0 ? Math.round(stats.tokensSaved / stats.attempts) : 0,
  }
}
