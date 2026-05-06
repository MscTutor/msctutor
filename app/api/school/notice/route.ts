// app/api/school/notice/route.ts

import { NextResponse }  from 'next/server'
import { prisma }        from '@/lib/prisma'
import { getAuthUser }   from '@/lib/auth'

export async function GET(req: Request) {
  const user = await getAuthUser(req)
  if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const notices = await prisma.schoolNotice.findMany({
    where: { schoolId: user.schoolId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(notices)
}

export async function POST(req: Request) {
  const user = await getAuthUser(req)
  if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, content, type, priority, targetRole } = await req.json()
  const notice = await prisma.schoolNotice.create({
    data: { title, content, type, priority, targetRole, schoolId: user.schoolId, sentBy: user.uid },
  })
  return NextResponse.json(notice, { status: 201 })
}
