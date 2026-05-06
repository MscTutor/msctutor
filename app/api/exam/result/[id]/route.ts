// app/api/exam/result/[id]/route.ts — Get exam attempt result

import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const attempt = await prisma.examAttempt.findUnique({
      where:   { id: parseInt(params.id) },
      include: {
        exam: {
          include: { questions: { orderBy: { order: 'asc' } } },
        },
      },
    })
    if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const answers  = JSON.parse(attempt.answers)
    const analysis = attempt.analysis ? JSON.parse(attempt.analysis) : null

    return NextResponse.json({ ...attempt, answers, analysis })
  } catch (err) {
    console.error('exam/result error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
