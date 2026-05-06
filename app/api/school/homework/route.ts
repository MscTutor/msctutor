// app/api/school/homework/route.ts

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { getAuthUser }  from '@/lib/auth'

export async function GET(req: Request) {
  const user = await getAuthUser(req)
  if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const classId = searchParams.get('classId')
  const hw = await prisma.homework.findMany({
    where: { schoolId: user.schoolId, ...(classId ? { classId: parseInt(classId) } : {}) },
    include: { submissions: { select: { id: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(hw)
}

export async function POST(req: Request) {
  const user = await getAuthUser(req)
  if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const hw = await prisma.homework.create({
    data: { ...body, schoolId: user.schoolId, teacherId: user.uid },
  })
  return NextResponse.json(hw, { status: 201 })
}
