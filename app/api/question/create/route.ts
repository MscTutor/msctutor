// app/api/question/create/route.ts — Create SEO question page in DB

import { NextResponse }         from 'next/server'
import { prisma }               from '@/lib/prisma'
import { generateSlug }         from '@/lib/slug'
import { generateQuestionMeta } from '@/lib/seo'
import { detectSubject }        from '@/lib/subject-detect'

export async function POST(req: Request) {
  try {
    const { title, solution, userId, subject: subjectHint, classLevel, board } = await req.json()

    if (!title || !solution) {
      return NextResponse.json({ error: 'title and solution required' }, { status: 400 })
    }

    const slug     = await generateSlug(title)
    const subject  = subjectHint ?? detectSubject(title)
    const meta     = generateQuestionMeta(title, solution, subject)

    const existing = await prisma.question.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ slug: existing.slug, id: existing.id, created: false })
    }

    const subjectRecord = subject !== 'general'
      ? await prisma.subject.findFirst({ where: { slug: subject } })
      : null

    const question = await prisma.question.create({
      data: {
        slug,
        title:    title.slice(0, 500),
        solution,
        source:   userId ? 'user' : 'ai',
        userId:   userId ?? undefined,
        isPublic: true,
        subjectId: subjectRecord?.id,
        classLevel: classLevel ?? undefined,
        board:      board ?? undefined,
        metaTitle:  meta.title,
        metaDesc:   meta.description,
        metaKeywords: meta.keywords,
        schemaJson: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'QAPage',
          mainEntity: {
            '@type': 'Question',
            name: title,
            acceptedAnswer: { '@type': 'Answer', text: solution.slice(0, 500) },
          },
        }),
      },
    })

    return NextResponse.json({ slug: question.slug, id: question.id, created: true })
  } catch (err) {
    console.error('question/create error:', err)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
