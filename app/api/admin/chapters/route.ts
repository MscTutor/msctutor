// app/api/admin/chapters/route.ts — Full CRUD for chapters

import { NextResponse }   from 'next/server'
import { prisma }         from '@/lib/prisma'
import { getAuthUser, isAdmin } from '@/lib/auth'
import { deepseekChat }   from '@/lib/deepseek'
import { generateSlug }   from '@/lib/slug'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const subjectId  = searchParams.get('subjectId')
    const classLevel = searchParams.get('classLevel')
    const search     = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (subjectId)  where.subjectId  = parseInt(subjectId)
    if (classLevel) where.classLevel = classLevel
    if (search)     where.title      = { contains: search }

    const chapters = await prisma.chapter.findMany({
      where,
      include: {
        subject:  { select: { name: true, slug: true } },
        _count:   { select: { questions: true } },
      },
      orderBy: [{ subjectId: 'asc' }, { order: 'asc' }],
      take: 100,
    })
    return NextResponse.json(chapters)
  } catch (err) {
    console.error('admin/chapters GET:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const {
      title, titleHindi, subjectId, classLevel, board, order,
      description, concepts, formulas, metaTitle, metaDesc,
      useAI, topic, subject: subjectName, medium,
    } = body

    let finalData = {
      title,
      titleHindi,
      subjectId: subjectId ? parseInt(subjectId) : undefined,
      classLevel,
      board,
      order: order ?? 0,
      description,
      concepts,
      formulas,
      metaTitle,
      metaDesc,
      isPublic: true,
      isApproved: true,
    }

    // AI-generate content if requested
    if (useAI && topic) {
      const prompt = `Generate complete educational content for Class ${classLevel} ${subjectName ?? ''} chapter "${topic}" in ${medium ?? 'English'}.
Return ONLY valid JSON (no markdown):
{
  "chapterTitle": "...",
  "description": "Brief 1-2 sentence description",
  "concepts": [{"title":"...","content":"..."}],
  "formulas": [{"name":"...","latex":"...","description":"..."}],
  "keyTerms": ["..."],
  "metaTitle": "...",
  "metaDesc": "..."
}`
      try {
        const raw      = await deepseekChat(prompt)
        const clean    = raw.replace(/```json|```/g, '').trim()
        const generated = JSON.parse(clean)
        finalData = {
          ...finalData,
          title:       generated.chapterTitle ?? topic,
          description: generated.description,
          concepts:    JSON.stringify(generated.concepts ?? []),
          formulas:    undefined,
          metaTitle:   generated.metaTitle,
          metaDesc:    generated.metaDesc,
        }
      } catch { /* use manual data */ }
    }

    const slug = await generateSlug(finalData.title)

    const chapter = await prisma.chapter.create({
      data: { ...finalData, slug } as any,
    })
    return NextResponse.json(chapter, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Create failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id, ...data } = await req.json()
    const chapter = await prisma.chapter.update({ where: { id: parseInt(id) }, data })
    return NextResponse.json(chapter)
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await req.json()
    await prisma.chapter.update({ where: { id: parseInt(id) }, data: { isPublic: false } as any })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
