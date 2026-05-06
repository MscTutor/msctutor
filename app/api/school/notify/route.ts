// app/api/school/notify/route.ts — Send FCM push to entire school

import { NextResponse }      from 'next/server'
import { prisma }            from '@/lib/prisma'
import { getAuthUser, isSchoolAdmin } from '@/lib/auth'
import { sendPushMulticast } from '@/lib/fcm-notify'

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!isSchoolAdmin(user) || !user!.schoolId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, body, targetRole = 'all', noticeId } = await req.json()

    const [teachers, students] = await Promise.all([
      prisma.schoolTeacher.findMany({
        where: { schoolId: user!.schoolId, isActive: true, fcmToken: { not: null } },
        select: { fcmToken: true },
      }),
      prisma.schoolStudent.findMany({
        where: { schoolId: user!.schoolId, isActive: true, fcmToken: { not: null } },
        select: { fcmToken: true, parentFcmToken: true },
      }),
    ])

    let tokens: string[] = []
    if (targetRole === 'all' || targetRole === 'teachers') {
      tokens.push(...teachers.map(t => t.fcmToken!))
    }
    if (targetRole === 'all' || targetRole === 'students') {
      tokens.push(...students.map(s => s.fcmToken!))
      tokens.push(...students.filter(s => s.parentFcmToken).map(s => s.parentFcmToken!))
    }

    tokens = [...new Set(tokens)]
    let sent = 0
    const CHUNK = 500
    for (let i = 0; i < tokens.length; i += CHUNK) {
      await sendPushMulticast(tokens.slice(i, i + CHUNK), { title, body })
      sent += Math.min(CHUNK, tokens.length - i)
    }

    if (noticeId) {
      await prisma.schoolNotice.update({ where: { id: noticeId }, data: { isPushed: true } })
    }

    return NextResponse.json({ success: true, sent })
  } catch (err) {
    console.error('school/notify error:', err)
    return NextResponse.json({ error: 'Push failed' }, { status: 500 })
  }
}
