// app/api/search/route.ts — Global search across questions, chapters, subjects

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q     = searchParams.get('q')?.trim()
    const limit = parseInt(searchParams.get('limit') ?? '10')

    if (!q || q.length < 2) {
      return NextResponse.json({ questions: [], chapters: [], subjects: [] })
    }

    const [questions, chapters, subjects] = await Promise.all([
      prisma.question.findMany({
        where: {
          isPublic: true,
          OR: [
            { title:    { contains: q } },
            { solution: { contains: q } },
          ],
        },
        select: { slug: true, title: true, subject: { select: { name: true } } },
        take: limit,
        orderBy: { views: 'desc' },
      }),
      prisma.chapter.findMany({
        where: {
          isPublic: true,
          OR: [
            { title:       { contains: q } },
            { description: { contains: q } },
          ],
        },
        select: { slug: true, title: true, subject: { select: { slug: true, name: true } } },
        take: Math.ceil(limit / 2),
      }),
      prisma.subject.findMany({
        where: {
          isActive: true,
          OR: [
            { name:        { contains: q } },
            { description: { contains: q } },
          ],
        },
        select: { slug: true, name: true, icon: true },
        take: 5,
      }),
    ])

    return NextResponse.json({ questions, chapters, subjects, query: q })
  } catch (err) {
    console.error('search error:', err)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
