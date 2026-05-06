// app/api/school/student/route.ts — Add / list / bulk import students

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { getAuthUser, isSchoolAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const classId = searchParams.get('classId')

    const students = await prisma.schoolStudent.findMany({
      where: {
        schoolId: user.schoolId,
        isActive: true,
        ...(classId ? { classes: { some: { classId: parseInt(classId) } } } : {}),
      },
      include: { classes: { include: { class: true } } },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(students)
  } catch (err) {
    console.error('school/student GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isSchoolAdmin(user)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!user!.schoolId)      return NextResponse.json({ error: 'No school' }, { status: 400 })

    const body = await req.json()

    // Bulk import
    if (Array.isArray(body.students)) {
      const created = await prisma.$transaction(
        body.students.map((s: { name: string; rollNumber?: string; phone?: string; parentPhone?: string }) =>
          prisma.schoolStudent.create({
            data: { ...s, schoolId: user!.schoolId! },
          })
        )
      )
      return NextResponse.json({ created: created.length }, { status: 201 })
    }

    // Single student
    const student = await prisma.schoolStudent.create({
      data: { ...body, schoolId: user!.schoolId },
    })
    return NextResponse.json(student, { status: 201 })
  } catch (err) {
    console.error('school/student POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
