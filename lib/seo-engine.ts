// lib/seo-engine.ts — Auto SEO Page Generation
// Extends existing question save logic — NO new routes, augments ask API

import { generateQuestionSlug } from './slug'

// ── CLEAN QUESTION FOR SEO ────────────────────────────────────────
export function cleanForSEO(title: string): string {
  return title
    .replace(/[^\w\s-'.,?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

// ── GENERATE SEO METADATA FOR A QUESTION ─────────────────────────
export function generateQuestionMeta(params: {
  title:      string
  solution:   string
  subject?:   string
  classLevel?: string
  formula?:   string
  ncertRef?:  string
  language?:  string
}): {
  metaTitle:   string
  metaDesc:    string
  keywords:    string
  slug:        string
  canonical:   string
} {
  const { title, solution, subject, classLevel, formula, ncertRef, language = 'en' } = params
  const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  const slug = generateQuestionSlug(title)

  // Title templates per language
  const titleTemplates: Record<string, string> = {
    en: `${title.slice(0, 55)} — NCERT Solution${classLevel ? ` Class ${classLevel}` : ''} | MscTutor`,
    hi: `${title.slice(0, 55)} — NCERT हल${classLevel ? ` कक्षा ${classLevel}` : ''} | MscTutor`,
  }
  const metaTitle = (titleTemplates[language] ?? titleTemplates.en).slice(0, 70)

  // Description
  const solutionSnippet = solution.replace(/\n/g, ' ').slice(0, 120)
  const descTemplates: Record<string, string> = {
    en: `Step-by-step AI solution: ${solutionSnippet}...${ncertRef ? ` ${ncertRef}.` : ''} Free NCERT answer.`,
    hi: `Step-by-step हल: ${solutionSnippet}...${ncertRef ? ` ${ncertRef}.` : ''} Free NCERT।`,
  }
  const metaDesc = (descTemplates[language] ?? descTemplates.en).slice(0, 160)

  // Keywords
  const keywords = [
    title.split(' ').slice(0, 5).join(' '),
    subject ?? '',
    classLevel ? `class ${classLevel}` : '',
    ncertRef ?? '',
    formula ?? '',
    'NCERT solution', 'free answer', 'AI tutor',
  ].filter(Boolean).join(', ')

  return { metaTitle, metaDesc, keywords, slug, canonical: `${BASE}/q/${slug}` }
}

// ── DETECT QUESTION LANGUAGE ──────────────────────────────────────
export function detectLanguage(text: string): string {
  // Hindi Unicode range: 0900-097F
  const hindiChars = (text.match(/[\u0900-\u097F]/g) ?? []).length
  const totalChars = text.replace(/\s/g, '').length
  if (totalChars === 0) return 'en'
  if (hindiChars / totalChars > 0.3) return 'hi'

  // Bengali: 0980-09FF
  const bengaliChars = (text.match(/[\u0980-\u09FF]/g) ?? []).length
  if (bengaliChars / totalChars > 0.3) return 'bn'

  // Tamil: 0B80-0BFF
  const tamilChars = (text.match(/[\u0B80-\u0BFF]/g) ?? []).length
  if (tamilChars / totalChars > 0.3) return 'ta'

  // Telugu: 0C00-0C7F
  const teluguChars = (text.match(/[\u0C00-\u0C7F]/g) ?? []).length
  if (teluguChars / totalChars > 0.3) return 'te'

  // Arabic: 0600-06FF
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) ?? []).length
  if (arabicChars / totalChars > 0.3) return 'ar'

  return 'en'
}

// ── EXTRACT NCERT REFERENCES ──────────────────────────────────────
export function extractNCERTRef(text: string): string | null {
  const patterns = [
    /NCERT\s+Class\s+(\d+)[,\s]+(\w+)[,\s]+Chapter\s+(\d+)/i,
    /Class\s+(\d+)\s+(\w+)\s+Chapter\s+(\d+)/i,
    /Ch\.\s*(\d+)/i,
    /Exercise\s+(\d+\.?\d*)/i,
  ]
  for (const p of patterns) {
    const m = text.match(p)
    if (m) return m[0]
  }
  return null
}

// ── GENERATE SITEMAP ENTRY ─────────────────────────────────────────
export function generateSitemapEntry(slug: string, language = 'en') {
  const BASE    = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  const locales = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr']
  const langs: Record<string, string> = { 'x-default': `${BASE}/q/${slug}` }
  for (const l of locales) {
    langs[l] = l === 'en' ? `${BASE}/q/${slug}` : `${BASE}/${l}/q/${slug}`
  }
  return {
    url:          `${BASE}/q/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority:     0.7,
    alternates:   { languages: langs },
  }
}

// ── AUTO-SAVE QUESTION TO DB (called after AI answer) ─────────────
export async function autoSaveQuestion(params: {
  question:   string
  solution:   string
  subject?:   string
  classLevel?: string
  formula?:   string
  ncertRef?:  string
  language?:  string
  userId?:    string
  isPublic?:  boolean
}): Promise<{ slug: string; isNew: boolean } | null> {
  const { question, solution, language = 'en', isPublic = true } = params
  if (!question.trim() || !solution.trim()) return null
  if (solution.length < 20) return null  // Too short to be useful

  const detectedLang = language || detectLanguage(question)
  const meta         = generateQuestionMeta({ ...params, title: params.question, language: detectedLang })

  try {
    const { prisma } = await import('./prisma')

    // Check if already exists (prevent duplicates)
    const existing = await prisma.question.findFirst({
      where: { slug: meta.slug },
      select: { slug: true },
    })
    if (existing) return { slug: meta.slug, isNew: false }

    await prisma.question.create({
      data: {
        slug:       meta.slug,
        title:      question.slice(0, 500),
        solution:   solution.slice(0, 8000),
        formula:    params.formula?.slice(0, 200),
        ncertRef:   params.ncertRef?.slice(0, 100) ?? extractNCERTRef(solution),
        classLevel: params.classLevel,
        language:   detectedLang,
        isPublic:   isPublic && detectedLang === 'en',
        isApproved: true,
        source:     'user',
        metaTitle:  meta.metaTitle,
        metaDesc:   meta.metaDesc,
        tags:       meta.keywords.slice(0, 500),
      },
    })
    return { slug: meta.slug, isNew: true }
  } catch {
    return null
  }
}
