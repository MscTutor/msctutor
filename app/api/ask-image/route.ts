// app/api/ask-image/route.ts — Image question → DeepSeek Vision → answer

import { NextResponse }      from 'next/server'
import { deepseekVision }    from '@/lib/deepseek-vision'
import { generateSlug }      from '@/lib/slug'
import { generateQuestionMeta } from '@/lib/seo'
import { detectSubject, detectBranch } from '@/lib/subject-detect'
import { prisma }            from '@/lib/prisma'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const formData   = await req.formData()
    const file       = formData.get('image') as File | null
    const prompt     = formData.get('prompt') as string | null
    const userId     = formData.get('userId') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const buffer     = Buffer.from(await file.arrayBuffer())
    const base64     = buffer.toString('base64')
    const mimeType   = file.type || 'image/jpeg'

    const solution   = await deepseekVision(base64, mimeType, prompt ?? undefined)

    const questionText = prompt ?? 'Question from uploaded image'
    const subject      = detectSubject(questionText + ' ' + solution)
    void detectBranch(subject)
    const slug         = await generateSlug(questionText)
    const meta         = generateQuestionMeta(questionText, solution, subject)

    const question = await prisma.question.create({
      data: {
        slug,
        title:      questionText,
        solution,
        source:     'user',
        userId:     userId ?? undefined,
        isPublic:   true,
        language:   'en',
        metaTitle:  meta.title,
        metaDesc:   meta.description,
        metaKeywords: meta.keywords,
      },
    })

    return NextResponse.json({ solution, slug: question.slug, questionId: question.id })
  } catch (err) {
    console.error('ask-image error:', err)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
