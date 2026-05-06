import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { adminAuth } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    // Replies ONLY for registered (logged-in) users
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Login required to reply. Please register or sign in.' }, { status: 401 })
    }

    let userId: string
    let userName: string
    try {
      const decoded = await adminAuth.verifyIdToken(token)
      userId   = decoded.uid
      userName = decoded.name ?? decoded.email ?? 'Student'
    } catch {
      return NextResponse.json({ error: 'Invalid session. Please login again.' }, { status: 401 })
    }

    const { commentId, content } = await req.json()
    if (!content?.trim()) return NextResponse.json({ error: 'Reply cannot be empty' }, { status: 400 })
    if (!commentId)       return NextResponse.json({ error: 'Comment ID required' }, { status: 400 })

    // Verify comment exists
    const comment = await prisma.comment.findUnique({ where: { id: Number(commentId) } })
    if (!comment) return NextResponse.json({ error: 'Comment not found' }, { status: 404 })

    const reply = await prisma.reply.create({
      data: {
        content:     content.trim(),
        userId,
        userName,
        commentId:   Number(commentId),
        isRegistered: true,
      },
    })

    return NextResponse.json({ reply, success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
