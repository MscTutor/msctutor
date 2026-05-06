// app/api/exam/create/route.ts — Teacher creates shareable exam

import { NextResponse }     from 'next/server'
import { prisma }           from '@/lib/prisma'
import { getAuthUser }      from '@/lib/auth'
import { generateExamPaper } from '@/lib/exam-generator'

function randomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, classLevel, subject, board, medium, difficulty, totalQ, questionTypes, schoolId } = await req.json()

    const questions = await generateExamPaper({ classLevel, subject, board, medium, difficulty, totalQ, questionTypes })

    let shareCode = randomCode()
    while (await prisma.examPaper.findUnique({ where: { shareCode } })) {
      shareCode = randomCode()
    }

    const subjectRecord = await prisma.subject.findFirst({ where: { slug: subject.toLowerCase() } })

    const exam = await prisma.examPaper.create({
      data: {
        title: title ?? `${subject} Class ${classLevel} — ${board}`,
        classLevel,
        board,
        medium,
        difficulty,
        totalQ,
        totalMarks: questions.reduce((s, q) => s + q.marks, 0),
        duration:   Math.ceil(totalQ * 2.5),
        shareCode,
        isPublic:   false,
        isAIGenerated: true,
        createdBy:  user.uid,
        subjectId:  subjectRecord?.id,
        schoolId:   schoolId ?? undefined,
        questions:  {
          create: questions.map(q => ({
            questionText:  q.questionText,
            options:       q.options ? JSON.stringify(q.options) : null,
            correctAnswer: q.correctAnswer,
            explanation:   q.explanation,
            marks:         q.marks,
            type:          q.type,
            chapter:       q.chapter,
            order:         q.order,
          })),
        },
      },
      include: { questions: true },
    })

    return NextResponse.json({ exam, shareCode }, { status: 201 })
  } catch (err) {
    console.error('exam/create error:', err)
    return NextResponse.json({ error: 'Exam creation failed' }, { status: 500 })
  }
}
