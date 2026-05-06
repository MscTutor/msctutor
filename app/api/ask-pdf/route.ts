// app/api/ask-pdf/route.ts — PDF upload → extract text → AI answer

import { NextResponse }        from 'next/server'
import { extractPDFText }      from '@/lib/pdf-extract'
import { deepseekChat }        from '@/lib/deepseek'
import { generateSlug }        from '@/lib/slug'
import { generateQuestionMeta } from '@/lib/seo'
import { detectSubject }       from '@/lib/subject-detect'
import { prisma }              from '@/lib/prisma'

export const runtime    = 'nodejs'
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file     = formData.get('pdf') as File | null
    const question = formData.get('question') as string | null
    const userId   = formData.get('userId') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No PDF provided' }, { status: 400 })
    }

    const buffer  = Buffer.from(await file.arrayBuffer())
    const { text, pages } = await extractPDFText(buffer)

    if (!text.trim()) {
      return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 })
    }

    const truncated = text.slice(0, 4000)
    const userQ     = question ?? 'Explain the main concepts from this document'

    const prompt = `A student uploaded a PDF (${pages} pages). Here is the extracted text:

---
${truncated}
---

Student's question: "${userQ}"

Please provide a comprehensive, structured answer with:
1. Key concepts explained step-by-step
2. Important formulas (if any)
3. Summary of main topics
4. Practice questions based on this content`

    const solution = await deepseekChat(prompt)
    const subject  = detectSubject(text.slice(0, 500))
    const title    = question ?? file.name.replace('.pdf', '')
    const slug     = await generateSlug(title)
    const meta     = generateQuestionMeta(title, solution, subject)

    const q = await prisma.question.create({
      data: {
        slug,
        title:    title.slice(0, 500),
        solution,
        source:   'user',
        userId:   userId ?? undefined,
        isPublic: true,
        metaTitle: meta.title,
        metaDesc:  meta.description,
        metaKeywords: meta.keywords,
      },
    })

    return NextResponse.json({ solution, slug: q.slug, pages })
  } catch (err) {
    console.error('ask-pdf error:', err)
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 })
  }
}
