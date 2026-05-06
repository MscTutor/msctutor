// app/api/school/attendance/route.ts — Mark and fetch attendance

import { NextResponse }  from 'next/server'
import { prisma }        from '@/lib/prisma'
import { getAuthUser }   from '@/lib/auth'
import { sendPushToToken } from '@/lib/fcm-notify'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user?.schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const classId = searchParams.get('classId')
    const date    = searchParams.get('date') ?? new Date().toISOString().split('T')[0]

    const start = new Date(date)
    const end   = new Date(date)
    end.setDate(end.getDate() + 1)

    const records = await prisma.attendance.findMany({
      where: {
        classId: classId ? parseInt(classId) : undefined,
        date:    { gte: start, lt: end },
        class:   { schoolId: user.schoolId },
      },
      include: { student: true },
    })
    return NextResponse.json(records)
  } catch (err) {
    console.error('attendance GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { classId, date, records, className } = await req.json()
    // records = [{ studentId, status: 'present'|'absent'|'late' }]

    const dateObj = new Date(date)

    const ops = records.map((r: { studentId: number; status: string; note?: string }) =>
      prisma.attendance.upsert({
        where:  { classId_studentId_date: { classId, studentId: r.studentId, date: dateObj } },
        update: { status: r.status, note: r.note ?? null, markedBy: user.uid },
        create: { classId, studentId: r.studentId, date: dateObj, status: r.status, markedBy: user.uid, note: r.note ?? null },
      })
    )
    await prisma.$transaction(ops)

    // Send FCM push to absent students
    const absentIds = records
      .filter((r: { studentId: number; status: string }) => r.status === 'absent')
      .map((r: { studentId: number }) => r.studentId)

    if (absentIds.length > 0) {
      const absentStudents = await prisma.schoolStudent.findMany({
        where: { id: { in: absentIds } },
      })
      for (const s of absentStudents) {
        if (s.fcmToken) {
          await sendPushToToken(s.fcmToken, {
            title: 'Attendance Alert — MscTutor',
            body:  `${s.name} was marked ABSENT today in ${className ?? 'your class'}`,
          })
        }
        if (s.parentFcmToken) {
          await sendPushToToken(s.parentFcmToken, {
            title: 'MscTutor — Your child was absent',
            body:  `${s.name} was absent from school today`,
          })
        }
      }
    }

    return NextResponse.json({ success: true, marked: records.length })
  } catch (err) {
    console.error('attendance POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
