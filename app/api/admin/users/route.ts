// app/api/admin/users/route.ts — User management

import { NextResponse }         from 'next/server'
import { prisma }               from '@/lib/prisma'
import { getAuthUser, isAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const role   = searchParams.get('role')
    const search = searchParams.get('search')
    const page   = parseInt(searchParams.get('page') ?? '1')
    const limit  = 50

    const where: Record<string, unknown> = {}
    if (role)   where.role  = role
    if (search) where.OR    = [{ name: { contains: search } }, { email: { contains: search } }]

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit, skip: (page - 1) * limit }),
      prisma.user.count({ where }),
    ])
    return NextResponse.json({ users, total, page })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { firebaseUid, role, plan, credits, isActive } = await req.json()
    const updated = await prisma.user.update({
      where: { firebaseUid },
      data:  { role, plan, credits, isActive },
    })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
