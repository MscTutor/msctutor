// app/api/admin/schools/route.ts — School management

import { NextResponse }         from 'next/server'
import { prisma }               from '@/lib/prisma'
import { getAuthUser, isAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const search   = searchParams.get('search')
    const verified = searchParams.get('verified')

    const where: Record<string, unknown> = {}
    if (search)              where.OR         = [{ name: { contains: search } }, { code: { contains: search } }]
    if (verified === 'true') where.isVerified = true
    if (verified === 'false') where.isVerified = false

    const schools = await prisma.school.findMany({
      where,
      include: { _count: { select: { teachers: true, students: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    return NextResponse.json(schools)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id, isVerified, plan, isActive } = await req.json()
    const school = await prisma.school.update({ where: { id }, data: { isVerified, plan, isActive } })
    return NextResponse.json(school)
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
