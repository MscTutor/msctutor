// app/api/ask/route.ts — Retrieval-first + AI orchestration

import { NextRequest, NextResponse } from 'next/server'
import { orchestrateAnswer }   from '@/lib/ai-orchestrator'
import { getRetrievalStats }   from '@/lib/retrieval-engine'
import { questionCache, TTL, cacheHeaders } from '@/lib/cache'
import { checkRateLimit }       from '@/lib/security/rate-limiter'
import { sanitizeText, detectSuspiciousInput } from '@/lib/security/input-sanitizer'
import { audit }                from '@/lib/security/audit-log'
import { generateQuestionSlug } from '@/lib/slug'
import { logger }               from '@/lib/logger'

export const runtime    = 'nodejs'
export const dynamic    = 'force-dynamic'

function ip(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
}

export async function POST(req: NextRequest) {
  const clientIP = ip(req)

  // Rate limit: 30/min
  const rl = checkRateLimit(`ask:${clientIP}`, 'standard')
  if (!rl.allowed) {
    await audit.rateLimitHit(clientIP, '/api/ask')
    return NextResponse.json({ error: 'Too many requests.', retryAfter: rl.retryAfter }, { status: 429 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

    const { question, subject, classLevel, board = 'CBSE', language = 'en', userId } = body

    // Validate
    if (!question?.trim()) return NextResponse.json({ error: 'Question required' }, { status: 400 })
    if (question.length > 5000) return NextResponse.json({ error: 'Question too long (max 5000 chars)' }, { status: 400 })

    // Input safety
    const safety = detectSuspiciousInput({ question })
    if (!safety.suspicious === false && safety.threats.includes('PROMPT_INJECTION')) {
      await audit.suspicious(clientIP, '/api/ask', 'Prompt injection attempt')
      return NextResponse.json({ error: 'Invalid question content.' }, { status: 400 })
    }

    const cleanQ     = sanitizeText(question, { maxLength: 5000, checkPrompt: true }).clean
    const validLangs = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr']
    const lang       = validLangs.includes(language) ? language : 'en'
    const slug       = generateQuestionSlug(cleanQ)
    const wantsDeeper = !!(body.wantsDeeper || body.deeper)

    // ── CACHE CHECK ──────────────────────────────────────────────
    if (!userId && !wantsDeeper) {
      const cached = questionCache.get(`q:${slug}:${lang}`)
      if (cached) {
        return NextResponse.json({ ...(cached as object), cached: true }, {
          headers: cacheHeaders(TTL.QUESTION, { staleWhile: 600 }),
        })
      }
    }

    // ── RETRIEVAL-FIRST ORCHESTRATION ────────────────────────────
    const result = await orchestrateAnswer({
      question:    cleanQ,
      subject,
      classLevel,
      board,
      language:    lang,
      userId,
      wantsDeeper,
      saveToSEO:   lang === 'en' && !userId,
    })

    const response = { ...result, slug, language: lang }

    // Cache public successful retrieval/AI answers
    if (result.success && !result.fallback) {
      questionCache.set(`q:${slug}:${lang}`, response, TTL.QUESTION)

      // Non-blocking DB save already handled by orchestrator for SEO
    }

    return NextResponse.json(response, {
      headers: result.fallback ? {} : cacheHeaders(300),
    })
  } catch (e: unknown) {
    logger.apiError('/api/ask', e)
    return NextResponse.json({
      error:    'AI service error.',
      solution: 'Service temporarily unavailable. Please try again.',
      fallback: true,
    }, { status: 500 })
  }
}

// ── GET: Retrieve cached question ────────────────────────────────
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const lang = req.nextUrl.searchParams.get('lang') ?? 'en'
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  // Check in-memory cache first
  const cached = questionCache.get(`q:${slug}:${lang}`)
  if (cached) {
    return NextResponse.json(cached, { headers: cacheHeaders(TTL.QUESTION, { staleWhile: 600 }) })
  }

  // Try DB
  try {
    const { default: prisma } = await import('@/lib/prisma')
    const q = await prisma.question.findUnique({ where: { slug } })
    if (!q) return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    const result = { solution: q.solution, answer: q.solution, slug: q.slug, title: q.title }
    questionCache.set(`q:${slug}:${lang}`, result, TTL.QUESTION)
    return NextResponse.json(result, { headers: cacheHeaders(TTL.QUESTION, { staleWhile: 600 }) })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
