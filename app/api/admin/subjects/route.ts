// app/api/admin/subjects/route.ts — CRUD for subjects

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { getAuthUser, isAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const subjects = await prisma.subject.findMany({
      include: { _count: { select: { chapters: true, questions: true } } },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(subjects)
  } catch (err) {
    console.error('admin/subjects GET:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { name, nameHindi, slug, icon, color, branch, description, order } = await req.json()
    if (!name || !slug) return NextResponse.json({ error: 'name and slug required' }, { status: 400 })

    const subject = await prisma.subject.create({
      data: { name, nameHindi, slug, icon, color, branch: branch ?? 'general', description, order: order ?? 0 },
    })
    return NextResponse.json(subject, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error'
    if (msg.includes('Unique constraint')) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id, ...data } = await req.json()
    const subject = await prisma.subject.update({ where: { id }, data })
    return NextResponse.json(subject)
  } catch (err) {
    console.error('admin/subjects PUT:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = await req.json()
    await prisma.subject.update({ where: { id }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
