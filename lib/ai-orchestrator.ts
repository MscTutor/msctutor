// lib/ai-orchestrator.ts
// ══════════════════════════════════════════════════════════════════
// AI ORCHESTRATION LAYER
// Controls the pipeline: Retrieval → Merge → AI (if needed)
// Prevents unnecessary token usage by using internal content first
// Supports multilingual, adaptive pedagogy, and SEO page generation
// ══════════════════════════════════════════════════════════════════

import { retrieveEducationalContent, trackRetrieval, type RetrievalResult } from './retrieval-engine'
import { askAITutor }       from './ai-tutor'
import { autoSaveQuestion } from './seo-engine'
import { logger }           from './logger'

// ── ORCHESTRATION TYPES ──────────────────────────────────────────
export interface OrchestratedResponse {
  // Core answer
  answer:          string
  solution:        string           // alias for compatibility

  // Source attribution
  sourceType:      'retrieval' | 'retrieval+ai' | 'ai'
  retrievalSource?: string
  retrievalConf?:  string

  // Educational metadata (from retrieval or AI)
  formula?:        string
  latex?:          string
  variables?:      { sym: string; meaning: string; unit: string }[]
  example?:        string
  derivation?:     string
  note?:           string
  ncertRef?:       string
  imageUrl?:       string
  diagramUrl?:     string
  relatedUrls?:    string[]

  // Performance
  tokensSaved:     number
  aiCalled:        boolean
  aiMode:          'skip' | 'extend' | 'full'
  retrievalMs?:    number

  // Compatibility with existing ask route response format
  steps?:          { step: number; title: string; content: string }[]
  followupQuestions?: string[]
  relatedTopics?:  string[]
  difficulty?:     string
  success:         boolean
  fallback?:       boolean
  slug?:           string
  language:        string
}

// ── EXTEND PROMPT ─────────────────────────────────────────────────
// Called when retrieval found content but user wants deeper explanation
function buildExtendPrompt(
  question:         string,
  retrievedContent: string,
  language:         string,
  intent:           { wantsExample: boolean; wantsDerivation: boolean }
): string {
  const langInstructions: Record<string, string> = {
    en: 'Respond in English.',
    hi: 'हिंदी में जवाब दो।',
    bn: 'বাংলায় উত্তর দাও।',
    ta: 'தமிழில் பதில் அளிக்கவும்।',
    te: 'తెలుగులో సమాధానం ఇవ్వండి।',
    gu: 'ગુજરાતીમાં જવાબ આપો।',
    mr: 'मराठीत उत्तर द्या।',
    ur: 'اردو میں جواب دیں۔',
    ar: 'أجب باللغة العربية.',
    fr: 'Répondez en français.',
  }
  const langInstr = langInstructions[language] ?? langInstructions.en

  const focusOn = [
    intent.wantsExample    ? 'provide 2 additional worked numerical examples' : '',
    intent.wantsDerivation ? 'show the full mathematical derivation step by step' : '',
    !intent.wantsExample && !intent.wantsDerivation ? 'explain the concept more deeply with real-life applications' : '',
  ].filter(Boolean).join(', and ')

  return `${langInstr}

The student asked: "${question}"

Here is the verified educational content we already have:
---
${retrievedContent.slice(0, 1500)}
---

TASK: ${focusOn}. Do NOT repeat what is already explained above. Build on it with additional depth, a practical real-life Indian example, and common mistakes to avoid.

Keep response educational, concise (under 400 words), and student-friendly for Class 9-12 level.`
}

// ── MERGE RETRIEVAL + AI ──────────────────────────────────────────
function mergeRetrievalWithAI(
  retrieved: RetrievalResult,
  aiAnswer:  string
): string {
  if (!retrieved.content) return aiAnswer

  const r = retrieved.content
  const sections: string[] = []

  // Start with retrieved verified content
  if (r.formula) {
    sections.push(`**Formula:** ${r.formula}`)
    if (r.latex && r.latex !== r.formula) sections.push(`*LaTeX: ${r.latex}*`)
  }

  // Variables table if available
  if (r.variables?.length) {
    sections.push('**Variables:**')
    r.variables.forEach(v => sections.push(`• **${v.sym}** = ${v.meaning} (${v.unit || '—'})`))
  }

  // Verified example
  if (r.example && !aiAnswer.toLowerCase().includes('example')) {
    sections.push(`\n**Verified Example:**\n${r.example}`)
  }

  // NCERT reference
  if (r.ncertRef) sections.push(`\n*Source: ${r.ncertRef}*`)

  // AI deeper explanation
  if (aiAnswer.trim().length > 50) {
    sections.push(`\n**Deeper Explanation:**\n${aiAnswer.trim()}`)
  }

  return sections.join('\n')
}

// ── BUILD STEPS FROM CONTENT ──────────────────────────────────────
function buildStepsFromContent(content: string): { step: number; title: string; content: string }[] {
  const lines = content.split('\n').filter(l => l.trim().length > 10)
  const steps: { step: number; title: string; content: string }[] = []
  let stepNum = 1

  for (const line of lines.slice(0, 8)) {
    const stripped = line.replace(/^\*\*|^\*|^##+\s*/g, '').trim()
    if (stripped.length < 10) continue
    const [title, ...rest] = stripped.split(':')
    steps.push({ step: stepNum++, title: (title || stripped).slice(0, 60), content: (rest.join(':') || stripped).trim() })
  }

  return steps.length > 0 ? steps : [{ step: 1, title: 'Solution', content: content.slice(0, 300) }]
}

// ── MAIN ORCHESTRATE FUNCTION ─────────────────────────────────────
export async function orchestrateAnswer(params: {
  question:    string
  subject?:    string
  classLevel?: string
  board?:      string
  language?:   string
  userId?:     string
  wantsDeeper?: boolean
  imageBase64?: string
  pdfText?:    string
  voiceTranscript?: string
  profile?:    Record<string, unknown>  // LearnerProfile (optional, for adaptive context)
  saveToSEO?:  boolean    // Whether to auto-save successful answers as SEO pages
}): Promise<OrchestratedResponse> {
  const {
    question, subject, classLevel, board = 'CBSE',
    language = 'en', userId, wantsDeeper = false,
    imageBase64, pdfText, voiceTranscript, saveToSEO = true,
  } = params

  const effectiveQuestion = voiceTranscript ?? question
  const isMultiModal = !!(imageBase64 || pdfText)
  const intentWantsDeeper = wantsDeeper || /more detail|deeper|विस्तार|elaborate/i.test(effectiveQuestion)

  // ── STEP 1: Retrieval (skip for image/PDF — no text match possible) ──
  let retrieval: RetrievalResult = {
    found:false, content:null, needsAI:true, aiMode:'full',
    confidence:'none', tokensEstimated:1500, tokensSaved:0, sources:[],
  }

  if (!isMultiModal) {
    retrieval = await retrieveEducationalContent({
      question: effectiveQuestion, subject, classLevel, language, userId,
      wantsDeeper: intentWantsDeeper,
    })
    trackRetrieval(retrieval)
  }

  // ── STEP 2: Return retrieval-only if confidence is high ──────────
  if (retrieval.found && retrieval.aiMode === 'skip' && retrieval.content) {
    const r = retrieval.content
    logger.info(`Retrieval hit (${r.source}, ${retrieval.confidence}), AI skipped. Tokens saved: ~${retrieval.tokensSaved}`)

    return {
      answer:          r.content,
      solution:        r.content,
      sourceType:      'retrieval',
      retrievalSource: r.source,
      retrievalConf:   retrieval.confidence,
      formula:         r.formula,
      latex:           r.latex,
      variables:       r.variables,
      example:         r.example,
      derivation:      r.derivation,
      note:            r.note,
      ncertRef:        r.ncertRef,
      imageUrl:        r.imageUrl,
      diagramUrl:      r.diagramUrl,
      relatedUrls:     r.relatedUrls,
      tokensSaved:     retrieval.tokensSaved,
      aiCalled:        false,
      aiMode:          'skip',
      retrievalMs:     retrieval.retrievalMs,
      steps:           buildStepsFromContent(r.content),
      followupQuestions: [`How does ${r.title} apply in real life?`, `Give me practice problems on ${r.title}`, `Explain ${r.title} with a different example`],
      relatedTopics:   r.relatedUrls?.map(u => u.split('/').pop() ?? '') ?? [],
      difficulty:      'medium',
      success:         true,
      language,
      slug:            r.slug,
    }
  }

  // ── STEP 3: Call AI (full or extend mode) ────────────────────────
  let aiPrompt = effectiveQuestion
  let finalAnswer = ''

  if (retrieval.found && retrieval.aiMode === 'extend' && retrieval.content) {
    // Extend: feed retrieved content to AI for deeper explanation
    const intent = {
      wantsExample:    /example|practice|उदाहरण/i.test(effectiveQuestion),
      wantsDerivation: /deriv|proof|prove|साबित/i.test(effectiveQuestion),
    }
    aiPrompt = buildExtendPrompt(effectiveQuestion, retrieval.content.content, language, intent)
  }

  try {
    const aiResult = await askAITutor({
      type:       imageBase64 ? 'image' : pdfText ? 'pdf' : 'text',
      question:   aiPrompt,
      base64:     imageBase64,
      mimeType:   'image/jpeg',
      pdfText,
      subject,
      classLevel,
      board,
      language,
    })

    // Merge retrieval content with AI answer
    finalAnswer = retrieval.found && retrieval.content
      ? mergeRetrievalWithAI(retrieval, aiResult.answer)
      : aiResult.answer

    // ── STEP 4: Auto-save as SEO page ──────────────────────────
    if (saveToSEO && aiResult.success && !aiResult.fallback && !isMultiModal && language === 'en') {
      setImmediate(async () => {
        try {
          await autoSaveQuestion({
            question:   effectiveQuestion,
            solution:   finalAnswer,
            subject, classLevel,
            formula:    aiResult.formula ?? retrieval.content?.formula,
            ncertRef:   aiResult.ncertRef ?? retrieval.content?.ncertRef,
            language,   isPublic: true,
          })
        } catch { /* Non-critical */ }
      })
    }

    const tokensSaved = retrieval.tokensSaved +
      (retrieval.found && retrieval.aiMode === 'extend' ? Math.round(retrieval.tokensSaved * 0.4) : 0)

    return {
      answer:          finalAnswer,
      solution:        finalAnswer,
      sourceType:      retrieval.found ? 'retrieval+ai' : 'ai',
      retrievalSource: retrieval.content?.source,
      retrievalConf:   retrieval.confidence,
      formula:         aiResult.formula ?? retrieval.content?.formula,
      latex:           retrieval.content?.latex,
      variables:       retrieval.content?.variables,
      example:         retrieval.content?.example,
      derivation:      retrieval.content?.derivation,
      note:            retrieval.content?.note,
      ncertRef:        aiResult.ncertRef ?? retrieval.content?.ncertRef,
      imageUrl:        retrieval.content?.imageUrl,
      diagramUrl:      retrieval.content?.diagramUrl,
      relatedUrls:     retrieval.content?.relatedUrls,
      tokensSaved,
      aiCalled:        true,
      aiMode:          retrieval.found ? 'extend' : 'full',
      retrievalMs:     retrieval.retrievalMs,
      steps:           aiResult.steps?.length ? aiResult.steps : buildStepsFromContent(finalAnswer),
      followupQuestions: aiResult.followupQuestions,
      relatedTopics:   aiResult.relatedTopics,
      difficulty:      aiResult.difficulty,
      success:         aiResult.success,
      fallback:        aiResult.fallback,
      language,
    }
  } catch (e) {
    logger.apiError('orchestrateAnswer', e)

    // Fallback: return retrieval content even if AI failed
    if (retrieval.found && retrieval.content) {
      return {
        answer:          retrieval.content.content,
        solution:        retrieval.content.content,
        sourceType:      'retrieval',
        retrievalSource: retrieval.content.source,
        retrievalConf:   retrieval.confidence,
        formula:         retrieval.content.formula,
        ncertRef:        retrieval.content.ncertRef,
        tokensSaved:     retrieval.tokensSaved,
        aiCalled:        false,
        aiMode:          'skip',
        steps:           buildStepsFromContent(retrieval.content.content),
        followupQuestions: ['Ask a follow-up question'],
        difficulty:      'medium',
        success:         true,
        fallback:        true,
        language,
      }
    }

    return {
      answer:      'Service temporarily unavailable. Please try again.',
      solution:    'Service temporarily unavailable.',
      sourceType:  'ai',
      tokensSaved: 0, aiCalled:true, aiMode:'full',
      success:false, fallback:true, language,
    }
  }
}
