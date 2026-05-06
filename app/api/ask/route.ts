import { NextRequest, NextResponse } from 'next/server'
import { solveQuestion, detectSubject } from '@/lib/deepseek'
import { generateQuestionSlug } from '@/lib/slug'

export async function POST(req: NextRequest) {
  try {
    const { question, type = 'text', subject, classLevel, board, language = 'en' } = await req.json()

    if (!question?.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Demo mode — no API key needed for basic testing
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({
        subject: subject ?? 'Mathematics',
        chapter: 'Sample Chapter',
        answer:  'Add DEEPSEEK_API_KEY in environment variables to get real AI answers.',
        steps: [
          { step: 1, title: 'Given', content: 'Demo mode: Add DEEPSEEK_API_KEY to see real AI solution.' },
          { step: 2, title: 'Formula', content: 'The relevant formula would appear here.' },
          { step: 3, title: 'Solution', content: 'Complete step-by-step working would be shown.' },
          { step: 4, title: 'Answer', content: 'Final answer with unit.' },
        ],
        formula: 'F = ma', formulaLatex: 'F = ma',
        ncertReference: 'NCERT Class 9, Chapter 9',
        relatedTopics: ['Motion', 'Momentum', 'Inertia'],
        slug: generateQuestionSlug(question),
        difficulty: 'medium', classLevel: classLevel ?? '9',
      })
    }

    const detectedSubject = subject || await detectSubject(question)
    const solution = await solveQuestion({ question, subject: detectedSubject, classLevel: classLevel ?? '', board: board ?? 'CBSE', language })
    const slug = generateQuestionSlug(question)

    // Try to save to DB — skip if DB not configured
    try {
      const { default: prisma } = await import('@/lib/prisma')
      await prisma.question.upsert({
        where:  { slug },
        update: { views: { increment: 1 } },
        create: {
          slug, title: question,
          solution:     solution.answer ?? '',
          steps:        JSON.stringify(solution.steps ?? []),
          formula:      solution.formula,
          formulaLatex: solution.formulaLatex,
          ncertRef:     solution.ncertReference,
          difficulty:   solution.difficulty ?? 'medium',
          classLevel:   solution.classLevel ?? classLevel,
          board:        board ?? 'CBSE',
          language,
          source:       type === 'text' ? 'user' : type,
          isPublic: true, isApproved: true,
          metaTitle:    solution.metaTitle,
          metaDesc:     solution.metaDescription,
          metaKeywords: solution.metaKeywords,
        },
      })
    } catch { /* DB not configured — skip */ }

    return NextResponse.json({ ...solution, slug })
  } catch (err: any) {
    console.error('Ask API error:', err)
    return NextResponse.json({ error: err.message ?? 'AI error. Please try again.' }, { status: 500 })
  }
}
