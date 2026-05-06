// app/api/school/teacher/route.ts — Add / list school teachers

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { getAuthUser, isSchoolAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const teachers = await prisma.schoolTeacher.findMany({
      where:   { schoolId: user.schoolId },
      include: { classes: { include: { class: true } } },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(teachers)
  } catch (err) {
    console.error('school/teacher GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isSchoolAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!user!.schoolId)      return NextResponse.json({ error: 'No school' },   { status: 400 })

    const { name, email, phone, subject } = await req.json()
    const teacher = await prisma.schoolTeacher.create({
      data: { name, email, phone, subject, schoolId: user!.schoolId, userId: email },
    })
    return NextResponse.json(teacher, { status: 201 })
  } catch (err) {
    console.error('school/teacher POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
