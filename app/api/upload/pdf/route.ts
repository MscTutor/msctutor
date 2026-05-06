// app/api/upload/pdf/route.ts — PDF upload → extract → AI pages

import { NextResponse }         from 'next/server'
import { storjUpload }          from '@/lib/storj'
import { extractPDFText, splitIntoChapters, extractChapterTitle } from '@/lib/pdf-extract'
import { deepseekChat }         from '@/lib/deepseek'
import { generateSlug }         from '@/lib/slug'
import { prisma }               from '@/lib/prisma'

export const runtime    = 'nodejs'
export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const formData   = await req.formData()
    const file       = formData.get('pdf') as File | null
    const subject    = formData.get('subject') as string | null
    const classLevel = formData.get('classLevel') as string | null
    const board      = formData.get('board') as string | null
    const uploadedBy = formData.get('uploadedBy') as string | null
    const role       = formData.get('role') as string | null
    const schoolId   = formData.get('schoolId') as string | null

    if (!file) return NextResponse.json({ error: 'No PDF provided' }, { status: 400 })

    const buffer   = Buffer.from(await file.arrayBuffer())
    const key      = `pdfs/${schoolId ?? 'admin'}/${Date.now()}-${file.name}`
    const fileUrl  = await storjUpload(key, buffer, 'application/pdf')

    const { text, pages } = await extractPDFText(buffer)
    const chapters        = splitIntoChapters(text)

    const uploadRecord = await prisma.uploadedPDF.create({
      data: {
        fileName:          file.name,
        fileUrl,
        subject:           subject ?? undefined,
        classLevel:        classLevel ?? undefined,
        board:             board ?? undefined,
        uploadedBy:        uploadedBy ?? 'admin',
        uploadedByRole:    role ?? 'admin',
        schoolId:          schoolId ? parseInt(schoolId) : undefined,
        pagesExtracted:    pages,
        processingStatus: 'processing',
      },
    })

    const createdPages: string[] = []
    let subjectRecord = subject ? await prisma.subject.findFirst({ where: { slug: subject } }) : null
    if (!subjectRecord) {
      subjectRecord = await prisma.subject.findFirst({ where: { slug: 'general' } })
      if (!subjectRecord) {
        subjectRecord = await prisma.subject.create({
          data: {
            name: 'General',
            slug: 'general',
            branch: 'general',
            isActive: true,
          },
        })
      }
    }

    for (const chapterText of chapters.slice(0, 20)) {
      const title = extractChapterTitle(chapterText)
      const slug  = await generateSlug(`${title}-${classLevel ?? ''}-${subject ?? ''}`)

      const existing = await prisma.chapter.findUnique({ where: { slug } })
      if (existing) { createdPages.push(`/subject/${subject}/chapter/${slug}`); continue }

      const aiPrompt = `Structure this educational content about "${title}" into JSON:
{"chapterTitle":"...","description":"...","concepts":[{"title":"...","content":"..."}],"formulas":[{"name":"...","latex":"...","description":"..."}],"metaTitle":"...","metaDescription":"..."}
Content: ${chapterText.slice(0, 2000)}
Return ONLY valid JSON.`

      let enhanced: Record<string, unknown> = {}
      try {
        const raw  = await deepseekChat(aiPrompt)
        enhanced   = JSON.parse(raw.replace(/```json|```/g, '').trim())
      } catch { enhanced = { chapterTitle: title, description: chapterText.slice(0, 200) } }

      const chapter = await prisma.chapter.create({
        data: {
          title:       (enhanced.chapterTitle as string) ?? title,
          slug,
          description: (enhanced.description as string) ?? undefined,
          subjectId:   subjectRecord.id,
          classLevel:  classLevel ?? undefined,
          board:       board ?? undefined,
          isPublic:    true,
        },
      })

      createdPages.push(`/subject/${subject ?? 'general'}/chapter/${chapter.slug}`)
    }

    await prisma.uploadedPDF.update({
      where: { id: uploadRecord.id },
      data:  { pagesCreated: createdPages.length, processingStatus: 'done' },
    })

    if (schoolId) {
      await prisma.storageUsage.create({
        data: { schoolId: parseInt(schoolId), fileType: 'pdf', fileName: file.name, fileUrl, sizeBytes: buffer.length },
      })
    }

    return NextResponse.json({ success: true, pagesCreated: createdPages.length, pages: createdPages })
  } catch (err) {
    console.error('upload/pdf error:', err)
    return NextResponse.json({ error: 'PDF processing failed' }, { status: 500 })
  }
}
