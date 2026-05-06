import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { uid, name, email } = await req.json()
    if (!uid) return NextResponse.json({ error: 'UID required' }, { status: 400 })

    const user = await prisma.user.upsert({
      where:  { firebaseUid: uid },
      update: { name, email },
      create: { firebaseUid: uid, name: name ?? 'Student', email, role: 'student', credits: 5, plan: 'free' },
    })

    return NextResponse.json({ user: { id: user.id, name: user.name, role: user.role, credits: user.credits } })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
