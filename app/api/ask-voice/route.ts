// app/api/ask-voice/route.ts — Voice transcript → AI answer

import { NextResponse }   from 'next/server'
import { deepseekChat }   from '@/lib/deepseek'
import { generateSlug }   from '@/lib/slug'
import { generateQuestionMeta } from '@/lib/seo'
import { detectSubject }  from '@/lib/subject-detect'
import { prisma }         from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { transcript, userId, language = 'en' } = await req.json()
    if (!transcript?.trim()) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    const prompt = `You are an expert Indian school teacher. The student asked (via voice): "${transcript}"
Provide a clear, step-by-step answer. Show formulas, diagrams description, and NCERT reference if applicable.
Language: ${language === 'hi' ? 'Hindi' : 'English'}`

    const solution = await deepseekChat(prompt)
    const subject  = detectSubject(transcript)
    const slug     = await generateSlug(transcript)
    const meta     = generateQuestionMeta(transcript, solution, subject)

    const question = await prisma.question.create({
      data: {
        slug,
        title:    transcript.slice(0, 500),
        solution,
        source:   'user',
        userId:   userId ?? undefined,
        language,
        isPublic: true,
        metaTitle: meta.title,
        metaDesc:  meta.description,
        metaKeywords: meta.keywords,
      },
    })

    return NextResponse.json({ solution, slug: question.slug })
  } catch (err) {
    console.error('ask-voice error:', err)
    return NextResponse.json({ error: 'Failed to process voice question' }, { status: 500 })
  }
}
