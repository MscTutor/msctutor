// app/api/question/[slug]/route.ts — Get/update question by slug

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const q = await prisma.question.findUnique({
      where: { slug: params.slug },
      include: { subject: true, chapter: true },
    })
    if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await prisma.question.update({ where: { id: q.id }, data: { views: { increment: 1 } } })

    return NextResponse.json(q)
  } catch (err) {
    console.error('question/[slug] GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const data = await req.json()
    const q = await prisma.question.update({ where: { slug: params.slug }, data })
    return NextResponse.json(q)
  } catch (err) {
    console.error('question/[slug] PATCH error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
